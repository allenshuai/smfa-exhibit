"use client";
import { useState } from "react";

const buildings = {
  SMFA: ["Basement", "Level 1", "Level 2", "Level 3"],
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
  const [hoveredBuilding, setHoveredBuilding] = useState<string | null>(null);

  return (
    <div className="text-sm font-medium text-[#6c584c] space-y-4 w-[180px] text-right relative z-10">
      {Object.entries(buildings).map(([building, floors]) => {
        const isSelected = selected.building === building;
        const isOpen = hoveredBuilding === building;

        return (
          <div
            key={building}
            onMouseEnter={() => setHoveredBuilding(building)}
            onMouseLeave={() => setHoveredBuilding(null)}
            className="relative"
          >
            {/* Building Name */}
            <div
              className={`cursor-pointer uppercase truncate ${
                isSelected ? "font-bold text-[#6c584c]" : "text-gray-500 hover:text-[#4e4439]"
              }`}
              style={{ direction: "rtl" }} // this helps align text to the right while letting it grow left
              
              // back-up plan
              // style={{
              //   direction: "rtl",
              //   whiteSpace: "nowrap",         // prevents wrapping
              //   overflow: "visible",           //allow overflow
              //   textOverflow: "clip",          // disables the "..."
              // }}
            >
              {isSelected ? `${building} | ${selected.floor}` : building}
            </div>

            {/* Floor submenu (shown underneath) */}
            {isOpen && (
              <ul className="mt-2 space-y-1 border-r border-[#6c584c] pr-2">
                {floors.map((floor) => (
                  <li
                    key={floor}
                    onClick={() => {
                      setSelected({ building, floor });
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
