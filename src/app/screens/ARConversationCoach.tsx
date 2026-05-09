import { useState } from 'react';
import { useNavigate } from 'react-router';
import { motion } from 'motion/react';
import { Camera, Mic, X, Scan, CircleDot } from 'lucide-react';
import BottomNav from '../components/BottomNav';

export default function ARConversationCoach() {
  const navigate = useNavigate();
  const [isRecording, setIsRecording] = useState(false);
  const [detectedObject, setDetectedObject] = useState<string | null>('spoon');

  const objectPhrases: Record<string, string[]> = {
    spoon: [
      'Can you pass the spoon?',
      'I need a spoon, please.',
      'Where is my spoon?',
    ],
    sofa: [
      'Move me to the sofa.',
      'I want to sit on the sofa.',
      'Is the sofa comfortable?',
    ],
    sink: [
      'Turn on the sink.',
      'The sink is over there.',
      'Can you help me at the sink?',
    ],
  };

  const currentPhrases = detectedObject ? objectPhrases[detectedObject] : [];

  return (
    <div className="min-h-screen bg-black pb-24">
      <div className="relative h-screen">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Camera className="w-24 h-24 mx-auto mb-4 opacity-30" />
              <p className="text-sm">Camera preview simulated</p>
              <p className="text-xs mt-2">Point at household objects</p>
            </div>
          </div>

          {detectedObject && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div className="relative">
                <motion.div
                  animate={{
                    boxShadow: [
                      '0 0 0 0px rgba(20, 184, 166, 0.4)',
                      '0 0 0 20px rgba(20, 184, 166, 0)',
                    ],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                  className="w-32 h-32 rounded-2xl border-4 border-teal-400 bg-teal-400/10 flex items-center justify-center"
                >
                  <Scan className="w-12 h-12 text-teal-400" />
                </motion.div>
                <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                  <div className="bg-teal-500 text-white px-4 py-2 rounded-full text-sm font-medium">
                    Spoon detected
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        <div className="absolute top-0 left-0 right-0 p-6 flex items-center justify-between">
          <button
            onClick={() => navigate('/dashboard')}
            className="w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center"
          >
            <X className="w-6 h-6 text-white" />
          </button>
          <div className="bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full">
            <p className="text-white text-sm font-medium">AR Mode Active</p>
          </div>
          <div className="w-10"></div>
        </div>

        {detectedObject && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-32 left-0 right-0 px-6"
          >
            <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-md mx-auto">
              <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                <CircleDot className="w-5 h-5 text-teal-600" />
                Try saying:
              </h3>
              <div className="space-y-2">
                {currentPhrases.map((phrase, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsRecording(true);
                      setTimeout(() => {
                        setIsRecording(false);
                        navigate('/analysis');
                      }, 2000);
                    }}
                    className="w-full text-left bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-4 border border-teal-100 hover:border-teal-300 transition-all duration-200 hover:scale-[1.02]"
                  >
                    <p className="text-gray-900 font-medium">{phrase}</p>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-center">
                <motion.button
                  onClick={() => {
                    setIsRecording(!isRecording);
                    if (!isRecording) {
                      setTimeout(() => {
                        setIsRecording(false);
                        navigate('/analysis');
                      }, 2000);
                    }
                  }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-16 h-16 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                    isRecording
                      ? 'bg-red-500'
                      : 'bg-gradient-to-br from-teal-500 to-blue-500'
                  }`}
                >
                  <Mic className="w-8 h-8 text-white" />
                </motion.button>
              </div>

              {isRecording && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center text-sm text-red-600 mt-3 font-medium"
                >
                  Recording...
                </motion.p>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
