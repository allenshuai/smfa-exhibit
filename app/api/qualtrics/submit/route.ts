// /app/api/qualtrics/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { regularSpots } from "@/components/data/regularSpots";
import { SPOT_TO_Q_LOCATION, QLocationLabel } from "@/components/data/spotToQLocation";

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/** ========= QIDs from your latest list-questions =========
 * DO NOT set values for DB items (QID5 intro, QID18 date note)
 */
const Q = {
  // TE (text-entry)
  name: "QID3",
  email: "QID4",
  program: "QID7",
  artworkDescription: "QID6",
  installMethods: "QID22",
  covidHandlingExplain: "QID9",
  durationExplain: "QID14",
  whichClass: "QID26",
  preferredDateText: "QID17", // "Enter a date:"
  altResponsibleName: "QID23",

  // MC single-answer
  canInstallSolo: "QID1",
  durationOtherYN: "QID13",
  installType: "QID25",
  soloOrGroupA: "QID27",
  soloOrGroupB: "QID28",
  // building: "QID8",

  // MC single-checkbox
  covidAgree: "QID21",

  // MC multi-answer (checkbox list)
  locations: "QID2",
} as const;

/** ========= Choice lookups (codes are numeric in Qualtrics) ========= */
const YES_NO = { Yes: 1, No: 2 } as const;
const INSTALL_TYPE = {
  "Independent installation": 1,
  "Class-based installation": 2,
} as const;
const SOLO_GROUP = { "Solo project": 1, "Group project": 2 } as const;
// Building option 2 label in Qualtrics contains HTML; normalize before matching.
const BUILDING = {
  "smfa main campus (230 fenway)": 1,
  "smfa mission hill gallery (160 st. alphonsus)": 2,
} as const;

/** ========= Helpers ========= */
function normalizeLabel(s: string): string {
  return String(s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}

// Return a NUMBER MC code (Qualtrics wants numbers for singles)
function mcCodeNum<T extends Record<string, number>>(val: string | undefined, table: T): number | undefined {
  if (!val) return undefined;
  const normalized = normalizeLabel(val);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const code = (table as any)[val] ?? (table as any)[normalized];
  return typeof code === "number" ? code : undefined;
}

// TE must be posted to QID_TEXT
function setTE(values: Record<string, unknown>, qid: string, v?: string): void {
  if (!qid || v == null || v === "") return;
  values[`${qid}_TEXT`] = v;
}

function toMMDDYYYY(s?: string): string | undefined {
  if (!s) return undefined;
  if (/^\d{2}-\d{2}-\d{4}$/.test(s)) return s; // already MM-DD-YYYY
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (m) {
    const [, y, mm, dd] = m;
    return `${mm}-${dd}-${y}`;
  }
  return s;
}

function spotIdsToTitles(ids: string[] = []): string[] {
  const out: string[] = [];
  for (const id of ids.slice(0, 3)) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = (regularSpots as any)[id];
    out.push(meta?.title ?? id);
  }
  return out;
}

/** Robust parse (Qualtrics sometimes returns non-JSON) */
async function parseMaybeJSON(resp: Response): Promise<{ json: unknown; text: string; isJSON: boolean }> {
  const text = await resp.text();
  try {
    return { json: JSON.parse(text), text, isJSON: true };
  } catch {
    return { json: null, text, isJSON: false };
  }
}

/** Cache the locations choice map (label -> numeric code) */
let cachedLocChoices: { byLabel: Record<string, number>; at: number } | null = null;
async function getLocationChoiceMap(DC: string, TOKEN: string, SURVEY_ID: string): Promise<Record<string, number>> {
  const FRESH_MS = 10 * 60 * 1000;
  if (cachedLocChoices && Date.now() - cachedLocChoices.at < FRESH_MS) {
    return cachedLocChoices.byLabel;
  }
  const r = await fetch(
    `https://${DC}.qualtrics.com/API/v3/survey-definitions/${SURVEY_ID}`,
    { headers: { "X-API-TOKEN": TOKEN }, cache: "no-store" }
  );
  const j = (await r.json()) as {
    result?: { Questions?: Record<string, { Answers?: { Choices?: Record<string, { Display?: string }> }; Choices?: Record<string, { Display?: string }> }> };
  };

  const locQ = j?.result?.Questions?.[Q.locations] as
    | { Answers?: { Choices?: Record<string, { Display?: string }> }; Choices?: Record<string, { Display?: string }> }
    | undefined;

  // Qualtrics has used both `Answers.Choices` and `Choices`
  const choices = (locQ?.Answers?.Choices ?? locQ?.Choices) ?? {};
  const by: Record<string, number> = {};
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  for (const [code, meta] of Object.entries(choices as Record<string, any>)) {
    const label = String(meta?.Display ?? "");
    if (label) by[normalizeLabel(label)] = Number(code);
  }
  cachedLocChoices = { byLabel: by, at: Date.now() };
  return by;
}

