import { motion } from 'motion/react';
import { Sparkles, Compass, Shield, HelpCircle, ChevronRight, LayoutDashboard, Search, FileText, Send, CheckSquare, GraduationCap, PlayCircle, KeyRound, LogIn, ChevronDown } from 'lucide-react';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  onNavigateHome: () => void;
  onEnterPortal: () => void;
  onEnterOnboarding: () => void;
}

export default function Navbar({ currentTab, setCurrentTab, onNavigateHome, onEnterPortal, onEnterOnboarding }: NavbarProps) {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/75 backdrop-blur-lg border-b border-zinc-200/50 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-20">
        {/* Brand Logo */}
        <div 
          onClick={onNavigateHome}
          className="flex items-center gap-2 cursor-pointer group"
          id="nav-logo-btn"
        >
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/20 transition-transform group-hover:scale-105">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-sans text-2xl font-bold tracking-tight text-primary transition-colors">
            Dhurandhar
          </span>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          <button
            onClick={onNavigateHome}
            className={`font-sans text-[15px] font-medium py-1 transition-all ${
              currentTab === 'landing'
                ? 'text-primary border-b-2 border-primary font-semibold'
                : 'text-zinc-600 hover:text-primary'
            }`}
            id="nav-link-platform"
          >
            Platform
          </button>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {currentTab === 'landing' ? (
            <>
              <button
                onClick={onEnterPortal}
                className="px-5 py-2.5 rounded-xl font-sans text-sm font-medium text-zinc-650 hover:text-primary hover:bg-zinc-50 transition-all cursor-pointer"
                id="nav-login-btn"
              >
                Login
              </button>
              <button
                onClick={onEnterOnboarding}
                className="bg-primary hover:bg-primary-hover text-white px-5 py-2.5 rounded-xl font-sans text-sm font-semibold transition-all active:scale-98 shadow-sm flex items-center gap-1.5 cursor-pointer"
                id="nav-getstarted-btn"
              >
                Get Started
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (currentTab !== 'login' && currentTab !== 'onboarding') ? (
            <button
              onClick={onNavigateHome}
              className="px-4 py-2 border border-zinc-200/80 hover:bg-zinc-50 rounded-xl font-sans text-xs font-semibold text-zinc-650 transition-all cursor-pointer"
              id="nav-logout-btn"
            >
              Sign Out
            </button>
          ) : null}
        </div>
      </div>
    </nav>
  );
}
