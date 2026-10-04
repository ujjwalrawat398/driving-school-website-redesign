import type { Metadata } from "next";
import { revalidatePath } from "next/cache";
import { Reveal } from "@/components/motion";
import { Icon, Pill } from "@/components/section";
import { approveReview, getDashboardData } from "@/db/queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Staff dashboard",
  description: "Internal view of bookings, enquiries, reviews and newsletter subscribers.",
  robots: { index: false, follow: false },
};

async function approve(formData: FormData) {
  "use server";
  const id = Number(formData.get("id"));
  if (Number.isFinite(id) && id > 0) {
    await approveReview(id);
    revalidatePath("/dashboard");
    revalidatePath("/reviews");
  }
}

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function DashboardPage() {
  const { bookings, enquiries, reviews, subscribers } = await getDashboardData();

  const pendingReviews = reviews.filter((r) => !r.approved);
  const cards = [
    { label: "Bookings", value: bookings.length, icon: "calendar" },
    { label: "Enquiries", value: enquiries.length, icon: "mail" },
    { label: "Reviews awaiting approval", value: pendingReviews.length, icon: "star" },
    { label: "Subscribers", value: subscribers.length, icon: "users" },
  ];

  return (
    <section className="pt-36 pb-24">
      <div className="container-x">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">
              <span className="h-1.5 w-1.5 rounded-full bg-amber" />
              Internal
            </span>
            <h1 className="display mt-4 text-4xl sm:text-5xl">Staff dashboard</h1>
            <p className="mt-4 max-w-2xl text-mist">
              Live view of everything coming through the website. Approving a review publishes it to
              the public reviews page immediately.
            </p>
          </div>
          <Pill tone="amber">Live database</Pill>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {cards.map((c, i) => (
            <Reveal key={c.label} delay={i * 60}>
              <div className="card flex items-center gap-5 p-6">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-amber/30 bg-amber/10 text-amber">
                  <Icon name={c.icon} className="h-6 w-6" />
                </span>
                <div>
                  <p className="display text-3xl">{c.value}</p>
                  <p className="mt-1 text-[11px] tracking-[0.16em] text-mist uppercase">
                    {c.label}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* bookings */}
        <div className="mt-14">
          <h2 className="display text-2xl">Lesson bookings</h2>
          <div className="card mt-6 overflow-x-auto">
            {bookings.length === 0 ? (
              <p className="p-8 text-center text-sm text-mist">
                No bookings yet. Submit the form on the booking page and it will appear here.
              </p>
            ) : (
              <table className="w-full min-w-[54rem] text-left text-sm">
                <thead className="border-b border-line bg-white/[0.03] text-[10px] tracking-[0.18em] text-mist uppercase">
                  <tr>
                    <th className="px-5 py-4">Ref</th>
                    <th className="px-5 py-4">Learner</th>
                    <th className="px-5 py-4">Lesson</th>
                    <th className="px-5 py-4">Slot</th>
                    <th className="px-5 py-4">Postcode</th>
                    <th className="px-5 py-4">Contact</th>
                    <th className="px-5 py-4">Received</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {bookings.map((b) => (
                    <tr key={b.id} className="transition-colors hover:bg-white/[0.03]">
                      <td className="px-5 py-4 font-mono text-xs text-amber">
                        APX-{String(b.id).padStart(5, "0")}
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold">{b.name}</p>
                        <p className="text-xs text-mist">{b.experience}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p>{b.serviceTitle}</p>
                        <p className="text-xs text-mist">{b.transmission}</p>
                      </td>
                      <td className="px-5 py-4">
                        <p>{b.preferredDate}</p>
                        <p className="text-xs text-mist">{b.preferredTime}</p>
                      </td>
                      <td className="px-5 py-4 font-mono text-xs">{b.postcode}</td>
                      <td className="px-5 py-4">
                        <p className="text-xs">{b.email}</p>
                        <p className="text-xs text-mist">{b.phone}</p>
                      </td>
                      <td className="px-5 py-4 text-xs text-mist">{formatDate(b.createdAt)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {/* enquiries */}
          <div>
            <h2 className="display text-2xl">Enquiries</h2>
            <div className="mt-6 space-y-4">
              {enquiries.length === 0 ? (
                <p className="card p-8 text-center text-sm text-mist">No enquiries yet.</p>
              ) : (
                enquiries.map((e) => (
                  <div key={e.id} className="card p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-bold">{e.name}</p>
                      <Pill>{e.subject}</Pill>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{e.message}</p>
                    <p className="mt-4 text-xs text-mist">
                      {e.email}
                      {e.phone ? ` · ${e.phone}` : ""} · {formatDate(e.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* reviews */}
          <div>
            <h2 className="display text-2xl">Reviews</h2>
            <div className="mt-6 space-y-4">
              {reviews.length === 0 ? (
                <p className="card p-8 text-center text-sm text-mist">No reviews yet.</p>
              ) : (
                reviews.map((r) => (
                  <div key={r.id} className="card p-5">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-sm font-bold">
                        {r.name}
                        <span className="ml-2 font-sans text-xs font-normal text-mist">
                          {r.location}
                        </span>
                      </p>
                      {r.approved ? (
                        <Pill tone="amber">Published</Pill>
                      ) : (
                        <form action={approve}>
                          <input type="hidden" name="id" value={r.id} />
                          <button
                            type="submit"
                            className="rounded-full bg-amber px-4 py-1.5 text-xs font-bold text-ink transition-colors hover:bg-amber-soft"
                          >
                            Approve
                          </button>
                        </form>
                      )}
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-mist">{r.quote}</p>
                    <p className="mt-4 text-xs text-mist">
                      {r.rating}★ · {r.service ?? "—"} · {r.instructor ?? "—"} ·{" "}
                      {formatDate(r.createdAt)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* subscribers */}
        <div className="mt-14">
          <h2 className="display text-2xl">Newsletter subscribers</h2>
          <div className="card mt-6 p-6">
            {subscribers.length === 0 ? (
              <p className="text-sm text-mist">No subscribers yet.</p>
            ) : (
              <ul className="flex flex-wrap gap-3">
                {subscribers.map((s) => (
                  <li
                    key={s.id}
                    className="rounded-full border border-line px-4 py-2 text-xs text-mist"
                  >
                    {s.email}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
