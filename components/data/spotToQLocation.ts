// components/data/spotToQLocation.ts

/** Qualtrics QID2 labels (must match survey wording exactly) */
export type QLocationLabel =
  | "Lowercase Gallery"
  | "Lower Mural"
  | "Building A Gallery (BAG)"
  | "Felipe Gallery"
  | "Vending Gallery II"
  | "Vending Gallery I"
  | "Other (Please specify)"
  | "The Well"
  | "Edwin Gallery"
  | "Walter Gallery"
  | "Terrace Gallery I"
  | "Terrace Gallery II"
  | "Dean Suite Monitor"
  | "Annalee Gallery I"
  | "Annalee Gallery II"
  | "Annalee Gallery Corner"
  | "Darin Gallery";

/** Explicit spot → Qualtrics location mapping (extend as needed) */
export const SPOT_TO_Q_LOCATION: Record<string, QLocationLabel> = {
  // From your paste:
  CorridorA000C2: "Felipe Gallery",
  CorridorB000C1: "Vending Gallery I",
  CorridorB000C2: "Vending Gallery II",
  CorridorA000C1: "The Well",
  CorridorA000C2_2: "Lower Mural",
  CorridorA000C1_2: "Lowercase Gallery",

  CorridorA100C1: "Walter Gallery",
  CorridorA100C2: "Building A Gallery (BAG)",

  CorridorA200C4: "Edwin Gallery",
  CorridorB200C1: "Terrace Gallery I",
  CorridorB200C2: "Terrace Gallery II",
  DeanSuiteTVDisplay: "Dean Suite Monitor",

  CorridorA300C2: "Annalee Gallery I",
  CorridorA300C3: "Annalee Gallery II",
  DarinGallery: "Darin Gallery",
  CorridorA300C4: "Annalee Gallery Corner",
};
