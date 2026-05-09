import { createBrowserRouter } from "react-router";
import SplashScreen from "./screens/SplashScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeDashboard from "./screens/HomeDashboard";
import ARConversationCoach from "./screens/ARConversationCoach";
import SpeechPractice from "./screens/SpeechPractice";
import LiveAIAnalysis from "./screens/LiveAIAnalysis";
import AdaptiveProgression from "./screens/AdaptiveProgression";
import ProgressAnalytics from "./screens/ProgressAnalytics";
import CaregiverPhraseBank from "./screens/CaregiverPhraseBank";
import TherapistDashboard from "./screens/TherapistDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: SplashScreen,
  },
  {
    path: "/login",
    Component: LoginScreen,
  },
  {
    path: "/dashboard",
    Component: HomeDashboard,
  },
  {
    path: "/ar-coach",
    Component: ARConversationCoach,
  },
  {
    path: "/practice",
    Component: SpeechPractice,
  },
  {
    path: "/analysis",
    Component: LiveAIAnalysis,
  },
  {
    path: "/progression",
    Component: AdaptiveProgression,
  },
  {
    path: "/analytics",
    Component: ProgressAnalytics,
  },
  {
    path: "/caregiver",
    Component: CaregiverPhraseBank,
  },
  {
    path: "/therapist",
    Component: TherapistDashboard,
  },
]);
