export const brownStaticSpots: Record<
  string,
  {
    title: string;
    description:
      | string
      | {
          text: string;
          color?: string;
        }[];
  }
> = {
  AtriumA100: {
    title: "Weems Atrium",
    description: [
      {
        text: "Programmed by TUAG for the year with the following exhibitions:",
      },
      { text: "Area & Faculty Shows (Fall)", color: "#F26344" },
      { text: "Art Sale (Nov–Dec)", color: "#1B80C4" },
      { text: "Area & Faculty Shows (Spring)", color: "#00B169" },
      { text: "Year-End Shows (May)", color: "#F0609A" },
    ],
  },

    CorridorA100C2: {
    title: "Building A Gallery (BAG)",
    description: [
      {
        text: "Programmed by TUAG for the year with the following exhibitions:",
      },
      { text: "Area & Faculty Shows (Fall)", color: "#F26344" },
      { text: "Art Sale (Nov–Dec)", color: "#1B80C4" },
      { text: "Area & Faculty Shows (Spring)", color: "#00B169" },
      { text: "Year-End Shows (May)", color: "#F0609A" },
    ],
  },
      CorridorA000C1_2: {
    title: "Lowercase Gallery",
    description: [
      {
        text: "Directly managed by TUAG. \nPlease reach out to them for availability.",
      },
    //   { text: "Area & Faculty Shows (Fall)", color: "#F26344" },
    //   { text: "Art Sale (Nov–Dec)", color: "#1B80C4" },
    //   { text: "Area & Faculty Shows (Spring)", color: "#00B169" },
    //   { text: "Year-End Shows (May)", color: "#F0609A" },
    ],

  
  },

    CorridorA000C1: {
    title: "The Well",
    // message:
    //   "Prioritized for faculty shows. Open to proposals from students.",
    description: [
      {
        text: "Programmed by TUAG for the year with the following exhibitions:",
      },
      { text: "Area & Faculty Shows (Fall)", color: "#F26344" },
      { text: "Art Sale (Nov–Dec)", color: "#1B80C4" },
      { text: "Area & Faculty Shows (Spring)", color: "#00B169" },
      { text: "Year-End Shows (May)", color: "#F0609A" },
    ],
  },
};
