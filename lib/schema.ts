
import {
  pgTable,
  uuid,
  text,
  boolean,
  timestamp,
  integer,
  numeric,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  image: text("image"),
  passwordHash: text("password_hash"),
  emailVerified: boolean("email_verified").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const campaigns = pgTable("campaigns", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  status: text("status")
    .$type<"Draft" | "Active" | "Paused" | "Completed">()
    .notNull(),
  totalLeads: integer("total_leads").default(0),
  successfulLeads: integer("successful_leads").default(0),
  responseRate: numeric("response_rate").default("0"),
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  createdBy: uuid("created_by").references(() => users.id),
});

export const leads = pgTable("leads", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  company: text("company"),
  campaignId: uuid("campaign_id").references(() => campaigns.id),
  status: text("status")
    .$type<"Pending" | "Contacted" | "Responded" | "Converted">()
    .notNull(),
  lastContactDate: timestamp("last_contact_date"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// relations
export const leadsRelations = relations(leads, ({ one }) => ({
  campaign: one(campaigns, {
    fields: [leads.campaignId],
    references: [campaigns.id],
  }),
}));

export const campaignsRelations = relations(campaigns, ({ many }) => ({
  leads: many(leads),
}));
