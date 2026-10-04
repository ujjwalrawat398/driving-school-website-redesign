import Link from "next/link";
import type { ReactNode } from "react";

/* -------------------------------------------------- Icons */
const paths: Record<string, ReactNode> = {
  seedling: <path d="M12 21V10m0 0a5 5 0 0 0-5-5H5v2a5 5 0 0 0 5 5h2Zm0 0h2a5 5 0 0 0 5-5V3h-2a5 5 0 0 0-5 5v2Z" />,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  refresh: <path d="M21 12a9 9 0 1 1-3-6.7M21 3v6h-6" />,
  shield: <path d="M12 3l8 3v6c0 5-3.4 8.3-8 9-4.6-.7-8-4-8-9V6l8-3Zm-2.5 9 2 2 4-4" />,
  clipboard: <path d="M9 4h6v3H9V4Zm-2 1H6v15h12V5h-1M9 12h6M9 16h4" />,
  spark: <path d="M12 3v4m0 10v4M3 12h4m10 0h4M6 6l2.5 2.5M15.5 15.5 18 18M18 6l-2.5 2.5M8.5 15.5 6 18" />,
  road: <path d="M6 21 8 3m10 18-2-18M12 5v3m0 4v3m0 4v3" />,
  badge: <path d="M12 3l2.2 1.6 2.7-.2.8 2.6 2.1 1.7-1.1 2.5 1.1 2.5-2.1 1.7-.8 2.6-2.7-.2L12 21l-2.2-1.6-2.7.2-.8-2.6-2.1-1.7L5.3 12 4.2 9.5l2.1-1.7.8-2.6 2.7.2L12 3Zm-1.5 6 1 2 2.4-2.6-1.2 3.4 2.3.3-3 3.3.5-2.6-2-.2 1.2-3.6-2.4 2.6.2-2.6Z" />,
  chart: <path d="M4 20V10m5 10V4m5 16v-7m5 7V8" />,
  heart: <path d="M12 20s-7-4.3-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.7 12 20 12 20Z" />,
  car: <path d="M5 16v2m14-2v2M3 13l1.6-4.6A2 2 0 0 1 6.5 7h11a2 2 0 0 1 1.9 1.4L21 13v3H3v-3Zm0 0h18M6 16h.01M18 16h.01" />,
  calendar: <path d="M7 3v3m10-3v3M4 8h16M5 6h14v15H5V6Zm3 6h3v3H8v-3Z" />,
  check: <path d="m5 13 4 4L19 7" />,
  star: <path d="m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1 5.9-5.2-2.8-5.2 2.8 1-5.9L3.5 9.7l5.9-.8L12 3.5Z" />,
  phone: <path d="M4 5c0-1 1-2 2-2h2l2 5-2 1a11 11 0 0 0 5 5l1-2 5 2v2c0 1-1 2-2 2A16 16 0 0 1 4 5Z" />,
  mail: <path d="M3 6h18v12H3V6Zm0 0 9 7 9-7" />,
  pin: <path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11Zm0-8.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" />,
  clock: <path d="M12 7v5l3 2m6-2a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />,
  users: <path d="M16 19v-1a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v1M9.5 10a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 19v-1a4 4 0 0 0-3-3.9M16.5 4.1a4 4 0 0 1 0 7.8" />,
  play: <path d="M8 5l11 7-11 7V5Z" />,
  arrow: <path d="M4 12h15m0 0-6-6m6 6-6 6" />,
  quote: <path d="M9 7c-3 0-5 2.2-5 5.2C4 15 5.8 17 8 17c1 0 2-.4 2-1.4 0-.8-.6-1.3-1.4-1.3-.6 0-1 .2-1.2.6-.3-1 .4-3 2.6-3.4V7Zm9 0c-3 0-5 2.2-5 5.2 0 2.8 1.8 4.8 4 4.8 1 0 2-.4 2-1.4 0-.8-.6-1.3-1.4-1.3-.6 0-1 .2-1.2.6-.3-1 .4-3 2.6-3.4V7Z" />,
  gear: <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8-3-1.5-.6.3-1.6-1.3-1-1.3 1-1.4-.9.2-1.6L12 6l-1.3 1-1.4-.9-1.3 1 .2 1.6-1.4.9-1.3-1-1.3 1 .3 1.6L3 12l1.5.6-.3 1.6 1.3 1 1.3-1 1.4.9-.2 1.6L12 18l1.3-1 1.4.9 1.3-1-.2-1.6 1.4-.9 1.3 1 1.3-1-.3-1.6L20 12Z" />,
};

export function Icon({
  name,
  className = "h-6 w-6",
  filled = false,
}: {
  name: string;
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      {paths[name] ?? paths.check}
    </svg>
  );
}

/* -------------------------------------------------- Stars */
export function Stars({ rating, className = "" }: { rating: number; className?: string }) {
  return (
    <div className={`flex items-center gap-0.5 ${className}`} aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Icon
          key={n}
          name="star"
          filled={n <= Math.round(rating)}
          className={`h-4 w-4 ${n <= Math.round(rating) ? "text-amber" : "text-line"}`}
        />
      ))}
    </div>
  );
}

/* -------------------------------------------------- Section heading */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className = "",
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
}) {
  return (
    <div
      className={`${align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"} ${className}`}
    >
      <span className="eyebrow">
        <span className="h-1.5 w-1.5 rounded-full bg-amber" />
        {eyebrow}
      </span>
      <h2 className="display mt-4 text-3xl text-balance-pretty sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 text-base leading-relaxed text-mist sm:text-lg">{intro}</p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------- Buttons */
export function CtaLink({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline" | "ghost";
  className?: string;
}) {
  const base =
    variant === "primary"
      ? "btn btn-primary hover:bg-amber-soft"
      : variant === "outline"
        ? "btn btn-outline hover:border-amber/60 hover:text-amber"
        : "btn text-mist hover:text-amber";
  return (
    <Link href={href} className={`${base} ${className}`}>
      {children}
    </Link>
  );
}

/* -------------------------------------------------- Pill */
export function Pill({ children, tone = "default" }: { children: ReactNode; tone?: "default" | "amber" }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold tracking-wide uppercase ${
        tone === "amber"
          ? "border-amber/40 bg-amber/10 text-amber"
          : "border-line bg-white/5 text-mist"
      }`}
    >
      {children}
    </span>
  );
}

/* -------------------------------------------------- Page hero (inner pages) */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  intro: string;
  image: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative isolate overflow-hidden border-b border-line pt-32 pb-16 sm:pt-40 sm:pb-24">
      <div className="absolute inset-0 -z-10">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={image} alt="" className="h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/92 to-ink" />
        <div className="absolute inset-0 grid-lines opacity-40" />
      </div>
      <div className="container-x">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}
