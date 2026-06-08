import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Application, ResumeData } from './types';
import { INITIAL_APPLICATIONS, INITIAL_RESUME, INITIAL_JOBS } from './data';

// Component imports
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ResumeBuilder from './components/ResumeBuilder';
import CoverLetter from './components/CoverLetter';
import CareerRoadmap from './components/CareerRoadmap';
import JobSearch from './components/JobSearch';
import LoginPage from './components/LoginPage';
import OnboardingPage from './components/OnboardingPage';

// Lucide icons
import { X, PlaySquare, ArrowUpRight, Sparkles, Compass, ShieldCheck, Cpu } from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<string>('landing');
  const [intendedTab, setIntendedTab] = useState<string>('resume');
  const [applications, setApplications] = useState<Application[]>(INITIAL_APPLICATIONS);
  const [resume, setResume] = useState<ResumeData>(INITIAL_RESUME);
  const [onboardingProfile, setOnboardingProfile] = useState<any>(null);
  const [prefill, setPrefill] = useState<{ jobTitle: string; company: string } | null>(null);
  const [showTutorial, setShowTutorial] = useState(false);


  // Synchronized callback handles
  const handleAddApplication = (newApp: Omit<Application, 'id' | 'dateUpdated'>) => {
    const formattedApp: Application = {
      ...newApp,
      id: `app-${Date.now()}`,
      dateUpdated: new Date().toISOString().split('T')[0]
    };
    setApplications(prev => [formattedApp, ...prev]);
  };

  // Cross-Tab Navigator with prefill trigger integration
  const handleNavigateToTab = (tab: string = 'resume', prefillData?: { jobTitle: string; company: string }) => {
    if (prefillData) {
      setPrefill(prefillData);
    } else {
      setPrefill(null);
    }
    
    // Intercept workspace access and require credentials/onboarding
    if (currentTab === 'landing' && tab !== 'landing' && tab !== 'login' && tab !== 'onboarding' && tab !== 'search') {
      setIntendedTab(tab);
      setCurrentTab('onboarding');
    } else {
      setCurrentTab(tab);
    }
  };

  // Profile saver
  const handleSaveResume = (updatedResume: ResumeData) => {
    setResume(updatedResume);
  };

  return (
    <div className="bg-background text-on-background font-sans electroshade-bg min-h-screen flex flex-col justify-between pt-0 transition-colors">
      
      {/* Absolute top custom Header Navbar element */}
      <Navbar 
        currentTab={currentTab} 
        setCurrentTab={setCurrentTab} 
        onNavigateHome={() => handleNavigateToTab('landing')}
        onEnterPortal={() => handleNavigateToTab('login')}
        onEnterOnboarding={() => handleNavigateToTab('onboarding')}
      />

      {/* Main Container node */}
      <main className="flex-1 w-full flex flex-col">
        <AnimatePresence mode="wait">
          {currentTab === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <HeroSection 
                onEnterPortal={handleNavigateToTab} 
                onShowTutorial={() => setShowTutorial(true)} 
              />
            </motion.div>
          ) : currentTab === 'login' ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <LoginPage 
                onLoginSuccess={() => setCurrentTab(intendedTab)}
                onBackToLanding={() => handleNavigateToTab('landing')}
                onSwitchToOnboarding={() => handleNavigateToTab('onboarding')}
              />
            </motion.div>
          ) : currentTab === 'onboarding' ? (
            <motion.div
              key="onboarding"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="w-full"
            >
              <OnboardingPage 
                onOnboardingComplete={(userData) => {
                  console.log("Onboarding completed: ", userData);
                  setOnboardingProfile(userData);
                  setCurrentTab(intendedTab);
                }}
                onBackToLanding={() => handleNavigateToTab('landing')}
                onSwitchToLogin={() => handleNavigateToTab('login')}
              />
            </motion.div>
          ) : (
            <motion.div
              key="portal"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-28 pb-20 text-left"
            >
              {/* Inner console tabs rail */}
              <div className="flex border-b border-zinc-200/80 mb-8 overflow-x-auto gap-2 sm:gap-6 pb-0.5 scrollbar-none">
                {[
                  { id: 'search', label: 'Search Jobs' },
                  { id: 'resume', label: 'AI Resume Builder' },
                  { id: 'cover', label: 'Cover Letter Maker' },
                  { id: 'roadmap', label: 'Career Roadmaps' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => handleNavigateToTab(tab.id)}
                    className={`font-sans text-xs sm:text-sm font-bold pb-3.5 transition-all outline-none border-b-2 whitespace-nowrap cursor-pointer ${
                      currentTab === tab.id
                        ? 'text-primary border-primary font-bold'
                        : 'text-zinc-400 hover:text-zinc-700 border-transparent font-semibold'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Console core render pane routers */}
              <div className="w-full">
                {currentTab === 'search' && (
                  <JobSearch
                    onAddApplication={handleAddApplication}
                    onNavigateToTab={handleNavigateToTab}
                    initialProfile={onboardingProfile}
                  />
                )}
                {currentTab === 'resume' && (
                  <ResumeBuilder 
                    initialResume={resume} 
                    onSaveResume={handleSaveResume} 
                  />
                )}
                {currentTab === 'cover' && (
                  <CoverLetter 
                    prefill={prefill} 
                    applicantName={resume.fullName} 
                  />
                )}
                {currentTab === 'roadmap' && (
                  <CareerRoadmap />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Matching corporate custom footer block */}
      <footer className="bg-surface border-t border-zinc-200/60 shadow-xs py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-8 text-left">
          <div className="flex flex-col gap-1.5">
            <div className="font-sans text-lg font-bold text-primary tracking-tight">Dhurandhar</div>
            <p className="text-zinc-500 text-xs font-sans">
              © {new Date().getFullYear()} Dhurandhar AI – High-Performance Corporate Recruitment Copilot. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs text-zinc-500 font-medium font-sans">
            <a href="#" className="hover:text-primary underline transition-all">Privacy Policy</a>
            <a href="#" className="hover:text-primary underline transition-all">Terms of Service</a>
            <a href="#" className="hover:text-primary underline transition-all">Cookie Policy</a>
            <a href="#" className="hover:text-primary underline transition-all">Security</a>
            <a href="#" className="hover:text-primary underline transition-all">Contact Support</a>
          </div>
        </div>
      </footer>

      {/* Tutorial Video Walkthrough popup simulation */}
      {showTutorial && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-full max-w-xl bg-white rounded-2xl border p-6 text-left shadow-2xl relative space-y-5"
          >
            <button
              onClick={() => setShowTutorial(false)}
              className="absolute top-4 right-4 p-1.5 hover:bg-zinc-100 rounded-lg text-zinc-400 hover:text-zinc-800 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold">
                <PlaySquare className="w-5 h-5" />
              </div>
              <h3 className="font-sans text-lg font-bold text-zinc-900">How Dhurandhar Careers Works</h3>
            </div>

            <p className="text-zinc-600 text-sm font-sans leading-relaxed">
              Dhurandhar acts as a cohesive workspace linking every key segment of your recruitment efforts. Follow these steps to optimize your results:
            </p>

            <div className="space-y-3.5 pt-1">
              <div className="flex gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-50 border text-primary font-bold font-sans flex items-center justify-center text-xs shrink-0 mt-0.5">1</span>
                <div>
                  <span className="font-bold text-zinc-800 block">AI Resume Customizer</span>
                  <span className="text-xs text-zinc-500">Perfect your resume ATS matching configurations and skill sets list.</span>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-50 border text-primary font-bold font-sans flex items-center justify-center text-xs shrink-0 mt-0.5">2</span>
                <div>
                  <span className="font-bold text-zinc-800 block">Tailor Cover Letters</span>
                  <span className="text-xs text-zinc-500">Instantly generate high-relevance corporate application pitches for any job.</span>
                </div>
              </div>

              <div className="flex gap-3 text-sm">
                <span className="w-6 h-6 rounded-full bg-indigo-50 border text-primary font-bold font-sans flex items-center justify-center text-xs shrink-0 mt-0.5">3</span>
                <div>
                  <span className="font-bold text-zinc-800 block">Map Progression Pathways</span>
                  <span className="text-xs text-zinc-500">Formulate detailed professional roadmap pathways straight to your target dream role.</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setShowTutorial(false);
                handleNavigateToTab('resume');
              }}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1"
            >
              Open AI Resume Builder Now
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
