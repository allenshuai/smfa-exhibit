'use client';

import { useEffect, useRef, useState, useLayoutEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import RhinoSVG from './RhinoSVG';
import RhinoShadow from './svg/RhinoShadowSVG';
import GalleryPhase from './GalleryPhase';


export default function WelcomePopup() {
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const phase1Ref = useRef<HTMLDivElement | null>(null);

  const [scrollYProgress, setScrollYProgress] = useState<any>(null);
  const [x, setX] = useState<any>(null);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenWelcome');
    if (!seen) setShow(true);
  }, []);

  useEffect(() => {
    if (!containerRef.current || !phase1Ref.current) return;

    const { scrollYProgress } = useScroll({
      target: phase1Ref,
      container: containerRef,
      offset: ['start start', 'end start'],
    });

    // Transform scroll progress (0–1) into X movement from 0% to 100%
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

    setScrollYProgress(scrollYProgress);
    setX(x);
  }, []);



  const handleClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#6c584c]/80 text-[#6c584c] flex justify-center items-center overflow-hidden">
      <div
        className="w-full max-w-6xl h-[80vh] bg-[#fef6e4] rounded-lg shadow-xl overflow-hidden flex flex-col relative"
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-6 text-3xl text-[#6c584c] hover:text-[#3e3e3e] z-10"
        >
          ×
        </button>

        {/* Scrollable Content */}
        <div ref={containerRef} className="flex-1 overflow-y-scroll">
          <section className="h-[90vh] flex flex-col md:flex-row px-6 md:px-10 py-10 bg-[#fef6e4] relative border-b border-[#6c584c]">
            {/* Text Left */}
            <div className="w-full md:w-1/2 flex flex-col justify-center text-left space-y-2 z-10">
              <motion.h1
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-4xl md:text-6xl font-extrabold text-[#6c584c] leading-tight"
              >
                <span className="block">DISPLAYING</span>
                <span className="block text-[#432818]">YOUR WORK</span>
              </motion.h1>
              <p className="text-md md:text-lg text-[#6c584c] mt-1">
                has never been easier
              </p>
              <motion.div
                animate={{ y: [0, -6, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="text-3xl mt-6"
              >
                ↓
              </motion.div>
            </div>

            {/* Rhino Slide-Out Right */}
            <div className="relative w-full h-full overflow-hidden flex justify-end items-end">
              <motion.div
                style={{ translateX: x }} // this is now live based on scroll
                className="w-[900px] max-w-none scale-[1.6] -translate-x-20 origin-bottom-right"
              >
                <svg viewBox="0 0 1300 850" className="w-full h-auto">
                  <RhinoShadow />
                  <RhinoSVG />
                </svg>
              </motion.div>

            </div>
          </section>

          {/* phase 2 gallery part */}
          <GalleryPhase/>
        </div>
      </div>
    </div>
  );
}
