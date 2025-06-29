import { pgTable, text, serial, integer, boolean, decimal, json, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const businesses = pgTable("businesses", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  name: text("name").notNull(),
  description: text("description"),
  niche: text("niche").notNull(),
  status: text("status").default("draft").notNull(), // draft, active, paused
  websiteUrl: text("website_url"),
  revenue: decimal("revenue", { precision: 10, scale: 2 }).default("0.00"),
  settings: json("settings"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const analytics = pgTable("analytics", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").references(() => businesses.id).notNull(),
  metric: text("metric").notNull(), // visitors, conversions, revenue, etc.
  value: decimal("value", { precision: 10, scale: 2 }).notNull(),
  date: timestamp("date").defaultNow().notNull(),
});

export const emailCampaigns = pgTable("email_campaigns", {
  id: serial("id").primaryKey(),
  businessId: integer("business_id").references(() => businesses.id).notNull(),
  name: text("name").notNull(),
  subject: text("subject").notNull(),
  content: text("content").notNull(),
  status: text("status").default("draft").notNull(), // draft, sent, scheduled
  sentAt: timestamp("sent_at"),
  opens: integer("opens").default(0),
  clicks: integer("clicks").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  businesses: many(businesses),
}));

export const businessesRelations = relations(businesses, ({ one, many }) => ({
  user: one(users, {
    fields: [businesses.userId],
    references: [users.id],
  }),
  analytics: many(analytics),
  emailCampaigns: many(emailCampaigns),
}));

export const analyticsRelations = relations(analytics, ({ one }) => ({
  business: one(businesses, {
    fields: [analytics.businessId],
    references: [businesses.id],
  }),
}));

export const emailCampaignsRelations = relations(emailCampaigns, ({ one }) => ({
  business: one(businesses, {
    fields: [emailCampaigns.businessId],
    references: [businesses.id],
  }),
}));

// Schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  email: true,
  name: true,
});

export const signupSchema = insertUserSchema.extend({
  email: z.string().email("Email inválido"),
  password: z.string().min(8, "La contraseña debe tener al menos 8 caracteres"),
  name: z.string().min(2, "El nombre debe tener al menos 2 caracteres"),
});

export const insertBusinessSchema = createInsertSchema(businesses).pick({
  name: true,
  description: true,
  niche: true,
  status: true,
  websiteUrl: true,
});

export const insertAnalyticsSchema = createInsertSchema(analytics).pick({
  businessId: true,
  metric: true,
  value: true,
});

export const insertEmailCampaignSchema = createInsertSchema(emailCampaigns).pick({
  businessId: true,
  name: true,
  subject: true,
  content: true,
  status: true,
}).extend({
  opens: z.number().optional(),
  clicks: z.number().optional(),
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertBusiness = z.infer<typeof insertBusinessSchema>;
export type Business = typeof businesses.$inferSelect;
export type InsertAnalytics = z.infer<typeof insertAnalyticsSchema>;
export type Analytics = typeof analytics.$inferSelect;
export type InsertEmailCampaign = z.infer<typeof insertEmailCampaignSchema>;
export type EmailCampaign = typeof emailCampaigns.$inferSelect;
