import React, { useState } from "react";
import {
  X,
  MapPin,
  CirclePlus,
  Inbox,
  CheckCircle,
  Info,
} from "lucide-react";
import { specialSpots } from "../tufts-event-scrapper/specialSpots.generated";

import SpecialEventCard from "./SpecialEventCard";
import { regularSpots } from "./data/regularSpots";
import { orangeSpots } from "./data/orangeSpots";
import { brownStaticSpots } from "./data/brownStaticSpots";
import { sharedSpots } from "./data/sharedSpots";

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
  const sharedData = latestSpot ? sharedSpots[latestSpot] : undefined;
  const specialCards = latestSpot ? specialSpots[latestSpot] ?? [] : [];

  const [clicked, setClicked] = useState(false);

  const isOrange = Boolean(orangeData);
  const isBrown = Boolean(staticBrownData);
  const isShared = Boolean(sharedData);

  const handleAdd = () => {
    if (!latestSpot) return;
    if (selectedLocations.includes(latestSpot)) return;
    if (selectedLocations.length >= 3) {
      alert("You can only select up to 3 spots.");
      return;
    }
    // Orange spots are department-managed → do not allow adding
    if (isOrange) return;

    setSelectedLocations([...selectedLocations, latestSpot]);
    setClicked(true);
    setTimeout(() => setClicked(false), 200);
  };

  const handleClose = () => {
    setLatestSpot(undefined);
  };

  const canShowAddButton =
    !!latestSpot &&
    specialCards.length === 0 &&
    !isOrange &&
    !isBrown; // green or shared


  // function guardedWheel(e: React.WheelEvent<HTMLDivElement>) {
  //   const el = e.currentTarget;

  //   // Make vertical two-finger scroll act horizontally for carousels
  //   if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
  //     el.scrollLeft += e.deltaY;
  //     e.preventDefault();
  //   }

  //   // Only capture the gesture if we can still scroll inside
  //   const atStart = el.scrollLeft <= 0;
  //   const atEnd = el.scrollLeft + el.clientWidth >= el.scrollWidth - 1;
  //   const goingLeft = (e.deltaX < 0) || (e.deltaY < 0);
  //   const goingRight = (e.deltaX > 0) || (e.deltaY > 0);
  //   const canScroll = (goingLeft && !atStart) || (goingRight && !atEnd);

  //   if (canScroll) e.stopPropagation();
  // }

  return (
    <div className="relative h-full flex flex-col border border-[#6c584c] px-3 py-3 rounded text-[#6c584c] overflow-hidden">
      {/* ❌ Close Button */}
      {latestSpot && (
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-[#6c584c] hover:text-[#4b463d]"
        >
          <X size={18} />
        </button>
      )}

      {/* Header (non-scrolling) */}
      <h2 className="text-lg font-bold mb-3 pr-6 flex-none">
        {specialCards.length > 0
          ? "Special Occasion ONLY"
          : isOrange
          ? "Department-Managed Spot"
          : isShared
          ? "Shared Space — Open to Proposals"
          : "Details & Availability"}
      </h2>

      {/* Scrollable content */}
      <div className="flex-1 min-h-0 overflow-y-auto">
        {/* 🎟️ Special event cards */}
        {specialCards.length > 0 && (
          <div className="mt-3 -mx-3 px-3 overflow-x-auto">
            <div className="flex gap-3 w-max pr-2">
              {specialCards.map((item, idx) => (
                <SpecialEventCard key={idx} {...item} index={idx} />
              ))}
            </div>
          </div>
          // <div
          //   className="mt-3 -mx-3 px-3 overflow-x-auto"
          //   style={{
          //     touchAction: "pan-x",
          //     overscrollBehaviorInline: "contain",
          //     WebkitOverflowScrolling: "touch",
          //   }}
          //   onWheel={guardedWheel}
          //   onPointerDown={(e) => e.stopPropagation()}
          // >
          //   <div className="flex gap-3 w-max pr-2 snap-x snap-mandatory">
          //     {specialCards.map((item, idx) => (
          //       <div className="snap-start">
          //         <SpecialEventCard {...item} index={idx} />
          //       </div>
          //     ))}
          //   </div>
          // </div>

        )}

        {/* 🟠 Orange Spot (Department-managed) */}
        {latestSpot && specialCards.length === 0 && isOrange && (
          <div className="text-sm text-[#6c584c] border border-[#6c584c] bg-[#f0ead2] rounded p-4 mb-4">
            <p className="font-semibold mb-2">{orangeData!.title}</p>
            <p className="whitespace-pre-line">{orangeData!.message}</p>
          </div>
        )}

        {/* 🟤 Brown Spot (Static info) */}
        {latestSpot && specialCards.length === 0 && isBrown && (
          <>
            <p className="text-sm mb-2">
              <strong>{staticBrownData!.title}</strong>
            </p>

            {Array.isArray(staticBrownData!.description) ? (
              <div className="text-sm space-y-1 mb-4">
                {staticBrownData!.description.map((line, idx) =>
                  typeof line === "string" ? (
                    <p key={idx}>{line}</p>
                  ) : (
                    <p key={idx} className="flex items-center gap-2">
                      {line.color && (
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: line.color }}
                        />
                      )}
                      <span>{line.text}</span>
                    </p>
                  )
                )}
              </div>
            ) : (
              <p className="text-sm mb-4">{staticBrownData!.description}</p>
            )}
          </>
        )}

        {/* 🟢 Regular or 🟣 Shared Spot */}
        {latestSpot &&
          specialCards.length === 0 &&
          !isOrange &&
          !isBrown && (
            <>
              <p className="text-sm mb-2 flex items-center gap-2 flex-wrap">
                <>
                  You selected <strong>{spotData?.title || sharedData?.title || latestSpot}</strong>
                </>
                {spotData?.tags?.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3.5 py-1 rounded-full text-white text-[13px] leading-none shadow-sm"
                    style={{
                      backgroundColor:
                        tag === "2D"
                          ? "#1B80C4"
                          : tag === "3D"
                          ? "#F26344"
                          : "#6c584c",
                      boxShadow: "0 1px 3px rgba(0,0,0,0.25)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </p>

              {/* Shared banner */}
              {isShared && (
                <div className="rounded-md border border-[#6c584c] bg-[#f0ead2] p-3 mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <Info size={16} />
                    <span className="text-sm font-medium">
                      {sharedData!.priority ?? "Shared Space"}
                    </span>
                  </div>
                  <p className="text-sm leading-snug">{sharedData!.message}</p>
                </div>
              )}

              {/* Images (from regular spots, optional) */}
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
                // <div
                //   className="flex overflow-x-auto gap-3 mb-4 pr-2 snap-x snap-mandatory"
                //   style={{
                //     touchAction: "pan-x",
                //     overscrollBehaviorInline: "contain",
                //     WebkitOverflowScrolling: "touch",
                //   }}
                //   onWheel={guardedWheel}
                //   onPointerDown={(e) => e.stopPropagation()}
                // >
                //   {spotData.images.map((url, idx) => (
                //     <Image
                //       key={idx}
                //       src={url}
                //       alt={`Image ${idx + 1}`}
                //       width={250}
                //       height={180}
                //       className="rounded border border-[#6c584c] flex-shrink-0 snap-start"
                //     />
                //   ))}
                // </div>

              ) : (
                <div className="text-sm italic text-gray-500 mb-4">
                  Images coming soon!
                </div>
              )}

              {/* Add button (enabled for green & shared) */}
              {canShowAddButton && (
                <button
                  onClick={handleAdd}
                  className={`mt-auto w-full px-4 py-2 rounded text-sm border transition-all duration-200
                    ${clicked ? "font-bold" : "font-medium"}
                    hover:outline hover:outline-[#6c584c]
                    cursor-pointer bg-[#6c584c] text-[#f0ead2]`}
                >
                  Add
                </button>
              )}
            </>
          )}

        {/* 📝 Default Instructions */}
        {!latestSpot && (
          <div className="text-sm text-[#6c584c] space-y-2 mt-auto">
            <div className="flex items-start gap-2">
              <MapPin className="text-[#F26344]" size={16} />
              <span>
                1) <strong>Find</strong> the available green/shared spots
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
