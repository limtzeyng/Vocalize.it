import { useState } from 'react';
import { motion } from 'motion/react';
import { Plus, Heart, Home, Utensils, Droplet, Star, Edit2 } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function CaregiverPhraseBank() {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const phraseCategories = [
    {
      category: 'Daily Needs',
      icon: Home,
      color: 'teal',
      phrases: [
        'Can you move me?',
        'I need water.',
        'Pass the remote.',
        'Turn on the light.',
      ],
    },
    {
      category: 'Meals',
      icon: Utensils,
      color: 'orange',
      phrases: [
        'Can you pass the spoon?',
        'I want some soup.',
        'Pass the salt, please.',
        'Is the sandwich ready?',
      ],
    },
    {
      category: 'Comfort',
      icon: Heart,
      color: 'purple',
      phrases: [
        'Move me to the sofa.',
        'I need a softer pillow.',
        'Can you stop the fan?',
        'The music is too loud.',
      ],
    },
    {
      category: 'Hydration',
      icon: Droplet,
      color: 'blue',
      phrases: [
        'Can I have some water?',
        'Pass the glass, please.',
        'Is the soup hot?',
        'I need ice.',
      ],
    },
  ];

  const colorMap: Record<string, { bg: string; text: string; border: string }> = {
    teal: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-200' },
    orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-200' },
    purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-200' },
    blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200' },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 pb-24">
      <div className="max-w-md mx-auto px-6 pt-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-3xl font-light text-gray-900 mb-1">
            Phrase Bank
          </h1>
          <p className="text-gray-500">Customized communication support</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-3xl p-6 shadow-lg mb-6 border border-purple-100"
        >
          <div className="flex items-start gap-3">
            <Heart className="w-6 h-6 text-purple-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">
                For Caregivers
              </h3>
              <p className="text-sm text-gray-700">
                Create personalized household phrases to help patients practice real-world communication they'll actually use.
              </p>
            </div>
          </div>
        </motion.div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          onClick={() => setShowAddDialog(true)}
          className="w-full bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-4 rounded-2xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 mb-6"
        >
          <Plus className="w-5 h-5" />
          Add Custom Phrase
        </motion.button>

        <div className="space-y-6">
          {phraseCategories.map((category, index) => {
            const Icon = category.icon;
            const colors = colorMap[category.color];
            return (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.05 }}
                className="bg-white rounded-3xl p-6 shadow-md"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl ${colors.bg} flex items-center justify-center`}>
                    <Icon className={`w-5 h-5 ${colors.text}`} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{category.category}</h3>
                    <p className="text-xs text-gray-500">{category.phrases.length} phrases</p>
                  </div>
                </div>

                <div className="space-y-2">
                  {category.phrases.map((phrase, phraseIndex) => (
                    <div
                      key={phraseIndex}
                      className={`bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-4 border ${colors.border} flex items-center justify-between group hover:shadow-md transition-all duration-200`}
                    >
                      <p className="text-gray-900">{phrase}</p>
                      <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <Edit2 className="w-4 h-4 text-gray-400 hover:text-gray-600" />
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-5 border border-teal-100 mt-6"
        >
          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-teal-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-teal-900 mb-1">
                <strong>Pro Tip:</strong> Focus on phrases your loved one uses most often
              </p>
              <p className="text-xs text-teal-700">
                Real-world practice builds functional communication faster than isolated word drills.
              </p>
            </div>
          </div>
        </motion.div>

        {showAddDialog && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center p-6 z-50"
          >
            <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Add Custom Phrase
              </h3>
              <input
                type="text"
                placeholder="e.g., Can you pass the spoon?"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-4 focus:outline-none focus:border-teal-500 transition-colors"
              />
              <select className="w-full border-2 border-gray-200 rounded-xl px-4 py-3 mb-6 focus:outline-none focus:border-teal-500 transition-colors">
                <option>Daily Needs</option>
                <option>Meals</option>
                <option>Comfort</option>
                <option>Hydration</option>
              </select>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="flex-1 bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-medium hover:bg-gray-200 transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="flex-1 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Add Phrase
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
