import React from "react";
import { FiX } from "react-icons/fi";

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
    <div className="h-full flex flex-col border bg-[#6c584c] px-3 py-3 rounded text-[#f0ead2]">
      <h2 className="text-lg font-semibold mb-2">Selected Locations (max 3)</h2>
      {selectedLocations.length === 0 ? (
        <p className="text-sm text-gray-300 mb-4">None</p>
      ) : (
        <ul className="ml-1 mb-2 space-y-1">
          {selectedLocations.map((loc) => (
            <li
              key={loc}
              className="text-sm flex items-center justify-between bg-[#f0ead2] text-[#6c584c] px-2 py-1 rounded"
            >
              {loc}
              <button onClick={() => handleRemove(loc)}>
                <FiX className="ml-2 hover:text-red-600" />
              </button>
            </li>
          ))}
        </ul>
      )}

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
