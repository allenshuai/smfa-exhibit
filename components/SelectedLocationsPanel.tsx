import React from "react";
import { FiX } from "react-icons/fi";
import { regularSpots } from '@/components/data/regularSpots';

type SpotMeta = { title?: string };
const RS: Record<string, SpotMeta> = regularSpots as Record<string, SpotMeta>;
const idToTitle = (id: string): string => RS[id]?.title ?? id;


interface SelectedLocationsPanelProps {
  selectedLocations: string[];
  setShowRequestForm: (val: boolean) => void;
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function SelectedLocationsPanel({
  selectedLocations,
  setShowRequestForm,
  setSelectedLocations,
}: SelectedLocationsPanelProps) {
  const handleRemove = (id: string) => {
    setSelectedLocations(selectedLocations.filter((loc) => loc !== id));
  };

  return (
    <div className="h-full flex flex-col border bg-[#6c584c] px-3 py-3 rounded text-[#f0ead2] overflow-hidden">
      <h2 className="text-lg font-semibold mb-2">Selected Locations (max 3)</h2>
      
      <div className="flex-1 min-h-0 overflow-y-auto mb-2">
        {selectedLocations.length === 0 ? (
          <p className="text-sm text-gray-300">None</p>
        ) : (
          <ul className="ml-1 space-y-1 pr-1">
            {selectedLocations.map((loc) => (
              <li
                key={loc}
                className="text-sm flex items-center justify-between bg-[#f0ead2] text-[#6c584c] px-2 py-1 rounded"
              >
                {idToTitle(loc)}
                <button onClick={() => handleRemove(loc)} aria-label={`Remove ${idToTitle(loc)}`}>
                  <FiX className="ml-2 hover:text-red-600" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <button
        onClick={() => {
          if (selectedLocations.length > 0) setShowRequestForm(true);
        }}
        disabled={selectedLocations.length === 0}
        className={`mt-auto w-full px-6 py-2 rounded text-sm font-semibold cursor-pointer ${
          selectedLocations.length === 0
            ? "bg-gray-400 text-white cursor-not-allowed"
            : "bg-[#f0ead2] text-[#6c584c] hover:font-bold"
        }`}
      >
        Request to Install
      </button>
    </div>
  );
}
