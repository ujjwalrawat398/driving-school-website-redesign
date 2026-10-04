import Link from "next/link";
import { NewsletterForm } from "@/components/forms";
import { Icon } from "@/components/section";
import { accreditations, nav, services, site } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line bg-ink-2">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-amber/10 blur-[120px]" />

      {/* CTA band */}
      <div className="relative border-b border-line">
        <div className="container-x grid gap-8 py-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
          <div>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              Let&apos;s do this together
            </span>
            <h2 className="display mt-4 text-3xl sm:text-4xl lg:text-5xl">
              Ready to become a confident driver?
            </h2>
            <p className="mt-4 max-w-xl text-mist">
              Book your first lesson, or grab our free study pack — 40 theory questions, the full
              show-me/tell-me list and a printable progress card.
            </p>
          </div>
          <div className="lg:justify-self-end lg:w-full lg:max-w-md">
            <NewsletterForm />
            <p className="mt-3 text-xs text-mist">
              No spam. One email a month, unsubscribe in a click.
            </p>
          </div>
        </div>
      </div>

      <div className="container-x grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-amber text-ink">
              <span className="display text-lg">A</span>
            </span>
            <span className="display text-lg">{site.name}</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-mist">{site.description}</p>
          <div className="mt-6 flex flex-wrap gap-2">
            {site.socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer noopener"
                className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-mist transition-colors hover:border-amber/50 hover:text-amber"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-chalk uppercase">Explore</h3>
          <ul className="mt-5 space-y-3">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="text-sm text-mist transition-colors hover:text-amber">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/faqs" className="text-sm text-mist transition-colors hover:text-amber">
                FAQs
              </Link>
            </li>
            <li>
              <Link href="/dashboard" className="text-sm text-mist transition-colors hover:text-amber">
                Staff dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-chalk uppercase">Lessons</h3>
          <ul className="mt-5 space-y-3">
            {services.slice(0, 7).map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-mist transition-colors hover:text-amber"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold tracking-[0.2em] text-chalk uppercase">Get in touch</h3>
          <ul className="mt-5 space-y-4 text-sm text-mist">
            <li className="flex gap-3">
              <Icon name="pin" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              <span>
                {site.address.line1}
                <br />
                {site.address.line2}
              </span>
            </li>
            <li className="flex gap-3">
              <Icon name="phone" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              <a href={site.phoneHref} className="hover:text-amber">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="mail" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              <a href={`mailto:${site.email}`} className="hover:text-amber">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Icon name="clock" className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
              <span>
                {site.hours.map((h) => (
                  <span key={h.label} className="block">
                    {h.label}: {h.value}
                  </span>
                ))}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-4 py-7 text-xs text-mist md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legal}. Company no. 08122334. All rights reserved.
          </p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            {accreditations.map((a) => (
              <li key={a} className="flex items-center gap-1.5">
                <Icon name="check" className="h-3.5 w-3.5 text-amber" />
                {a}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
