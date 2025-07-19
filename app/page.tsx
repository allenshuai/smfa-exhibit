"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import FloorMap from "@/components/FloorMap";
import RequestFormModal from "@/components/RequestFormModal";
import InfoHeader from "@/components/InfoHeader";
import BuildingFloorMenu from "@/components/BuildingFloorMenu";
import SpotDetailsPanel from "@/components/SpotDetailsPanel";
import SelectedLocationsPanel from "@/components/SelectedLocationsPanel";

export default function Home() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selected, setSelected] = useState({
    building: "SMFA",
    floor: "Level 1",
  });
  const [latestSpot, setLatestSpot] = useState<string | undefined>(undefined);

  return (
    <motion.main
      layout
      className="relative w-screen h-screen overflow-hidden bg-[#f0ead2]"
    >
      <InfoHeader />

      <div className="absolute inset-0 flex justify-center items-center h-[450px] top-1/2 -translate-y-1/2">
        {!showRequestForm ? (
          // ✅ Default View: Floor Map + Panels
          <div className="flex items-start gap-6 h-[400px]">
            <BuildingFloorMenu selected={selected} setSelected={setSelected} />

            <div className="w-[60vw] max-w-[650px] h-full">
              <FloorMap
                selectedLocations={selectedLocations}
                setSelectedLocations={setSelectedLocations}
                setLatestSpot={setLatestSpot}
                latestSpot={latestSpot}
              />
            </div>

            <div className="flex flex-col w-[320px] h-full gap-4">
              <div className="flex-1">
                <SpotDetailsPanel
                  latestSpot={latestSpot}
                  selectedLocations={selectedLocations}
                  setSelectedLocations={setSelectedLocations}
                />
              </div>
              <div className="flex-1">
                <SelectedLocationsPanel
                  selectedLocations={selectedLocations}
                  setShowRequestForm={setShowRequestForm}
                  setSelectedLocations={setSelectedLocations}
                />
              </div>
            </div>
          </div>
        ) : (
          // ✅ Replaces everything with the form view
          <div className="w-full max-w-4xl h-[400px]">
            <RequestFormModal
              selectedLocations={selectedLocations}
              onClose={() => setShowRequestForm(false)} // ✅ returns to map view
            />
          </div>
        )}
      </div>
    </motion.main>
  );
}
