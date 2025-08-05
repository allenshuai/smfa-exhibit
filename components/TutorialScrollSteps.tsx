'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const steps = [
  {
    number: '01',
    image: '/tutorial_1.png',
    text: 'Click any green area on the map to explore open spaces. Some are managed by TUAG or departments, but many are open just for you!',
  },
  {
    number: '02',
    image: '/tutorial_2.png',
    text: 'Add up to 3 locations to your cart to request installation. You’ll see them appear in the lower panel.',
  },
  {
    number: '03',
    image: '/tutorial_3.png',
    text: 'Submit your install request by filling out the quick form. That’s it!',
  },
];

export default function TutorialScrollSteps() {
  return (
    <motion.div
			initial={{ x: 100, opacity: 0 }}
			whileInView={{ x: 0, opacity: 1 }}
			viewport={{ once: false, amount: 0.2 }}
			transition={{ delay: 0.2, duration: 1 }}
			className="z-0 w-full md:w-1/2 h-[60vh] overflow-y-scroll px-6 pt-20 space-y-10"
    >


      {steps.map((step, idx) => (
        <div key={idx} className="space-y-4">
          <h2
            className="text-2xl text-[#432818]"
            style={{ fontFamily: '"Cherry Bomb One", system-ui' }}
          >
            {step.number}/03
          </h2>
          <Image
            src={step.image}
            alt={`Tutorial Step ${step.number}`}
            width={400}
            height={200}
            className="border-8 border-[#6c584c]"
          />
          <p className="text-[#6c584c] text-md md:text-lg font-light">
            {step.text}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
