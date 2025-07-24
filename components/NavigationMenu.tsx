"use client";
import { useState } from "react";

const buildings = {
  "SMFA": ["Basement", "Level 1", "Level 2", "Level 3"],
  "Barnum Hall": ["Level B", "Level 2"],
  "Lane Hall": ["Level 1"],
  "Aidekman Arts Center": ["Level 1"],
  "Mission Hill": ["Level 1", "Level 2"],
};

export default function BuildingFloorMenu({
  selected,
  setSelected,
}: {
  selected: { building: string; floor: string };
  setSelected: (val: { building: string; floor: string }) => void;
}) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      className="fixed top-20 left-6 z-10 flex text-sm font-medium"
      onMouseLeave={() => setHovered(null)}
    >
      {/* Left: Buildings */}
      <ul className="space-y-2 pr-6">
        {Object.keys(buildings).map((building) => {
          const isSelected = selected.building === building;
          return (
            <li
              key={building}
              onMouseEnter={() => setHovered(building)}
              className={`cursor-pointer uppercase ${
                isSelected ? "font-bold" : "text-gray-500 hover:text-black"
              }`}
            >
              {isSelected
                ? `${building} | ${selected.floor}`
                : building}
            </li>
          );
        })}
      </ul>

      {/* Right: Floors */}
      {hovered && (
        <ul className="pl-6 border-l border-black space-y-2 min-w-[120px]">
          {buildings[hovered].map((floor) => (
            <li
              key={floor}
              onClick={() => {
                setSelected({ building: hovered, floor });
                setHovered(null);
              }}
              className="cursor-pointer text-gray-600 hover:text-black"
            >
              {floor}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
