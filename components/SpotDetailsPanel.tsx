import React, { useState } from "react";

interface SpotDetailsPanelProps {
  latestSpot: string | undefined;
  selectedLocations: string[];
  setSelectedLocations: (val: string[]) => void;
}

export default function SpotDetailsPanel({
  latestSpot,
  selectedLocations,
  setSelectedLocations,
}: SpotDetailsPanelProps) {
  const [clicked, setClicked] = useState(false);

  const handleAdd = () => {
    if (!latestSpot || selectedLocations.includes(latestSpot)) return;
    if (selectedLocations.length >= 3) {
      alert("You can only select up to 3 spots.");
      return;
    }
    setSelectedLocations([...selectedLocations, latestSpot]);
    setClicked(true);
    setTimeout(() => setClicked(false), 200); // quick reset
  };

  return (
    <div className="h-full flex flex-col border border-[#6c584c] px-3 py-3 rounded text-[#6c584c]">
      <h2 className="text-lg font-semibold mb-2">Spot Details</h2>
      {latestSpot ? (
        <>
          <p className="text-sm mb-4">
            You selected <strong>{latestSpot}</strong>. More info
          </p>
          <button
            onClick={handleAdd}
            className={`mt-auto w-full px-4 py-2 rounded text-sm border transition-all duration-200
              ${clicked ? "font-bold" : "font-medium"}
              hover:outline hover:outline-2 hover:outline-[#6c584c]
              cursor-pointer bg-[#6c584c] text-[#f0ead2]`}
          >
            Add
          </button>
        </>
      ) : (
        <p className="text-sm text-gray-200 mt-auto">
          Click a green spot to see details.
        </p>
      )}
    </div>
  );
}
