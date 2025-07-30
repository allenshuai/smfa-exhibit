'use client';

import { motion } from 'framer-motion';
import RhinoSVG from './RhinoSVG';
import TagSVG from './svg/TagSVG';
import FrameSVG from './svg/FrameSVG';
import FloorSVG from './svg/FloorSVG';
import PoleSVG from './svg/PoleSVG';

export default function GalleryPhase() {
  return (
    <section className="min-h-[80vh] w-full relative bg-[#fef6e4] overflow-hidden flex items-end">
      {/* Yellow Floor (full width) */}
      <motion.svg
        initial={{ x: '-100%' }}
        whileInView={{ x: 0 }}
        transition={{ duration: 1 }}
        className="absolute bottom-0 left-0 w-full h-[80vh] z-0"
        viewBox="0 0 600 800"
        preserveAspectRatio="none"
      >
        <FloorSVG />
      </motion.svg>

      {/* Unified SVG scene */}
      <motion.svg
        initial={{ x: '-100%', opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        viewBox="0 0 600 800"
        className="w-[600px] h-[600px] z-10 ml-[60px]"
        preserveAspectRatio="xMinYMax meet"
      >
        {/* Frame */}
        <g transform="translate(0, 0)">
          <FrameSVG />
          <g transform="translate(640,-40) scale(-0.9, 0.9)">
            <RhinoSVG />
          </g>
        </g>

        {/* Tag */}
        <g transform="translate(0, 0)">
          <TagSVG />
        </g>

        {/* Poles */}
        <g transform="translate(0, 0)">
          <PoleSVG />
        </g>
      </motion.svg>
    </section>
  );
}
