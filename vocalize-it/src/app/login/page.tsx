import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { User, Heart, Stethoscope, Activity } from 'lucide-react';

export default function LoginScreen() {
  const router = useRouter();

  const loginOptions = [
    {
      icon: User,
      title: 'Patient Login',
      description: 'Continue your rehabilitation journey',
      gradient: 'from-teal-500 to-blue-500',
      onClick: () => router.push('/patient/practice'),
    },
    {
      icon: Heart,
      title: 'Caregiver Access',
      description: 'Support and customize therapy',
      gradient: 'from-purple-500 to-pink-500',
      onClick: () => router.push('/patient/caregiver'),
    },
    {
      icon: Stethoscope,
      title: 'Therapist Portal',
      description: 'Monitor patient progress',
      gradient: 'from-blue-500 to-indigo-600',
      onClick: () => router.push('/therapist/dashboard'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-2 mb-3">
          <Activity className="w-8 h-8 text-teal-600" />
          <h1 className="text-4xl font-light text-gray-900">
            Vocalize<span className="text-teal-600">.it</span>
          </h1>
        </div>
        <p className="text-gray-500">Select your access type</p>
      </motion.div>

      <div className="w-full max-w-md space-y-4">
        {loginOptions.map((option, index) => {
          const Icon = option.icon;
          return (
            <motion.button
              key={option.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={option.onClick}
              className="w-full bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-4 group hover:scale-[1.02]"
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${option.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="w-7 h-7 text-white" strokeWidth={2} />
              </div>
              <div className="flex-1 text-left">
                <h3 className="font-medium text-gray-900 text-lg">{option.title}</h3>
                <p className="text-sm text-gray-500">{option.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-sm text-gray-400 mt-12 text-center"
      >
        Professional speech rehabilitation platform
      </motion.p>
    </div>
  );
}
