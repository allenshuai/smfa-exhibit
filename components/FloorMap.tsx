'use client';

import { motion } from 'framer-motion';

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

  const handleSpotClick = (id: string) => {
    setLatestSpot(id);
  };

  const renderSpot = (id: string, d: string, latestSpot: string | undefined) => {
    const isSelected = selectedLocations.includes(id);
    const isActive = id === latestSpot;

    const fillColor = isSelected
      ? '#33cc33' // selected darker green
      : '#8cc865'; // default green

    return (
      <motion.path
        key={id}
        id={id}
        d={d}
        fill={fillColor}
        stroke={isActive ? '#4a4a4a' : 'none'}
        strokeWidth={isActive ? 3 : 0}
        initial={false}
        animate={{
          scale: isActive ? 1.07 : 1,
        }}
        whileHover={{
          scale: 1.50,
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        onClick={() => handleSpotClick(id)}
        className="cursor-pointer origin-center"
      />
    );
  };


  return (
    <div className="w-full h-full border border-[#6c584c] rounded overflow-auto">
      <motion.svg viewBox="0 0 1200 800" className="w-full h-full">
        {/* gray */}
        <rect x="153.34" y="68.32" width="112.84" height="102.78" fill="#c2c1c0" />
        <rect x="158.26" y="221.08" width="112.84" height="102.97" fill="#c2c1c0" />
        <rect x="275.41" y="221.08" width="115.19" height="75.35" fill="#c2c1c0" />
        <rect x="408.67" y="216.16" width="205.43" height="102.97" fill="#c2c1c0" />
        <rect x="622.53" y="216.16" width="131.71" height="102.97" fill="#c2c1c0" />
        <rect x="757.34" y="216.16" width="114.83" height="102.97" fill="#c2c1c0" />
        <rect x="759.19" y="68.32" width="112.84" height="102.78" fill="#c2c1c0" />
        <rect x="270.49" y="79.23" width="222.87" height="91.88" fill="#c2c1c0" />
        <rect x="497.03" y="79.23" width="257.99" height="91.88" fill="#c2c1c0" />
        <rect x="158.26" y="526.46" width="118.98" height="203.92" fill="#c2c1c0" />
        <rect x="287" y="566.32" width="91.29" height="164.06" fill="#c2c1c0" />
        <rect x="414.75" y="527.14" width="181.88" height="66.49" fill="#c2c1c0" />
        <rect x="386.85" y="600.73" width="243.67" height="129.65" fill="#c2c1c0" />
        <rect x="643.27" y="566.32" width="233.34" height="164.06" fill="#c2c1c0" />
        <polygon points="516.3,331.03 516.3,394.57 405.81,394.57 405.81,331.03 347.63,331.03 347.63,394.57 347.63,455.47 347.63,516.37 619.02,516.37 619.02,479.74 619.02,456.79 619.02,418.97 619.02,394.57 619.02,331.03" fill="#c2c1c0" />

        {/* green clickable spots */}
        {renderSpot('CorridorB100C1', 'M287 526.75h118.81v33.63H287z')}
        {renderSpot('CorridorB100C2', 'M643.27 526.46h154.02v33.92H643.27z')}
        {renderSpot('CorridorA100C3', 'M181.67 188.27h115.91v21.74H181.67z')}
        {renderSpot('CorridorA100C2', 'M306.4 178.39h389.03v31.9H306.4z')}
        {renderSpot('CorridorA100C5', 'M700.91 178.39h95.08v31.9h-95.08z')}
        {renderSpot('AtriumA100', 'M414.75 331.03h92.98v55.89h-92.98z')}
        {renderSpot('CorridorA100C1', 'M274.69 301.26H390.6v22.79H274.69z')}
      </motion.svg>
    </div>
  );
}
