// import { NextRequest, NextResponse } from "next/server";
export async function GET() {
  return new Response("Disabled debug endpoint", { status: 410 });
}

// const DC = process.env.QUALTRICS_DATACENTER!;
// const TOKEN = process.env.QUALTRICS_API_TOKEN!;
// const SURVEY_ID = process.env.QUALTRICS_SURVEY_ID!;

// export async function GET(_req: NextRequest) {
//   try {
//     const r = await fetch(
//       `https://${DC}.qualtrics.com/API/v3/survey-definitions/${SURVEY_ID}`,
//       { headers: { "X-API-TOKEN": TOKEN }, cache: "no-store" }
//     );
//     const j = await r.json();
//     if (!r.ok) return NextResponse.json(j, { status: r.status });

//     // ---- LEGACY SHAPE (your tenant) ----
//     // result.Questions is an object: { QID1: {...}, QID2: {...}, ... }
//     const qObj = j?.result?.Questions ?? {};

//     const questions = Object.entries(qObj).map(([qid, q]: [string, any]) => ({
//       qid,
//       text: q?.QuestionText ?? null,
//       questionType: q?.QuestionType ?? null,
//       selector: q?.Selector ?? null,
//       subSelector: q?.SubSelector ?? null,
//       // Choices can be under Answers.Choices or Choices depending on type
//       choices: q?.Answers?.Choices ?? q?.Choices ?? null,
//     }));

//     // Fallbacks for other schemas (kept just in case)
//     const se = j?.result?.SurveyElements ?? [];
//     const el = j?.result?.elements ?? [];
//     if (questions.length === 0 && Array.isArray(se) && se.length) {
//       se.filter((e: any) => e?.Element === "SQ").forEach((e: any) => {
//         questions.push({
//           qid: e?.PrimaryAttribute ?? null,
//           text: e?.Payload?.QuestionText ?? null,
//           questionType: e?.Payload?.QuestionType ?? null,
//           selector: e?.Payload?.Selector ?? null,
//           subSelector: e?.Payload?.SubSelector ?? null,
//           choices: e?.Payload?.Answers?.Choices ?? e?.Payload?.Choices ?? null,
//         });
//       });
//     }
//     if (questions.length === 0 && Array.isArray(el) && el.length) {
//       el.filter((e: any) => e?.Element === "SQ").forEach((e: any) => {
//         questions.push({
//           qid: e?.PrimaryAttribute ?? null,
//           text: e?.Payload?.QuestionText ?? null,
//           questionType: e?.Payload?.QuestionType ?? null,
//           selector: e?.Payload?.Selector ?? null,
//           subSelector: e?.Payload?.SubSelector ?? null,
//           choices: e?.Payload?.Answers?.Choices ?? e?.Payload?.Choices ?? null,
//         });
//       });
//     }

//     return NextResponse.json({
//       ok: true,
//       surveyId: SURVEY_ID,
//       count: questions.length,
//       questions,
//     });
//   } catch (err: any) {
//     return NextResponse.json({ ok: false, error: err?.message ?? "unknown" }, { status: 500 });
//   }
// }
