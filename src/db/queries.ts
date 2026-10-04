import { asc, desc, eq } from "drizzle-orm";
import { db, pool } from "@/db";
import {
  bookings,
  coverageAreas,
  enquiries,
  faqs,
  instructors,
  posts,
  reviews,
  services,
  subscribers,
  testimonials,
} from "@/db/schema";
import * as content from "@/content/site";

/* ------------------------------------------------------------------ *
 * Types used across the UI layer
 * ------------------------------------------------------------------ */
export type ServiceView = content.ServiceSeed;
export type InstructorView = content.InstructorSeed;
export type TestimonialView = content.TestimonialSeed;
export type FaqView = { category: string; question: string; answer: string };
export type AreaView = { town: string; postcode: string; testCentre: boolean; note: string };
export type PostView = content.PostSeed;

export type BookingInput = {
  name: string;
  email: string;
  phone: string;
  serviceSlug: string;
  transmission: string;
  preferredDate: string;
  preferredTime: string;
  postcode: string;
  experience: string;
  instructorId?: number | null;
  message?: string | null;
};

/* ------------------------------------------------------------------ *
 * Lazy, idempotent seeding. The marketing content lives in
 * src/content/site.ts and is pushed into Postgres on first read so the
 * app is always renderable, even on a cold database.
 * ------------------------------------------------------------------ */
let seedPromise: Promise<void> | null = null;

async function runSeed(): Promise<void> {
  // Multiple build workers / server instances can race here. A session-level
  // advisory lock plus a re-check guarantees exactly one seed run.
  const client = await pool.connect();
  try {
    await client.query("SELECT pg_advisory_lock(748291)");
    const marker = await client.query<{ seeded: boolean }>(
      "SELECT (SELECT count(*) FROM services) > 0 AS seeded",
    );
    if (marker.rows[0]?.seeded) return;
    await seedAll();
  } finally {
    await client.query("SELECT pg_advisory_unlock(748291)").catch(() => undefined);
    client.release();
  }
}

async function seedAll(): Promise<void> {
  await db
    .insert(services)
    .values(content.services.map((s) => ({ ...s })))
    .onConflictDoNothing();

  await db
    .insert(instructors)
    .values(
      content.instructors.map((i) => ({
        ...i,
        rating: String(i.rating),
      })),
    )
    .onConflictDoNothing();

  await db
    .insert(testimonials)
    .values(content.testimonials.map((t) => ({ ...t })))
    .onConflictDoNothing();

  await db
    .insert(faqs)
    .values(content.faqs.map((f, i) => ({ ...f, sortOrder: i })))
    .onConflictDoNothing();

  await db
    .insert(coverageAreas)
    .values(content.coverageAreas.map((a) => ({ ...a, hasTestCentre: a.testCentre })))
    .onConflictDoNothing();

  await db
    .insert(posts)
    .values(content.posts.map((p) => ({ ...p })))
    .onConflictDoNothing();

  const existingReviews = await db.select({ id: reviews.id }).from(reviews).limit(1);
  if (existingReviews.length === 0) {
    await db.insert(reviews).values(
      content.testimonials.slice(0, 4).map((t) => ({
        name: t.name,
        location: t.location,
        rating: t.rating,
        quote: t.quote,
        service: t.service,
        instructor: t.instructor,
        approved: true,
      })),
    );
  }
}

export async function ensureSeeded(): Promise<boolean> {
  try {
    if (!seedPromise) {
      seedPromise = runSeed();
    }
    await seedPromise;
    return true;
  } catch {
    seedPromise = null;
    return false;
  }
}

/* ------------------------------------------------------------------ *
 * Read helpers — each falls back to static content if Postgres is
 * unavailable so the marketing site can never fail to render.
 * ------------------------------------------------------------------ */
export async function getServices(): Promise<ServiceView[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(services).orderBy(asc(services.sortOrder));
    if (rows.length === 0) return [...content.services];
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      short: r.short,
      description: r.description,
      price: r.price,
      unit: r.unit,
      durationMinutes: r.durationMinutes,
      level: r.level,
      transmission: r.transmission,
      icon: r.icon,
      features: r.features ?? [],
      outcomes: r.outcomes ?? [],
      sortOrder: r.sortOrder,
    }));
  } catch {
    return [...content.services];
  }
}

export async function getServiceBySlug(slug: string): Promise<ServiceView | null> {
  const all = await getServices();
  return all.find((s) => s.slug === slug) ?? null;
}

export async function getInstructors(): Promise<InstructorView[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(instructors).orderBy(desc(instructors.reviews));
    if (rows.length === 0) return [...content.instructors];
    return rows.map((r) => ({
      name: r.name,
      role: r.role,
      bio: r.bio,
      imageUrl: r.imageUrl,
      adiNumber: r.adiNumber,
      transmission: r.transmission,
      specialisms: r.specialisms ?? [],
      areas: r.areas ?? [],
      rating: Number(r.rating),
      reviews: r.reviews,
      years: r.years,
    }));
  } catch {
    return [...content.instructors];
  }
}

export async function getTestimonials(): Promise<TestimonialView[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(testimonials).orderBy(desc(testimonials.createdAt));
    if (rows.length === 0) return [...content.testimonials];
    return rows.map((r) => ({
      name: r.name,
      location: r.location,
      rating: r.rating,
      quote: r.quote,
      service: r.service,
      instructor: r.instructor,
    }));
  } catch {
    return [...content.testimonials];
  }
}

