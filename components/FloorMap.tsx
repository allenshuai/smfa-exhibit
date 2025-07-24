'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import SMFA_Level1 from './floorMaps/SMFA_Level1';
import SMFA_Level2 from './floorMaps/SMFA_Level2';
// import SMFA_Level3 from './floorMaps/SMFA_Level3';
// import SMFA_Basement from './floorMaps/SMFA_Basement';

const floorOrder = ['B', '1', '2', '3'] as const;
type Floor = (typeof floorOrder)[number];

interface FloorMapProps {
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
  setLatestSpot: (val: string | undefined) => void;
  latestSpot: string | undefined;
}

export default function FloorMap({
  selectedLocations,
  setSelectedLocations,
  setLatestSpot,
  latestSpot,
}: FloorMapProps) {
  const [currentFloor, setCurrentFloor] = useState<Floor>('1');
  const [previousFloor, setPreviousFloor] = useState<Floor>('1');

  const switchFloor = (newFloor: Floor) => {
    if (newFloor !== currentFloor) {
      setPreviousFloor(currentFloor);
      setCurrentFloor(newFloor);
    }
  };

  const getDirection = (from: Floor, to: Floor): 'up' | 'down' => {
    return floorOrder.indexOf(to) > floorOrder.indexOf(from) ? 'up' : 'down';
  };

  const direction = getDirection(previousFloor, currentFloor);

  const handleSpotClick = (id: string) => {
    setLatestSpot(id);
  };

  const renderSpot = (
    id: string,
    d: string,
    latestSpot: string | undefined
  ) => {
    const isSelected = selectedLocations.includes(id);
    const isActive = id === latestSpot;

    const fillColor = isSelected ? '#33cc33' : '#8cc865';

    return (
      <motion.path
        key={id}
        id={id}
        d={d}
        fill={fillColor}
        stroke={isActive ? '#4a4a4a' : 'none'}
        strokeWidth={isActive ? 3 : 0}
        initial={false}
        animate={{ scale: isActive ? 1.07 : 1 }}
        whileHover={{ scale: 1.3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={() => handleSpotClick(id)}
        className="cursor-pointer origin-center"
      />
    );
  };

  return (
    <div className="relative w-full h-full border border-[#6c584c] rounded overflow-hidden">
      {/* Floor Switch Buttons */}
      <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-10">
        <button
          onClick={() => {
            const currentIndex = floorOrder.indexOf(currentFloor);
            if (currentIndex < floorOrder.length - 1) {
              switchFloor(floorOrder[currentIndex + 1]);
            }
          }}
          disabled={currentFloor === '3'}
          className="bg-[#6c584c] text-[#f0ead2] p-1 rounded disabled:opacity-50"
        >
          <ChevronUp size={20} />
        </button>
        <button
          onClick={() => {
            const currentIndex = floorOrder.indexOf(currentFloor);
            if (currentIndex > 0) {
              switchFloor(floorOrder[currentIndex - 1]);
            }
          }}
          disabled={currentFloor === 'B'}
          className="bg-[#6c584c] text-[#f0ead2] p-1 rounded disabled:opacity-50"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      <div className="relative w-full h-full">
  <AnimatePresence mode="popLayout">
    <motion.div
      key={previousFloor}
      initial={false}
      animate={{ y: direction === 'up' ? 100 : -100, opacity: 0 }}
      exit={undefined} // we manually animate it out
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="absolute top-0 left-0 w-full h-full pointer-events-none"
    >
      <motion.svg
        viewBox="0 0 1200 800"
        className="w-full h-full transform scale-[1.1] origin-center"
      >
        {previousFloor === '1' && <SMFA_Level1 renderSpot={renderSpot} latestSpot={latestSpot} />}
        {previousFloor === '2' && <SMFA_Level2 renderSpot={renderSpot} latestSpot={latestSpot} />}
        {/* Add basement and level 3 as needed */}
      </motion.svg>
    </motion.div>

    <motion.div
      key={currentFloor}
      initial={{ y: direction === 'up' ? -100 : 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={undefined}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
      className="absolute top-0 left-0 w-full h-full"
    >
      <motion.svg
        viewBox="0 0 1200 800"
        className="w-full h-full transform scale-[1.1] origin-center"
      >
        {currentFloor === '1' && <SMFA_Level1 renderSpot={renderSpot} latestSpot={latestSpot} />}
        {currentFloor === '2' && <SMFA_Level2 renderSpot={renderSpot} latestSpot={latestSpot} />}
        {/* Add basement and level 3 here too */}
      </motion.svg>
    </motion.div>
  </AnimatePresence>
</div>

    </div>
  );
}
