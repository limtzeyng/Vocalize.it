import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Mic, Volume2, Info, RotateCcw, ArrowRight } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function SpeechPractice() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [repetitions, setRepetitions] = useState(3);
  const waveformBars = Array.from({ length: 30 }, (_, i) => i);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-24">
      <div className="max-w-md mx-auto px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-light text-gray-900 mb-1">
            Speech Practice
          </h1>
          <p className="text-gray-500">Level 4: S Blends</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <div className="text-center mb-6">
            <h2 className="text-sm text-gray-500 mb-2">Target Word</h2>
            <p className="text-5xl font-light text-gray-900 mb-4">Spoon</p>
            <button className="text-teal-600 hover:text-teal-700 transition-colors">
              <Volume2 className="w-6 h-6" />
            </button>
          </div>

          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-5 border border-blue-100">
            <div className="flex items-start gap-3">
              <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-gray-900 mb-1 text-sm">
                  Articulation Guidance
                </h3>
                <p className="text-sm text-gray-600">
                  Keep your tongue close behind your teeth and direct airflow smoothly forward. The "sp" blend requires strong, steady air pressure.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <h3 className="font-medium text-gray-900 mb-4">Mouth Positioning</h3>

          <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 mb-4">
            <div className="flex items-center justify-center">
              <svg viewBox="0 0 200 150" className="w-full max-w-xs">
                <ellipse cx="100" cy="75" rx="80" ry="50" fill="#FDE8E9" stroke="#E5989B" strokeWidth="2"/>

                <path d="M 40 75 Q 100 85 160 75" fill="none" stroke="#B5838D" strokeWidth="3"/>

                <path d="M 70 75 Q 75 65 80 75" fill="#FFB4A2" stroke="#E5989B" strokeWidth="2"/>

                <motion.path
                  d="M 85 75 L 115 75"
                  stroke="#14B8A6"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                  animate={{
                    x: [0, 15, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <text x="100" y="140" fontSize="10" fill="#6B7280" textAnchor="middle">
                  Airflow direction →
                </text>
              </svg>
            </div>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Tongue position:</span>
              <span className="font-medium text-gray-900">Behind upper teeth</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Lip shape:</span>
              <span className="font-medium text-gray-900">Slightly rounded</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Airflow:</span>
              <span className="font-medium text-teal-600">Strong & steady</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-medium text-gray-900">Live Recording</h3>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-gray-400" />
              <span className="text-sm text-gray-500">{repetitions}/5</span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-1 h-32 mb-6">
            {waveformBars.map((bar, index) => (
              <motion.div
                key={bar}
                className={`w-1.5 rounded-full ${
                  isRecording
                    ? 'bg-gradient-to-t from-teal-400 to-blue-500'
                    : 'bg-gray-200'
                }`}
                animate={
                  isRecording
                    ? {
                        height: [
                          `${20 + Math.sin(index * 0.4) * 10}%`,
                          `${50 + Math.sin(index * 0.4 + Math.PI) * 30}%`,
                          `${20 + Math.sin(index * 0.4) * 10}%`,
                        ],
                      }
                    : { height: '20%' }
                }
                transition={{
                  duration: 1.2,
                  repeat: isRecording ? Infinity : 0,
                  delay: index * 0.02,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>

          <div className="flex items-center justify-center">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setIsRecording(!isRecording);
                if (!isRecording) {
                  setTimeout(() => {
                    setIsRecording(false);
                    setRepetitions(repetitions + 1);
                    navigate('/analysis');
                  }, 2500);
                }
              }}
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isRecording
                  ? 'bg-red-500'
                  : 'bg-gradient-to-br from-teal-500 to-blue-500'
              }`}
            >
              <Mic className="w-10 h-10 text-white" />
            </motion.button>
          </div>

          {isRecording && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-sm text-gray-600 mt-4"
            >
              Speak clearly and at your own pace...
            </motion.p>
          )}
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          onClick={() => navigate('/progression')}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
        >
          View Progress
          <ArrowRight className="w-5 h-5" />
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
