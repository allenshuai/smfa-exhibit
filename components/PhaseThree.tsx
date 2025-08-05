'use client';

import { motion } from 'framer-motion';

export default function PhaseThree() {
  return (
    <section className="h-[90vh] w-full bg-[#fcd34d] flex items-center justify-center overflow-hidden relative">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1.1, opacity: 1 }}
        viewport={{ once: false, amount: 0.6 }}
        transition={{ type: 'spring', stiffness: 100, damping: 10 }}
        className="text-center space-y-8"
      >
        <h1
          className="text-[10vw] md:text-[8vw] font-extrabold text-[#6c584c] tracking-wider"
          style={{ fontFamily: '"Cherry Bomb One", system-ui' }}
        >
          NOW!
        </h1>

        <motion.h2
          initial={{ y: 60, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: false, amount: 0.6 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-[6vw] md:text-[4vw] text-[#432818] font-bold"
          style={{ fontFamily: '"Cherry Bomb One", system-ui' }}
        >
          GO CLAIM YOUR SPACE
        </motion.h2>
      </motion.div>
    </section>
  );
}
