import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { CtaLink, Icon, PageHero, Pill, SectionHeading } from "@/components/section";
import { PriceCalculator } from "@/components/ui";
import { getServices } from "@/db/queries";

export const metadata: Metadata = {
  title: "Lessons & courses",
  description:
    "Beginner lessons, intensive courses, refresher hours, Pass Plus, mock tests, automatic and EV tuition, motorway training and ADI instructor training.",
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Lessons & courses"
        title={
          <>
            Whatever stage you&apos;re at,
            <br />
            there&apos;s a path.
          </>
        }
        intro="Eight structured programmes, all delivered by DVSA Grade A instructors in dual-control cars. Pick where you are and we'll take it from there."
        image="/images/in-car-lesson.jpg"
      >
        <div className="flex flex-wrap gap-3">
          {services.slice(0, 5).map((s) => (
            <a
              key={s.slug}
              href={`#${s.slug}`}
              className="rounded-full border border-line px-4 py-2 text-xs font-semibold text-mist transition-colors hover:border-amber/50 hover:text-amber"
            >
              {s.title}
            </a>
          ))}
        </div>
      </PageHero>

      <section className="py-20 sm:py-28">
        <div className="container-x space-y-6">
          {services.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i * 50, 200)}>
              <article
                id={s.slug}
                className="card group grid scroll-mt-32 gap-8 p-6 transition-colors hover:border-amber/40 sm:p-8 lg:grid-cols-[1fr_320px]"
              >
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-amber/30 bg-amber/10 text-amber">
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xs text-mist">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Pill>{s.level}</Pill>
                    <Pill tone="amber">{s.transmission}</Pill>
                  </div>
                  <h2 className="display mt-6 text-3xl sm:text-4xl">{s.title}</h2>
                  <p className="mt-4 max-w-2xl text-base leading-relaxed text-mist">
                    {s.description}
                  </p>
                  <ul className="mt-7 grid gap-3 sm:grid-cols-2">
                    {s.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-mist">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={`/services/${s.slug}`}
                    className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-amber hover:gap-3 transition-all"
                  >
                    Full details
                    <Icon name="arrow" className="h-4 w-4" />
                  </Link>
                </div>

                <aside className="flex flex-col justify-between gap-6 rounded-2xl border border-line bg-ink/50 p-6">
                  <div>
                    <p className="text-xs tracking-[0.18em] text-mist uppercase">From</p>
                    <p className="display mt-2 text-4xl text-amber">£{s.price}</p>
                    <p className="mt-1 text-xs text-mist">{s.unit}</p>
                    <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-mist">Session</dt>
                        <dd className="font-semibold">
                          {s.durationMinutes >= 60
                            ? `${Math.round(s.durationMinutes / 60)} hour${s.durationMinutes >= 120 ? "s" : ""}`
                            : `${s.durationMinutes} min`}
                        </dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-mist">Gearbox</dt>
                        <dd className="font-semibold">{s.transmission}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-mist">Level</dt>
                        <dd className="font-semibold">{s.level}</dd>
                      </div>
                    </dl>
                  </div>
                  <CtaLink href={`/book?lesson=${s.slug}`} className="w-full">
                    Book this
                  </CtaLink>
                </aside>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Not sure how many hours?"
              title="Model it before you book."
              intro="Block rates kick in at 10 hours and get sharper from there. Drag the slider to see exactly what your course will cost."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              <CtaLink href="/pricing" variant="outline">
                Full price list
              </CtaLink>
              <CtaLink href="/contact">Ask us directly</CtaLink>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <PriceCalculator />
          </Reveal>
        </div>
      </section>
    </>
  );
}