export async function getFaqs(): Promise<FaqView[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(faqs).orderBy(asc(faqs.sortOrder));
    if (rows.length === 0) return [...content.faqs];
    return rows.map((r) => ({ category: r.category, question: r.question, answer: r.answer }));
  } catch {
    return [...content.faqs];
  }
}

export async function getAreas(): Promise<AreaView[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(coverageAreas).orderBy(asc(coverageAreas.town));
    if (rows.length === 0) return [...content.coverageAreas];
    return rows.map((r) => ({
      town: r.town,
      postcode: r.postcode,
      testCentre: r.hasTestCentre,
      note: r.note,
    }));
  } catch {
    return [...content.coverageAreas];
  }
}

export async function getPosts(): Promise<PostView[]> {
  try {
    await ensureSeeded();
    const rows = await db.select().from(posts).orderBy(desc(posts.publishedAt));
    if (rows.length === 0) return [...content.posts];
    return rows.map((r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      body: r.body,
      category: r.category,
      readMinutes: r.readMinutes,
      publishedAt: r.publishedAt,
      author: r.author,
      coverImage: r.coverImage,
    }));
  } catch {
    return [...content.posts];
  }
}

export async function getPostBySlug(slug: string): Promise<PostView | null> {
  const all = await getPosts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getApprovedReviews() {
  try {
    await ensureSeeded();
    const rows = await db
      .select()
      .from(reviews)
      .where(eq(reviews.approved, true))
      .orderBy(desc(reviews.createdAt))
      .limit(40);
    return rows.map((r) => ({
      id: r.id,
      name: r.name,
      location: r.location ?? "",
      rating: r.rating,
      quote: r.quote,
      service: r.service ?? "",
      instructor: r.instructor ?? "",
      createdAt: r.createdAt.toISOString(),
    }));
  } catch {
    return [];
  }
}

/* ------------------------------------------------------------------ *
 * Writes
 * ------------------------------------------------------------------ */
export async function createBooking(input: BookingInput) {
  const [row] = await db
    .insert(bookings)
    .values({
      name: input.name,
      email: input.email,
      phone: input.phone,
      serviceSlug: input.serviceSlug,
      transmission: input.transmission,
      preferredDate: input.preferredDate,
      preferredTime: input.preferredTime,
      postcode: input.postcode,
      experience: input.experience,
      instructorId: input.instructorId ?? null,
      message: input.message ?? null,
    })
    .returning({ id: bookings.id, createdAt: bookings.createdAt });
  return row;
}

export async function createEnquiry(input: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string;
  message: string;
}) {
  const [row] = await db
    .insert(enquiries)
    .values({
      name: input.name,
      email: input.email,
      phone: input.phone ?? null,
      subject: input.subject ?? "General enquiry",
      message: input.message,
    })
    .returning({ id: enquiries.id });
  return row;
}

export async function createReview(input: {
  name: string;
  location?: string | null;
  rating: number;
  quote: string;
  service?: string | null;
  instructor?: string | null;
}) {
  const [row] = await db
    .insert(reviews)
    .values({
      name: input.name,
      location: input.location ?? null,
      rating: input.rating,
      quote: input.quote,
      service: input.service ?? null,
      instructor: input.instructor ?? null,
      approved: false,
    })
    .returning({ id: reviews.id });
  return row;
}

export async function addSubscriber(email: string) {
  await db.insert(subscribers).values({ email }).onConflictDoNothing();
}

/* ------------------------------------------------------------------ *
 * Admin dashboard read
 * ------------------------------------------------------------------ */
export async function getDashboardData() {
  const safe = async <T>(fn: () => Promise<T>, fallback: T): Promise<T> => {
    try {
      return await fn();
    } catch {
      return fallback;
    }
  };

  const [bookingRows, enquiryRows, reviewRows, subscriberRows] = await Promise.all([
    safe(() => db.select().from(bookings).orderBy(desc(bookings.createdAt)).limit(50), []),
    safe(() => db.select().from(enquiries).orderBy(desc(enquiries.createdAt)).limit(50), []),
    safe(
      () => db.select().from(reviews).orderBy(desc(reviews.createdAt)).limit(50),
      [],
    ),
    safe(() => db.select().from(subscribers).orderBy(desc(subscribers.createdAt)).limit(50), []),
  ]);

  const serviceList = await getServices();

  return {
    bookings: bookingRows.map((b) => ({
      ...b,
      createdAt: b.createdAt.toISOString(),
      serviceTitle:
        serviceList.find((s) => s.slug === b.serviceSlug)?.title ?? b.serviceSlug,
    })),
    enquiries: enquiryRows.map((e) => ({ ...e, createdAt: e.createdAt.toISOString() })),
    reviews: reviewRows.map((r) => ({
      ...r,
      createdAt: r.createdAt.toISOString(),
    })),
    subscribers: subscriberRows.map((s) => ({ ...s, createdAt: s.createdAt.toISOString() })),
  };
}

export async function approveReview(id: number) {
  await db.update(reviews).set({ approved: true }).where(eq(reviews.id, id));
}

export async function updateBookingStatus(id: number, status: string) {
  await db.update(bookings).set({ status }).where(eq(bookings.id, id));
}
