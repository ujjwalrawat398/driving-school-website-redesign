import { ensureSeeded } from "@/db/queries";

export const dynamic = "force-dynamic";

export async function GET() {
  const seeded = await ensureSeeded();
  return Response.json({ ok: true, seeded });
}

export async function POST() {
  const seeded = await ensureSeeded();
  return Response.json({ ok: true, seeded });
}
