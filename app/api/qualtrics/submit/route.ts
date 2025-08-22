// /app/api/qualtrics/submit/route.ts
import { NextRequest, NextResponse } from "next/server";
import { regularSpots } from "@/components/data/regularSpots";
import { SPOT_TO_Q_LOCATION, QLocationLabel } from "@/components/data/spotToQLocation";

/** ========= QIDs from your latest list-questions =========
 * Do NOT set values for DB items (QID5 intro, QID18 date note)
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
  building: "QID8",

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
// Building option 2 label contains HTML; normalize before matching.
const BUILDING = {
  "smfa main campus (230 fenway)": 1,
  "smfa mission hill gallery (160 st. alphonsus)": 2,
} as const;

/** ========= Helpers ========= */
function normalizeLabel(s: string) {
  return String(s).replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim().toLowerCase();
}

function mcCodeNum<T extends Record<string, number>>(val: string | undefined, table: T) {
  if (!val) return undefined;
  const normalized = normalizeLabel(val);
  const code = (table as Record<string, number>)[val] ?? (table as Record<string, number>)[normalized];
  return typeof code === "number" ? code : undefined;
}

// TE must be posted to QID_TEXT
function setTE(values: Record<string, unknown>, qid: string, v?: string) {
  if (!qid || v == null || v === "") return;
  values[`${qid}_TEXT`] = v;
}

function toMMDDYYYY(s?: string) {
  if (!s) return undefined;
  if (/^\d{2}-\d{2}-\d{4}$/.test(s)) return s; // already MM-DD-YYYY
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (m) {
    const [, y, mm, dd] = m;
    return `${mm}-${dd}-${y}`;
  }
  return s;
}

function spotIdsToTitles(ids: string[] = []) {
  const out: string[] = [];
  for (const id of ids.slice(0, 3)) {
    const meta = (regularSpots as Record<string, { title?: string } | undefined>)[id];
    out.push(meta?.title ?? id);
  }
  return out;
}

/** Robust parse (Qualtrics sometimes returns non-JSON) */
async function parseMaybeJSON(resp: Response): Promise<{ json: unknown | null; text: string; isJSON: boolean }> {
  const text = await resp.text();
  try {
    return { json: JSON.parse(text) as unknown, text, isJSON: true };
  } catch {
    return { json: null, text, isJSON: false };
  }
}

/** Cache the locations choice map (label -> numeric code) */
let cachedLocChoices: { byLabel: Record<string, number>; at: number } | null = null;

type SurveyDefinition = {
  result?: {
    Questions?: Record<
      string,
      {
        Answers?: { Choices?: Record<string, { Display?: string }> };
        Choices?: Record<string, { Display?: string }>;
      }
    >;
  };
};

async function getLocationChoiceMap(DATACENTER: string, TOKEN: string, SURVEY_ID: string) {
  const FRESH_MS = 10 * 60 * 1000;
  if (cachedLocChoices && Date.now() - cachedLocChoices.at < FRESH_MS) {
    return cachedLocChoices.byLabel;
  }
  const r = await fetch(`https://${DATACENTER}/API/v3/survey-definitions/${SURVEY_ID}`, {
    headers: { "X-API-TOKEN": TOKEN },
    cache: "no-store",
  });
  const j = (await r.json()) as SurveyDefinition;

  const locQ = j?.result?.Questions?.[Q.locations];
  const choicesObj = locQ?.Answers?.Choices ?? locQ?.Choices ?? {};
  const by: Record<string, number> = {};

  for (const [code, meta] of Object.entries(choicesObj as Record<string, { Display?: string }>)) {
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
    const meta = (regularSpots as Record<string, { title?: string } | undefined>)[rawId];
    const t = meta?.title as QLocationLabel | undefined;
    if (t) out.add(t);
  }
  return Array.from(out);
}

