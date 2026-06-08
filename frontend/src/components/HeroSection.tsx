import { motion } from 'motion/react';
import { Sparkles, ArrowRight, PlayCircle, Search, FileText, LayoutDashboard, Send } from 'lucide-react';

interface HeroSectionProps {
  onEnterPortal: (startingTab?: string, prefillData?: { jobTitle: string; company: string }) => void;
  onShowTutorial: () => void;
}

export default function HeroSection({ onEnterPortal, onShowTutorial }: HeroSectionProps) {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto text-center">
        <div className="flex flex-col items-center gap-8">
          {/* Centered Text Pillar */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full space-y-8 flex flex-col items-center"
          >
            {/* Sparkle Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/5 text-primary rounded-full border border-primary/10">
              <Sparkles className="w-4 h-4 text-primary animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider font-sans">
                AI Career Agent
              </span>
            </div>

            {/* Display Header */}
            <h1 className="font-sans text-4xl sm:text-5xl lg:text-[54px] font-bold text-zinc-900 leading-[1.1] tracking-tight">
              Build Resumes <span className="text-primary">Smarter.</span><br />
              Model Careers <span className="text-secondary">Better.</span>
            </h1>

            {/* Description Paragraph */}
            <p className="text-zinc-600 text-lg sm:text-xl font-sans max-w-2xl leading-relaxed">
              Dhurandhar is your AI career copilot that helps you build tailored resumes, generate personalized cover letters, and map structural career roadmaps.
            </p>

            {/* Strategic Prompt Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-2">
              <button
                onClick={() => onEnterPortal('resume')}
                className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md group cursor-pointer font-sans font-semibold text-base"
                id="hero-getstarted-btn"
              >
                Get Started
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onShowTutorial}
                className="bg-white hover:bg-zinc-50 border border-zinc-200 text-zinc-800 px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer font-sans font-medium text-base shadow-sm"
                id="hero-tutorial-btn"
              >
                <PlayCircle className="w-5 h-5 text-zinc-500" />
                See How It Works
              </button>

              <button
                onClick={() => onEnterPortal('search')}
                className="bg-zinc-950 hover:bg-zinc-800 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 cursor-pointer font-sans font-semibold text-base shadow-sm"
                id="hero-search-btn"
              >
                <Search className="w-5 h-5" />
                Search Jobs
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Bento-Grid Features Section */}
      <section className="py-24 bg-white/40 border-t border-zinc-200/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-sans text-3xl sm:text-4xl font-bold text-zinc-900 mb-16">
              Everything You Need to Get Hired
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1: AI Resume Builder */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              onClick={() => onEnterPortal('resume')}
              className="glass-card p-8 rounded-2xl text-left cursor-pointer transition-all duration-300 hover:translate-y-[-6px] hover:shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <FileText className="w-7 h-7" />
              </div>
              <h3 className="font-sans text-lg font-bold text-zinc-900 mb-3">AI Resume Builder</h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed">
                Create ATS-optimized resumes tailored for every role with our advanced intelligence.
              </p>
            </motion.div>

            {/* Feature 2: Cover Letter Generator */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.5 }}
              onClick={() => onEnterPortal('cover')}
              className="glass-card p-8 rounded-2xl text-left cursor-pointer transition-all duration-300 hover:translate-y-[-6px] hover:shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <Send className="w-7 h-7" />
              </div>
              <h3 className="font-sans text-lg font-bold text-zinc-900 mb-3">Cover Letter Generator</h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed">
                Generate personalized cover letters in seconds that speak directly to the hiring manager.
              </p>
            </motion.div>

            {/* Feature 3: Career Roadmap */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={() => onEnterPortal('roadmap')}
              className="glass-card p-8 rounded-2xl text-left cursor-pointer transition-all duration-300 hover:translate-y-[-6px] hover:shadow-lg group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/5 text-primary flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                <LayoutDashboard className="w-7 h-7" />
              </div>
              <h3 className="font-sans text-lg font-bold text-zinc-900 mb-3">Career Roadmap</h3>
              <p className="text-zinc-600 text-[15px] leading-relaxed">
                Get a personalized skill-building roadmap to bridge the gap and reach your dream role.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
