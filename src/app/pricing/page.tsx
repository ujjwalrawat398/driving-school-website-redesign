import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { CtaLink, Icon, PageHero, SectionHeading } from "@/components/section";
import { PriceCalculator } from "@/components/ui";
import { pricingPlans } from "@/content/site";
import { getServices } from "@/db/queries";

export const metadata: Metadata = {
  title: "Pricing & block bookings",
  description:
    "Transparent driving lesson prices in Berkshire, Surrey and West London. Pay as you go from £38/hour, or save up to 15% with block and intensive bookings.",
};

const comparison = [
  { label: "Hourly rate", apex: "£38 – £45", typical: "£32 – £40" },
  { label: "Trainee instructors used", apex: "Never", typical: "Often" },
  { label: "Written progress card", apex: "Every lesson", typical: "Rarely" },
  { label: "Test fee included", apex: "On 10h blocks", typical: "Extra" },
  { label: "Retest cover", apex: "Included", typical: "Not offered" },
  { label: "Cancellation notice", apex: "48 hours", typical: "72 hours" },
  { label: "Refund on unused hours", apex: "Any time", typical: "Non-refundable" },
  { label: "Average hours to test", apex: "34", typical: "45" },
];

export default async function PricingPage() {
  const services = await getServices();

  return (
    <>
      <PageHero
        eyebrow="Pricing"
        title={
          <>
            Straight prices.
            <br />
            <span className="text-amber">No small print.</span>
          </>
        }
        intro="Fuel, insurance, dual controls and pick-up are always included. Block bookings save up to 15%, and unused hours are refundable at any time."
        image="/images/pass-celebration.jpg"
      />

      <section className="py-20 sm:py-28">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div
                  className={`card flex h-full flex-col p-7 ${
                    p.featured ? "glow-amber border-amber/40" : ""
                  }`}
                >
                  {p.featured ? (
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber px-3 py-1 text-[10px] font-bold tracking-[0.18em] text-ink uppercase">
                      Most popular
                    </span>
                  ) : null}
                  <h2 className="display mt-4 text-2xl">{p.name}</h2>
                  <p className="mt-3 text-sm text-mist">{p.summary}</p>
                  <p className="display mt-6 text-5xl">
                    £{p.price.toLocaleString("en-GB")}
                    <span className="ml-2 font-sans text-sm font-medium text-mist">{p.unit}</span>
                  </p>
                  <ul className="mt-7 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-mist">
                        <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <CtaLink
                    href="/book"
                    variant={p.featured ? "primary" : "outline"}
                    className="mt-8 w-full"
                  >
                    {p.cta}
                  </CtaLink>
                </div>
              </Reveal>
            ))}
          </div>

          {/* per-service price list */}
          <Reveal>
            <div className="card mt-16 overflow-hidden">
              <div className="border-b border-line p-6 sm:p-8">
                <h2 className="display text-2xl">Every course, every price</h2>
                <p className="mt-2 text-sm text-mist">
                  Prices shown are for manual tuition. Automatic is +£2/hour.
                </p>
              </div>
              <div className="divide-y divide-line">
                {services.map((s) => (
                  <div
                    key={s.slug}
                    className="flex flex-wrap items-center justify-between gap-4 p-5 transition-colors hover:bg-white/[0.03] sm:px-8"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-bold">{s.title}</p>
                      <p className="mt-1 text-xs text-mist">
                        {s.level} · {s.transmission}
                      </p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="hidden font-mono text-xs text-mist sm:block">
                        {s.durationMinutes >= 60
                          ? `${Math.round(s.durationMinutes / 60)}h session`
                          : `${s.durationMinutes} min`}
                      </span>
                      <span className="display text-2xl text-amber">£{s.price}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Work it out"
              title="See your total before you commit."
              intro="Block rates start at 10 hours. Intensive rates start at 20. Drag the slider to see the damage."
            />
            <div className="mt-10 space-y-4">
              {[
                { title: "Gift vouchers", body: "Any value, posted or emailed, valid 12 months." },
                { title: "Student discount", body: "5% off with a valid NUS or college ID." },
                { title: "NHS & blue light", body: "10% off — thank you, genuinely." },
                { title: "Payment plans", body: "Split any intensive course across three months." },
              ].map((f) => (
                <div key={f.title} className="flex gap-4 rounded-xl border border-line bg-surface/40 p-4">
                  <Icon name="check" className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
                  <div>
                    <p className="text-sm font-bold">{f.title}</p>
                    <p className="mt-1 text-sm text-mist">{f.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <PriceCalculator />
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Honest comparison"
              title="Apex versus the average school."
              intro="Not the cheapest on paper. Considerably cheaper by the time you pass."
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="card mt-12 overflow-hidden">
              <div className="grid grid-cols-3 border-b border-line bg-white/[0.03] px-5 py-4 text-[10px] font-bold tracking-[0.18em] uppercase sm:px-8">
                <span className="text-left text-mist">Feature</span>
                <span className="text-center text-amber">Apex Drive</span>
                <span className="text-right text-mist">Typical school</span>
              </div>
              <div className="divide-y divide-line">
                {comparison.map((row) => (
                  <div
                    key={row.label}
                    className="grid grid-cols-3 items-center gap-3 px-5 py-4 text-sm sm:px-8"
                  >
                    <span className="text-mist">{row.label}</span>
                    <span className="text-center font-semibold text-chalk">{row.apex}</span>
                    <span className="text-right text-mist/70">{row.typical}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="mt-12 flex flex-col items-center gap-5 text-center">
              <p className="max-w-2xl text-mist">
                Worked example: 34 hours with us at the 30-hour intensive rate is £1,091 all in.
                The national average of 45 hours at £35 is £1,575 — plus a retest if you&apos;re
                part of the 53% who don&apos;t pass first time.
              </p>
              <CtaLink href="/book">
                Book and start saving
                <Icon name="arrow" className="h-4 w-4" />
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
