import type { Metadata } from "next";
import { ContactForm } from "@/components/forms";
import { Reveal } from "@/components/motion";
import { CtaLink, Icon, PageHero, SectionHeading } from "@/components/section";
import { site } from "@/content/site";
import { getAreas } from "@/db/queries";

export const metadata: Metadata = {
  title: "Contact us",
  description:
    "Call 0118 214 9930, email bookings@apexdrive.academy or send a message. We reply to every enquiry within one working day.",
};

export default async function ContactPage() {
  const areas = await getAreas();

  return (
    <>
      <PageHero
        eyebrow="Get in touch"
        title={
          <>
            Talk to a human,
            <br />
            not a call centre.
          </>
        }
        intro="Every message lands with an instructor, not an agency. We reply to everything within one working day — usually within the hour."
        image="/images/hero-car.jpg"
      />

      <section className="py-16 sm:py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1fr]">
          <Reveal>
            <ContactForm />
          </Reveal>

          <div className="space-y-6">
            <Reveal delay={80}>
              <div className="card p-7">
                <h3 className="display text-xl">Direct lines</h3>
                <ul className="mt-6 space-y-5">
                  {[
                    {
                      icon: "phone",
                      label: "Call the office",
                      value: site.phone,
                      href: site.phoneHref,
                    },
                    {
                      icon: "mail",
                      label: "Email us",
                      value: site.email,
                      href: `mailto:${site.email}`,
                    },
                    {
                      icon: "clock",
                      label: "Text / WhatsApp",
                      value: site.whatsapp,
                      href: `sms:${site.whatsapp.replace(/\s/g, "")}`,
                    },
                  ].map((c) => (
                    <li key={c.label} className="flex items-start gap-4">
                      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white/5 text-amber">
                        <Icon name={c.icon} className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-xs tracking-[0.16em] text-mist uppercase">{c.label}</p>
                        <a href={c.href} className="text-sm font-bold hover:text-amber">
                          {c.value}
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>

            <Reveal delay={140}>
              <div className="card p-7">
                <h3 className="display text-xl">Office &amp; hours</h3>
                <div className="mt-6 space-y-4">
                  <p className="flex items-start gap-3 text-sm text-mist">
                    <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
                    <span>
                      {site.address.line1}
                      <br />
                      {site.address.line2}
                    </span>
                  </p>
                  <dl className="space-y-2 border-t border-line pt-4 text-sm">
                    {site.hours.map((h) => (
                      <div key={h.label} className="flex justify-between">
                        <dt className="text-mist">{h.label}</dt>
                        <dd className="font-semibold">{h.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </Reveal>

            <Reveal delay={200}>
              <div className="relative overflow-hidden rounded-3xl border border-line">
                <iframe
                  title="Apex Drive Academy location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=-0.995%2C51.440%2C-0.945%2C51.465&layer=mapnik"
                  className="h-72 w-full grayscale-[0.4]"
                  loading="lazy"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Coverage"
              title="We teach across three counties."
              intro="If your town is listed, we'll come to you. If it isn't, ask — the answer is usually yes."
              align="center"
            />
          </Reveal>
          <Reveal delay={80}>
            <div className="mt-12 flex flex-wrap justify-center gap-3">
              {areas.map((a) => (
                <CtaLink key={a.town} href="/areas" variant="outline" className="!px-4 !py-2 !text-xs">
                  {a.town}
                </CtaLink>
              ))}
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
