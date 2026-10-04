import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { CtaLink, Icon, PageHero, SectionHeading } from "@/components/section";
import { Accordion } from "@/components/ui";
import { getFaqs } from "@/db/queries";

export const metadata: Metadata = {
  title: "FAQs",
  description:
    "How many lessons you need, manual or automatic, cancellation policy, refunds, test booking and everything else learners ask before they start.",
};

export default async function FaqsPage() {
  const faqs = await getFaqs();
  const categories = Array.from(new Set(faqs.map((f) => f.category)));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageHero
        eyebrow="Questions"
        title={
          <>
            Everything you&apos;re
            <br />
            wondering, answered.
          </>
        }
        intro="Ten years of phone calls distilled into one page. If your question isn't here, call us — the consult is free."
        image="/images/in-car-lesson.jpg"
      />

      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[260px_1fr]">
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-bold tracking-[0.2em] text-mist uppercase">Jump to</p>
            <nav className="mt-5 space-y-3">
              {categories.map((c) => (
                <a
                  key={c}
                  href={`#${c.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="flex items-center justify-between border-b border-line pb-3 text-sm font-semibold text-chalk transition-colors hover:text-amber"
                >
                  {c}
                  <Icon name="arrow" className="h-4 w-4 text-amber" />
                </a>
              ))}
            </nav>
            <div className="card mt-8 p-5">
              <p className="text-sm font-bold">Still stuck?</p>
              <p className="mt-2 text-xs leading-relaxed text-mist">
                Call {""}
                <a href="tel:+441182149930" className="text-amber">
                  0118 214 9930
                </a>{" "}
                between 07:00 and 20:00, or send a message and we&apos;ll reply the same day.
              </p>
              <CtaLink href="/contact" variant="outline" className="mt-4 w-full !text-xs">
                Send a message
              </CtaLink>
            </div>
          </aside>

          <div className="space-y-14">
            {categories.map((cat) => (
              <div key={cat} id={cat.toLowerCase().replace(/[^a-z]+/g, "-")} className="scroll-mt-32">
                <Reveal>
                  <SectionHeading eyebrow={cat} title={`${cat}.`} />
                </Reveal>
                <Reveal delay={60}>
                  <div className="mt-8">
                    <Accordion items={faqs.filter((f) => f.category === cat)} />
                  </div>
                </Reveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-20">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <h2 className="display max-w-2xl text-3xl sm:text-4xl">
            One question we can&apos;t answer on a page.
          </h2>
          <p className="max-w-xl text-mist">
            How many hours will <em>you</em> need? That one takes a fifteen-minute conversation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <CtaLink href="/book">
              Book a free consult
              <Icon name="arrow" className="h-4 w-4" />
            </CtaLink>
            <CtaLink href="/pricing" variant="outline">
              See pricing
            </CtaLink>
          </div>
        </div>
      </section>
    </>
  );
}
