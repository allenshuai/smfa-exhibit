// components/FakeMessageBubbleAnimation.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User } from 'lucide-react';

interface Message {
  text: string;
  isUser: boolean;
}

const messages: Message[] = [
  { text: 'I’ve been making so much art but I don’t know how to show it…', isUser: false },
  { text: 'Why are these walls always empty 😩 I wish I could use them…', isUser: false },
  { text: 'I wish there was a way to hear some opinions before picking a spot.', isUser: false },
  { text: 'Cam: I want people to actually see what I’ve made this semester 😭', isUser: false },
  { text: 'Nooo you guys have to check out the latest platform!', isUser: true },
  { text: 'It’s literally just Click, Add, and Submit!!', isUser: true },
  { text: 'Because y’all deserve to be seen—go claim your wall 💥', isUser: true },
];

export default function FakeMessageBubbleAnimation() {
  const [visibleMessages, setVisibleMessages] = useState<Message[]>([]);

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setVisibleMessages((prev) => [...prev, messages[i]]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-[300px] h-[600px] border-4 border-black rounded-[2.5rem] flex flex-col justify-end p-4 gap-2 bg-transparent backdrop-blur-sm text-[#1f1f1f] overflow-hidden shadow-lg">
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-1 rounded bg-gray-400 opacity-70" />
      <div className="flex flex-col gap-2 overflow-y-auto h-full scrollbar-none">
        <AnimatePresence>
          {visibleMessages.map((msg, index) => {
            if (!msg) return null;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className={`flex items-end ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!msg.isUser && (
                  <div className="mr-2 text-gray-500">
                    <User size={18} />
                  </div>
                )}
                <div
                  className={`px-4 py-2 text-sm rounded-2xl max-w-[70%] shadow-md ${
                    msg.isUser
                      ? 'bg-green-500 text-white rounded-br-sm'
                      : 'bg-gray-200 text-black rounded-bl-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
