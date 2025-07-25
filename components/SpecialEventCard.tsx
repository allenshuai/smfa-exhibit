import React from "react";
import type { SpecialEventCardProps } from "./specialSpots"; // reuse the type

export default function SpecialEventCard({
  type,
  title,
  dateRange,
  imageUrl,
  readMoreUrl,
}: SpecialEventCardProps) {
  const isExhibition = type === "Exhibition";
  const bgColor = isExhibition ? "#F26344" : "#F0609A";
  const textColor = isExhibition ? "#ffd9d1" : "#ffd9f1";
  const circleColor = isExhibition ? "#742f21" : "#5e284a";
  const typeTextColor = isExhibition ? "#742f21" : "#5e284a";

  return (
    <div
      className="rounded-xl shadow-sm w-[230px] flex-shrink-0 overflow-hidden flex flex-col p-3"
      style={{ backgroundColor: bgColor, color: textColor }}
    >
      <div className="text-xs flex items-center gap-2 mb-2" style={{ color: typeTextColor }}>
        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: circleColor }} />
        <span className="font-bold">{type}</span>
      </div>

      <img
        src={imageUrl}
        alt={title}
        className="rounded-md h-[100px] w-full object-cover mb-3"
      />

      <p className="text-sm font-semibold leading-tight">{title}</p>
      <p className="text-xs mt-1">{dateRange}</p>

      {readMoreUrl && (
        <div className="mt-auto flex justify-end">
          <a
            href={readMoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs underline font-medium"
            style={{ color: textColor }}
          >
            Read more →
          </a>
        </div>
      )}
    </div>
  );
}
