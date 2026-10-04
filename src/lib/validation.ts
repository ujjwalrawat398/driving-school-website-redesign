export function str(value: unknown, max = 500): string {
  if (typeof value !== "string") return "";
  return value.trim().slice(0, max);
}

export function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(value);
}

export function isPhone(value: string): boolean {
  return /^[0-9+()\s-]{7,20}$/.test(value);
}

export function num(value: unknown, fallback: number): number {
  const n = typeof value === "number" ? value : Number.parseInt(String(value ?? ""), 10);
  return Number.isFinite(n) ? n : fallback;
}

export type FieldErrors = Record<string, string>;

export function badRequest(errors: FieldErrors) {
  return Response.json({ ok: false, errors }, { status: 400 });
}

export function ok<T extends Record<string, unknown>>(data: T) {
  return Response.json({ ok: true, ...data }, { status: 201 });
}
