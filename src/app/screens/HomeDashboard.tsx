import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Camera, Mic, TrendingUp, Users, FileText, Play, Activity, Award, Target } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function HomeDashboard() {
  const navigate = useNavigate();

  const therapyCards = [
    {
      icon: Play,
      title: 'Start Therapy',
      description: 'Continue S-sound practice',
      gradient: 'from-teal-500 to-blue-500',
      onClick: () => navigate('/practice'),
    },
    {
      icon: Camera,
      title: 'AR Conversation Practice',
      description: 'Real-world object recognition',
      gradient: 'from-purple-500 to-pink-500',
      onClick: () => navigate('/ar-coach'),
    },
    {
      icon: TrendingUp,
      title: 'Progress Analytics',
      description: 'View your improvements',
      gradient: 'from-blue-500 to-indigo-600',
      onClick: () => navigate('/analytics'),
    },
    {
      icon: Users,
      title: 'Caregiver Phrase Bank',
      description: 'Customize daily phrases',
      gradient: 'from-orange-400 to-red-500',
      onClick: () => navigate('/caregiver'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-24">
      <div className="max-w-md mx-auto px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-light text-gray-900 mb-1">
            Welcome back, Sarah
          </h1>
          <p className="text-gray-500">Let's continue your progress</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl p-6 shadow-lg mb-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-teal-400 to-blue-500 flex items-center justify-center">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="font-medium text-gray-900">Current Stage</h2>
              <p className="text-sm text-gray-500">Level 4: S Blends</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-600" />
                <span className="text-sm text-gray-600">Pronunciation Accuracy</span>
              </div>
              <span className="font-semibold text-teal-600">82%</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full" style={{ width: '82%' }}></div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Target className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-600">Confidence Level</span>
              </div>
              <span className="font-semibold text-purple-600">Growing</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-2">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
        </motion.div>

        <div className="space-y-3">
          {therapyCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <motion.button
                key={card.title}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                onClick={card.onClick}
                className="w-full bg-white rounded-2xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4 group hover:scale-[1.01]"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-6 h-6 text-white" strokeWidth={2} />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-medium text-gray-900">{card.title}</h3>
                  <p className="text-sm text-gray-500">{card.description}</p>
                </div>
              </motion.button>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-5 border border-teal-100"
        >
          <p className="text-sm text-teal-900 mb-2">
            <strong>Today's Goal:</strong> Practice 5 S-blend words with functional phrases
          </p>
          <p className="text-xs text-teal-700">
            You're improving steadily. Keep building confidence!
          </p>
        </motion.div>
      </div>

      <BottomNav />
    </div>
  );
}
