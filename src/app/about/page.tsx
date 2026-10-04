import type { Metadata } from "next";
import Image from "next/image";
import { Counter, Reveal } from "@/components/motion";
import { CtaLink, Icon, PageHero, Pill, SectionHeading } from "@/components/section";
import { VideoShowcase } from "@/components/ui";
import { accreditations, site, videos } from "@/content/site";
import { getInstructors } from "@/db/queries";

export const metadata: Metadata = {
  title: "About us",
  description:
    "Sixteen years, 1,180 passes and a team of DVSA Grade A instructors. Meet the people behind Apex Drive Academy.",
};

const timeline = [
  {
    year: "2009",
    title: "One car, one instructor",
    body: "Daniel qualified as an ADI and started teaching in Reading with a single Ford Ka and a paper diary.",
  },
  {
    year: "2013",
    title: "The progress card",
    body: "We replaced vague verbal feedback with a written competency card — and our average hours-to-test dropped by nine.",
  },
  {
    year: "2017",
    title: "Nervous driver programme",
    body: "After a learner told us she'd been told to 'just get on with it', we built a graded-exposure syllabus for anxious drivers.",
  },
  {
    year: "2020",
    title: "Online theory & remote lessons",
    body: "Lockouts stopped lessons, not learning. We shipped remote theory coaching and never took it back down.",
  },
  {
    year: "2023",
    title: "ORDIT registration",
    body: "We began training the next generation of instructors to our own standard, not the minimum one.",
  },
  {
    year: "2026",
    title: "Six instructors, three counties",
    body: "Manual, automatic and electric tuition across Berkshire, Surrey and West London — with a 93% first-time pass rate.",
  },
];

const values = [
  {
    icon: "heart",
    title: "Patience is a method, not a mood",
    body: "Nobody learns while they're frightened. We go at your pace, then stretch you one notch past comfortable.",
  },
  {
    icon: "chart",
    title: "Evidence over vibes",
    body: "Every hour is scored against the DVSA syllabus. If you can see your own data, you don't need to trust our opinion.",
  },
  {
    icon: "badge",
    title: "Never a trainee",
    body: "No pink-badge licence holders teaching unsupervised in our cars. Grade A or nothing.",
  },
  {
    icon: "shield",
    title: "Say the hard thing early",
    body: "If you're not ready for test, we'll tell you at hour 20 rather than hour 40. It's cheaper for you.",
  },
];

export default async function AboutPage() {
  const instructors = await getInstructors();

  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Built by instructors,
            <br />
            not by a franchise.
          </>
        }
        intro="Apex Drive Academy started in 2009 with one car in Reading. Sixteen years later we're six DVSA Grade A instructors with one rule: no lesson is ever wasted."
        image="/images/instructor-team.jpg"
      >
        <div className="flex flex-wrap gap-3">
          {accreditations.map((a) => (
            <Pill key={a} tone="amber">
              {a}
            </Pill>
          ))}
        </div>
      </PageHero>

      {/* stats */}
      <section className="border-b border-line py-16">
        <div className="container-x grid grid-cols-2 gap-8 lg:grid-cols-4">
          {site.stats.map((s) => (
            <Reveal key={s.label}>
              <p className="display text-4xl text-amber sm:text-5xl">
                <Counter value={s.value} suffix={s.suffix} decimals={"decimals" in s ? s.decimals : 0} />
              </p>
              <p className="mt-3 text-xs tracking-[0.16em] text-mist uppercase">{s.label}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* story */}
      <section className="py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="What we actually do"
              title="A faster way to learn — because nothing is padded."
            />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-mist">
              <p>
                Most driving lessons are unstructured. You drive around, something comes up, you
                deal with it, an hour disappears. It feels productive and it isn&apos;t.
              </p>
              <p>
                Every Apex lesson opens with a two-minute recap of the last competency, works a
                single new skill on roads chosen for it, and closes with a score on your progress
                card. That&apos;s it. It&apos;s why our learners average 34 hours to test against a
                DVSA national average of 45.
              </p>
              <p>
                We&apos;re not the cheapest school in Berkshire. We are the one that will tell you
                the truth about how many hours you need, and then get you there faster.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-3">
              <CtaLink href="/book">
                Book a lesson
                <Icon name="arrow" className="h-4 w-4" />
              </CtaLink>
              <CtaLink href="/instructors" variant="outline">
                Meet the team
              </CtaLink>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <VideoShowcase
              src={videos.reel.src}
              poster={videos.reel.poster}
              title="A lesson, unedited"
              caption="Golden-hour coaching on a rural route near Newbury"
            />
          </Reveal>
        </div>
      </section>

      {/* values */}
      <section className="border-y border-line bg-ink-2 py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="What we believe"
              title="Four rules we don't bend."
              align="center"
            />
          </Reveal>
          <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 70}>
                <div className="card h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl border border-amber/30 bg-amber/10 text-amber">
                    <Icon name={v.icon} className="h-5 w-5" />
                  </span>
                  <h3 className="mt-6 text-base font-bold">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-mist">{v.body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* timeline */}
      <section className="py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Timeline" title="Sixteen years on the road." />
          </Reveal>
          <ol className="mt-14 space-y-1">
            {timeline.map((t, i) => (
              <Reveal key={t.year} as="li" delay={i * 60}>
                <div className="grid gap-4 border-t border-line py-7 sm:grid-cols-[120px_1fr] sm:gap-10">
                  <span className="display text-2xl text-amber">{t.year}</span>
                  <div>
                    <h3 className="text-lg font-bold">{t.title}</h3>
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-mist">{t.body}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* team strip */}
      <section className="border-t border-line py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="The roster"
              title="Six instructors, three counties."
              intro="Full profiles, real ratings and the areas each of them covers."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-3 lg:grid-cols-6">
            {instructors.map((i, idx) => (
              <Reveal key={i.name} delay={idx * 60}>
                <div className="group">
                  <div className="relative aspect-3/4 overflow-hidden rounded-2xl border border-line">
                    <Image
                      src={i.imageUrl}
                      alt={i.name}
                      fill
                      sizes="(max-width: 768px) 45vw, 16vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-sm font-bold">{i.name}</p>
                  <p className="text-xs text-mist">{i.role}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-line bg-ink-2 py-20">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <h2 className="display max-w-3xl text-3xl sm:text-4xl lg:text-5xl">
            Ready to start with an instructor you chose?
          </h2>
          <p className="max-w-xl text-mist">
            Free 15-minute consult, no payment up front, and a real human confirming your slot
            within the hour.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CtaLink href="/book">
              Book your first lesson
              <Icon name="arrow" className="h-4 w-4" />
            </CtaLink>
            <CtaLink href="/services" variant="outline">
              Browse lessons
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
