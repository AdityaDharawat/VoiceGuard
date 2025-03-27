// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Home from './pages/Home';
import Detection from './pages/Detection';
import Dashboard from './pages/Dashboard';
import Feedback from './pages/Feedback';
import AuthPage from './pages/authpage'; // Fixed component usage
import Navigation from './components/Navigation';
import ChatBot from './components/ChatBot';
import { useState } from 'react';
import { DetectionProvider } from './contexts/DetectionContext';

function App() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <Router>
      <DetectionProvider>
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <Navigation />
          <ChatBot isOpen={chatOpen} onClose={() => setChatOpen(false)} />
          <button 
            onClick={() => setChatOpen(true)}
            className="fixed z-50 bottom-8 right-8 w-16 h-16 rounded-full bg-blue-600 shadow-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center text-white"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </button>

          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/detect" element={<Detection />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/auth" element={<AuthPage />} /> {/* Fixed component usage */}
            </Routes>
          </AnimatePresence>
        </div>
        {/* Removed undefined Component and pageProps */}
      </DetectionProvider>
    </Router>
  );
}

export default App;