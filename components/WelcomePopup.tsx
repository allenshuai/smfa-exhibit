'use client';

import { useEffect, useState } from 'react';
import PopupContent from './WelcomePopupContent'; // new child

export default function WelcomePopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const seen = localStorage.getItem('hasSeenWelcome');
    if (!seen) setShow(true);
  }, []);

  if (!show) return null;

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Cherry+Bomb+One&display=swap"
        rel="stylesheet"
      />
      <div className="fixed inset-0 z-50 bg-[#6c584c]/80 text-[#6c584c] flex justify-center items-center overflow-hidden">
        <PopupContent onClose={() => {
          localStorage.setItem('hasSeenWelcome', 'true');
          setShow(false);
        }} />
      </div>
    </>
  );
}
