"use client";

import { useState } from "react";
import { Icon } from "@/components/section";

/* -------------------------------------------------- shared field bits */
const fieldClass =
  "w-full rounded-xl border border-line bg-ink/70 px-4 py-3 text-sm text-chalk outline-none transition-colors placeholder:text-mist/60 focus:border-amber/60";
const labelClass =
  "mb-2 block text-xs font-semibold tracking-[0.18em] text-mist uppercase";

function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return <p className="mt-1.5 text-xs font-medium text-red-400">{message}</p>;
}

function Success({ title, body, action }: { title: string; body: string; action?: string }) {
  return (
    <div className="rounded-2xl border border-amber/40 bg-amber/10 p-8 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-amber text-ink">
        <Icon name="check" className="h-7 w-7" />
      </span>
      <h3 className="display mt-5 text-2xl">{title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-chalk/80">{body}</p>
      {action ? (
        <p className="mt-5 font-mono text-xs tracking-widest text-amber uppercase">{action}</p>
      ) : null}
    </div>
  );
}

/* ================================================================== *
 * Multi-step booking form
 * ================================================================== */
export type BookingServiceOption = {
  slug: string;
  title: string;
  price: number;
  unit: string;
};

const steps = ["Lesson", "Schedule", "Details"] as const;

export function BookingForm({
  services,
  times,
  instructorNames,
  defaultSlug = "",
}: {
  services: BookingServiceOption[];
  times: string[];
  instructorNames: string[];
  defaultSlug?: string;
}) {
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<{ reference: string; message: string } | null>(null);
  const [form, setForm] = useState({
    serviceSlug: defaultSlug || services[0]?.slug || "",
    transmission: "Manual",
    preferredDate: "",
    preferredTime: times[0] ?? "09:00",
    postcode: "",
    experience: "Complete beginner",
    instructor: "No preference",
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const set = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const activeService = services.find((s) => s.slug === form.serviceSlug);

  function validateStep(current: number) {
    const e: Record<string, string> = {};
    if (current === 0) {
      if (!form.serviceSlug) e.serviceSlug = "Pick a lesson type.";
    }
    if (current === 1) {
      if (!form.preferredDate) e.preferredDate = "Choose a preferred date.";
      if (!form.preferredTime) e.preferredTime = "Choose a time.";
      if (form.postcode.trim().length < 3) e.postcode = "Enter your postcode.";
    }
    if (current === 2) {
      if (form.name.trim().length < 2) e.name = "Enter your full name.";
      if (!/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(form.email)) e.email = "Enter a valid email.";
      if (form.phone.trim().length < 7) e.phone = "Enter a contact number.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  async function submit() {
    if (!validateStep(2)) return;
    setBusy(true);
    setErrors({});
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok: boolean;
        reference?: string;
        message?: string;
        errors?: Record<string, string>;
      };
      if (!data.ok) {
        setErrors(data.errors ?? { form: "Please check your details." });
        return;
      }
      setDone({ reference: data.reference ?? "APX-00000", message: data.message ?? "" });
    } catch {
      setErrors({ form: "Network error — please call 0118 214 9930." });
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <Success
        title="Booking request received"
        body={done.message}
        action={`Reference ${done.reference}`}
      />
    );
  }

  return (
    <div className="card p-6 sm:p-9">
      {/* progress */}
      <ol className="flex items-center gap-3">
        {steps.map((label, i) => (
          <li key={label} className="flex flex-1 items-center gap-3">
            <button
              type="button"
              onClick={() => i < step && setStep(i)}
              className={`grid h-9 w-9 shrink-0 place-items-center rounded-full border text-xs font-bold transition-colors ${
                i <= step
                  ? "border-amber bg-amber text-ink"
                  : "border-line text-mist"
              }`}
            >
              {i + 1}
            </button>
            <span
              className={`hidden text-xs font-semibold tracking-[0.16em] uppercase sm:block ${
                i <= step ? "text-chalk" : "text-mist"
              }`}
            >
              {label}
            </span>
            {i < steps.length - 1 ? (
              <span className={`h-px flex-1 ${i < step ? "bg-amber" : "bg-line"}`} />
            ) : null}
          </li>
        ))}
      </ol>

      <div className="mt-8 space-y-6">
        {step === 0 ? (
          <>
            <div>
              <span className={labelClass}>Lesson type</span>
              <div className="grid gap-3 sm:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => set("serviceSlug", s.slug)}
                    className={`rounded-xl border p-4 text-left transition-colors ${
                      form.serviceSlug === s.slug
                        ? "border-amber bg-amber/10"
                        : "border-line bg-ink/50 hover:border-mist/40"
                    }`}
                  >
                    <span className="block text-sm font-bold">{s.title}</span>
                    <span className="mt-1 block text-xs text-mist">
                      From £{s.price} {s.unit}
                    </span>
                  </button>
                ))}
              </div>
              <FieldError message={errors.serviceSlug} />
            </div>

            <div>
              <span className={labelClass}>Transmission</span>
              <div className="inline-flex rounded-full border border-line bg-ink/60 p-1">
                {["Manual", "Automatic"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => set("transmission", t)}
                    className={`rounded-full px-5 py-2 text-sm font-semibold transition-colors ${
                      form.transmission === t ? "bg-amber text-ink" : "text-mist hover:text-chalk"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label htmlFor="experience" className={labelClass}>
                Your experience
              </label>
              <select
                id="experience"
                value={form.experience}
                onChange={(e) => set("experience", e.target.value)}
                className={fieldClass}
              >
                {[
                  "Complete beginner",
                  "Some private practice",
                  "Previous lessons elsewhere",
                  "Test standard, need polish",
                  "Full licence — refresher",
                ].map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : null}

        {step === 1 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="date" className={labelClass}>
                  Preferred start date
                </label>
                <input
                  id="date"
                  type="date"
                  value={form.preferredDate}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => set("preferredDate", e.target.value)}
                  className={fieldClass}
                />
                <FieldError message={errors.preferredDate} />
              </div>
              <div>
                <label htmlFor="time" className={labelClass}>
                  Preferred time
                </label>
                <select
                  id="time"
                  value={form.preferredTime}
                  onChange={(e) => set("preferredTime", e.target.value)}
                  className={fieldClass}
                >
                  {times.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
                <FieldError message={errors.preferredTime} />
              </div>
            </div>

            <div>
              <label htmlFor="postcode" className={labelClass}>
                Pickup postcode
              </label>
              <input
                id="postcode"
                value={form.postcode}
                onChange={(e) => set("postcode", e.target.value.toUpperCase())}
                placeholder="RG1 5SZ"
                className={fieldClass}
              />
              <FieldError message={errors.postcode} />
            </div>

            <div>
              <label htmlFor="instructor" className={labelClass}>
                Preferred instructor
              </label>
              <select
                id="instructor"
                value={form.instructor}
                onChange={(e) => set("instructor", e.target.value)}
                className={fieldClass}
              >
                <option value="No preference">No preference — match me</option>
                {instructorNames.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </>
        ) : null}

        {step === 2 ? (
          <>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name
                </label>
                <input
                  id="name"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Alex Morgan"
                  className={fieldClass}
                />
                <FieldError message={errors.name} />
              </div>
              <div>
                <label htmlFor="phone" className={labelClass}>
                  Mobile
                </label>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="07700 900 118"
                  className={fieldClass}
                />
                <FieldError message={errors.phone} />
              </div>
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                Email
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => set("email", e.target.value)}
                placeholder="you@example.com"
                className={fieldClass}
              />
              <FieldError message={errors.email} />
            </div>
            <div>
              <label htmlFor="notes" className={labelClass}>
                Anything we should know? (optional)
              </label>
              <textarea
                id="notes"
                rows={4}
                value={form.message}
                onChange={(e) => set("message", e.target.value)}
                placeholder="Nervous about roundabouts, available weekday mornings…"
                className={fieldClass}
              />
            </div>

            {errors.form ? (
              <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {errors.form}
              </p>
            ) : null}

            <div className="rounded-xl border border-line bg-ink/50 p-4 text-sm text-mist">
              <p>
                <span className="font-semibold text-chalk">Summary:</span>{" "}
                {activeService?.title ?? "Lesson"} · {form.transmission} ·{" "}
                {form.preferredDate || "date TBC"} at {form.preferredTime} · {form.postcode || "postcode TBC"}
              </p>
            </div>
          </>
        ) : null}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          disabled={step === 0}
          className="text-sm font-semibold text-mist transition-colors hover:text-amber disabled:opacity-30"
        >
          ← Back
        </button>
        {step < steps.length - 1 ? (
          <button
            type="button"
            onClick={() => validateStep(step) && setStep((s) => s + 1)}
            className="btn btn-primary hover:bg-amber-soft"
          >
            Continue
          </button>
        ) : (
          <button
            type="button"
            onClick={submit}
            disabled={busy}
            className="btn btn-primary hover:bg-amber-soft disabled:opacity-60"
          >
            {busy ? "Sending…" : "Request my slot"}
          </button>
        )}
      </div>
    </div>
  );
}

/* ================================================================== *
 * Contact form
 * ================================================================== */
export function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General enquiry",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as {
        ok: boolean;
        reference?: string;
        message?: string;
        errors?: Record<string, string>;
      };
      if (!data.ok) {
        setErrors(data.errors ?? { form: "Please check your details." });
        return;
      }
      setDone(data.reference ?? "ENQ-00000");
    } catch {
      setErrors({ form: "Network error — please call us instead." });
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <Success
        title="Message sent"
        body="Thanks for getting in touch. A real human replies to every enquiry within one working day — usually much sooner."
        action={`Reference ${done}`}
      />
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-5 p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="cname" className={labelClass}>
            Name
          </label>
          <input
            id="cname"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={fieldClass}
            placeholder="Alex Morgan"
          />
          <FieldError message={errors.name} />
        </div>
        <div>
          <label htmlFor="cphone" className={labelClass}>
            Phone (optional)
          </label>
          <input
            id="cphone"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={fieldClass}
            placeholder="07700 900 118"
          />
        </div>
      </div>
      <div>
        <label htmlFor="cemail" className={labelClass}>
          Email
        </label>
        <input
          id="cemail"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className={fieldClass}
          placeholder="you@example.com"
        />
        <FieldError message={errors.email} />
      </div>
      <div>
        <label htmlFor="csubject" className={labelClass}>
          Subject
        </label>
        <select
          id="csubject"
          value={form.subject}
          onChange={(e) => setForm({ ...form, subject: e.target.value })}
          className={fieldClass}
        >
          {[
            "General enquiry",
            "Booking a lesson",
            "Intensive course",
            "Instructor training",
            "Gift vouchers",
            "Fleet / corporate training",
            "Something else",
          ].map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="cmessage" className={labelClass}>
          Message
        </label>
        <textarea
          id="cmessage"
          rows={5}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          className={fieldClass}
          placeholder="Tell us what you need…"
        />
        <FieldError message={errors.message} />
      </div>
      {errors.form ? (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errors.form}
        </p>
      ) : null}
      <button type="submit" disabled={busy} className="btn btn-primary w-full hover:bg-amber-soft disabled:opacity-60">
        {busy ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}

/* ================================================================== *
 * Review form
 * ================================================================== */
export function ReviewForm({ instructors }: { instructors: string[] }) {
  const [form, setForm] = useState({
    name: "",
    location: "",
    rating: 5,
    quote: "",
    service: "Beginner Lessons",
    instructor: instructors[0] ?? "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErrors({});
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json()) as { ok: boolean; errors?: Record<string, string> };
      if (!data.ok) {
        setErrors(data.errors ?? { form: "Please check your details." });
        return;
      }
      setDone(true);
    } catch {
      setErrors({ form: "Network error — please try again." });
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <Success
        title="Thank you"
        body="Your review is with our moderation team and will appear on this page shortly. Reviews from real learners are how other nervous drivers find us."
      />
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-5 p-6 sm:p-8">
      <h3 className="display text-2xl">Leave a review</h3>
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rname" className={labelClass}>
            Your name
          </label>
          <input
            id="rname"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={fieldClass}
            placeholder="Hannah W."
          />
          <FieldError message={errors.name} />
        </div>
        <div>
          <label htmlFor="rloc" className={labelClass}>
            Town
          </label>
          <input
            id="rloc"
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className={fieldClass}
            placeholder="Reading"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rservice" className={labelClass}>
            Lesson type
          </label>
          <select
            id="rservice"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            className={fieldClass}
          >
            {[
              "Beginner Lessons",
              "Intensive Course",
              "Refresher Lessons",
              "Pass Plus",
              "Mock Test Package",
              "Automatic Lessons",
              "Motorway & Rural Training",
              "ADI Instructor Training",
            ].map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="rinstr" className={labelClass}>
            Instructor
          </label>
          <select
            id="rinstr"
            value={form.instructor}
            onChange={(e) => setForm({ ...form, instructor: e.target.value })}
            className={fieldClass}
          >
            {instructors.map((i) => (
              <option key={i} value={i}>
                {i}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <span className={labelClass}>Rating</span>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              type="button"
              onClick={() => setForm({ ...form, rating: n })}
              aria-label={`${n} star`}
              className={`grid h-11 w-11 place-items-center rounded-xl border transition-colors ${
                n <= form.rating ? "border-amber bg-amber/15 text-amber" : "border-line text-mist"
              }`}
            >
              <Icon name="star" filled className="h-5 w-5" />
            </button>
          ))}
        </div>
      </div>

      <div>
        <label htmlFor="rquote" className={labelClass}>
          Your review
        </label>
        <textarea
          id="rquote"
          rows={5}
          value={form.quote}
          onChange={(e) => setForm({ ...form, quote: e.target.value })}
          className={fieldClass}
          placeholder="What was your experience like?"
        />
        <FieldError message={errors.quote} />
      </div>

      {errors.form ? (
        <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {errors.form}
        </p>
      ) : null}

      <button type="submit" disabled={busy} className="btn btn-primary w-full hover:bg-amber-soft disabled:opacity-60">
        {busy ? "Sending…" : "Submit review"}
      </button>
    </form>
  );
}

/* ================================================================== *
 * Newsletter
 * ================================================================== */
export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "busy" | "done" | "error">("idle");

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setState("busy");
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ intent: "subscribe", email }),
      });
      const data = (await res.json()) as { ok: boolean };
      setState(data.ok ? "done" : "error");
      if (data.ok) setEmail("");
    } catch {
      setState("error");
    }
  }

  return (
    <form onSubmit={submit} className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email address"
          className="w-full rounded-full border border-line bg-ink/70 px-5 py-3 text-sm outline-none placeholder:text-mist/60 focus:border-amber/60"
        />
        <button
          type="submit"
          disabled={state === "busy"}
          className="btn btn-primary shrink-0 hover:bg-amber-soft disabled:opacity-60"
        >
          {state === "busy" ? "…" : "Get the pack"}
        </button>
      </div>
      {state === "done" ? (
        <p className="mt-3 text-xs text-amber">You&apos;re in — check your inbox for the study pack.</p>
      ) : null}
      {state === "error" ? (
        <p className="mt-3 text-xs text-red-400">That didn&apos;t work. Try again in a moment.</p>
      ) : null}
    </form>
  );
}
