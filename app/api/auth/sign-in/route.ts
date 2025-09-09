
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { db } from "@/lib/db";
import { users } from "@/lib/schema";  // import your schema
import { eq } from "drizzle-orm";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password required" },
        { status: 400 }
      );
    }

    // query users table using Drizzle
    const [user] = await db.select().from(users).where(eq(users.email, email));
    if (!user || !user.passwordHash) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) {
      return NextResponse.json({ message: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { sub: user.id, email: user.email },
      process.env.AUTH_SECRET || "dev-secret",
      { expiresIn: "7d" }
    );

    const res = NextResponse.json({ ok: true }, { status: 200 });
    res.headers.set(
      "Set-Cookie",
      `token=${token}; Path=/; HttpOnly; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax;`
    );

    return res;
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}