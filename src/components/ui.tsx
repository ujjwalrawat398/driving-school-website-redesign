"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Icon, Pill, Stars } from "@/components/section";

/* ================================================================== *
 * FAQ accordion
 * ================================================================== */
export type AccordionItem = { question: string; answer: string; category?: string };

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/60">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start gap-4 px-5 py-5 text-left transition-colors hover:bg-white/[0.03] sm:px-7"
              aria-expanded={isOpen}
            >
              <span className="mt-0.5 font-mono text-xs text-amber">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="flex-1 text-base font-semibold sm:text-lg">{item.question}</span>
              <span
                className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-amber transition-transform duration-300 ${
                  isOpen ? "rotate-45 border-amber/50 bg-amber/10" : ""
                }`}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </span>
            </button>
            <div
              className="grid transition-all duration-400 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-6 pl-14 text-sm leading-relaxed text-mist sm:px-7 sm:pl-16 sm:text-base">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================== *
 * Testimonial slider
 * ================================================================== */
export type Slide = {
  name: string;
  location: string;
  rating: number;
  quote: string;
  service: string;
  instructor: string;
};

export function TestimonialSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  useEffect(() => {
    if (count < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % count), 7000);
    return () => clearInterval(id);
  }, [count]);

  if (count === 0) return null;
  const active = slides[index];

  return (
    <div className="relative">
      <div className="card overflow-hidden p-7 sm:p-10">
        <Icon name="quote" filled className="h-10 w-10 text-amber/70" />
        <blockquote className="mt-6 text-lg leading-relaxed text-chalk sm:text-2xl sm:leading-relaxed">
          “{active.quote}”
        </blockquote>
        <div className="mt-8 flex flex-wrap items-center justify-between gap-5 border-t border-line pt-6">
          <div className="flex items-center gap-4">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-amber/15 text-sm font-bold text-amber">
              {active.name.slice(0, 1)}
            </div>
            <div>
              <p className="font-semibold">{active.name}</p>
              <p className="text-sm text-mist">
                {active.location} · {active.service}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-start gap-2 sm:items-end">
            <Stars rating={active.rating} />
            <p className="text-xs tracking-widest text-mist uppercase">
              Instructor · {active.instructor}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <div className="flex gap-2">
          {slides.map((s, i) => (
            <button
              key={s.name + i}
              type="button"
              aria-label={`Show review from ${s.name}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-8 bg-amber" : "w-4 bg-line hover:bg-mist"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            aria-label="Previous review"
            onClick={() => setIndex((i) => (i - 1 + count) % count)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-mist transition-colors hover:border-amber/50 hover:text-amber"
          >
            <Icon name="arrow" className="h-4 w-4 rotate-180" />
          </button>
          <button
            type="button"
            aria-label="Next review"
            onClick={() => setIndex((i) => (i + 1) % count)}
            className="grid h-10 w-10 place-items-center rounded-full border border-line text-mist transition-colors hover:border-amber/50 hover:text-amber"
          >
            <Icon name="arrow" className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== *
 * Gallery with lightbox (images + video)
 * ================================================================== */
export type GalleryItem = {
  type: "image" | "video";
  src: string;
  poster?: string;
  title: string;
  caption: string;
};

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (active === null) return;
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") setActive((i) => ((i ?? 0) + 1) % items.length);
      if (e.key === "ArrowLeft") setActive((i) => ((i ?? 0) - 1 + items.length) % items.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, items.length]);

  const current = active !== null ? items[active] : null;

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item, i) => (
          <button
            key={item.src + i}
            type="button"
            onClick={() => setActive(i)}
            className="group relative aspect-4/3 overflow-hidden rounded-2xl border border-line text-left"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.type === "video" ? item.poster : item.src}
              alt={item.title}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent opacity-90" />
            {item.type === "video" ? (
              <span className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber/90 text-ink transition-transform group-hover:scale-110">
                <Icon name="play" filled className="ml-0.5 h-6 w-6" />
              </span>
            ) : null}
            <div className="absolute inset-x-0 bottom-0 p-4">
              <p className="text-sm font-bold">{item.title}</p>
              <p className="mt-1 line-clamp-2 text-xs text-mist">{item.caption}</p>
            </div>
          </button>
        ))}
      </div>

      {current ? (
        <div
          className="fixed inset-0 z-[80] grid place-items-center bg-ink/95 p-4 backdrop-blur"
          role="dialog"
          aria-modal
          onClick={() => setActive(null)}
        >
          <div
            className="relative w-full max-w-5xl overflow-hidden rounded-2xl border border-line bg-ink-2"
            onClick={(e) => e.stopPropagation()}
          >
            {current.type === "video" ? (
              <video
                src={current.src}
                poster={current.poster}
                controls
                autoPlay
                playsInline
                className="aspect-video w-full bg-black"
              />
            ) : (
              /* eslint-disable-next-line @next/next/no-img-element */
              <img src={current.src} alt={current.title} className="aspect-video w-full object-cover" />
            )}
            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <p className="font-bold">{current.title}</p>
                <p className="mt-1 text-sm text-mist">{current.caption}</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setActive((i) => ((i ?? 0) - 1 + items.length) % items.length)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-mist hover:border-amber/50 hover:text-amber"
                  aria-label="Previous"
                >
                  <Icon name="arrow" className="h-4 w-4 rotate-180" />
                </button>
                <button
                  type="button"
                  onClick={() => setActive((i) => ((i ?? 0) + 1) % items.length)}
                  className="grid h-10 w-10 place-items-center rounded-full border border-line text-mist hover:border-amber/50 hover:text-amber"
                  aria-label="Next"
                >
                  <Icon name="arrow" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="rounded-full border border-line px-4 text-sm font-semibold text-mist hover:border-amber/50 hover:text-amber"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

/* ================================================================== *
 * Video showcase with poster + play
 * ================================================================== */
export function VideoShowcase({
  src,
  poster,
  title,
  caption,
}: {
  src: string;
  poster: string;
  title: string;
  caption: string;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className="relative overflow-hidden rounded-3xl border border-line bg-black">
      {playing ? (
        <video src={src} poster={poster} controls autoPlay playsInline className="aspect-video w-full" />
      ) : (
        <button
          type="button"
          onClick={() => setPlaying(true)}
          className="group relative block aspect-video w-full"
        >
          <Image
            src={poster}
            alt={title}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <span className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent" />
          <span className="absolute top-1/2 left-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-amber text-ink animate-ring">
            <Icon name="play" filled className="ml-1 h-8 w-8" />
          </span>
          <span className="absolute inset-x-0 bottom-0 p-6 text-left">
            <span className="block text-lg font-bold text-chalk">{title}</span>
            <span className="mt-1 block text-sm text-mist">{caption}</span>
          </span>
        </button>
      )}
    </div>
  );
}

/* ================================================================== *
 * Block-booking price calculator
 * ================================================================== */
const HOURLY = { Manual: 38, Automatic: 40 } as const;

export function PriceCalculator({ compact = false }: { compact?: boolean }) {
  const [hours, setHours] = useState(20);
  const [transmission, setTransmission] = useState<"Manual" | "Automatic">("Manual");

  const rate = HOURLY[transmission];
  const { total, list, saving, tier } = useMemo(() => {
    const listPrice = hours * rate;
    let multiplier = 1;
    let tierName = "Pay as you go";
    if (hours >= 40) {
      multiplier = 0.85;
      tierName = "40+ hour intensive rate";
    } else if (hours >= 30) {
      multiplier = 0.89;
      tierName = "30 hour intensive rate";
    } else if (hours >= 20) {
      multiplier = 0.92;
      tierName = "20 hour block rate";
    } else if (hours >= 10) {
      multiplier = 0.95;
      tierName = "10 hour block rate";
    }
    const total = Math.round(hours * rate * multiplier);
    return { total, list: listPrice, saving: listPrice - total, tier: tierName };
  }, [hours, rate]);

  return (
    <div className={`card p-6 sm:p-8 ${compact ? "" : "glow-amber"}`}>
      <div className="flex items-center justify-between gap-4">
        <h3 className="display text-xl sm:text-2xl">Lesson cost calculator</h3>
        <Icon name="gear" className="h-6 w-6 text-amber" />
      </div>

      <div className="mt-6 inline-flex rounded-full border border-line bg-ink/60 p-1">
        {(["Manual", "Automatic"] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTransmission(t)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              transmission === t ? "bg-amber text-ink" : "text-mist hover:text-chalk"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-8">
        <div className="flex items-end justify-between">
          <label htmlFor="hours" className="text-sm font-semibold tracking-widest text-mist uppercase">
            Hours of tuition
          </label>
          <span className="display text-3xl text-amber">{hours}h</span>
        </div>
        <input
          id="hours"
          type="range"
          min={1}
          max={45}
          step={1}
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          className="mt-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-line accent-amber"
          style={{
            background: `linear-gradient(to right, var(--color-amber) ${((hours - 1) / 44) * 100}%, var(--color-line) ${((hours - 1) / 44) * 100}%)`,
          }}
        />
        <div className="mt-2 flex justify-between text-xs text-mist">
          <span>1h</span>
          <span>45h</span>
        </div>
      </div>

      <dl className="mt-8 space-y-3 border-t border-line pt-6 text-sm">
        <div className="flex justify-between text-mist">
          <dt>Rate applied</dt>
          <dd className="font-semibold text-chalk">{tier}</dd>
        </div>
        <div className="flex justify-between text-mist">
          <dt>List price</dt>
          <dd>£{list.toLocaleString("en-GB")}</dd>
        </div>
        <div className="flex justify-between text-mist">
          <dt>You save</dt>
          <dd className="font-semibold text-amber">−£{saving.toLocaleString("en-GB")}</dd>
        </div>
        <div className="flex items-baseline justify-between border-t border-line pt-4">
          <dt className="text-sm font-semibold tracking-widest text-mist uppercase">Total</dt>
          <dd className="display text-4xl">£{total.toLocaleString("en-GB")}</dd>
        </div>
        <div className="flex justify-between text-xs text-mist">
          <dt>Effective hourly rate</dt>
          <dd>£{(total / hours).toFixed(2)} / hour</dd>
        </div>
      </dl>
    </div>
  );
}

/* ================================================================== *
 * Instructor filter grid
 * ================================================================== */
export type InstructorCard = {
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
  adiNumber: string;
  transmission: string;
  specialisms: string[];
  areas: string[];
  rating: number;
  reviews: number;
  years: number;
};

export function InstructorGrid({ instructors }: { instructors: InstructorCard[] }) {
  const [query, setQuery] = useState("");
  const [gear, setGear] = useState("All");

  const gears = useMemo(
    () => ["All", ...Array.from(new Set(instructors.map((i) => i.transmission)))],
    [instructors],
  );

  const filtered = instructors.filter((i) => {
    const matchesGear = gear === "All" || i.transmission === gear;
    const q = query.trim().toLowerCase();
    const matchesQuery =
      q.length === 0 ||
      [i.name, i.role, i.bio, ...i.specialisms, ...i.areas]
        .join(" ")
        .toLowerCase()
        .includes(q);
    return matchesGear && matchesQuery;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-sm">
          <Icon name="pin" className="absolute top-1/2 left-4 h-4 w-4 -translate-y-1/2 text-mist" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by town, name or specialism"
            className="w-full rounded-full border border-line bg-surface/70 py-3 pr-4 pl-11 text-sm outline-none placeholder:text-mist/70 focus:border-amber/60"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {gears.map((g) => (
            <button
              key={g}
              type="button"
              onClick={() => setGear(g)}
              className={`rounded-full border px-4 py-2 text-xs font-semibold tracking-wide uppercase transition-colors ${
                gear === g
                  ? "border-amber bg-amber/15 text-amber"
                  : "border-line text-mist hover:border-mist/50 hover:text-chalk"
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((i) => (
          <article key={i.name} className="card group overflow-hidden">
            <div className="relative aspect-4/5 overflow-hidden">
              <Image
                src={i.imageUrl}
                alt={i.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs tracking-[0.2em] text-amber uppercase">{i.adiNumber}</p>
                <h3 className="display mt-1 text-2xl">{i.name}</h3>
                <p className="text-sm text-mist">{i.role}</p>
              </div>
            </div>
            <div className="space-y-4 p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Stars rating={i.rating} />
                  <span className="text-xs text-mist">
                    {i.rating.toFixed(1)} · {i.reviews} reviews
                  </span>
                </div>
                <span className="text-xs font-semibold text-mist">{i.years} yrs</span>
              </div>
              <p className="text-sm leading-relaxed text-mist">{i.bio}</p>
              <div className="flex flex-wrap gap-2">
                <Pill tone="amber">{i.transmission}</Pill>
                {i.specialisms.slice(0, 2).map((s) => (
                  <Pill key={s}>{s}</Pill>
                ))}
              </div>
              <p className="text-xs tracking-wide text-mist uppercase">
                Covers: {i.areas.join(" · ")}
              </p>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-mist">
          No instructors match that search — but we probably still cover it. Call 0118 214 9930.
        </p>
      ) : null}
    </div>
  );
}

/* ================================================================== *
 * Coverage area search
 * ================================================================== */
export type AreaCard = { town: string; postcode: string; testCentre: boolean; note: string };

export function AreaSearch({ areas }: { areas: AreaCard[] }) {
  const [query, setQuery] = useState("");
  const filtered = areas.filter((a) =>
    `${a.town} ${a.postcode} ${a.note}`.toLowerCase().includes(query.trim().toLowerCase()),
  );

  return (
    <div>
      <div className="relative mx-auto max-w-xl">
        <Icon name="pin" className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 text-amber" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter your town or postcode"
          className="w-full rounded-full border border-line bg-surface/70 py-4 pr-5 pl-14 text-sm outline-none placeholder:text-mist/70 focus:border-amber/60"
        />
      </div>
      <p className="mt-4 text-center text-sm text-mist">
        {filtered.length} of {areas.length} areas shown
        {query ? ` for “${query}”` : ""}
      </p>

      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((a) => (
          <div key={a.town} className="card p-5 transition-colors hover:border-amber/40">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="display text-xl">{a.town}</h3>
                <p className="mt-1 font-mono text-xs tracking-widest text-amber">{a.postcode}</p>
              </div>
              {a.testCentre ? <Pill tone="amber">Test centre</Pill> : null}
            </div>
            <p className="mt-4 text-sm leading-relaxed text-mist">{a.note}</p>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center">
          <p className="text-lg font-semibold">We may still cover you.</p>
          <p className="mt-2 text-sm text-mist">
            We travel up to 12 miles from any listed hub. Send us your postcode and we&apos;ll check.
          </p>
        </div>
      ) : null}
    </div>
  );
}
