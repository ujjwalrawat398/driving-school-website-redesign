import { createEnquiry } from "@/db/queries";
import { badRequest, isEmail, ok, str, type FieldErrors } from "@/lib/validation";

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
    phone: str(payload.phone, 40) || null,
    subject: str(payload.subject, 160) || "General enquiry",
    message: str(payload.message, 3000),
  };

  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please enter your name.";
  if (!isEmail(data.email)) errors.email = "Enter a valid email address.";
  if (data.message.length < 10) errors.message = "Tell us a little more (10+ characters).";

  if (Object.keys(errors).length > 0) return badRequest(errors);

  try {
    const row = await createEnquiry(data);
    return ok({
      reference: `ENQ-${String(row?.id ?? 0).padStart(5, "0")}`,
      message: "Thanks — we reply to every enquiry within one working day.",
    });
  } catch {
    return Response.json(
      { ok: false, errors: { form: "Something went wrong. Please email us directly." } },
      { status: 500 },
    );
  }
}
