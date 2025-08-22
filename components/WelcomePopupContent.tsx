'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import RhinoSVG from './RhinoSVG';
import RhinoShadow from './svg/RhinoShadowSVG';
import GalleryPhase from './GalleryPhase';
import TutorialScrollSteps from './TutorialScrollSteps';
import FloorSVG from './svg/FloorSVG';
import PhaseThree from './PhaseThree';

export default function WelcomePopupContent({ onClose }: { onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const phase1Ref = useRef<HTMLDivElement | null>(null);

  // Now these refs point to mounted nodes because this component only renders inside the modal
  const { scrollYProgress } = useScroll({
    container: containerRef,
    target: phase1Ref,
    offset: ['start start', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], ['0%', '100%']); // if you need it later

  return (
    <div className="w-full max-w-6xl h-[80vh] bg-[#fef6e4] rounded-lg shadow-xl overflow-hidden flex flex-col relative">
      <button
        onClick={onClose}
        className="absolute top-4 right-6 text-3xl text-[#6c584c] hover:text-[#3e3e3e] z-10"
      >
        ×
      </button>

      <div ref={containerRef} className="flex-1 overflow-y-scroll snap-y snap-mandatory">
        {/* Phase 1 */}
        <section
          ref={phase1Ref}
          className="h-[90vh] snap-start flex flex-col md:flex-row px-6 md:px-10 py-10 bg-[#fef6e4] relative border-b border-[#6c584c] overflow-hidden"
        >
          <div className="w-full md:w-1/2 flex flex-col justify-center text-left space-y-2 z-10">
            <motion.h1
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-[84px] font-extrabold text-[#6c584c] leading-tight flex flex-wrap"
              style={{ fontFamily: '"Cherry Bomb One", system-ui' }}
            >
              <span
                style={{
                  fontFamily: '"Cherry Bomb One", system-ui',
                  color: '#fef6e4',
                  WebkitTextStroke: '0.5px #6c584c',
                  textShadow: '4px 5px 3px rgba(0,0,0,0.3)',
                }}
              >
                DISPLAYING
              </span>
              <span className="text-[#432818]">YOUR WORK</span>
            </motion.h1>
            <p className="text-md md:text-3xl text-[#6c584c] mt-1">has never been easier</p>
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="text-3xl mt-6"
            >
              <div className="w-24 h-24 rounded-full border-2 border-[#6c584c] flex items-center justify-center">
                <ArrowDown className="font-thin text-[#6c584c] w-20 h-20" strokeWidth={0.5} />
              </div>
            </motion.div>
          </div>

          <div className="hidden md:block absolute bottom-0 right-0 z-20 overflow-visible pointer-events-none">
            <div className="scale-[1.4] origin-bottom-right translate-x-[15%] translate-y-[10%]">
              <svg viewBox="0 0 1300 850" className="w-[900px] h-auto">
                <RhinoShadow />
                <RhinoSVG />
              </svg>
            </div>
          </div>
        </section>

        {/* Phase 2 */}
        <section className="relative h-[90vh] snap-start overflow-hidden bg-[#fef6e4] border-b border-[#6c584c]">
          <motion.svg
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            transition={{ duration: 1 }}
            className="absolute bottom-0 left-0 w-full h-[146.32px] z-0"
            viewBox="0 653.68 600 146.32"
            preserveAspectRatio="none"
          >
            <FloorSVG />
          </motion.svg>

          <div className="flex h-full relative z-10">
            <div className="w-full md:w-1/2 sticky top-0 h-full">
              <GalleryPhase />
            </div>
            <TutorialScrollSteps />
          </div>
        </section>

        {/* Phase 3 */}
        <section className="h-[90vh] snap-start">
          <PhaseThree />
        </section>
      </div>
    </div>
  );
}
