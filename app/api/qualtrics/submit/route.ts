import { NextRequest, NextResponse } from "next/server";
import { regularSpots } from "@/components/data/regularSpots";
import { SPOT_TO_Q_LOCATION, QLocationLabel } from "@/components/data/spotToQLocation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** ========= QIDs ========= */
const Q = {
  name: "QID3",
  email: "QID4",
  program: "QID7",
  artworkDescription: "QID6",
  installMethods: "QID22",
  covidHandlingExplain: "QID9",
  durationExplain: "QID14",
  whichClass: "QID26",
  preferredDateText: "QID17",
  altResponsibleName: "QID23",

  canInstallSolo: "QID1",
  durationOtherYN: "QID13",
  installType: "QID25",
  soloOrGroupA: "QID27",
  soloOrGroupB: "QID28",
  building: "QID8",

  covidAgree: "QID21",
  locations: "QID2",
} as const;

/** ========= Choice lookups (numbers in Qualtrics) ========= */
const YES_NO = { Yes: 1, No: 2 } as const;
const INSTALL_TYPE = { "Independent installation": 1, "Class-based installation": 2 } as const;
const SOLO_GROUP = { "Solo project": 1, "Group project": 2 } as const;
const BUILDING = {
  "smfa main campus (230 fenway)": 1,
  "smfa mission hill gallery (160 st. alphonsus)": 2,
} as const;

/** ========= Minimal Qualtrics types (enough for what we read) ========= */
type QualtricsChoice = { Display?: string };
type QualtricsQuestion = {
  Answers?: { Choices?: Record<string, QualtricsChoice> };
  Choices?: Record<string, QualtricsChoice>;
};
type SurveyDefinition = {
  result?: { Questions?: Record<string, QualtricsQuestion> };
};

type QualtricsErrorShape = {
  meta?: { error?: { errorMessage?: string } };
  error?: { errorMessage?: string };
  result?: { responseId?: string };
};

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

// Text-entry must be posted as QID_TEXT
function setTE(values: Record<string, unknown>, qid: string, v?: string) {
  if (!qid || v == null || v === "") return;
  values[`${qid}_TEXT`] = v;
}

function toMMDDYYYY(s?: string) {
  if (!s) return undefined;
  if (/^\d{2}-\d{2}-\d{4}$/.test(s)) return s;
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  if (m) {
    const [, y, mm, dd] = m;
    return `${mm}-${dd}-${y}`;
  }
  return s;
}

function spotIdsToTitles(ids: string[] = []) {
  const rs = regularSpots as unknown as Record<string, { title?: string }>;
  const out: string[] = [];
  for (const id of ids.slice(0, 3)) {
    const meta = rs[id];
    out.push(meta?.title ?? id);
  }
  return out;
}

// Parse any kind of response body; echo text when not JSON
async function parseMaybeJSON(resp: Response): Promise<{ json: unknown; text: string; isJSON: boolean }> {
  const text = await resp.text();
  try {
    return { json: JSON.parse(text) as unknown, text, isJSON: true };
  } catch {
    return { json: undefined, text, isJSON: false };
  }
}

/** Cache the location choice map (label -> numeric code) */
let cachedLocChoices: { byLabel: Record<string, number>; at: number } | null = null;
async function getLocationChoiceMap(DC: string, TOKEN: string, SURVEY_ID: string) {
  const FRESH_MS = 10 * 60 * 1000;
  if (cachedLocChoices && Date.now() - cachedLocChoices.at < FRESH_MS) {
    return cachedLocChoices.byLabel;
  }
  const r = await fetch(`https://${DC}.qualtrics.com/API/v3/survey-definitions/${SURVEY_ID}`, {
    headers: { "X-API-TOKEN": TOKEN },
    cache: "no-store",
  });
  const j = (await r.json()) as SurveyDefinition;

  const locQ = j?.result?.Questions?.[Q.locations];
  const choicesSrc = (locQ?.Answers?.Choices ?? locQ?.Choices) as Record<string, QualtricsChoice> | undefined;
  const by: Record<string, number> = {};
  if (choicesSrc) {
    for (const [code, meta] of Object.entries(choicesSrc)) {
      const label = String(meta?.Display ?? "");
      if (label) by[normalizeLabel(label)] = Number(code);
    }
  }
  cachedLocChoices = { byLabel: by, at: Date.now() };
  return by;
}

/** ========= Types ========= */
type WebForm = {
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

  canInstallSolo?: "Yes" | "No";
  durationOtherYN?: "Yes" | "No";
  installType?: keyof typeof INSTALL_TYPE;
  soloOrGroup?: keyof typeof SOLO_GROUP;
  building?: string;

  covidAgree?: boolean;
  spots?: string[];
};

