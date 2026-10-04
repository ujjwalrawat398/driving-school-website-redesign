import { addSubscriber, createReview, getApprovedReviews } from "@/db/queries";
import { badRequest, isEmail, num, ok, str, type FieldErrors } from "@/lib/validation";

export const dynamic = "force-dynamic";

export async function GET() {
  const rows = await getApprovedReviews();
  return Response.json({ ok: true, reviews: rows });
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = (await request.json()) as Record<string, unknown>;
  } catch {
    return badRequest({ form: "Invalid request body." });
  }

  // Newsletter subscription piggy-backed on this endpoint for simplicity.
  if (payload.intent === "subscribe") {
    const email = str(payload.email, 180);
    if (!isEmail(email)) return badRequest({ email: "Enter a valid email address." });
    try {
      await addSubscriber(email.toLowerCase());
      return ok({ message: "You're on the list. Look out for the next study pack." });
    } catch {
      return Response.json({ ok: false, errors: { form: "Try again shortly." } }, { status: 500 });
    }
  }

  const data = {
    name: str(payload.name, 120),
    location: str(payload.location, 120) || null,
    rating: Math.min(5, Math.max(1, num(payload.rating, 5))),
    quote: str(payload.quote, 2000),
    service: str(payload.service, 120) || null,
    instructor: str(payload.instructor, 120) || null,
  };

  const errors: FieldErrors = {};
  if (data.name.length < 2) errors.name = "Please add your name.";
  if (data.quote.length < 20) errors.quote = "Reviews need at least 20 characters.";
  if (Object.keys(errors).length > 0) return badRequest(errors);

  try {
    const row = await createReview(data);
    return ok({
      reference: `REV-${String(row?.id ?? 0).padStart(5, "0")}`,
      message: "Thank you! Your review is queued for moderation and will appear shortly.",
    });
  } catch {
    return Response.json({ ok: false, errors: { form: "Try again shortly." } }, { status: 500 });
  }
}
