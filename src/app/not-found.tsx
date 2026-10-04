import { CtaLink, Icon } from "@/components/section";

export default function NotFound() {
  return (
    <section className="relative isolate grid min-h-[80vh] place-items-center overflow-hidden px-6 pt-32 pb-24">
      <div className="pointer-events-none absolute inset-0 -z-10 grid-lines opacity-30" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-72 w-72 -translate-x-1/2 rounded-full bg-amber/10 blur-[120px]" />
      <div className="max-w-xl text-center">
        <p className="display text-[clamp(5rem,18vw,10rem)] leading-none text-amber">404</p>
        <h1 className="display mt-4 text-3xl sm:text-4xl">Wrong turn.</h1>
        <p className="mt-5 text-mist">
          This page doesn&apos;t exist — probably a missed exit. Let&apos;s get you back on route.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <CtaLink href="/">
            Back to home
            <Icon name="arrow" className="h-4 w-4" />
          </CtaLink>
          <CtaLink href="/services" variant="outline">
            Browse lessons
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
