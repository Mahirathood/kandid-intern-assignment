import { NextResponse } from "next/server";

export async function POST() {
  const res = NextResponse.json({ ok: true }, { status: 200 });
  res.headers.set("Set-Cookie", `token=deleted; Path=/; HttpOnly; Max-Age=0; SameSite=Lax;`);
  return res;
}