/** Map up to 3 spot IDs → Qualtrics location labels */
function spotsToQLocationLabels(spotIds: string[]): QLocationLabel[] {
  const out = new Set<QLocationLabel>();
  for (const rawId of (spotIds ?? []).slice(0, 3)) {
    const fromExplicit = SPOT_TO_Q_LOCATION[rawId as keyof typeof SPOT_TO_Q_LOCATION] as QLocationLabel | undefined;
    if (fromExplicit) {
      out.add(fromExplicit);
      continue;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const meta = (regularSpots as any)[rawId];
    const t = meta?.title as QLocationLabel | undefined;
    if (t) out.add(t);
  }
  return Array.from(out);
}

/** ========= Incoming body ========= */
type WebForm = {
  // TE
  name?: string; email?: string; program?: string;
  artworkDescription?: string; installMethods?: string;
  covidHandlingExplain?: string; durationExplain?: string; whichClass?: string;
  preferredDateText?: string; altResponsibleName?: string;

  // MC single
  canInstallSolo?: "Yes" | "No";
  durationOtherYN?: "Yes" | "No";
  installType?: keyof typeof INSTALL_TYPE;
  soloOrGroup?: keyof typeof SOLO_GROUP;
  building?: string;

  // checkbox
  covidAgree?: boolean;

  // multi-answer
  spots?: string[];
};

function errJson(message: string, extra?: Record<string, unknown>, status = 500) {
  return NextResponse.json({ ok: false, error: { message, ...extra } }, { status });
}

export async function POST(req: NextRequest) {
  const DATACENTER = process.env.QUALTRICS_DATACENTER;
  const API_TOKEN  = process.env.QUALTRICS_API_TOKEN;
  const SURVEY_ID  = process.env.QUALTRICS_SURVEY_ID;

  if (!DATACENTER || !API_TOKEN || !SURVEY_ID) {
    const missing = [
      !DATACENTER && "QUALTRICS_DATACENTER",
      !API_TOKEN && "QUALTRICS_API_TOKEN",
      !SURVEY_ID && "QUALTRICS_SURVEY_ID",
    ].filter(Boolean) as string[];
    return errJson(`Qualtrics environment is not configured. Missing: ${missing.join(", ")}`, { missing }, 500);
  }

  try {
    const form: WebForm = await req.json();

    // ---------- Validation ----------
    const missing: string[] = [];
    if (!form.name) missing.push("Name");
    if (!form.email) missing.push("E‑mail address");
    if (!form.program) missing.push("Program");
    // if (!form.building) missing.push("Building");
    if (!form.canInstallSolo) missing.push("Can one person install?");
    if (!form.artworkDescription) missing.push("Artwork description");
    if (!form.installMethods) missing.push("Installation methods");
    if (!form.preferredDateText) missing.push("Desired installation date");
    if (!form.installType) missing.push("Independent/Class‑based");
    if (!form.soloOrGroup) missing.push("Solo/Group");
    if (!form.covidAgree) missing.push("Agreement checkbox");
    if (form.durationOtherYN === "Yes" && !form.durationExplain) missing.push("Duration explanation");
    if (form.canInstallSolo === "No" && !form.covidHandlingExplain) missing.push("Handling plan for two‑person install");
    if (form.installType === "Class-based installation" && !form.whichClass) missing.push("Which class exhibition");

    if (missing.length) {
      return errJson(`Please complete: ${missing.join(", ")}`, { status: 400 }, 400);
    }

    // ---------- Build values ----------
    const values: Record<string, unknown> = {};

    // TE (goes to QID*_TEXT)
    const trim = (s?: string) => (s == null ? s : s.trim());
    setTE(values, Q.name, trim(form.name));
    setTE(values, Q.email, trim(form.email));
    setTE(values, Q.program, trim(form.program));
    setTE(values, Q.installMethods, trim(form.installMethods));
    setTE(values, Q.covidHandlingExplain, trim(form.covidHandlingExplain));
    setTE(values, Q.durationExplain, trim(form.durationExplain));
    setTE(values, Q.whichClass, trim(form.whichClass));
    setTE(values, Q.preferredDateText, toMMDDYYYY(trim(form.preferredDateText)));
    setTE(values, Q.altResponsibleName, trim(form.altResponsibleName));

    // Description + readable selected locations (helpful context for staff)
    let description = trim(form.artworkDescription) ?? "";
    if (form.spots?.length) {
      const selectedTitles = spotIdsToTitles(form.spots);
      description += `\n\nSelected locations (from SMFA map): ${selectedTitles.join(" | ")}`;
    }
    setTE(values, Q.artworkDescription, description);

    // MC singles / checkbox (send NUMBER codes)
    const canSolo = mcCodeNum(form.canInstallSolo, YES_NO);
    if (canSolo !== undefined) values[Q.canInstallSolo] = canSolo;

    const durYN = mcCodeNum(form.durationOtherYN || "No", YES_NO);
    if (durYN !== undefined) values[Q.durationOtherYN] = durYN;

    // if (form.building) {
    //   const bCode = mcCodeNum(form.building, BUILDING);
    //   if (typeof bCode === "number") values[Q.building] = bCode;
    // }

    const it = mcCodeNum(form.installType, INSTALL_TYPE);
    if (it !== undefined) values[Q.installType] = it;

    const sg = mcCodeNum(form.soloOrGroup, SOLO_GROUP);
    if (sg !== undefined) {
      values[Q.soloOrGroupA] = sg;
      values[Q.soloOrGroupB] = sg; // mirrored question shows same choice
    }

    if (form.covidAgree) values[Q.covidAgree] = 1; // number

    // MC multi-answer: locations (QID2) → ARRAY OF STRING CODES (this worked previously)
    const locationCodes: number[] = [];
    const unmappedLabels: string[] = [];
    if (form.spots?.length) {
      const labels = spotsToQLocationLabels(form.spots);
      const by = await getLocationChoiceMap(DATACENTER, API_TOKEN, SURVEY_ID);
      for (const label of labels) {
        const code = by[normalizeLabel(label)];
        if (typeof code === "number") locationCodes.push(code);
        else unmappedLabels.push(label);
      }
      if (locationCodes.length) {
        values[Q.locations] = locationCodes.map(String); // array<string>
      }
    }

    // ---------- Displayed fields (string[] of the QIDs we filled) ----------
    const displayedFields: string[] = Object.keys(values).map(k => (k.endsWith("_TEXT") ? k.slice(0, -5) : k)); // base QIDs only

    // ---------- Top-level payload ----------
    const nowISO = new Date().toISOString();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const payload: Record<string, any> = {
      responseStatus: "Complete",
      startDate: nowISO,
      endDate: nowISO,
      finished: true,
      userLanguage: "EN",
      displayedFields,
      values,
    };

    // ---------- Send ----------
    const resp = await fetch(
      `https://${DATACENTER}.qualtrics.com/API/v3/surveys/${SURVEY_ID}/responses`,
      {
        method: "POST",
        headers: { "X-API-TOKEN": API_TOKEN, "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        cache: "no-store",
      }
    );

    const parsed = await parseMaybeJSON(resp);

    if (!resp.ok) {
      // Try to surface Qualtrics' own error message if present
      const message =
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((parsed.json as any)?.meta?.error?.errorMessage as string | undefined) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((parsed.json as any)?.error?.errorMessage as string | undefined) ||
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        ((parsed.json as any)?.message as string | undefined) ||
        "Submission failed. Qualtrics returned an error.";

      return errJson(message, { status: resp.status, isJSON: parsed.isJSON, raw: parsed.text, unmappedLabels }, resp.status);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseId = (parsed.isJSON ? (parsed.json as any)?.result?.responseId : undefined) as string | undefined;
    return NextResponse.json({ ok: true, message: "Your request has been submitted successfully!", responseId, unmappedLabels });
  } catch (e) {
    const err = e as { message?: string };
    return errJson(err?.message ?? "Unknown error");
  }
}
