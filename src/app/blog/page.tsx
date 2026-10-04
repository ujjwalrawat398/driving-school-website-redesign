import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/motion";
import { CtaLink, Icon, PageHero, Pill } from "@/components/section";
import { NewsletterForm } from "@/components/forms";
import { getPosts } from "@/db/queries";

export const metadata: Metadata = {
  title: "Driving advice",
  description:
    "Straight-talking guides from DVSA Grade A instructors: how many lessons you need, show-me tell-me questions, roundabout anxiety, manual vs automatic and motorway driving.",
};

export default async function BlogPage() {
  const posts = await getPosts();
  const [featured, ...rest] = posts;

  return (
    <>
      <PageHero
        eyebrow="Driving advice"
        title={
          <>
            Guides written by
            <br />
            the people teaching it.
          </>
        }
        intro="No SEO filler. Every article here is written by an instructor who teaches the thing they're writing about."
        image="/images/in-car-lesson.jpg"
      />

      {featured ? (
        <section className="py-16 sm:py-20">
          <div className="container-x">
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="card group grid gap-8 overflow-hidden p-0 lg:grid-cols-2"
              >
                <div className="relative aspect-16/10 lg:aspect-auto lg:min-h-[22rem]">
                  <Image
                    src={featured.coverImage}
                    alt={featured.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent lg:bg-gradient-to-r" />
                </div>
                <div className="flex flex-col justify-center p-7 sm:p-10">
                  <div className="flex flex-wrap items-center gap-3">
                    <Pill tone="amber">{featured.category}</Pill>
                    <span className="text-xs text-mist">{featured.readMinutes} min read</span>
                  </div>
                  <h2 className="display mt-5 text-3xl group-hover:text-amber sm:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-5 text-sm leading-relaxed text-mist sm:text-base">
                    {featured.excerpt}
                  </p>
                  <div className="mt-8 flex items-center justify-between">
                    <p className="text-xs tracking-[0.16em] text-mist uppercase">
                      {featured.author}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-amber transition-all group-hover:gap-3">
                      Read
                      <Icon name="arrow" className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          </div>
        </section>
      ) : null}

      <section className="pb-24">
        <div className="container-x">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="card group flex h-full flex-col overflow-hidden"
                >
                  <div className="relative aspect-16/10 overflow-hidden">
                    <Image
                      src={p.coverImage}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink/70 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-3">
                      <Pill tone="amber">{p.category}</Pill>
                      <span className="text-xs text-mist">{p.readMinutes} min</span>
                    </div>
                    <h3 className="display mt-4 text-xl leading-snug group-hover:text-amber">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-mist">{p.excerpt}</p>
                    <p className="mt-5 text-[11px] tracking-[0.16em] text-mist uppercase">
                      {p.author} ·{" "}
                      {new Date(p.publishedAt).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-line bg-ink-2 py-20">
        <div className="container-x grid gap-8 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="display text-3xl sm:text-4xl">
              Free study pack: 40 theory questions and the full show-me/tell-me list.
            </h2>
            <p className="mt-4 text-mist">
              One email a month from an actual instructor. No spam, unsubscribe in a click.
            </p>
          </div>
          <div className="lg:justify-self-end lg:w-full lg:max-w-md">
            <NewsletterForm />
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <h2 className="display max-w-2xl text-3xl sm:text-4xl">
            Reading about it is step two. Step one is driving.
          </h2>
          <CtaLink href="/book">
            Book a lesson
            <Icon name="arrow" className="h-4 w-4" />
          </CtaLink>
        </div>
      </section>
    </>
  );
}
