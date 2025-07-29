import React, { useState } from "react";
import {
  X,
  MapPin,
  CirclePlus,
  Inbox,
  CheckCircle,
} from "lucide-react";
import { specialSpots } from "../tufts-event-scrapper/specialSpots.generated";

import SpecialEventCard from "./SpecialEventCard";
import { regularSpots } from './data/regularSpots';
import { orangeSpots } from './data/orangeSpots';
import { brownStaticSpots } from './data/brownStaticSpots';

import Image from "next/image";

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
  const spotData = latestSpot ? regularSpots[latestSpot] : undefined;
  const orangeData = latestSpot ? orangeSpots[latestSpot] : undefined;
  const staticBrownData = latestSpot ? brownStaticSpots[latestSpot] : undefined;
  const specialCards = latestSpot ? specialSpots[latestSpot] ?? [] : [];

  const [clicked, setClicked] = useState(false);

  const handleAdd = () => {
    if (!latestSpot || selectedLocations.includes(latestSpot)) return;
    if (selectedLocations.length >= 3) {
      alert("You can only select up to 3 spots.");
      return;
    }
    setSelectedLocations([...selectedLocations, latestSpot]);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  const handleClose = () => {
    setLatestSpot(undefined);
  };

  return (
    <div className="relative h-full max-h-full flex flex-col border border-[#6c584c] px-3 py-3 rounded text-[#6c584c]">
      <div className="flex-1 overflow-y-auto">
        {/* ❌ Close Button */}
        {latestSpot && (
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-[#6c584c] hover:text-[#4b463d]"
          >
            <X size={18} />
          </button>
        )}

        {/* Header */}
        <h2 className="text-lg font-bold mb-3">
          {specialCards.length > 0
            ? "Special Occasion ONLY"
            : orangeData
            ? "Department-Managed Spot"
            : "Details & Availability"}
        </h2>

        {/* 📌 Special Event Cards */}
        {specialCards.length > 0 && (
          <div className="mt-3 -mx-3 px-3 overflow-x-auto">
            <div className="flex gap-3 w-max pr-2">
              {specialCards.map((item, idx) => (
                <SpecialEventCard key={idx} {...item} index={idx} />
              ))}
            </div>
          </div>
        )}

        {/* 🟠 Orange Spot (Department-managed) */}
        {latestSpot && specialCards.length === 0 && orangeData && (
          <div className="text-sm text-[#6c584c] border border-[#6c584c] bg-[#f0ead2] rounded p-4 mb-4">
            <p className="font-semibold mb-2">{orangeData.title}</p>
            <p className="whitespace-pre-line">{orangeData.message}</p>
            {/* {orangeData?.message.map((line, idx) => (
              <p key={idx} className="mb-1 whitespace-pre-line">{line}</p>
            ))} */}
          </div>
        )}

        {/* 🟤 Brown Spot with Manual Description */}
        {latestSpot && specialCards.length === 0 && staticBrownData && (
          <>
            <p className="text-sm mb-2">
              <strong>{staticBrownData.title}</strong>
            </p>
            
            {Array.isArray(staticBrownData.description) ? (
              <div className="text-sm space-y-1 mb-4">
                {staticBrownData.description.map((line, idx) => (
                  <p key={idx} className="flex items-center gap-2">
                    {line.color && (
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: line.color }}
                      ></span>
                    )}
                    <span>{line.text}</span>
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-sm mb-4">{staticBrownData.description}</p>
            )}
          </>
        )}

        {/* 🟢 Regular Spot */}
        {latestSpot && specialCards.length === 0 && !orangeData && !staticBrownData && (
          <>
            <p className="text-sm mb-2">
              You selected <strong>{spotData?.title || latestSpot}</strong>.
            </p>

            {spotData?.images && spotData.images.length > 0 ? (
              <div className="flex overflow-x-auto gap-3 mb-4 pr-2">
                {spotData.images.map((url, idx) => (
                  <Image
                    key={idx}
                    src={url}
                    alt={`Image ${idx + 1}`}
                    width={250}
                    height={180}
                    className="rounded border border-[#6c584c] flex-shrink-0"
                  />
                ))}
              </div>
            ) : (
              <div className="text-sm italic text-gray-500 mb-4">
                More images coming soon!
              </div>
            )}

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
        )}

        {/* 📝 Default Instructions */}
        {!latestSpot && (
          <div className="text-sm text-[#6c584c] space-y-2 mt-auto">
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
        )}
      </div>
    </div>
  );
}
