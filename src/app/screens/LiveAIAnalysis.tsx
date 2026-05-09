import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { CheckCircle2, AlertCircle, TrendingUp, Lightbulb, ArrowRight, Volume2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function LiveAIAnalysis() {
  const navigate = useNavigate();

  const phonemeAnalysis = [
    { phoneme: 'S', accuracy: 68, status: 'needs-work' },
    { phoneme: 'p', accuracy: 95, status: 'good' },
    { phoneme: 'oo', accuracy: 92, status: 'good' },
    { phoneme: 'n', accuracy: 98, status: 'excellent' },
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
            AI Analysis
          </h1>
          <p className="text-gray-500">Pronunciation feedback</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-medium text-gray-900 mb-1">Target Word</h2>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-light text-gray-900">Spoon</p>
                <button className="text-teal-600">
                  <Volume2 className="w-5 h-5" />
                </button>
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-500 mb-1">78%</div>
              <p className="text-xs text-gray-500">Overall Score</p>
            </div>
          </div>

          <div className="space-y-3">
            {phonemeAnalysis.map((item, index) => (
              <motion.div
                key={item.phoneme}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg ${
                    item.status === 'needs-work'
                      ? 'bg-red-100 text-red-600'
                      : item.status === 'good'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-green-100 text-green-600'
                  }`}
                >
                  {item.phoneme}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Accuracy</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {item.accuracy}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${
                        item.status === 'needs-work'
                          ? 'bg-red-500'
                          : item.status === 'good'
                          ? 'bg-blue-500'
                          : 'bg-green-500'
                      }`}
                      style={{ width: `${item.accuracy}%` }}
                    ></div>
                  </div>
                </div>
                {item.status === 'needs-work' ? (
                  <AlertCircle className="w-5 h-5 text-red-500" />
                ) : (
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-red-50 to-orange-50 rounded-3xl p-6 shadow-lg mb-6 border border-red-100"
        >
          <div className="flex items-start gap-3 mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                Primary Challenge Identified
              </h3>
              <p className="text-sm text-gray-700">
                Airflow weak during initial consonant blend.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="w-5 h-5 text-amber-500" />
            <h3 className="font-semibold text-gray-900">AI Recommendations</h3>
          </div>

          <div className="space-y-3">
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  1
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Slow down pacing
                  </p>
                  <p className="text-xs text-gray-600">
                    Take more time between the "S" and "p" sounds
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-purple-600 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  2
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Practice isolated S-blends
                  </p>
                  <p className="text-xs text-gray-600">
                    Try "sp", "st", "sk" without the full word
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0 text-white text-xs font-bold">
                  3
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 mb-1">
                    Adjust tongue positioning
                  </p>
                  <p className="text-xs text-gray-600">
                    Keep tongue tip closer to upper teeth
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="flex gap-3"
        >
          <button
            onClick={() => navigate('/practice')}
            className="flex-1 bg-white border-2 border-teal-500 text-teal-600 px-6 py-4 rounded-2xl font-medium shadow-md hover:shadow-lg transition-all duration-300"
          >
            Try Again
          </button>
          <button
            onClick={() => navigate('/progression')}
            className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
          >
            Continue
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
