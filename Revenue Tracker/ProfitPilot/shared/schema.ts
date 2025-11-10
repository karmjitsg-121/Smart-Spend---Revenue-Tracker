import { sql } from "drizzle-orm";
import { pgTable, text, varchar, numeric, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const transactions = pgTable("transactions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: timestamp("date").notNull(),
  amount: numeric("amount", { precision: 10, scale: 2 }).notNull(),
  type: varchar("type", { length: 10 }).notNull(), // 'income' or 'expense'
  category: text("category").notNull(),
  description: text("description").notNull(),
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
}).extend({
  amount: z.coerce.number().positive("Amount must be positive"),
  type: z.enum(["income", "expense"]),
  date: z.coerce.date(),
});

export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;

export const categories = pgTable("categories", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull().unique(),
  type: varchar("type", { length: 10 }).notNull(), // 'income' or 'expense'
  icon: text("icon").notNull(),
});

export const insertCategorySchema = createInsertSchema(categories).omit({
  id: true,
});

export type InsertCategory = z.infer<typeof insertCategorySchema>;
export type Category = typeof categories.$inferSelect;

export const userPreferences = pgTable("user_preferences", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  monthlyRevenueGoal: numeric("monthly_revenue_goal", { precision: 10, scale: 2 }).notNull().default("50000"),
  dailyReminderEnabled: boolean("daily_reminder_enabled").notNull().default(false),
  dailyReminderTime: text("daily_reminder_time").notNull().default("18:00"),
  weekendReminderEnabled: boolean("weekend_reminder_enabled").notNull().default(false),
  weekendReminderTime: text("weekend_reminder_time").notNull().default("20:00"),
});

export const insertUserPreferencesSchema = createInsertSchema(userPreferences).omit({
  id: true,
});

export type InsertUserPreferences = z.infer<typeof insertUserPreferencesSchema>;
export type UserPreferences = typeof userPreferences.$inferSelect;
