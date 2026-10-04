import Image from "next/image";
import Link from "next/link";
import { Counter, Marquee, Reveal } from "@/components/motion";
import { CtaLink, Icon, Pill, SectionHeading, Stars } from "@/components/section";
import { Accordion, PriceCalculator, TestimonialSlider, VideoShowcase } from "@/components/ui";
import { BookingForm } from "@/components/forms";
import {
  coverageAreas,
  differentiators,
  lessonTimes,
  pricingPlans,
  processSteps,
  site,
  trustLogos,
  videos,
} from "@/content/site";
import {
  getAreas,
  getFaqs,
  getInstructors,
  getPosts,
  getServices,
  getTestimonials,
} from "@/db/queries";

export default async function HomePage() {
  const [services, instructors, testimonials, faqs, areas, posts] = await Promise.all([
    getServices(),
    getInstructors(),
    getTestimonials(),
    getFaqs(),
    getAreas(),
    getPosts(),
  ]);

  return (
    <>
      {/* ================================================= HERO */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden pt-36 pb-20 lg:pt-44">
        <div className="absolute inset-0 -z-10">
          <video
            className="h-full w-full object-cover opacity-45"
            src={videos.hero.src}
            poster={videos.hero.poster}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-ink/85 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/70" />
          <div className="absolute inset-0 grid-lines opacity-30" />
        </div>

        <div className="container-x grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div>
            <Reveal>
              <div className="flex flex-wrap items-center gap-3">
                <Pill tone="amber">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber" />
                  DVSA Grade A · Since {site.established}
                </Pill>
                <div className="flex items-center gap-2">
                  <Stars rating={5} />
                  <span className="text-xs text-mist">4.9 from 1,180 learners</span>
                </div>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="display mt-7 text-[clamp(2.6rem,7vw,5.4rem)]">
                Pass faster.
                <br />
                <span className="text-amber">Drive for life.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 max-w-xl text-lg leading-relaxed text-mist">
                Structured manual and automatic driving lessons across Berkshire, Surrey and West
                London. Every hour mapped to the DVSA syllabus, tracked online, and taught by a
                Grade A instructor — never a trainee.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <CtaLink href="/book">
                  Book your first lesson
                  <Icon name="arrow" className="h-4 w-4" />
                </CtaLink>
                <CtaLink href="/pricing" variant="outline">
                  See pricing &amp; blocks
                </CtaLink>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-7 sm:grid-cols-4">
                {site.stats.map((s) => (
                  <div key={s.label}>
                    <dd className="display text-3xl text-amber sm:text-4xl">
                      <Counter
                        value={s.value}
                        suffix={s.suffix}
                        decimals={"decimals" in s ? s.decimals : 0}
                      />
                    </dd>
                    <dt className="mt-2 text-[11px] leading-snug tracking-[0.16em] text-mist uppercase">
                      {s.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* hero side card */}
          <Reveal delay={200} className="lg:justify-self-end lg:w-full lg:max-w-sm">
            <div className="card glow-amber overflow-hidden">
              <div className="relative h-40">
                <Image
                  src="/images/in-car-lesson.jpg"
                  alt="Instructor coaching a learner driver"
                  fill
                  sizes="(max-width: 1024px) 100vw, 24rem"
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/30 to-transparent" />
                <div className="absolute bottom-4 left-5">
                  <p className="text-xs tracking-[0.2em] text-amber uppercase">Today</p>
                  <p className="display text-lg">Live availability</p>
                </div>
              </div>
              <div className="space-y-4 p-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-mist">Next free slot</span>
                  <span className="font-semibold text-amber">Tomorrow 09:00</span>
                </div>
                <div className="road-dash opacity-70" />
                <ul className="space-y-3 text-sm">
                  {[
                    "Free 15-minute phone consult",
                    "No trainee instructors, ever",
                    "48-hour free cancellation",
                    "Pass Protect on 10h blocks",
                  ].map((f) => (
                    <li key={f} className="flex items-start gap-3 text-mist">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/book"
                  className="btn btn-primary w-full hover:bg-amber-soft"
                >
                  Check my slot
                </Link>
                <p className="text-center text-xs text-mist">
                  Or call{" "}
                  <a href={site.phoneHref} className="text-amber">
                    {site.phone}
                  </a>
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= TRUST MARQUEE */}
      <div className="border-y border-line bg-ink-2">
        <div className="container-x">
          <Marquee items={trustLogos} />
        </div>
      </div>

      {/* ================================================= SERVICES */}
      <section id="lessons" className="py-24 sm:py-32">
        <div className="container-x">
          <Reveal>
            <div className="flex flex-wrap items-end justify-between gap-8">
              <SectionHeading
                eyebrow="What we offer"
                title={
                  <>
                    Eight ways to become a
                    <br />
                    better driver.
                  </>
                }
                intro="From your very first cockpit drill to motorway confidence and a full instructor qualification — all with the same standards, the same tracking, the same care."
              />
              <CtaLink href="/services" variant="outline" className="shrink-0">
                All lessons
                <Icon name="arrow" className="h-4 w-4" />
              </CtaLink>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={i * 60}>
                <Link
                  href={`/services/${s.slug}`}
                  className="card group flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-amber/50"
                >
                  <div className="flex items-start justify-between">
                    <span className="grid h-12 w-12 place-items-center rounded-xl border border-amber/30 bg-amber/10 text-amber">
                      <Icon name={s.icon} className="h-6 w-6" />
                    </span>
                    <span className="font-mono text-xs text-mist">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="display mt-6 text-xl">{s.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{s.short}</p>
                  <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                    <span className="text-sm">
                      <span className="font-bold text-amber">£{s.price}</span>{" "}
                      <span className="text-xs text-mist">{s.unit}</span>
                    </span>
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-line text-mist transition-colors group-hover:border-amber group-hover:bg-amber group-hover:text-ink">
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================= WHY US */}
      <section className="relative overflow-hidden border-y border-line bg-ink-2 py-24 sm:py-32">
        <div className="pointer-events-none absolute -right-40 top-0 h-96 w-96 rounded-full bg-amber/10 blur-[130px]" />
        <div className="container-x grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <Reveal>
            <div className="relative">
              <div className="relative aspect-4/5 overflow-hidden rounded-3xl border border-line">
                <Image
                  src="/images/instructor-team.jpg"
                  alt="The Apex Drive Academy instructor team"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 to-transparent" />
              </div>
              <div className="card absolute -bottom-8 -right-4 w-56 p-5 sm:-right-8">
                <p className="display text-4xl text-amber">
                  <Counter value={93} suffix="%" />
                </p>
                <p className="mt-2 text-xs leading-snug text-mist">
                  first-time pass rate — versus a national average of 47%.
                </p>
              </div>
            </div>
          </Reveal>

          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Why learners switch to us"
                title="Six things other schools don't do."
                intro="We built this school around the complaints people had about their last one."
              />
            </Reveal>
            <div className="mt-12 grid gap-6 sm:grid-cols-2">
              {differentiators.map((d, i) => (
                <Reveal key={d.title} delay={i * 60}>
                  <div className="flex gap-4">
                    <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-white/5 text-amber">
                      <Icon name={d.icon} className="h-5 w-5" />
                    </span>
                    <div>
                      <h3 className="text-sm font-bold">{d.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist">{d.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= VIDEO + PROCESS */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <VideoShowcase
              src={videos.reel.src}
              poster={videos.reel.poster}
              title="Watch a real lesson"
              caption="Roundabout coaching near Reading — 4 minutes"
            />
          </Reveal>
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="How it works"
                title="Four steps from nervous to natural."
              />
            </Reveal>
            <ol className="mt-12 space-y-2">
              {processSteps.map((p, i) => (
                <Reveal key={p.step} delay={i * 80} as="li">
                  <div className="group flex gap-5 rounded-2xl border border-transparent p-5 transition-colors hover:border-line hover:bg-surface/50">
                    <span className="display shrink-0 text-2xl text-amber/40 transition-colors group-hover:text-amber">
                      {p.step}
                    </span>
                    <div>
                      <h3 className="text-lg font-bold">{p.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-mist">{p.body}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ================================================= INSTRUCTORS */}
      <section className="border-y border-line bg-ink-2 py-24 sm:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Meet the team"
              title="Grade A instructors you can choose by name."
              intro="Every profile is real, every rating is real, and every one of them teaches full-time. Pick the one who fits you."
              align="center"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {instructors.slice(0, 3).map((i, idx) => (
              <Reveal key={i.name} delay={idx * 80}>
                <article className="card group h-full overflow-hidden">
                  <div className="relative aspect-4/3 overflow-hidden">
                    <Image
                      src={i.imageUrl}
                      alt={i.name}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="text-xs tracking-[0.2em] text-amber uppercase">{i.adiNumber}</p>
                      <h3 className="display mt-1 text-2xl">{i.name}</h3>
                    </div>
                  </div>
                  <div className="space-y-4 p-5">
                    <p className="text-sm text-mist">{i.role}</p>
                    <div className="flex items-center gap-2">
                      <Stars rating={i.rating} />
                      <span className="text-xs text-mist">
                        {i.rating.toFixed(1)} · {i.reviews} reviews
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Pill tone="amber">{i.transmission}</Pill>
                      {i.specialisms.slice(0, 2).map((s) => (
                        <Pill key={s}>{s}</Pill>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <CtaLink href="/instructors" variant="outline">
              See all {instructors.length} instructors
              <Icon name="arrow" className="h-4 w-4" />
            </CtaLink>
          </div>
        </div>
      </section>

      {/* ================================================= PRICING */}
      <section className="py-24 sm:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Pricing"
              title="Transparent prices, no hidden extras."
              intro="Block bookings save up to 15%. Every price includes fuel, insurance and your pick-up."
              align="center"
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {pricingPlans.map((p, i) => (
              <Reveal key={p.name} delay={i * 80}>
                <div
                  className={`card flex h-full flex-col p-7 ${
                    p.featured ? "glow-amber border-amber/40" : ""
                  }`}
                >
                  {p.featured ? <Pill tone="amber">Most popular</Pill> : null}
                  <h3 className="display mt-4 text-2xl">{p.name}</h3>
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

          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_0.9fr]">
            <Reveal>
              <div className="card h-full p-7">
                <h3 className="display text-xl">What&apos;s always included</h3>
                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  {[
                    "Fuel and full insurance",
                    "Dual controls on every car",
                    "Home, work or college pickup",
                    "Online progress tracker",
                    "Theory test pro access",
                    "No cancellation markup at 48h",
                  ].map((f) => (
                    <p key={f} className="flex items-start gap-3 text-sm text-mist">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                      {f}
                    </p>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal delay={80}>
              <PriceCalculator compact />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ================================================= TESTIMONIALS */}
      <section className="relative overflow-hidden border-y border-line bg-ink-2 py-24 sm:py-32">
        <div className="pointer-events-none absolute -left-40 bottom-0 h-96 w-96 rounded-full bg-amber/10 blur-[130px]" />
        <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-3xl border border-line">
              <Image
                src="/images/pass-celebration.jpg"
                alt="Learners celebrating passing their driving test"
                fill
                sizes="(max-width: 1024px) 100vw, 34vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
            </div>
          </Reveal>
          <Reveal delay={100}>
            <SectionHeading
              eyebrow="Real learners, real passes"
              title="1,180 reviews. 4.9 average."
            />
            <div className="mt-10">
              <TestimonialSlider slides={testimonials} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ================================================= FAQ */}
      <section className="py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Questions"
              title="The things everyone asks first."
              intro="Still unsure? Call us — the consult is free and takes fifteen minutes."
            />
            <div className="mt-8">
              <CtaLink href="/faqs" variant="outline">
                Read all FAQs
                <Icon name="arrow" className="h-4 w-4" />
              </CtaLink>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <Accordion items={faqs.slice(0, 6)} />
          </Reveal>
        </div>
      </section>

      {/* ================================================= AREAS + ADVICE */}
      <section className="border-t border-line py-24 sm:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Areas we cover"
                title="14 towns. 9 test centres."
                intro="If you're within 12 miles of any hub below, we'll come to you."
              />
            </Reveal>
            <Reveal delay={80}>
              <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
                {areas.map((a) => (
                  <li key={a.town}>
                    <Link
                      href="/areas"
                      className="group flex items-center justify-between border-b border-line/70 pb-3 text-sm"
                    >
                      <span className="font-semibold text-chalk group-hover:text-amber">
                        {a.town}
                      </span>
                      <span className="font-mono text-[10px] text-mist">{a.postcode}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={140}>
              <div className="mt-10">
                <CtaLink href="/areas" variant="outline">
                  Check your postcode
                  <Icon name="arrow" className="h-4 w-4" />
                </CtaLink>
              </div>
            </Reveal>
          </div>

          <div>
            <Reveal>
              <SectionHeading
                eyebrow="Driving advice"
                title="Free guides from our instructors."
              />
            </Reveal>
            <div className="mt-10 space-y-4">
              {posts.slice(0, 3).map((p, i) => (
                <Reveal key={p.slug} delay={i * 70}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="card group flex gap-5 p-4 transition-colors hover:border-amber/40"
                  >
                    <div className="relative h-24 w-28 shrink-0 overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={p.coverImage}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold tracking-[0.2em] text-amber uppercase">
                        {p.category}
                      </p>
                      <h3 className="mt-2 text-base leading-snug font-bold group-hover:text-amber">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs text-mist">{p.readMinutes} min read</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================= BOOKING */}
      <section id="book" className="relative overflow-hidden border-t border-line bg-ink-2 py-24 sm:py-32">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-30" />
        <div className="container-x relative grid gap-14 lg:grid-cols-[0.85fr_1.15fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Start your journey"
              title={
                <>
                  Book in 60 seconds.
                  <br />
                  <span className="text-amber">Confirm in one hour.</span>
                </>
              }
              intro="No payment now. Tell us what you need and we'll call you back to confirm your instructor, slot and start date."
            />
            <div className="mt-10 space-y-5">
              {[
                { icon: "phone", title: "Prefer to talk?", body: site.phone },
                { icon: "mail", title: "Email us", body: site.email },
                {
                  icon: "pin",
                  title: "Visit the office",
                  body: `${site.address.line1}, ${site.address.line2}`,
                },
              ].map((c) => (
                <div key={c.title} className="flex items-center gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/5 text-amber">
                    <Icon name={c.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs tracking-[0.16em] text-mist uppercase">{c.title}</p>
                    <p className="text-sm font-semibold">{c.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-10 rounded-2xl border border-line bg-surface/50 p-5">
              <p className="text-sm leading-relaxed text-mist">
                <span className="font-semibold text-chalk">
                  {coverageAreas.filter((a) => a.testCentre).length} local test centres.
                </span>{" "}
                We know every route on them, and we&apos;ll drive them with you before the day.
              </p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <BookingForm
              services={services.map((s) => ({
                slug: s.slug,
                title: s.title,
                price: s.price,
                unit: s.unit,
              }))}
              times={lessonTimes}
              instructorNames={instructors.map((i) => i.name)}
            />
          </Reveal>
        </div>
      </section>
    </>
  );
}
