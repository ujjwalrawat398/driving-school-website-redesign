import type { Metadata } from "next";
import { Reveal } from "@/components/motion";
import { CtaLink, Icon, PageHero, SectionHeading } from "@/components/section";
import { GalleryGrid, VideoShowcase } from "@/components/ui";
import { galleryItems, videos } from "@/content/site";

export const metadata: Metadata = {
  title: "Gallery & videos",
  description:
    "Photos and video from real Apex Drive Academy lessons — the fleet, the instructors, pass days and motorway coaching across Berkshire and Surrey.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title={
          <>
            Real lessons.
            <br />
            Real passes.
          </>
        }
        intro="Everything below is from actual lessons, actual routes and actual test days — plus a few of the roads we'll take you on."
        image="/images/pass-celebration.jpg"
      />

      <section className="py-16 sm:py-24">
        <div className="container-x">
          <Reveal>
            <div className="mb-12 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="display text-2xl sm:text-3xl">
                  {galleryItems.length} photos &amp; clips
                </h2>
                <p className="mt-2 text-sm text-mist">
                  Tap any tile to open it. Videos play inline with sound.
                </p>
              </div>
              <div className="flex gap-2">
                <span className="rounded-full border border-amber/40 bg-amber/10 px-3 py-1.5 text-xs font-semibold text-amber">
                  {galleryItems.filter((g) => g.type === "video").length} videos
                </span>
                <span className="rounded-full border border-line px-3 py-1.5 text-xs font-semibold text-mist">
                  {galleryItems.filter((g) => g.type === "image").length} photos
                </span>
              </div>
            </div>
          </Reveal>
          <Reveal delay={60}>
            <GalleryGrid items={galleryItems} />
          </Reveal>
        </div>
      </section>

      <section className="border-y border-line bg-ink-2 py-24">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Featured video"
              title="Watch a full junction coaching session."
              intro="Four minutes, unedited, from a real lesson near Wokingham."
              align="center"
            />
          </Reveal>
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <VideoShowcase
                src={videos.reel.src}
                poster={videos.reel.poster}
                title="Junction coaching, unedited"
                caption="Emerging at T-junctions · 4 min"
              />
            </Reveal>
            <Reveal delay={80}>
              <VideoShowcase
                src="https://videos.pexels.com/video-files/13164376/13164376-uhd_3840_2160_25fps.mp4"
                poster="https://images.pexels.com/photos/12421058/pexels-photo-12421058.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200"
                title="Dual carriageway build-up"
                caption="Progressing from 40 to 70 mph safely · 3 min"
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="container-x flex flex-col items-center gap-6 text-center">
          <h2 className="display max-w-2xl text-3xl sm:text-4xl">
            Your photo could be the next one here.
          </h2>
          <p className="max-w-xl text-mist">
            Every pass gets a photo if you want one — no pressure, but we&apos;ve never had someone
            say no.
          </p>
          <CtaLink href="/book">
            Book my first lesson
            <Icon name="arrow" className="h-4 w-4" />
          </CtaLink>
        </div>
      </section>
    </>
  );
}
