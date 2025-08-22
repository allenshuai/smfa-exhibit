//i ran with /api/qualtrics/ping to make sure taht the envs and token are good

import { NextResponse } from "next/server";

export async function GET() {
  const dc = process.env.QUALTRICS_DATACENTER!;
  const token = process.env.QUALTRICS_API_TOKEN!;

  try {
    const r = await fetch(`https://${dc}.qualtrics.com/API/v3/whoami`, {
      headers: { "X-API-TOKEN": token },
      cache: "no-store",
    });
    const data = await r.json();
    return NextResponse.json({ ok: r.ok, status: r.status, data });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e?.message ?? "unknown" }, { status: 500 });
  }
}