/** ========= Incoming body ========= */
type WebForm = {
  // TE
  name?: string;
  email?: string;
  program?: string;
  artworkDescription?: string;
  installMethods?: string;
  covidHandlingExplain?: string;
  durationExplain?: string;
  whichClass?: string;
  preferredDateText?: string;
  altResponsibleName?: string;

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

export async function POST(req: NextRequest) {
  // ========= Normalize env (trim and strip protocol) =========
  const RAW_DC = (process.env.QUALTRICS_DATACENTER ?? "").trim();
  const DATACENTER = RAW_DC.replace(/^https?:\/\//i, "").replace(/\/+$/i, "").toLowerCase();
  const API_TOKEN = (process.env.QUALTRICS_API_TOKEN ?? "").trim();
  const SURVEY_ID = (process.env.QUALTRICS_SURVEY_ID ?? "").trim();

  if (!DATACENTER || !API_TOKEN || !SURVEY_ID) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Missing Qualtrics configuration. Please set QUALTRICS_DATACENTER, QUALTRICS_API_TOKEN, and QUALTRICS_SURVEY_ID.",
      },
      { status: 500 }
    );
  }

  try {
    const form: WebForm = await req.json();

    // ---------- Validation ----------
    const missing: string[] = [];
    if (!form.name) missing.push("Name");
    if (!form.email) missing.push("E‑mail address");
    if (!form.program) missing.push("Program");
    if (!form.building) missing.push("Building");
    if (!form.canInstallSolo) missing.push("Can one person install?");
    if (!form.artworkDescription) missing.push("Artwork description");
    if (!form.installMethods) missing.push("Installation methods");
    if (!form.preferredDateText) missing.push("Desired installation date");
    if (!form.installType) missing.push("Independent/Class‑based");
    if (!form.soloOrGroup) missing.push("Solo/Group");
    if (!form.covidAgree) missing.push("Agreement checkbox");
    if (form.durationOtherYN === "Yes" && !form.durationExplain) missing.push("Duration explanation");
    if (form.canInstallSolo === "No" && !form.covidHandlingExplain) missing.push("Handling plan");
    if (form.installType === "Class-based installation" && !form.whichClass) missing.push("Which class exhibition");

    if (missing.length) {
      return NextResponse.json(
        { ok: false, status: 400, error: { message: `Please complete: ${missing.join(", ")}` } },
        { status: 400 }
      );
    }

    // ---------- Build values ----------
    const values: Record<string, unknown> = {};
    const trim = (s?: string) => (s == null ? s : s.trim());

    // TE (goes to QID*_TEXT)
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

    if (form.building) {
      const bCode = mcCodeNum(form.building, BUILDING);
      if (typeof bCode === "number") values[Q.building] = bCode;
    }

    const it = mcCodeNum(form.installType, INSTALL_TYPE);
    if (it !== undefined) values[Q.installType] = it;

    const sg = mcCodeNum(form.soloOrGroup, SOLO_GROUP);
    if (sg !== undefined) {
      values[Q.soloOrGroupA] = sg;
      values[Q.soloOrGroupB] = sg; // mirrored question shows same choice
    }

    if (form.covidAgree) values[Q.covidAgree] = 1; // number

    // MC multi-answer: locations (QID2) → ARRAY OF STRING CODES (works with Qualtrics)
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
    const displayedFields: string[] = Object.keys(values).map((k) => (k.endsWith("_TEXT") ? k.slice(0, -5) : k));

    // ---------- Top-level payload ----------
    const nowISO = new Date().toISOString();
    const payload: {
      responseStatus: "Complete";
      startDate: string;
      endDate: string;
      finished: boolean;
      userLanguage: "EN";
      displayedFields: string[];
      values: Record<string, unknown>;
    } = {
      responseStatus: "Complete",
      startDate: nowISO,
      endDate: nowISO,
      finished: true,
      userLanguage: "EN",
      displayedFields,
      values,
    };

    // ---------- Send ----------
    const resp = await fetch(`https://${DATACENTER}/API/v3/surveys/${SURVEY_ID}/responses`, {
      method: "POST",
      headers: { "X-API-TOKEN": API_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const parsed = await parseMaybeJSON(resp);

    if (!resp.ok) {
      return NextResponse.json(
        {
          ok: false,
          status: resp.status,
          isJSON: parsed.isJSON,
          error: parsed.isJSON ? parsed.json : { message: "Non‑JSON response from Qualtrics" },
          raw: parsed.text,
          debugPayload: payload,
          unmappedLabels,
        },
        { status: resp.status }
      );
    }

    // Extract responseId if present
    const responseId =
      (parsed.isJSON &&
        typeof parsed.json === "object" &&
        parsed.json !== null &&
        // @ts-expect-error minimal shape check
        parsed.json.result?.responseId) ||
      undefined;

    return NextResponse.json({
      ok: true,
      message: "Your request has been submitted successfully!",
      responseId,
      unmappedLabels,
    });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: msg }, { status: 500 });
  }
}
