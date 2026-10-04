import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { CtaLink, Icon, PageHero, SectionHeading } from "@/components/section";
import { InstructorGrid } from "@/components/ui";
import { accreditations } from "@/content/site";
import { getInstructors } from "@/db/queries";

export const metadata: Metadata = {
  title: "Our instructors",
  description:
    "Meet the six DVSA Grade A instructors at Apex Drive Academy — real ratings, real specialisms, real availability across Berkshire, Surrey and West London.",
};

export default async function InstructorsPage() {
  const instructors = await getInstructors();

  return (
    <>
      <PageHero
        eyebrow="The team"
        title={
          <>
            Choose the instructor
            <br />
            who fits you.
          </>
        }
        intro="No anonymous allocation, no roulette. Every profile below is a real full-time instructor with a Grade A standards check and a public rating."
        image="/images/instructor-team.jpg"
      />

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <InstructorGrid instructors={instructors} />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2 lg:items-center">
          <Reveal>
            <SectionHeading
              eyebrow="Our standard"
              title="What 'Grade A' actually means."
              intro="The DVSA grades every instructor at their standards check. Grade B means they meet the minimum. Grade A means they demonstrated consistently high-quality instruction."
            />
            <ul className="mt-8 space-y-4">
              {[
                "Every Apex instructor holds a current Grade A standards check",
                "Enhanced DBS checked and re-checked every three years",
                "ORDIT registered — we train other instructors too",
                "£5m public liability and dual-control insurance on every car",
              ].map((line) => (
                <li key={line} className="flex items-start gap-3 text-sm text-mist">
                  <Icon name="check" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                  {line}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <div className="card p-7">
              <h3 className="display text-xl">Accreditations</h3>
              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                {accreditations.map((a) => (
                  <p
                    key={a}
                    className="flex items-center gap-3 rounded-xl border border-line bg-ink/40 px-4 py-3 text-sm text-chalk"
                  >
                    <Icon name="badge" className="h-4 w-4 shrink-0 text-amber" />
                    {a}
                  </p>
                ))}
              </div>
              <div className="mt-8 rounded-xl border border-amber/30 bg-amber/5 p-5">
                <p className="text-sm leading-relaxed text-chalk/85">
                  Want to join the roster? Our ORDIT programme takes you through all three DVSA
                  parts with in-car role-play, then a guaranteed franchise interview.
                </p>
                <CtaLink href="/services/instructor-training" variant="outline" className="mt-5">
                  Instructor training
                  <Icon name="arrow" className="h-4 w-4" />
                </CtaLink>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <h2 className="display max-w-2xl text-3xl sm:text-4xl">
            Request a specific instructor by name.
          </h2>
          <p className="max-w-xl text-mist">
            Put your preferred instructor in the booking form and we&apos;ll check their diary
            before anything else.
          </p>
          <CtaLink href="/book">
            Book with my instructor
            <Icon name="arrow" className="h-4 w-4" />
          </CtaLink>
        </div>
      </section>
    </>
  );
}
