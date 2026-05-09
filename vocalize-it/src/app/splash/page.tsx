"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

export default function SplashScreen() {
  const router = useRouter();
  const [waveformBars] = useState(Array.from({ length: 40 }, (_, i) => i));

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-teal-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <div className="mb-8 flex items-center justify-center gap-3">
          <Activity className="w-12 h-12 text-teal-600" strokeWidth={2} />
          <h1 className="text-6xl font-light tracking-tight text-gray-900">
            Vocalize<span className="text-teal-600">.it</span>
          </h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex items-end justify-center gap-1 h-24 mb-8"
        >
          {waveformBars.map((bar, index) => (
            <motion.div
              key={bar}
              className="w-1.5 bg-gradient-to-t from-teal-400 to-blue-500 rounded-full"
              animate={{
                height: [
                  `${20 + Math.sin(index * 0.5) * 15}%`,
                  `${60 + Math.sin(index * 0.5 + Math.PI) * 35}%`,
                  `${20 + Math.sin(index * 0.5) * 15}%`,
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: index * 0.03,
                ease: "easeInOut",
              }}
            />
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-gray-600 text-lg mb-12 max-w-md mx-auto"
        >
          AI-assisted speech rehabilitation for daily communication
        </motion.p>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          onClick={() => router.push('/login')}
          className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-8 py-4 rounded-2xl text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          Get Started
        </motion.button>
      </motion.div>
    </div>
  );
}
