"use client";

import Image from "next/image";
import { useState } from "react";
import { FaMapMarkerAlt, FaPlusCircle, FaInbox, FaCheckCircle } from "react-icons/fa";
import FloorMap from "@/components/FloorMap";
import RequestFormModal from "@/components/RequestFormModal";
import { Shadows_Into_Light } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";

const shadows = Shadows_Into_Light({ subsets: ["latin"], weight: ["400"] });

export default function Home() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [showRequestForm, setShowRequestForm] = useState(false);

  return (
    <motion.main
      layout
      className="min-h-screen bg-white px-6 py-8 max-w-4xl mx-auto"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Image
          src="/SMFA_01_Brand_Orange_Blue_Green_Pink.png"
          alt="SMFA Logo"
          width={120}
          height={120}
        />
        <h1 className={`${shadows.className} text-3xl sm:text-4xl font-bold`}>
          Student Artwork Display Application
        </h1>
      </div>

      {/* Steps */}
      <div className="mb-8 space-y-3">
        <div className="flex items-center gap-2 text-lg font-medium">
          <FaMapMarkerAlt className="text-orange-500" />
          <span>1) Click to see the available spots</span>
        </div>
        <div className="flex items-center gap-2 text-lg font-medium">
          <FaPlusCircle className="text-blue-500" />
          <span>
            2) Click <strong>Add</strong> to add into your cart
          </span>
        </div>
        <div className="flex items-center gap-2 text-lg font-medium">
          <FaInbox className="text-purple-500" />
          <span>
            3) You can add up to <strong>3 spots</strong> for your request
          </span>
        </div>
        <div className="flex items-center gap-2 text-lg font-medium">
          <FaCheckCircle className="text-green-600" />
          <span>4) You will be contacted once your request is approved</span>
        </div>
      </div>

      {/* Map */}
      <motion.div layout>
        <FloorMap
          selectedLocations={selectedLocations}
          setSelectedLocations={setSelectedLocations}
        />
      </motion.div>

      {/* Selected Locations Section */}
      <AnimatePresence>
        {selectedLocations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.4 }}
            className="mt-10 border-t pt-6"
          >
            <h2 className="text-xl font-semibold mb-2">Selected Locations</h2>
            <ul className="list-disc ml-6 mb-4">
              {selectedLocations.map((loc) => (
                <li key={loc}>{loc}</li>
              ))}
            </ul>
            <button
              onClick={() => setShowRequestForm(true)}
              className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
            >
              Request to Install
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Request Modal */}
      {showRequestForm && (
        <RequestFormModal
          selectedLocations={selectedLocations}
          onClose={() => setShowRequestForm(false)}
        />
      )}
    </motion.main>
  );
}
