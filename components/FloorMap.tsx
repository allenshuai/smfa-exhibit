'use client';

import { useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp, ChevronDown } from 'lucide-react';
import SMFA_Level1 from './floorMaps/SMFA_Level1';
import SMFA_Level2 from './floorMaps/SMFA_Level2';
import MH_Level1 from './floorMaps/MH_Level1';
import MH_Level2 from './floorMaps/MH_Level2';

const floorOrder = ['Basement', 'Level 1', 'Level 2', 'Level 3'] as const;
type Floor = (typeof floorOrder)[number];
type Building = 'SMFA' | 'Mission Hill';

interface FloorMapProps {
  building: Building;
  floor: Floor;
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
  setLatestSpot: (val: string | undefined) => void;
  latestSpot: string | undefined;
  onFloorChange: (direction: 'up' | 'down') => void;
}

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T>();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

export default function FloorMap({
  building,
  floor,
  selectedLocations,
  setSelectedLocations,
  setLatestSpot,
  latestSpot,
  onFloorChange,
}: FloorMapProps) {
  const previousBuilding = usePrevious(building);
  const previousFloor = usePrevious(floor);

  const isSameBuilding = building === previousBuilding;
  const getDirection = (from?: Floor, to?: Floor): 'up' | 'down' => {
    if (!from || !to) return 'up';
    return floorOrder.indexOf(to) > floorOrder.indexOf(from) ? 'up' : 'down';
  };
  const verticalDir = getDirection(previousFloor, floor);
  const horizontalDir = building === 'Mission Hill' ? 'right' : 'left';

  const handleSpotClick = (id: string) => {
    setLatestSpot(id);
  };

  const renderSpot = useCallback(
    (id: string, d: string, latestSpot: string | undefined) => {
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
    },
    [selectedLocations, latestSpot]
  );

  const renderFloor = (b: Building, f: Floor) => {
    if (b === 'SMFA') {
      if (f === 'Level 1') return <SMFA_Level1 renderSpot={renderSpot} latestSpot={latestSpot} />;
      if (f === 'Level 2') return <SMFA_Level2 renderSpot={renderSpot} latestSpot={latestSpot} />;
    }
    if (b === 'Mission Hill') {
      if (f === 'Level 1') return <MH_Level1 renderSpot={renderSpot} latestSpot={latestSpot} />;
      if (f === 'Level 2') return <MH_Level2 renderSpot={renderSpot} latestSpot={latestSpot} />;
    }
    return null;
  };

  return (
    <div className="relative w-full h-full border border-[#6c584c] rounded overflow-hidden">
      <div className="absolute bottom-2 right-2 flex flex-col gap-1 z-10">
        <button
          onClick={() => onFloorChange('up')}
          disabled={
            floor === 'Level 3' ||
            (building === 'Mission Hill' && floor === 'Level 2')
          }
          className="bg-[#6c584c] text-[#f0ead2] p-1 rounded disabled:opacity-50"
        >
          <ChevronUp size={20} />
        </button>
        <button
          onClick={() => onFloorChange('down')}
          disabled={
            floor === 'Basement' ||
            (building === 'Mission Hill' && floor === 'Level 1')
          }
          className="bg-[#6c584c] text-[#f0ead2] p-1 rounded disabled:opacity-50"
        >
          <ChevronDown size={20} />
        </button>
      </div>

      <div className="relative w-full h-full">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={`${previousBuilding}-${previousFloor}`}
            initial={
              isSameBuilding
                ? false
                : { x: horizontalDir === 'right' ? -200 : 200, opacity: 0 }
            }
            animate={
              isSameBuilding
                ? { y: verticalDir === 'up' ? 100 : -100, opacity: 0 }
                : { x: 0, opacity: 0 }
            }
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-full pointer-events-none"
          >
            <motion.svg viewBox="0 0 1200 800" className="w-full h-full transform scale-[1.1] origin-center">
              {previousBuilding && previousFloor && renderFloor(previousBuilding, previousFloor)}
            </motion.svg>
          </motion.div>

          <motion.div
            key={`${building}-${floor}`}
            initial={
              isSameBuilding
                ? { y: verticalDir === 'up' ? -100 : 100, opacity: 0 }
                : { x: horizontalDir === 'right' ? 200 : -200, opacity: 0 }
            }
            animate={{ x: 0, y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
            className="absolute top-0 left-0 w-full h-full"
          >
            <motion.svg viewBox="0 0 1200 800" className="w-full h-full transform scale-[1.1] origin-center">
              {renderFloor(building, floor)}
            </motion.svg>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
