'use client';

interface FloorMapProps {
  selectedLocations: string[];
  setSelectedLocations: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function FloorMap({ selectedLocations, setSelectedLocations }: FloorMapProps) {
  const toggleSelect = (id: string) => {
    if (selectedLocations.includes(id)) {
      setSelectedLocations(selectedLocations.filter((loc) => loc !== id));
    } else {
      if (selectedLocations.length >= 3) {
        alert('You can only select up to 3 spots.');
        return;
      }
      setSelectedLocations([...selectedLocations, id]);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Select up to 3 exhibition spots</h2>

      <div className="border bg-gray-100 rounded overflow-auto">
        <svg viewBox="0 0 1200 800" className="w-full h-auto">
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

          {/* green (clickable) */}
          <path
            id="CorridorB100C1"
            d="M287 526.75h118.81v33.63H287z"
            fill={selectedLocations.includes('CorridorB100C1') ? '#33cc33' : '#8cc865'}
            onClick={() => toggleSelect('CorridorB100C1')}
            className="cursor-pointer"
          />
          <path
            id="CorridorB100C2"
            d="M643.27 526.46h154.02v33.92H643.27z"
            fill={selectedLocations.includes('CorridorB100C2') ? '#33cc33' : '#8cc865'}
            onClick={() => toggleSelect('CorridorB100C2')}
            className="cursor-pointer"
          />
          <path
            id="CorridorA100C3"
            d="M181.67 188.27h115.91v21.74H181.67z"
            fill={selectedLocations.includes('CorridorA100C3') ? '#33cc33' : '#8cc865'}
            onClick={() => toggleSelect('CorridorA100C3')}
            className="cursor-pointer"
          />
          <path
            id="CorridorA100C2"
            d="M306.4 178.39h389.03v31.9H306.4z"
            fill={selectedLocations.includes('CorridorA100C2') ? '#33cc33' : '#8cc865'}
            onClick={() => toggleSelect('CorridorA100C2')}
            className="cursor-pointer"
          />
          <path
            id="CorridorA100C5"
            d="M700.91 178.39h95.08v31.9h-95.08z"
            fill={selectedLocations.includes('CorridorA100C5') ? '#33cc33' : '#8cc865'}
            onClick={() => toggleSelect('CorridorA100C5')}
            className="cursor-pointer"
          />
          <path
            id="AtriumA100"
            d="M414.75 331.03h92.98v55.89h-92.98z"
            fill={selectedLocations.includes('AtriumA100') ? '#33cc33' : '#8cc865'}
            onClick={() => toggleSelect('AtriumA100')}
            className="cursor-pointer"
          />
          <path
            id="CorridorA100C1"
            d="M274.69 301.26H390.6v22.79H274.69z"
            fill={selectedLocations.includes('CorridorA100C1') ? '#33cc33' : '#8cc865'}
            onClick={() => toggleSelect('CorridorA100C1')}
            className="cursor-pointer"
          />
        </svg>
      </div>

      {/* Selected Spots */}
      <div className="mt-6 p-4 border rounded bg-white shadow">
        <h3 className="font-semibold mb-2">Selected Locations (max 3):</h3>
        {selectedLocations.length === 0 ? (
          <p className="text-gray-500">No spots selected.</p>
        ) : (
          <ul className="list-disc pl-5">
            {selectedLocations.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
