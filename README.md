
  # AI Speech Rehabilitation App

  This is a code bundle for AI Speech Rehabilitation App. The original project is available at https://www.figma.com/design/LGarRNfntYYxn161EVxXYR/AI-Speech-Rehabilitation-App.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.

  # 🎙️ Vocalize.it

**Vocalize.it** is an AI-powered speech therapy companion designed to bridge the gap between clinical visits and at-home practice. By leveraging Google's Gemini Multimodal AI and Firebase, the platform provides real-time pronunciation feedback and transforms the user's environment into a functional practice space.

## 🛠️ The Tech Stack

- **Framework:** [Next.js 14+](https://nextjs.org/) (App Router)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Backend/Database:** [Firebase](https://firebase.google.com/) (Firestore)
- **AI Engine:** [Google Gemini API](https://ai.google.dev/) (Vision & Pro)
- **Icons:** [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have **Node.js v18+** installed on your machine.

### 2. Installation
Clone the repository and install the necessary dependencies:
```bash
git clone <your-repo-url>
cd vocalize-it
npm install
npm run dev```

### 3. Environment (.env file)
# Google AI
GEMINI_API_KEY=Your_Gemini_API_Key

# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyC_1bNOsPFkSNqma6vSs38Ooc427SYjiLY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=vocalize-it.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=vocalize-it
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=vocalize-it.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=212768621561
NEXT_PUBLIC_FIREBASE_APP_ID=1:212768621561:web:779373ce67773e0a9b328