export async function POST(req: NextRequest) {
  const DATACENTER = process.env.QUALTRICS_DATACENTER;
  const API_TOKEN = process.env.QUALTRICS_API_TOKEN;
  const SURVEY_ID = process.env.QUALTRICS_SURVEY_ID;

  if (!DATACENTER || !API_TOKEN || !SURVEY_ID) {
    return NextResponse.json(
      {
        ok: false,
        error: {
          message:
            "Qualtrics environment is not configured. Missing one of QUALTRICS_DATACENTER, QUALTRICS_API_TOKEN, QUALTRICS_SURVEY_ID.",
        },
      },
      { status: 500 }
    );
  }

  try {
    const form: WebForm = await req.json();

    // ---------- Validation ----------
    const missing: string[] = [];
    const t = (s?: string) => (s == null ? s : s.trim());
    if (!t(form.name)) missing.push("Name");
    if (!t(form.email)) missing.push("E‑mail address");
    if (!t(form.program)) missing.push("Program");
    if (!t(form.building)) missing.push("Building");
    if (!form.canInstallSolo) missing.push("Can one person install?");
    if (!t(form.artworkDescription)) missing.push("Artwork description");
    if (!t(form.installMethods)) missing.push("Installation methods");
    if (!t(form.preferredDateText)) missing.push("Desired installation date");
    if (!form.installType) missing.push("Independent/Class‑based");
    if (!form.soloOrGroup) missing.push("Solo/Group");
    if (!form.covidAgree) missing.push("Agreement checkbox");
    if (form.durationOtherYN === "Yes" && !t(form.durationExplain)) missing.push("Duration explanation");
    if (form.canInstallSolo === "No" && !t(form.covidHandlingExplain)) missing.push("Handling plan");
    if (form.installType === "Class-based installation" && !t(form.whichClass)) missing.push("Which class exhibition");

    if (missing.length) {
      return NextResponse.json(
        { ok: false, status: 400, error: { message: `Please complete: ${missing.join(", ")}` } },
        { status: 400 }
      );
    }

    // ---------- Build values ----------
    const values: Record<string, unknown> = {};

    // TE (QID*_TEXT)
    setTE(values, Q.name, t(form.name));
    setTE(values, Q.email, t(form.email));
    setTE(values, Q.program, t(form.program));
    setTE(values, Q.installMethods, t(form.installMethods));
    setTE(values, Q.covidHandlingExplain, t(form.covidHandlingExplain));
    setTE(values, Q.durationExplain, t(form.durationExplain));
    setTE(values, Q.whichClass, t(form.whichClass));
    setTE(values, Q.preferredDateText, toMMDDYYYY(t(form.preferredDateText)));
    setTE(values, Q.altResponsibleName, t(form.altResponsibleName));

    // Description + readable selected locations
    let description = t(form.artworkDescription) ?? "";
    if (form.spots?.length) {
      const selectedTitles = spotIdsToTitles(form.spots);
      description += `\n\nSelected locations (from SMFA map): ${selectedTitles.join(" | ")}`;
    }
    setTE(values, Q.artworkDescription, description);

    // MC singles / checkbox
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
      values[Q.soloOrGroupB] = sg;
    }

    if (form.covidAgree) values[Q.covidAgree] = 1;

    // MC multi‑answer (array<string> codes)
    const locationCodes: number[] = [];
    const unmappedLabels: string[] = [];
    if (form.spots?.length) {
      const mapExplicit = SPOT_TO_Q_LOCATION as unknown as Record<string, QLocationLabel>;
      const rs = regularSpots as unknown as Record<string, { title?: string }>;
      const labelSet = new Set<QLocationLabel>();

      for (const rawId of form.spots.slice(0, 3)) {
        const fromExplicit = mapExplicit[rawId];
        if (fromExplicit) {
          labelSet.add(fromExplicit);
        } else {
          const meta = rs[rawId];
          if (meta?.title) labelSet.add(meta.title as QLocationLabel);
        }
      }

      const by = await getLocationChoiceMap(DATACENTER, API_TOKEN, SURVEY_ID);
      for (const lbl of labelSet) {
        const code = by[normalizeLabel(lbl)];
        if (typeof code === "number") locationCodes.push(code);
        else unmappedLabels.push(lbl);
      }
      if (locationCodes.length) {
        values[Q.locations] = locationCodes.map(String);
      }
    }

    // Displayed fields (base QIDs only)
    const displayedFields = Object.keys(values).map((k) => (k.endsWith("_TEXT") ? k.slice(0, -5) : k));

    // Payload
    const nowISO = new Date().toISOString();
    const payload = {
      responseStatus: "Complete",
      startDate: nowISO,
      endDate: nowISO,
      finished: true,
      userLanguage: "EN",
      displayedFields,
      values,
    };

    // Send
    const resp = await fetch(`https://${DATACENTER}.qualtrics.com/API/v3/surveys/${SURVEY_ID}/responses`, {
      method: "POST",
      headers: { "X-API-TOKEN": API_TOKEN, "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const parsed = await parseMaybeJSON(resp);

    if (!resp.ok) {
      const j = (parsed.json ?? {}) as QualtricsErrorShape;
      const message = j.meta?.error?.errorMessage || j.error?.errorMessage || parsed.text || "Qualtrics request failed.";
      console.error("Qualtrics error:", { status: resp.status, message, raw: parsed.text });
      return NextResponse.json(
        { ok: false, status: resp.status, error: { message }, raw: parsed.text },
        { status: resp.status }
      );
    }

    const j = (parsed.json ?? {}) as QualtricsErrorShape;
    return NextResponse.json({
      ok: true,
      message: "Your request has been submitted successfully!",
      responseId: j.result?.responseId,
    });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    console.error("Route error:", err);
    return NextResponse.json({ ok: false, error: { message: msg } }, { status: 500 });
  }
}
