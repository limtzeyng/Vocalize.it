import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { TrendingUp, CheckCircle2, Lock, Trophy, MessageCircle } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function AdaptiveProgression() {
  const navigate = useNavigate();
  const [showReadyDialog, setShowReadyDialog] = useState(true);
  const [showFeedbackDialog, setShowFeedbackDialog] = useState(false);

  const therapyLevels = [
    { level: 1, title: 'Isolation', subtitle: 'SSSSS sound', completed: true, locked: false },
    { level: 2, title: 'Syllables', subtitle: 'sa, se, si, so, su', completed: true, locked: false },
    { level: 3, title: 'Word Position', subtitle: 'Initial, Medial, Final S', completed: true, locked: false },
    { level: 4, title: 'S Blends', subtitle: 'Spoon, Star, Swing', completed: false, locked: false, current: true },
    { level: 5, title: 'Functional Phrases', subtitle: 'Real-world communication', completed: false, locked: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-24">
      <div className="max-w-md mx-auto px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-light text-gray-900 mb-1">
            Your Journey
          </h1>
          <p className="text-gray-500">Adaptive rehabilitation pathway</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-teal-500 to-blue-500 rounded-3xl p-6 shadow-lg mb-6 text-white"
        >
          <div className="flex items-center gap-3 mb-3">
            <Trophy className="w-8 h-8" />
            <div>
              <h2 className="font-semibold text-lg">Milestone Reached!</h2>
              <p className="text-sm text-teal-100">Your progress is excellent</p>
            </div>
          </div>
          <p className="text-teal-50">
            Your S pronunciation accuracy reached <strong>82%</strong> with improved consistency over the past week.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Therapy Stages</h2>
          <div className="space-y-3">
            {therapyLevels.map((item, index) => (
              <motion.div
                key={item.level}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className={`bg-white rounded-2xl p-5 shadow-md border-2 ${
                  item.current
                    ? 'border-teal-500'
                    : item.completed
                    ? 'border-green-200'
                    : 'border-gray-100'
                } ${item.locked ? 'opacity-60' : ''}`}
              >
                <div className="flex items-center gap-4">
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      item.completed
                        ? 'bg-green-100'
                        : item.current
                        ? 'bg-gradient-to-br from-teal-500 to-blue-500'
                        : 'bg-gray-100'
                    }`}
                  >
                    {item.locked ? (
                      <Lock className="w-6 h-6 text-gray-400" />
                    ) : item.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    ) : (
                      <span className="text-white font-bold">{item.level}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                      {item.title}
                      {item.current && (
                        <span className="text-xs bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </h3>
                    <p className="text-sm text-gray-500">{item.subtitle}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {showReadyDialog && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          >
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Ready to progress?
              </h3>
              <p className="text-gray-600 mb-6">
                You've shown great improvement. Would you like to move on to Level 5: Functional Phrases?
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => {
                    setShowReadyDialog(false);
                    navigate('/dashboard');
                  }}
                  className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Yes, I'm ready
                </button>
                <button
                  onClick={() => {
                    setShowReadyDialog(false);
                    setShowFeedbackDialog(true);
                  }}
                  className="w-full bg-gray-100 text-gray-700 px-6 py-4 rounded-2xl font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  I'd like more practice
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {showFeedbackDialog && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          >
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-6 h-6 text-teal-600" />
                <h3 className="text-xl font-semibold text-gray-900">
                  What's holding you back?
                </h3>
              </div>
              <p className="text-gray-600 mb-6">
                Help us understand so we can adjust your therapy.
              </p>
              <div className="space-y-2 mb-6">
                {[
                  "I don't feel confident yet",
                  "The blends are difficult",
                  "I want more repetition",
                  "I speak too slowly",
                ].map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      setShowFeedbackDialog(false);
                      navigate('/practice');
                    }}
                    className="w-full text-left bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100 hover:border-teal-300 transition-all duration-200 text-gray-900"
                  >
                    {option}
                  </button>
                ))}
              </div>
              <button
                onClick={() => setShowFeedbackDialog(false)}
                className="w-full text-center text-gray-500 text-sm"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
