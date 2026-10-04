import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Reveal } from "@/components/motion";
import { NewsletterForm } from "@/components/forms";
import { CtaLink, Icon, Pill } from "@/components/section";
import { getPostBySlug, getPosts } from "@/db/queries";

type Params = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: "Article not found" };
  return { title: post.title, description: post.excerpt };
}

function renderBody(body: string) {
  const blocks = body.split("\n\n");
  return blocks.map((block, i) => {
    const bolded = block.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
      part.startsWith("**") && part.endsWith("**") ? (
        <strong key={j} className="font-bold text-chalk">
          {part.slice(2, -2)}
        </strong>
      ) : (
        <span key={j}>{part}</span>
      ),
    );

    if (/^\d\./m.test(block)) {
      return (
        <div key={i} className="mt-6 space-y-3 rounded-2xl border border-line bg-surface/40 p-6">
          {block.split("\n").map((line, j) => (
            <p key={j} className="text-sm leading-relaxed text-mist">
              {line}
            </p>
          ))}
        </div>
      );
    }

    if (block.startsWith("**")) {
      return (
        <h2 key={i} className="display mt-12 text-2xl sm:text-3xl">
          {block.replace(/\*\*/g, "")}
        </h2>
      );
    }

    return (
      <p key={i} className="mt-6 text-base leading-relaxed text-mist">
        {bolded}
      </p>
    );
  });
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const [post, all] = await Promise.all([getPostBySlug(slug), getPosts()]);
  if (!post) notFound();

  const related = all.filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <header className="relative isolate overflow-hidden pt-36 pb-14 sm:pt-44">
        <div className="absolute inset-0 -z-10">
          <Image src={post.coverImage} alt="" fill sizes="100vw" className="object-cover opacity-25" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/85 via-ink/92 to-ink" />
        </div>
        <div className="container-x max-w-3xl">
          <nav className="flex items-center gap-2 text-xs text-mist">
            <Link href="/" className="hover:text-amber">
              Home
            </Link>
            <span>/</span>
            <Link href="/blog" className="hover:text-amber">
              Advice
            </Link>
          </nav>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Pill tone="amber">{post.category}</Pill>
            <span className="text-xs text-mist">{post.readMinutes} min read</span>
            <span className="text-xs text-mist">
              {new Date(post.publishedAt).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="display mt-6 text-[clamp(2rem,5vw,3.6rem)]">{post.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-mist">{post.excerpt}</p>
          <div className="mt-8 flex items-center gap-4 border-t border-line pt-6">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-amber/15 text-sm font-bold text-amber">
              {post.author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <div>
              <p className="text-sm font-bold">{post.author}</p>
              <p className="text-xs text-mist">DVSA Grade A instructor, Apex Drive Academy</p>
            </div>
          </div>
        </div>
      </header>

      <article className="border-t border-line py-16">
        <div className="container-x max-w-3xl">
          <Reveal>
            <div className="relative aspect-16/9 overflow-hidden rounded-3xl border border-line">
              <Image
                src={post.coverImage}
                alt={post.title}
                fill
                sizes="(max-width: 1024px) 100vw, 48rem"
                className="object-cover"
              />
            </div>
          </Reveal>
          <div className="mt-12">{renderBody(post.body)}</div>

          <div className="mt-14 rounded-2xl border border-amber/30 bg-amber/5 p-7">
            <h3 className="display text-xl">Want this taught to you, not just explained?</h3>
            <p className="mt-3 text-sm leading-relaxed text-chalk/85">
              Our instructors coach exactly what&apos;s in this article, on real roads, in dual-control
              cars. First lesson is refundable if you don&apos;t feel more confident.
            </p>
            <CtaLink href="/book" className="mt-6">
              Book a lesson
              <Icon name="arrow" className="h-4 w-4" />
            </CtaLink>
          </div>

          <div className="mt-12">
            <p className="text-xs font-bold tracking-[0.2em] text-mist uppercase">
              Get the next guide
            </p>
            <div className="mt-4">
              <NewsletterForm />
            </div>
          </div>
        </div>
      </article>

      <section className="border-t border-line py-20">
        <div className="container-x">
          <h2 className="display text-2xl sm:text-3xl">Keep reading</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {related.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Link href={`/blog/${p.slug}`} className="card group flex h-full gap-5 p-5">
                  <div className="relative h-28 w-32 shrink-0 overflow-hidden rounded-xl">
                    <Image src={p.coverImage} alt="" fill sizes="128px" className="object-cover" />
                  </div>
                  <div>
                    <Pill tone="amber">{p.category}</Pill>
                    <h3 className="display mt-3 text-lg leading-snug group-hover:text-amber">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-xs text-mist">{p.readMinutes} min read</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
