import { motion } from 'motion/react';
import { FileText, Send, Calendar, AlertCircle, TrendingUp, Award, Users, Brain } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function TherapistDashboard() {
  const patients = [
    {
      name: 'Sarah Mitchell',
      condition: 'Post-stroke aphasia',
      progress: 82,
      confidence: 70,
      status: 'improving',
      lastSession: '2 hours ago',
    },
    {
      name: 'David Chen',
      condition: 'Apraxia of speech',
      progress: 65,
      confidence: 58,
      status: 'stable',
      lastSession: '1 day ago',
    },
    {
      name: 'Maria Rodriguez',
      condition: 'Dysarthria',
      progress: 91,
      confidence: 88,
      status: 'excellent',
      lastSession: '3 hours ago',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-indigo-50 pb-24">
      <div className="max-w-md mx-auto px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-light text-gray-900 mb-1">
            Therapist Portal
          </h1>
          <p className="text-gray-500">Professional telehealth dashboard</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3 mb-6"
        >
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <Users className="w-6 h-6 text-teal-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-xs text-gray-500">Active Patients</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">78%</p>
            <p className="text-xs text-gray-500">Avg Progress</p>
          </div>
          <div className="bg-white rounded-2xl p-4 shadow-md text-center">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <p className="text-2xl font-bold text-gray-900">24</p>
            <p className="text-xs text-gray-500">This Week</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-4"
        >
          <h2 className="text-lg font-medium text-gray-900 mb-4">Patient Overview</h2>
        </motion.div>

        <div className="space-y-4">
          {patients.map((patient, index) => (
            <motion.div
              key={patient.name}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.05 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 text-lg">{patient.name}</h3>
                  <p className="text-sm text-gray-500">{patient.condition}</p>
                </div>
                <div
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    patient.status === 'excellent'
                      ? 'bg-green-100 text-green-700'
                      : patient.status === 'improving'
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-yellow-100 text-yellow-700'
                  }`}
                >
                  {patient.status === 'excellent' ? 'Excellent' : patient.status === 'improving' ? 'Improving' : 'Stable'}
                </div>
              </div>

              <div className="space-y-3 mb-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Articulation Accuracy</span>
                    <span className="text-sm font-semibold text-teal-600">{patient.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-teal-500 to-blue-500 h-2 rounded-full"
                      style={{ width: `${patient.progress}%` }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-600">Confidence Level</span>
                    <span className="text-sm font-semibold text-purple-600">{patient.confidence}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
                      style={{ width: `${patient.confidence}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <span>Last session: {patient.lastSession}</span>
              </div>

              {index === 0 && (
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 mb-4">
                  <div className="flex items-start gap-2">
                    <Brain className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="text-sm font-semibold text-gray-900 mb-1">AI-Generated Insight</h4>
                      <p className="text-xs text-gray-700">
                        Patient demonstrates improved isolated S production but reduced confidence during functional phrase communication. Consider more AR-assisted real-world practice.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <button className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-3 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <FileText className="w-4 h-4" />
                  Export Report
                </button>
                <button className="flex-1 bg-white border-2 border-blue-500 text-blue-600 px-4 py-3 rounded-xl text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  <Send className="w-4 h-4" />
                  Assign Task
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-orange-50 to-red-50 rounded-3xl p-6 shadow-lg mt-6 border border-orange-100"
        >
          <div className="flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Attention Needed</h3>
              <p className="text-sm text-gray-700 mb-3">
                2 patients have not completed their assigned exercises this week.
              </p>
              <button className="text-sm font-medium text-orange-600 hover:text-orange-700">
                View Details →
              </button>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mt-6"
        >
          <Calendar className="w-5 h-5" />
          Schedule Group Session
        </motion.button>
      </div>

      <BottomNav />
    </div>
  );
}
