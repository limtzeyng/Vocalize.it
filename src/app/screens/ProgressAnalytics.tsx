import { motion } from 'motion/react';
import { TrendingUp, Award, Target, Calendar, AlertTriangle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import BottomNav from '../components/BottomNav';

export default function ProgressAnalytics() {
  const pronunciationData = [
    { day: 'Mon', accuracy: 68 },
    { day: 'Tue', accuracy: 72 },
    { day: 'Wed', accuracy: 75 },
    { day: 'Thu', accuracy: 78 },
    { day: 'Fri', accuracy: 80 },
    { day: 'Sat', accuracy: 82 },
    { day: 'Sun', accuracy: 82 },
  ];

  const confidenceData = [
    { day: 'Mon', confidence: 55 },
    { day: 'Tue', confidence: 58 },
    { day: 'Wed', confidence: 62 },
    { day: 'Thu', confidence: 65 },
    { day: 'Fri', confidence: 68 },
    { day: 'Sat', confidence: 68 },
    { day: 'Sun', confidence: 70 },
  ];

  const blendDifficulty = [
    { blend: 'sp', accuracy: 68 },
    { blend: 'st', accuracy: 75 },
    { blend: 'sk', accuracy: 80 },
    { blend: 'sm', accuracy: 82 },
    { blend: 'sn', accuracy: 85 },
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
            Analytics
          </h1>
          <p className="text-gray-500">Your rehabilitation progress</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 gap-3 mb-6"
        >
          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-teal-600" />
              <span className="text-sm text-gray-500">Accuracy</span>
            </div>
            <p className="text-3xl font-bold text-teal-600">82%</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +14% this week
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-purple-600" />
              <span className="text-sm text-gray-500">Confidence</span>
            </div>
            <p className="text-3xl font-bold text-purple-600">70%</p>
            <p className="text-xs text-green-600 mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +15% this week
            </p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
              <span className="text-sm text-gray-500">Streak</span>
            </div>
            <p className="text-3xl font-bold text-blue-600">12</p>
            <p className="text-xs text-gray-500 mt-1">days in a row</p>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-md">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-orange-600" />
              <span className="text-sm text-gray-500">Sessions</span>
            </div>
            <p className="text-3xl font-bold text-orange-600">47</p>
            <p className="text-xs text-gray-500 mt-1">total completed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <h3 className="font-semibold text-gray-900 mb-4">
            Weekly S Articulation Progress
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={pronunciationData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} domain={[60, 90]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="accuracy"
                stroke="url(#colorAccuracy)"
                strokeWidth={3}
                dot={{ fill: '#14B8A6', strokeWidth: 2, r: 5 }}
              />
              <defs>
                <linearGradient id="colorAccuracy" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#14B8A6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <h3 className="font-semibold text-gray-900 mb-4">
            Confidence vs Performance Trend
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={confidenceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} domain={[50, 80]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Line
                type="monotone"
                dataKey="confidence"
                stroke="url(#colorConfidence)"
                strokeWidth={3}
                dot={{ fill: '#A855F7', strokeWidth: 2, r: 5 }}
              />
              <defs>
                <linearGradient id="colorConfidence" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#A855F7" />
                  <stop offset="100%" stopColor="#EC4899" />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            Most Difficult Consonant Blends
            <AlertTriangle className="w-4 h-4 text-orange-500" />
          </h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={blendDifficulty}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="blend" tick={{ fontSize: 12, fill: '#6B7280' }} />
              <YAxis tick={{ fontSize: 12, fill: '#6B7280' }} domain={[0, 100]} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                }}
              />
              <Bar dataKey="accuracy" fill="url(#colorBar)" radius={[8, 8, 0, 0]} />
              <defs>
                <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#14B8A6" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
          <p className="text-sm text-gray-600 mt-3">
            <strong className="text-orange-600">"sp"</strong> blend needs focused practice
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-5 border border-teal-100"
        >
          <p className="text-sm text-teal-900 mb-2">
            <strong>Key Insight:</strong> Your airflow control is much stronger today.
          </p>
          <p className="text-xs text-teal-700">
            Great consistency compared to last session. Keep building confidence!
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
