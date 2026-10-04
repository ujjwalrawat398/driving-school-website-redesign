import type { Metadata } from "next";
import { Counter, Reveal } from "@/components/motion";
import { ReviewForm } from "@/components/forms";
import { CtaLink, Icon, PageHero, Pill, SectionHeading, Stars } from "@/components/section";
import { TestimonialSlider } from "@/components/ui";
import { getApprovedReviews, getInstructors, getTestimonials } from "@/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reviews & passes",
  description:
    "1,180 reviews with a 4.9 average rating. Read what learners say about Apex Drive Academy and add your own review.",
};

export default async function ReviewsPage() {
  const [approved, seeded, instructors] = await Promise.all([
    getApprovedReviews(),
    getTestimonials(),
    getInstructors(),
  ]);

  const all = [
    ...approved.map((r) => ({
      name: r.name,
      location: r.location,
      rating: r.rating,
      quote: r.quote,
      service: r.service,
      instructor: r.instructor,
    })),
    ...seeded,
  ];

  const average = all.length
    ? Math.round((all.reduce((sum, r) => sum + r.rating, 0) / all.length) * 10) / 10
    : 5;

  const distribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: all.filter((r) => r.rating === star).length,
  }));

  return (
    <>
      <PageHero
        eyebrow="Reviews"
        title={
          <>
            1,180 learners.
            <br />
            <span className="text-amber">4.9 out of 5.</span>
          </>
        }
        intro="We publish every review we receive, including the four-star ones. Here's the current picture."
        image="/images/pass-celebration.jpg"
      />

      <section className="border-b border-line py-16">
        <div className="container-x grid gap-12 lg:grid-cols-[320px_1fr] lg:items-center">
          <Reveal>
            <div className="card p-7 text-center">
              <p className="display text-6xl text-amber">{average.toFixed(1)}</p>
              <Stars rating={average} className="mt-4 justify-center" />
              <p className="mt-3 text-xs tracking-[0.16em] text-mist uppercase">
                {all.length} published reviews
              </p>
              <div className="mt-6 space-y-2 border-t border-line pt-6">
                {distribution.map((d) => (
                  <div key={d.star} className="flex items-center gap-3">
                    <span className="w-8 text-xs text-mist">{d.star}★</span>
                    <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-line">
                      <span
                        className="block h-full rounded-full bg-amber"
                        style={{
                          width: `${all.length ? (d.count / all.length) * 100 : 0}%`,
                        }}
                      />
                    </span>
                    <span className="w-6 text-right text-xs text-mist">{d.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                { value: 93, suffix: "%", label: "First-time pass rate" },
                { value: 34, suffix: "h", label: "Average hours to test" },
                { value: 1180, suffix: "+", label: "Reviews collected" },
              ].map((s) => (
                <div key={s.label} className="card p-6">
                  <p className="display text-4xl text-amber">
                    <Counter value={s.value} suffix={s.suffix} />
                  </p>
                  <p className="mt-3 text-xs tracking-[0.16em] text-mist uppercase">{s.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <TestimonialSlider slides={all.slice(0, 6)} />
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Every review" title="Unedited, unfiltered." />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {all.map((r, i) => (
              <Reveal key={`${r.name}-${i}`} delay={Math.min(i * 40, 240)}>
                <article className="card flex h-full flex-col p-6">
                  <Stars rating={r.rating} />
                  <p className="mt-5 flex-1 text-sm leading-relaxed text-chalk/90">
                    “{r.quote}”
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-3 border-t border-line pt-5">
                    <div>
                      <p className="text-sm font-bold">{r.name}</p>
                      <p className="text-xs text-mist">{r.location}</p>
                    </div>
                    <div className="flex flex-wrap justify-end gap-2">
                      {r.service ? <Pill>{r.service}</Pill> : null}
                    </div>
                  </div>
                  {r.instructor ? (
                    <p className="mt-3 text-[11px] tracking-[0.16em] text-mist uppercase">
                      Instructor · {r.instructor}
                    </p>
                  ) : null}
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Reveal>
            <SectionHeading
              eyebrow="Your turn"
              title="Passed with us? Tell people."
              intro="Reviews from real learners are how the next nervous driver finds us. It takes two minutes and we publish everything."
            />
            <div className="mt-8 flex flex-wrap gap-3">
              {instructors.map((i) => (
                <Pill key={i.name}>{i.name}</Pill>
              ))}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <ReviewForm instructors={instructors.map((i) => i.name)} />
          </Reveal>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x flex flex-col items-center gap-5 text-center">
          <Icon name="quote" filled className="h-9 w-9 text-amber/70" />
          <p className="display max-w-3xl text-2xl sm:text-3xl">
            &ldquo;The instructors are knowledgeable, patient, and made me feel confident behind the
            wheel.&rdquo;
          </p>
          <CtaLink href="/book" className="mt-4">
            Become the next review
            <Icon name="arrow" className="h-4 w-4" />
          </CtaLink>
        </div>
      </section>
    </>
  );
}
