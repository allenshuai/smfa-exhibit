"use client";
import { useState } from "react";

// Define building-floor mapping as const
const buildings = {
  SMFA: ["Basement", "Level 1", "Level 2", "Level 3"],
  "Barnum Hall": ["Level B", "Level 2"],
  // "Lane Hall": ["Level 1"],
  // "Aidekman Arts Center": ["Level 1"],
  // "Mission Hill": ["Level 1", "Level 2"],
} as const;

type Building = keyof typeof buildings;
type Floor = (typeof buildings)[Building][number]; // union of all valid floor strings

interface BuildingFloorMenuProps {
  selected: {
    building: Building;
    floor: Floor;
  };
  setSelected: (val: { building: Building; floor: Floor }) => void;
}

export default function BuildingFloorMenu({
  selected,
  setSelected,
}: BuildingFloorMenuProps) {
  const [hoveredBuilding, setHoveredBuilding] = useState<Building | null>(null);

  return (
    <div className="text-sm font-medium text-[#6c584c] space-y-4 w-[180px] text-right relative z-10">
      {Object.entries(buildings).map(([building, floors]) => {
        const isSelected = selected.building === building;
        const isOpen = hoveredBuilding === building;

        return (
          <div
            key={building}
            onMouseEnter={() => setHoveredBuilding(building as Building)}
            onMouseLeave={() => setHoveredBuilding(null)}
            className="relative"
          >
            <div
              className={`cursor-pointer uppercase truncate ${
                isSelected ? "font-bold text-[#6c584c]" : "text-gray-500 hover:text-[#4e4439]"
              }`}
              style={{ direction: "rtl" }}
            >
              {isSelected ? `${building} | ${selected.floor}` : building}
            </div>

            {isOpen && (
              <ul className="mt-2 space-y-1 border-r border-[#6c584c] pr-2">
                {floors.map((floor) => (
                  <li
                    key={floor}
                    onClick={() => {
                      setSelected({ building: building as Building, floor: floor as Floor });
                      setHoveredBuilding(null);
                    }}
                    className="cursor-pointer text-gray-600 hover:text-black text-right"
                  >
                    {floor}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
}
