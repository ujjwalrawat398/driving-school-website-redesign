import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { BookingForm } from "@/components/forms";
import { Icon, PageHero, SectionHeading } from "@/components/section";
import { Accordion } from "@/components/ui";
import { lessonTimes, site } from "@/content/site";
import { getFaqs, getInstructors, getServices } from "@/db/queries";

export const metadata: Metadata = {
  title: "Book a lesson",
  description:
    "Book your driving lesson with Apex Drive Academy. No payment up front, free 15-minute consult, and confirmation within one working hour.",
};

export default async function BookPage({
  searchParams,
}: {
  searchParams: Promise<{ lesson?: string }>;
}) {
  const [{ lesson }, services, instructors, faqs] = await Promise.all([
    searchParams,
    getServices(),
    getInstructors(),
    getFaqs(),
  ]);

  const defaultSlug = services.some((s) => s.slug === lesson) ? lesson : undefined;

  return (
    <>
      <PageHero
        eyebrow="Book now"
        title={
          <>
            Reserve your slot
            <br />
            <span className="text-amber">in 60 seconds.</span>
          </>
        }
        intro="No card details, no deposit. Tell us what you need and a real instructor will confirm your slot within one working hour."
        image="/images/hero-car.jpg"
      />

      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
          <Reveal>
            <BookingForm
              services={services.map((s) => ({
                slug: s.slug,
                title: s.title,
                price: s.price,
                unit: s.unit,
              }))}
              times={lessonTimes}
              instructorNames={instructors.map((i) => i.name)}
              defaultSlug={defaultSlug}
            />
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={80}>
              <div className="card p-7">
                <h3 className="display text-xl">What happens next</h3>
                <ol className="mt-6 space-y-5">
                  {[
                    "We check your postcode is inside a covered hub.",
                    "We match you with an instructor by availability and personality.",
                    "You get a text confirming date, time and pickup point.",
                    "Your progress card is created before your first hour.",
                  ].map((s, i) => (
                    <li key={s} className="flex gap-4">
                      <span className="display shrink-0 text-lg text-amber/50">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="pt-1 text-sm leading-relaxed text-mist">{s}</p>
                    </li>
                  ))}
                </ol>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="card border-amber/30 bg-amber/5 p-7">
                <div className="flex items-center gap-3">
                  <Icon name="phone" className="h-5 w-5 text-amber" />
                  <h3 className="display text-lg">Rather just call?</h3>
                </div>
                <a
                  href={site.phoneHref}
                  className="display mt-4 block text-3xl text-amber hover:underline"
                >
                  {site.phone}
                </a>
                <p className="mt-3 text-sm leading-relaxed text-chalk/80">
                  Mon–Fri 07:00–20:00, Sat 07:00–18:00, Sun 08:00–16:00. If we&apos;re on a lesson,
                  leave a message and we&apos;ll call back within the hour.
                </p>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="card p-7">
                <h3 className="display text-lg">Before you book</h3>
                <ul className="mt-5 space-y-3">
                  {[
                    "You must hold a UK provisional licence to drive on the road.",
                    "Lessons can be moved free of charge with 48 hours' notice.",
                    "Under-17s can start off-road sessions at 15 in Wokingham.",
                    "Gift vouchers can be used against any lesson type.",
                  ].map((t) => (
                    <li key={t} className="flex items-start gap-3 text-sm text-mist">
                      <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-20">
        <div className="container-x grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeading eyebrow="Before you go" title="Booking questions." />
          </Reveal>
          <Reveal delay={80}>
            <Accordion items={faqs.slice(6)} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
