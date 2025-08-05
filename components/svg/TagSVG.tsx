'use client';

import { motion } from 'framer-motion';

export default function TagSVG() {
  return (
    <motion.g
      id="Tag"
      whileHover={{ scale: 1.3 }}
      transition={{ type: 'spring', stiffness: 250 }}
    >
      <rect
        id="Tag_Frame"
        x="477.99"
        y="452.17"
        width="41.33"
        height="41.33"
        fill="none"
        stroke="#6c584c"
        strokeWidth={2}
      />
      <g id="Tag_Text" stroke="#6c584c" strokeWidth={2}>
        <path d="M484.8,461.94h27.71" />
        <path d="M484.8,468.81h27.71" />
        <path d="M484.8,475.68h17.29" />
        <path d="M484.8,483.73h17.29" />
      </g>
    </motion.g>
  );
}
