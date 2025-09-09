

// app/api/leads/route.ts
import { db } from "@/lib/db";
import { leads, campaigns } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const allLeads = await db
    .select({
      id: leads.id,
      name: leads.name,
      email: leads.email,
      company: leads.company,
      status: leads.status,
      lastContactDate: leads.lastContactDate,
      campaign: campaigns.name,
    })
    .from(leads)
    .leftJoin(campaigns, eq(leads.campaignId, campaigns.id));

  return NextResponse.json(allLeads);
}
