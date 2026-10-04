import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion";
import { BookingForm } from "@/components/forms";
import { CtaLink, Icon, Pill, SectionHeading } from "@/components/section";
import { lessonTimes } from "@/content/site";
import { getInstructors, getServiceBySlug, getServices } from "@/db/queries";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const services = await getServices();
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Lesson not found" };
  return {
    title: service.title,
    description: service.short,
  };
}

export default async function ServiceDetailPage({ params }: Params) {
  const { slug } = await params;
  const [service, all, instructors] = await Promise.all([
    getServiceBySlug(slug),
    getServices(),
    getInstructors(),
  ]);

  if (!service) notFound();

  const others = all.filter((s) => s.slug !== service.slug).slice(0, 3);
  const relevant = instructors
    .filter((i) =>
      service.transmission === "Automatic only"
        ? i.transmission.includes("Automatic")
        : true,
    )
    .slice(0, 3);

  return (
    <>
      <header className="relative isolate overflow-hidden pt-36 pb-16 sm:pt-44 sm:pb-24">
        <div className="absolute inset-0 -z-10">
          <Image
            src="/images/hero-car.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/92 to-ink" />
          <div className="absolute inset-0 grid-lines opacity-30" />
        </div>
        <div className="container-x">
          <nav className="flex items-center gap-2 text-xs text-mist">
            <Link href="/" className="hover:text-amber">
              Home
            </Link>
            <span>/</span>
            <Link href="/services" className="hover:text-amber">
              Lessons
            </Link>
            <span>/</span>
            <span className="text-amber">{service.title}</span>
          </nav>

          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="grid h-12 w-12 place-items-center rounded-xl bg-amber text-ink">
                  <Icon name={service.icon} className="h-6 w-6" />
                </span>
                <Pill>{service.level}</Pill>
                <Pill tone="amber">{service.transmission}</Pill>
              </div>
              <h1 className="display mt-6 text-[clamp(2.2rem,5.5vw,4rem)]">{service.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist">{service.short}</p>
            </div>

            <div className="card glow-amber p-7">
              <p className="text-xs tracking-[0.18em] text-mist uppercase">Starting from</p>
              <p className="display mt-2 text-5xl text-amber">£{service.price}</p>
              <p className="mt-1 text-xs text-mist">{service.unit}</p>
              <dl className="mt-6 space-y-3 border-t border-line pt-5 text-sm">
                <div className="flex justify-between">
                  <dt className="text-mist">Session length</dt>
                  <dd className="font-semibold">
                    {service.durationMinutes >= 60
                      ? `${Math.round(service.durationMinutes / 60)} hour${service.durationMinutes >= 120 ? "s" : ""}`
                      : `${service.durationMinutes} min`}
                  </dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-mist">Gearbox</dt>
                  <dd className="font-semibold">{service.transmission}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="text-mist">Best for</dt>
                  <dd className="font-semibold">{service.level}</dd>
                </div>
              </dl>
              <CtaLink href="#book-this" className="mt-7 w-full">
                Book this course
              </CtaLink>
            </div>
          </div>
        </div>
      </header>

      <section className="border-y border-line py-20 sm:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <Reveal>
              <SectionHeading eyebrow="Overview" title="How this works in practice." />
              <p className="mt-8 text-base leading-relaxed text-mist">{service.description}</p>
            </Reveal>

            <Reveal delay={80}>
              <h3 className="mt-12 text-xs font-bold tracking-[0.2em] text-chalk uppercase">
                What&apos;s included
              </h3>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-start gap-3 rounded-xl border border-line bg-surface/40 p-4 text-sm text-mist"
                  >
                    <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                    {f}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={140}>
              <h3 className="mt-12 text-xs font-bold tracking-[0.2em] text-chalk uppercase">
                What you&apos;ll be able to do
              </h3>
              <ol className="mt-6 space-y-4">
                {service.outcomes.map((o, i) => (
                  <li key={o} className="flex gap-5 border-b border-line pb-4">
                    <span className="display shrink-0 text-xl text-amber/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="pt-1 text-sm leading-relaxed text-chalk">{o}</p>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>

          <div className="space-y-8">
            <Reveal>
              <div className="relative aspect-4/3 overflow-hidden rounded-3xl border border-line">
                <Image
                  src="/images/in-car-lesson.jpg"
                  alt={`${service.title} with Apex Drive Academy`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
              </div>
            </Reveal>

            <Reveal delay={80}>
              <div className="card p-6">
                <h3 className="display text-xl">Instructors who teach this</h3>
                <ul className="mt-5 space-y-4">
                  {relevant.map((i) => (
                    <li key={i.name} className="flex items-center gap-4">
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-line">
                        <Image
                          src={i.imageUrl}
                          alt={i.name}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </span>
                      <span>
                        <span className="block text-sm font-bold">{i.name}</span>
                        <span className="block text-xs text-mist">
                          {i.transmission} · {i.years} yrs · {i.rating.toFixed(1)}★
                        </span>
                      </span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/instructors"
                  className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-amber"
                >
                  All instructors
                  <Icon name="arrow" className="h-4 w-4" />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="card border-amber/30 bg-amber/5 p-6">
                <h3 className="display text-lg">Our promise</h3>
                <p className="mt-3 text-sm leading-relaxed text-chalk/80">
                  If you don&apos;t feel more confident after your first hour, we&apos;ll refund it
                  in full and part as friends. In sixteen years it&apos;s happened eleven times.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section id="book-this" className="border-t border-line bg-ink-2 py-20 sm:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading
              eyebrow="Book now"
              title={
                <>
                  Start {service.title.toLowerCase()}
                  <br />
                  <span className="text-amber">this week.</span>
                </>
              }
              intro="No payment today. We confirm your instructor and slot within one working hour."
            />
          </Reveal>
          <Reveal delay={100}>
            <BookingForm
              services={all.map((s) => ({
                slug: s.slug,
                title: s.title,
                price: s.price,
                unit: s.unit,
              }))}
              times={lessonTimes}
              instructorNames={instructors.map((i) => i.name)}
              defaultSlug={service.slug}
            />
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <h2 className="display text-2xl sm:text-3xl">Other lessons you might want</h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 70}>
                <Link
                  href={`/services/${o.slug}`}
                  className="card group flex h-full flex-col p-6 transition-colors hover:border-amber/40"
                >
                  <Icon name={o.icon} className="h-7 w-7 text-amber" />
                  <h3 className="display mt-5 text-xl">{o.title}</h3>
                  <p className="mt-3 flex-1 text-sm text-mist">{o.short}</p>
                  <p className="mt-5 text-sm font-bold text-amber">From £{o.price}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
