'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import FloorMap from "@/components/FloorMap";
import WelcomePopup from '@/components/WelcomePopup';

import RequestFormModal from "@/components/RequestFormModal";
import InfoHeader from "@/components/InfoHeader";
import BuildingFloorMenu from "@/components/BuildingFloorMenu";
import SpotDetailsPanel from "@/components/SpotDetailsPanel";
import SelectedLocationsPanel from "@/components/SelectedLocationsPanel";

// Define building and floor types
const buildingFloors = {
  "SMFA": ["Basement", "Level 1", "Level 2", "Level 3"],
  "Mission Hill": ["Level 1", "Level 2"],
  "Barnum Hall": ["Level B", "Level 2"],
  "Lane Hall": ["Level 1"],
  "Aidekman Arts Center": ["Level 1"],
} as const;

type Building = keyof typeof buildingFloors;
type Floor = (typeof buildingFloors)[Building][number];

export default function Home() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showRequestForm, setShowRequestForm] = useState(false);
  const [selected, setSelected] = useState<{
    building: Building;
    floor: Floor;
  }>({
    building: "SMFA",
    floor: "Level 1",
  });

  const [latestSpot, setLatestSpot] = useState<string | undefined>(undefined);

  const handleFloorChange = (direction: 'up' | 'down') => {
    const availableFloors = buildingFloors[selected.building];
    if (!availableFloors) return;

    const currentIndex = (availableFloors as readonly string[]).indexOf(selected.floor);
    const newIndex = direction === 'up' ? currentIndex + 1 : currentIndex - 1;
    const newFloor = availableFloors[newIndex];

    if (newFloor) {
      setSelected(prev => ({ ...prev, floor: newFloor }));
    }
  };

  const hasMap = Object.keys(buildingFloors).includes(selected.building);

  return (
    <motion.main
      layout
      className="relative w-screen h-screen overflow-hidden bg-[#f0ead2]"
    >
      <WelcomePopup />
      <InfoHeader />

      <div className="absolute inset-0 flex justify-center items-center h-[450px] top-[45%] -translate-y-1/2">
        {!showRequestForm ? (
          // ✅ Default View: Floor Map + Panels
          <div className="flex items-start gap-6 h-[500px]">
            <BuildingFloorMenu selected={selected} setSelected={setSelected} />

            {hasMap ? (
              <div className="w-[60vw] max-w-[700px] h-full">
                <FloorMap
                  building={selected.building}
                  floor={selected.floor}
                  selectedLocations={selectedLocations}
                  setSelectedLocations={setSelectedLocations}
                  setLatestSpot={setLatestSpot}
                  latestSpot={latestSpot}
                  onFloorChange={handleFloorChange}
                />
              </div>
            ) : (
              <div className="w-[60vw] max-w-[700px] h-full flex items-center justify-center text-gray-400">
                Floor map for {selected.building} coming soon.
              </div>
            )}

            <div className="flex flex-col w-[350px] h-full gap-4 min-h-0">
              <div className="flex-[0.60] min-h-0">
                <SpotDetailsPanel
                  latestSpot={latestSpot}
                  selectedLocations={selectedLocations}
                  setSelectedLocations={setSelectedLocations}
                  setLatestSpot={setLatestSpot}
                />
              </div>
              <div className="flex-[0.40] min-h-0">
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
              onClose={() => setShowRequestForm(false)}
            />
          </div>
        )}
      </div>
    </motion.main>
  );
}
