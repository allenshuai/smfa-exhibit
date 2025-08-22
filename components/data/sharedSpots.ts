// data/sharedSpots.ts
export const sharedSpots: Record<
  string,
  {
    title: string;
    message: string;     
    priority?: string;   
  }
> = {
  // SMFA LOWER LEVEL (Basement) ***************
  CorridorA000C1: {
    title: "The Well",
    message:
      "Prioritized for faculty shows. Open to proposals from students.",
    priority: "Faculty-priority",
  },
};
