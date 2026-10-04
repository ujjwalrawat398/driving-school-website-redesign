import { createBooking, getDashboardData } from "@/db/queries";
import { badRequest, isEmail, isPhone, num, ok, str, type FieldErrors } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return badRequest({ form: "Invalid request body." });
  }

  const data = {
    name: str(payload.name, 120),
    email: str(payload.email, 180),
    phone: str(payload.phone, 40),
    serviceSlug: str(payload.serviceSlug, 120),
    transmission: str(payload.transmission, 40) || "Manual",
    preferredDate: str(payload.preferredDate, 20),
    preferredTime: str(payload.preferredTime, 12),
    postcode: str(payload.postcode, 16),
    experience: str(payload.experience, 40) || "Complete beginner",
    instructorId: payload.instructorId ? num(payload.instructorId, 0) : null,
    message: str(payload.message, 2000) || null,
  };

  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please enter your full name.";
  if (!isEmail(data.email)) errors.email = "Enter a valid email address.";
  if (!isPhone(data.phone)) errors.phone = "Enter a valid contact number.";
  if (!data.serviceSlug) errors.serviceSlug = "Choose a lesson type.";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate)) errors.preferredDate = "Choose a date.";
  if (!data.preferredTime) errors.preferredTime = "Choose a time.";
  if (!/^[A-Za-z]{1,2}\d[A-Za-z\d]?\s?\d?[A-Za-z]{0,2}$/.test(data.postcode))
    errors.postcode = "Enter a valid UK postcode.";

  if (Object.keys(errors).length > 0) return badRequest(errors);

  try {
    const row = await createBooking(data);
    return ok({
      reference: `APX-${String(row?.id ?? 0).padStart(5, "0")}`,
      message: "Booking request received. We'll confirm within one working hour.",
    });
  } catch {
    return Response.json(
      { ok: false, errors: { form: "We couldn't save that. Please call us on 0118 214 9930." } },
      { status: 500 },
    );
  }
}

export async function GET() {
  const data = await getDashboardData();
  return Response.json({ ok: true, bookings: data.bookings });
}
