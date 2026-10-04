"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, site } from "@/content/site";
import { Icon } from "@/components/section";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* utility strip */}
      <div className="fixed inset-x-0 top-0 z-[60] hidden border-b border-line bg-ink/80 backdrop-blur lg:block">
        <div className="container-x flex h-9 items-center justify-between text-xs text-mist">
          <p className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber" />
            4 instructor slots open this week · Reading, Surrey &amp; West London
          </p>
          <div className="flex items-center gap-6">
            <a href={site.phoneHref} className="flex items-center gap-2 hover:text-amber">
              <Icon name="phone" className="h-3.5 w-3.5" />
              {site.phone}
            </a>
            <a href={`mailto:${site.email}`} className="flex items-center gap-2 hover:text-amber">
              <Icon name="mail" className="h-3.5 w-3.5" />
              {site.email}
            </a>
          </div>
        </div>
      </div>

      <header
        className={`fixed inset-x-0 z-[65] transition-all duration-300 lg:top-9 ${
          scrolled ? "bg-ink/90 py-2 shadow-[0_10px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl" : "py-4"
        }`}
      >
        <div className="container-x flex items-center justify-between gap-4">
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-amber text-ink">
              <span className="display text-lg">A</span>
              <span className="absolute -right-1 -bottom-1 grid h-4 w-4 place-items-center rounded-full border-2 border-ink bg-ink text-[8px] font-black text-amber">
                L
              </span>
            </span>
            <span className="leading-tight">
              <span className="display block text-base tracking-tight sm:text-lg">
                {site.name}
              </span>
              <span className="block text-[10px] font-semibold tracking-[0.22em] text-mist uppercase">
                DVSA Grade A
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex">
            {nav.map((item) => {
              const active =
                item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-3.5 py-2 text-sm font-medium transition-colors ${
                    active ? "text-amber" : "text-mist hover:text-chalk"
                  }`}
                >
                  {item.label}
                  {active ? (
                    <span className="absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-amber" />
                  ) : null}
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={site.phoneHref}
              className="hidden items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-chalk transition-colors hover:border-amber/60 hover:text-amber sm:flex"
            >
              <Icon name="phone" className="h-4 w-4 text-amber" />
              {site.phone}
            </a>
            <Link
              href="/book"
              className="btn btn-primary hidden !py-2.5 !text-sm hover:bg-amber-soft sm:inline-flex"
            >
              Book a lesson
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl border border-line text-chalk xl:hidden"
            >
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                {open ? (
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* mobile drawer */}
        <div
          className={`grid overflow-hidden transition-all duration-300 xl:hidden ${
            open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="container-x mt-4 pb-6">
              <div className="glass rounded-2xl p-4">
                {nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="flex items-center justify-between border-b border-line/70 py-3 text-sm font-semibold text-chalk last:border-0"
                  >
                    {item.label}
                    <Icon name="arrow" className="h-4 w-4 text-amber" />
                  </Link>
                ))}
                <div className="mt-4 grid gap-2">
                  <Link href="/book" className="btn btn-primary w-full hover:bg-amber-soft">
                    Book a lesson
                  </Link>
                  <a href={site.phoneHref} className="btn btn-outline w-full">
                    Call {site.phone}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
