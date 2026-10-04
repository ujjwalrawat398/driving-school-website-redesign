import {
  boolean,
  integer,
  jsonb,
  numeric,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  title: varchar("title", { length: 160 }).notNull(),
  short: text("short").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  unit: varchar("unit", { length: 80 }).notNull(),
  durationMinutes: integer("duration_minutes").notNull(),
  level: varchar("level", { length: 80 }).notNull(),
  transmission: varchar("transmission", { length: 80 }).notNull(),
  icon: varchar("icon", { length: 40 }).notNull(),
  features: jsonb("features").$type<string[]>().notNull().default([]),
  outcomes: jsonb("outcomes").$type<string[]>().notNull().default([]),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const instructors = pgTable("instructors", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  role: varchar("role", { length: 160 }).notNull(),
  bio: text("bio").notNull(),
  imageUrl: text("image_url").notNull(),
  adiNumber: varchar("adi_number", { length: 40 }).notNull(),
  transmission: varchar("transmission", { length: 60 }).notNull(),
  specialisms: jsonb("specialisms").$type<string[]>().notNull().default([]),
  areas: jsonb("areas").$type<string[]>().notNull().default([]),
  rating: numeric("rating", { precision: 2, scale: 1 }).notNull().default("5.0"),
  reviews: integer("reviews").notNull().default(0),
  years: integer("years").notNull().default(0),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  location: varchar("location", { length: 120 }).notNull(),
  rating: integer("rating").notNull().default(5),
  quote: text("quote").notNull().unique(),
  service: varchar("service", { length: 120 }).notNull(),
  instructor: varchar("instructor", { length: 120 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const faqs = pgTable("faqs", {
  id: serial("id").primaryKey(),
  category: varchar("category", { length: 80 }).notNull(),
  question: text("question").notNull(),
  answer: text("answer").notNull(),
  sortOrder: integer("sort_order").notNull().default(0),
});

export const coverageAreas = pgTable("coverage_areas", {
  id: serial("id").primaryKey(),
  town: varchar("town", { length: 80 }).notNull().unique(),
  postcode: varchar("postcode", { length: 40 }).notNull(),
  hasTestCentre: boolean("has_test_centre").notNull().default(false),
  note: text("note").notNull(),
});

export const posts = pgTable("posts", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 160 }).notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  body: text("body").notNull(),
  category: varchar("category", { length: 80 }).notNull(),
  readMinutes: integer("read_minutes").notNull().default(5),
  publishedAt: varchar("published_at", { length: 20 }).notNull(),
  author: varchar("author", { length: 120 }).notNull(),
  coverImage: text("cover_image").notNull(),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  serviceSlug: varchar("service_slug", { length: 120 }).notNull(),
  transmission: varchar("transmission", { length: 40 }).notNull().default("Manual"),
  preferredDate: varchar("preferred_date", { length: 20 }).notNull(),
  preferredTime: varchar("preferred_time", { length: 12 }).notNull(),
  postcode: varchar("postcode", { length: 16 }).notNull(),
  experience: varchar("experience", { length: 40 }).notNull(),
  instructorId: integer("instructor_id"),
  message: text("message"),
  status: varchar("status", { length: 24 }).notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const enquiries = pgTable("enquiries", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  email: varchar("email", { length: 180 }).notNull(),
  phone: varchar("phone", { length: 40 }),
  subject: varchar("subject", { length: 160 }).notNull().default("General enquiry"),
  message: text("message").notNull(),
  status: varchar("status", { length: 24 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 120 }).notNull(),
  location: varchar("location", { length: 120 }),
  rating: integer("rating").notNull().default(5),
  quote: text("quote").notNull(),
  service: varchar("service", { length: 120 }),
  instructor: varchar("instructor", { length: 120 }),
  approved: boolean("approved").notNull().default(false),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 180 }).notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});
