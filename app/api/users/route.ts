import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import { NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function GET() {
  const allUsers = await db.select().from(users);
  return NextResponse.json(allUsers);
}

export async function POST(req: Request) {
  const body = await req.json();
  const [user] = await db
    .insert(users)
    .values({
      name: body.name,
      email: body.email,
      passwordHash: body.passwordHash,
    })
    .returning();
  return NextResponse.json(user);
}
