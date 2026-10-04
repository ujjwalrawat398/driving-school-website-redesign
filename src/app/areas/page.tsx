import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { CtaLink, Icon, PageHero, SectionHeading } from "@/components/section";
import { AreaSearch } from "@/components/ui";
import { getAreas, getInstructors } from "@/db/queries";

export const metadata: Metadata = {
  title: "Areas we cover",
  description:
    "Driving lessons across Reading, Wokingham, Bracknell, Maidenhead, Slough, Windsor, Basingstoke, Newbury, Woking, Guildford, Camberley, Hounslow, Richmond and Uxbridge.",
};

export default async function AreasPage() {
  const [areas, instructors] = await Promise.all([getAreas(), getInstructors()]);

  const testCentres = areas.filter((a) => a.testCentre);

  return (
    <>
      <PageHero
        eyebrow="Coverage"
        title={
          <>
            14 towns. 9 test centres.
            <br />
            One standard.
          </>
        }
        intro="If you're within roughly 12 miles of any hub listed below, we'll pick you up. Search your town or postcode to check."
        image="/images/hero-car.jpg"
      />

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <AreaSearch areas={areas} />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-24">
        <div className="container-x grid gap-14 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="Test centres"
              title="We know every route on your test."
              intro="Your practical test starts at one of these centres. We drive the actual routes with you — the awkward roundabout, the narrow residential street, the hill start outside the school."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {testCentres.map((t) => (
                <p
                  key={t.town}
                  className="flex items-center justify-between rounded-xl border border-line bg-surface/50 px-4 py-3 text-sm"
                >
                  <span className="font-semibold">{t.town}</span>
                  <span className="font-mono text-xs text-amber">{t.postcode}</span>
                </p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="card p-7">
              <h3 className="display text-xl">Who covers where</h3>
              <ul className="mt-6 space-y-5">
                {instructors.map((i) => (
                  <li key={i.name} className="border-b border-line pb-5 last:border-0">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-bold">{i.name}</p>
                      <span className="text-xs text-mist">{i.transmission}</span>
                    </div>
                    <p className="mt-2 text-xs tracking-wide text-mist uppercase">
                      {i.areas.join(" · ")}
                    </p>
                  </li>
                ))}
              </ul>
              <CtaLink href="/instructors" variant="outline" className="mt-6 w-full">
                Full instructor profiles
                <Icon name="arrow" className="h-4 w-4" />
              </CtaLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <h2 className="display max-w-2xl text-3xl sm:text-4xl">
            Not on the list? Ask anyway.
          </h2>
          <p className="max-w-xl text-mist">
            We travel beyond these hubs when the diary allows — especially for intensive courses
            and Pass Plus motorway days.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CtaLink href="/book">
              Book a lesson
              <Icon name="arrow" className="h-4 w-4" />
            </CtaLink>
            <CtaLink href="/contact" variant="outline">
              Ask about my area
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
