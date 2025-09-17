import { sql } from "drizzle-orm";
import { pgTable, text, varchar, json, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const presentations = pgTable("presentations", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  slides: json("slides").notNull().$type<SlideData[]>(),
  createdAt: text("created_at").default(sql`now()`),
  updatedAt: text("updated_at").default(sql`now()`)
});

export const slideDataSchema = z.object({
  id: z.string(),
  type: z.enum(["intro", "content", "chart", "discussion", "conclusion", "references"]),
  title: z.string(),
  subtitle: z.string().optional(),
  content: z.record(z.any()),
  order: z.number()
});

export type SlideData = z.infer<typeof slideDataSchema>;

export const insertPresentationSchema = createInsertSchema(presentations).omit({
  id: true,
  createdAt: true,
  updatedAt: true
});

export type InsertPresentation = z.infer<typeof insertPresentationSchema>;
export type Presentation = typeof presentations.$inferSelect;
