export function buildPronunciationPrompt(params: {
  targetSound: string;
  expectedResponse: string;
  practiceLevel: string;
}) {
  const { targetSound, expectedResponse, practiceLevel } = params;

  return `
You are helping with speech therapy home practice.

Target sound: /${targetSound}/
Expected response: "${expectedResponse}"
Practice level: ${practiceLevel}

Evaluate the user's pronunciation attempt.

Return JSON only in this exact format:
{
  "transcription": "what the user appeared to say",
  "isCorrect": true,
  "accuracyScore": 85,
  "feedback": "short, specific feedback",
  "encouragement": "friendly encouragement",
  "nextTip": "one simple tip for the next attempt"
}

Rules:
- Be encouraging and simple.
- Do not diagnose.
- Do not claim to replace a speech therapist.
- Focus only on whether the attempt is close enough for home practice.
- If unsure, mark "isCorrect" as false.
- accuracyScore must be a number from 0 to 100.
`;
}

export function buildObjectDetectionPrompt() {
  return `
You are helping create functional speech therapy practice.

Look at the image and identify one common household object.

Return JSON only in this exact format:
{
  "object": "spoon",
  "phrase": "Pass the spoon",
  "targetWords": ["pass", "spoon"],
  "difficulty": "easy"
}

Rules:
- Choose only one clear object.
- The phrase should be short and useful in daily life.
- Keep the phrase suitable for a speech therapy practice app.
- difficulty must be one of: "easy", "medium", "hard".
`;
}