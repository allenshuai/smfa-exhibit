// components/data/allSpots.ts

export type SpotType = "green" | "orange" | "brown" | "shared";

export interface SpotMeta {
  id: string;
  type: SpotType;
  building: string;
  floor: string;
  title?: string;
} 

export const allSpots: SpotMeta[] = [
// SMFA BASEMENT **************************************************
  {
    id: "CorridorA000C2",
    type: "green",
    building: "SMFA",
    floor: "Basement",
    title: "Corridor A000C2",
  },
  {
    id: "CorridorA000C2_2",
    type: "green",
    building: "SMFA",
    floor: "Basement",
    title: "Corridor A000C2_2",
  },
  {
    id: "CorridorA000C1",
    type: "shared",
    building: "SMFA",
    floor: "Basement",
    title: "The Well",
  },
    {
    id: "CorridorA000C1_2",
    type: "green",
    building: "SMFA",
    floor: "Basement",
    title: "Lowercase Gallery",
  },
    {
    id: "CorridorB000C1",
    type: "green",
    building: "SMFA",
    floor: "Basement",
    title: "Corridor B000C1",
  },
    {
    id: "CorridorB000C2",
    type: "green",
    building: "SMFA",
    floor: "Basement",
    title: "Corridor B000C2",
  },
    {
    id: "CorridorB000C3",
    type: "orange",
    building: "SMFA",
    floor: "Basement",
    title: "Corridor B000C3",
  },

// SMFA LEVEL 1 **************************************************
  {
    id: "CorridorA100C2",
    type: "brown",
    building: "SMFA",
    floor: "Level 1",
    title: "Corridor A100C2",
  },
  {
    id: "CorridorA100C5",
    type: "brown",
    building: "SMFA",
    floor: "Level 1",
    title: "Corridor A100C5",
  },
  {
    id: "CorridorA100C1",
    type: "green",
    building: "SMFA",
    floor: "Level 1",
    title: "Walter Gallery",
  },
  {
    id: "AtriumA100",
    type: "brown",
    building: "SMFA",
    floor: "Level 1",
    title: "Weems Atrium",
  },
  {
    id: "GrossmanGalleryB101",
    type: "brown",
    building: "SMFA",
    floor: "Level 1",
    title: "Grossman Gallery",
  },
  {
    id: "AndersonAuditoriumB105",
    type: "brown",
    building: "SMFA",
    floor: "Level 1",
    title: "Anderson Auditorium",
  },
    {
    id: "CorridorB100C2",
    type: "shared",
    building: "SMFA",
    floor: "Level 1",
    title: "Building A Gallery BAG",
  },

// SMFA LEVEL 2 **************************************************
  {
    id: "CorridorA200C4",
    type: "green",
    building: "SMFA",
    floor: "Level 2",
    title: "Corridor A200C4",
  },
  {
    id: "CorridorA200C5",
    type: "orange",
    building: "SMFA",
    floor: "Level 2",
    title: "Corridor A200C5",
  },
  {
    id: "CorridorB200C1",
    type: "green",
    building: "SMFA",
    floor: "Level 2",
    title: "Corridor B200C1",
  },
  {
    id: "CorridorB200C2",
    type: "green",
    building: "SMFA",
    floor: "Level 2",
    title: "Corridor B200C2",
  },
  {
    id: "CorridorM200C1",
    type: "orange",
    building: "SMFA",
    floor: "Level 2",
    title: "Corridor M200C1",
  },

// SMFA LEVEL 3 **************************************************
  {
    id: "CorridorA300C2",
    type: "green",
    building: "SMFA",
    floor: "Level 3",
    title: "Corridor A300C2",
  },
  {
    id: "CorridorA300C3",
    type: "green",
    building: "SMFA",
    floor: "Level 3",
    title: "Corridor A300C3",
  },
  {
    id: "CorridorA300C4",
    type: "green",
    building: "SMFA",
    floor: "Level 3",
    title: "Corridor A300C4",
  },
  {
    id: "CorridorB300C1",
    type: "orange",
    building: "SMFA",
    floor: "Level 3",
    title: "Corridor B300C1",
  },
  {
    id: "CorridorB300C2",
    type: "orange",
    building: "SMFA",
    floor: "Level 3",
    title: "Corridor B300C2",
  },

// Aidekman **************************************************
  {
    id: "ExhibitM019040",
    type: "brown",
    building: "Aidekman",
    floor: "Level 1",
    title: "Exhibit M019040",
  },
  {
    id: "ExhibitM019112",
    type: "brown",
    building: "Aidekman",
    floor: "Level 1",
    title: "Exhibit M019112",
  },
  {
    id: "CorridorM019100H",
    type: "brown",
    building: "Aidekman",
    floor: "Level 1",
    title: "Corridor M019100H",
  },
  {
    id: "CorridorM019100H3",
    type: "brown",
    building: "Aidekman",
    floor: "Level 1",
    title: "Corridor M019100H3",
  },

// BARNUM LEVEL 0 **************************************************
  {
    id: "CorridorLLH0",
    type: "green",
    building: "Barnum",
    floor: "Level 0",
    title: "Corridor LLH0",
  },
  {
    id: "CorridorLLH1",
    type: "green",
    building: "Barnum",
    floor: "Level 0",
    title: "Corridor LLH1",
  },

// BARNUM LEVEL 2 **************************************************
// none

// LANE LEVEL 1 **************************************************
  {
    id: "HALLWAY",
    type: "orange",
    building: "Lane",
    floor: "Level 1",
    title: "HALLWAY",
  },

// MISSION HILL LEVEL 1 **************************************************

// MISSION HILL LEVEL 2 **************************************************

];

export const allSpotsMap: Record<string, SpotMeta> = Object.fromEntries(
  allSpots.map((s) => [s.id, s])
);
