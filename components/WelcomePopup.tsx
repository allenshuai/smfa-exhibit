// components/WelcomeTutorialPopup.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FakeMessageBubbleAnimation from './FakeMessageBubbleAnimation';
import Image from 'next/image';

// Load Roboto from Google Fonts
const roboto = {
  fontFamily: 'Roboto, sans-serif',
  fontStyle: 'normal',
  fontWeight: 300,
};

const robotoBold = {
  fontFamily: 'Roboto, sans-serif',
  fontStyle: 'normal',
  fontWeight: 700,
};

export default function WelcomeTutorialPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenWelcome');
    if (!seen) setShow(true);
  }, []);

  const handleClose = () => {
    localStorage.setItem('hasSeenWelcome', 'true');
    setShow(false);
  };

  if (!show) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-[#6c584c]/80 text-[#6c584c] flex justify-center items-center"
      style={roboto}
    >
      <div className="w-full max-w-6xl h-[90vh] bg-[#fef6e4] rounded-lg shadow-xl overflow-hidden flex flex-col relative">
        {/* Close Button Top Right */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-6 text-3xl text-[#6c584c] hover:text-[#3e3e3e] z-10"
        >
          ×
        </button>

        {/* Scrollable content inside popup */}
        <div className="flex-1 overflow-y-scroll">
          {/* Phase 1: Opening Section */}
          <section className="h-[90vh] flex flex-col md:flex-row p-10 gap-6 border-b border-[#6c584c] relative">
            <div className="w-full md:w-1/2 space-y-6">
              <h1 className="text-4xl font-extrabold leading-snug">
                <span className="block">WE KNOW you&rsquo;ve made</span>
                <span className="block">so many works in the studio</span>
              </h1>
              <h2 className="text-2xl font-bold mt-4">
                WE KNOW you&rsquo;re ready to get them out there.
              </h2>
              <p className="text-lg line-through text-[#9c8f80]">Maybe the process sounds complicated</p>
              <p className="text-xl font-semibold">Well, NO MORE.</p>
              <div className="pt-6">
                <motion.p
                  className="text-md font-medium italic text-[#6c584c]"
                  animate={{ y: [0, -6, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ↓ Scroll down to see how easy it really is ↓
                </motion.p>
              </div>
            </div>

            <div className="w-full md:w-1/2 flex flex-col items-end justify-end">
              <FakeMessageBubbleAnimation />
            </div>
          </section>

          {/* Phase 2: Tutorial Section */}
          <section className="flex h-[80vh] overflow-hidden">
            {/* Left Sticky */}
            <div className="w-1/2 p-8 sticky top-0 h-full flex flex-col justify-between bg-[#f3d2c1] relative">
              <div className="absolute top-8 left-8">
                <h2 className="text-5xl leading-tight" style={roboto}>
                  <span className="font-light">Displaying your</span><br />
                  <span className="font-light">work has</span>{' '}
                  <span className="font-bold">never</span><br />
                  <span className="font-light">been</span>{' '}
                  <span className="font-bold">easier</span>
                </h2>
              </div>

              <div className="absolute bottom-8 left-8 flex flex-col items-start">
                <Image
                  src="/SMFA_logo_ONLY.png"
                  alt="SMFA Logo"
                  width={120}
                  height={120}
                  className="object-contain"
                />
                <span className="text-sm mt-1 tracking-wide">Show My Fine Arts</span>
              </div>

              <div className="absolute bottom-8 right-8">
                <button
                  onClick={handleClose}
                  className="bg-[#6c584c] text-white px-5 py-2 rounded hover:bg-[#5a4c3a]"
                >
                  Let&rsquo;s Go →
                </button>
              </div>
            </div>

            {/* Right Scroll */}
            <div className="w-1/2 p-6 overflow-y-scroll space-y-14">
              <section>
                <h3 className="text-lg font-semibold mb-2">01 — 🟢 Find available green spots</h3>
                <p className="text-sm mb-3">
                  Click any <strong>green area</strong> on the map to explore open spaces.
                  Some are managed by TUAG or departments, but many are open just for you!
                </p>
                <div className="w-full h-44 bg-[#fef6e4] border border-dashed border-[#6c584c] rounded flex items-center justify-center">
                  <span className="text-xs italic">[ pictures coming soon1!! ]</span>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">02 — 🛒 Add to cart (up to 3)</h3>
                <p className="text-sm mb-3">
                  Not sure where&rsquo;s best for your piece? No problem. Add up to <strong>three spots</strong>, and we&rsquo;ll help match you with the one that fits your medium and idea.
                </p>
                <div className="w-full h-44 bg-[#fef6e4] border border-dashed border-[#6c584c] rounded flex items-center justify-center">
                  <span className="text-xs italic">[ pictures coming soon1!! ]</span>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2">03 — 📩 Submit your form</h3>
                <p className="text-sm mb-3">
                  Tell us what you're working on and how you'd like to install it. Once you submit your form, we&rsquo;ll get back to you shortly.
                </p>
                <div className="w-full h-44 bg-[#fef6e4] border border-dashed border-[#6c584c] rounded flex items-center justify-center">
                  <span className="text-xs italic">[ pictures coming soon1!! ]</span>
                </div>
              </section>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}