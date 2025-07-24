import React, { useState } from "react";
// import { X } from "lucide-react"; // Make sure you have lucide-react installed
import {
  X,
  MapPin,
  CirclePlus,
  Inbox,
  CheckCircle,
} from 'lucide-react';


interface SpotDetailsPanelProps {
  latestSpot: string | undefined;
  selectedLocations: string[];
  setSelectedLocations: (val: string[]) => void;
  setLatestSpot: (val: string | undefined) => void;
}

export default function SpotDetailsPanel({
  latestSpot,
  selectedLocations,
  setSelectedLocations,
  setLatestSpot,
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

  const handleClose = () => {
    setLatestSpot(undefined);
  };

  return (
    <div className="relative h-full flex flex-col border border-[#6c584c] px-3 py-3 rounded text-[#6c584c]">
      {/* Close icon */}
      {latestSpot && (
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-[#6c584c] hover:text-[#4b463d]"
        >
          <X size={18} />
        </button>
      )}

      <h2 className="text-lg font-semibold mb-2">Details & Availability</h2>
      {latestSpot ? (
        <>
          <p className="text-sm mb-4">
            You selected <strong>{latestSpot}</strong>. More info
          </p>
          <button
            onClick={handleAdd}
            className={`mt-auto w-full px-4 py-2 rounded text-sm border transition-all duration-200
              ${clicked ? "font-bold" : "font-medium"}
              hover:outline hover:outline-[#6c584c]
              cursor-pointer bg-[#6c584c] text-[#f0ead2]`}
          >
            Add
          </button>
        </>
      ) : (
        <div className="text-sm text-gray-800 mt-auto space-y-2">
          {/* <p>Click a green spot to see details.</p> */}
          <div className="text-sm text-[#6c584c] space-y-2">
            <div className="flex items-start gap-2">
              <MapPin className="text-[#F26344]" size={16} />
              <span>
                1) <strong>Find</strong> the available green spots
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CirclePlus className="text-[#1B80C4]" size={16} />
              <span>
                2) <strong>Add</strong> it to your cart
              </span>
            </div>
            <div className="flex items-start gap-2">
              <Inbox className="text-[#00B169]" size={16} />
              <span>
                3) <strong>Request</strong> up to 3 locations
              </span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="text-[#F0609A]" size={16} />
              <span>
                4) <strong>Submit</strong> to be reviewed
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
