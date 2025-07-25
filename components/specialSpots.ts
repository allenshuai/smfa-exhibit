export interface SpecialEventCardProps {
  type: "Exhibition" | "Reception";
  title: string;
  dateRange: string;
  imageUrl: string;
  readMoreUrl?: string;
}

export const specialSpots: Record<string, SpecialEventCardProps[]> = {
  B101: [
    {
      type: "Exhibition",
      title: "How do you throw a brick through the window...",
      dateRange: "2 Sep – 9 Nov",
      imageUrl: "https://example.com/image1.jpg",
      readMoreUrl: "https://example.com/exhibit",
    },
    {
      type: "Reception",
      title: "Reception Event Title",
      dateRange: "Sep 4, 6 – 8pm",
      imageUrl: "https://example.com/image2.jpg",
      readMoreUrl: "https://example.com/reception",
    },
  ],
};
