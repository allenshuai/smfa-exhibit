// import { NextResponse } from "next/server";

// const DC = process.env.QUALTRICS_DATACENTER!;
// const TOKEN = process.env.QUALTRICS_API_TOKEN!;
// const SURVEY_ID = process.env.QUALTRICS_SURVEY_ID!;

// export async function GET() {
//   const url = `https://${DC}.qualtrics.com/API/v3/survey-definitions/${SURVEY_ID}`;
//   const r = await fetch(url, { headers: { "X-API-TOKEN": TOKEN }, cache: "no-store" });
//   const j = await r.json();

//   // Show just enough to understand the structure
//   const result = j?.result ?? {};
//   const keys = Array.isArray(result) ? [] : Object.keys(result ?? {});
//   const sampleSurveyElements = (result as any)?.SurveyElements?.slice?.(0, 3) ?? null;
//   const sampleElements       = (result as any)?.elements?.slice?.(0, 3) ?? null;

//   return NextResponse.json({
//     ok: r.ok,
//     status: r.status,
//     keys,                            // top-level keys under result
//     hasSurveyElements: !!sampleSurveyElements,
//     hasElements: !!sampleElements,
//     sampleSurveyElements,
//     sampleElements,
//   });
// }
