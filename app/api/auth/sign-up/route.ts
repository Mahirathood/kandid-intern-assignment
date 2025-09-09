

import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    const [existing] = await db
      .select()
      .from(users)
      .where(eq(users.email, email));

    if (existing) {
      return NextResponse.json({ message: "Email already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      passwordHash: hashedPassword,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
