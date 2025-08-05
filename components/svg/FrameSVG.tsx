'use client';

import { motion } from 'framer-motion';

export default function FrameSVG() {
  return (
    <motion.g
      id="Frame"
      whileHover={{ scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 200 }}
    >
      <rect
        id="Frame_out"
        x="116.84"
        y="219.44"
        width="332.95"
        height="263.78"
        fill="#6c584c"
      />
      <rect
        id="Frame_in"
        x="135.33"
        y="233.8"
        width="296.69"
        height="235.06"
        fill="#fef6e4"
      />
    </motion.g>
  );
}
