import { useState, FormEvent } from 'react';
import { motion } from 'motion/react';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Chrome, 
  Linkedin, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  Layers,
  ChevronRight,
  UserCheck
} from 'lucide-react';

interface LoginPageProps {
  onLoginSuccess: () => void;
  onBackToLanding: () => void;
  onSwitchToOnboarding?: () => void;
}

export default function LoginPage({ onLoginSuccess, onBackToLanding, onSwitchToOnboarding }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Custom interactive/loading states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingText, setLoadingText] = useState('Verifying credentials...');
  const [signUpMode, setSignUpMode] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form submit handler
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    setLoadingText('Verifying credentials...');

    // Multi-phase loading simulation for a high-end corporate application feel
    setTimeout(() => {
      setLoadingText('Securing authentication tunnel...');
      setTimeout(() => {
        setLoadingText('Syncing resume portfolio database...');
        setTimeout(() => {
          setSuccess(true);
          setTimeout(() => {
            onLoginSuccess();
          }, 400);
        }, 600);
      }, 500);
    }, 650);
  };

  // Social login mock handler
  const handleSocialLogin = (platform: string) => {
    setIsSubmitting(true);
    setLoadingText(`Initializing ${platform} secure login...`);
    setTimeout(() => {
      setLoadingText('Retrieving OAuth handshake details...');
      setTimeout(() => {
        setSuccess(true);
        setTimeout(() => {
          onLoginSuccess();
        }, 400);
      }, 600);
    }, 700);
  };

  return (
    <div className="min-h-screen w-full electroshade-bg flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left Section: Pitch & Beautiful Dynamic Dash Mockup UI */}
        <div className="lg:col-span-6 space-y-8 text-left hidden lg:block">
          
          {/* Brand/Product Pitch */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#004ac6]/10 text-[#004ac6] rounded-full border border-[#004ac6]/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider font-sans">Premium Enterprise Suite</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
            >
              Welcome Back to <span className="text-primary font-extrabold">Dhurandhar</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[#475569] text-[15px] leading-relaxed max-w-md font-sans font-medium"
            >
              Continue building smarter resumes, generating personalized cover letters, and accelerating your career with AI.
            </motion.p>
          </div>

          {/* Premium Widgets Showcase Simulator */}
          <div className="space-y-4 relative">
            
            {/* Widget 1: Resume Score Progress */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-5 rounded-2xl border border-zinc-200/50 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold">
                  <Target className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">ATS Keyword Match Score</h4>
                  <p className="text-[10px] text-[#475569] font-mono font-medium">Resume file: aditya_patel_cv.pdf</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center gap-1">
                  <span className="h-1.5 w-1.5 bg-emerald-500 rounded-full"></span>
                  94/100
                </span>
              </div>
            </motion.div>

            {/* Widget 2: ATS Optimization Widget */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="bg-white p-4.5 rounded-2xl border border-zinc-200/50 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between animate-float"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold border border-emerald-100">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#0F172A]">ATS Format Optimizer</h4>
                  <p className="text-[10px] text-emerald-600 font-semibold font-sans">Active action verbs & contact layout validated</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-white bg-emerald-500 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                Optimized
              </span>
            </motion.div>

            {/* Widget 3: Career Roadmap Preview Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="bg-white p-5 rounded-2xl border border-zinc-200/50 shadow-sm hover:shadow-md transition-shadow space-y-3.5"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                    <Layers className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#0F172A]">Career Roadmap Pathway</h4>
                    <p className="text-[10px] text-[#475569] font-medium">Goal: Director of Engineering</p>
                  </div>
                </div>
                <span className="bg-primary/5 text-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                  74% Complete
                </span>
              </div>
              
              {/* Sequential Steps simulation matching CareerRoadmap */}
              <div className="grid grid-cols-3 gap-2 pt-1 border-t border-zinc-100">
                <div className="bg-emerald-50 border border-emerald-100/60 p-2 rounded-xl text-center">
                  <p className="text-[9px] font-bold text-emerald-800 leading-none">Milestone 1</p>
                  <span className="text-[8px] text-emerald-600 font-medium block mt-1">CV Audit</span>
                </div>
                <div className="bg-emerald-50 border border-emerald-100/60 p-2 rounded-xl text-center">
                  <p className="text-[9px] font-bold text-emerald-800 leading-none">Milestone 2</p>
                  <span className="text-[8px] text-emerald-600 font-medium block mt-1">Pitch Deck</span>
                </div>
                <div className="bg-amber-50 border border-amber-100/60 p-2 rounded-xl text-center animate-pulse">
                  <p className="text-[9px] font-bold text-amber-800 leading-none">Milestone 3</p>
                  <span className="text-[8px] text-amber-600 font-medium block mt-1">Tech Audit</span>
                </div>
              </div>
            </motion.div>

            {/* Widget 4: Job Match Percentage Card */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="bg-white p-4 rounded-xl border border-zinc-200/50 shadow-xs flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-green-50 text-green-600 flex items-center justify-center border border-green-100">
                  <TrendingUp className="w-[18px] h-[18px]" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#0F172A]">Job Match Recommendation</p>
                  <span className="text-[10px] text-[#475569] font-medium block">Machine Learning Architect @ Microsoft Corp</span>
                </div>
              </div>
              <span className="bg-emerald-500 font-mono text-[10px] font-bold text-white px-2 py-0.5 rounded-md shadow-xs shrink-0">
                96% Match
              </span>
            </motion.div>

            {/* Floating Subtle Decorating Elements */}
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10 animate-pulse"></div>
            <div className="absolute -bottom-12 right-12 w-48 h-48 bg-secondary/10 rounded-full blur-3xl -z-10"></div>
          </div>

        </div>

        {/* Right Section: Centered Beautiful White Login Card */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto flex flex-col items-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full bg-white rounded-[20px] border border-zinc-200/60 p-8 shadow-xl relative overflow-hidden"
          >
            {/* Header branding logo section (re-established within login form) */}
            <div className="flex flex-col items-center text-center space-y-2 mb-8">
              <div 
                onClick={onBackToLanding}
                className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/25 cursor-pointer hover:scale-105 transition-transform"
              >
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-zinc-950 font-sans tracking-tight">
                {signUpMode ? 'Create your Account' : 'Sign in to Dhurandhar'}
              </h2>
              <p className="text-zinc-500 text-xs font-sans">
                {signUpMode ? 'Get started with high performance AI career models' : 'Enter your credentials to access your workspaces'}
              </p>
            </div>

            {/* Simulated interactive actions */}
            {!isSubmitting ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Email Address */}
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-bold text-zinc-700 font-sans" htmlFor="email-input">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                    <input 
                      id="email-input"
                      type="email"
                      required
                      placeholder="you@corporate.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-zinc-800"
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div className="space-y-1.5 text-left">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-zinc-700 font-sans" htmlFor="password-input">
                      Password
                    </label>
                    {!signUpMode && (
                      <button
                        type="button"
                        onClick={() => alert('Reset instructions sent to the simulated inbox.')}
                        className="text-[11px] font-semibold text-primary hover:underline"
                      >
                        Forgot Password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                    <input 
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-zinc-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 transition-colors"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Remember Me / Terms */}
                <div className="flex items-center justify-between text-left">
                  <label className="flex items-center gap-2 cursor-pointer group">
                    <input 
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 rounded border-zinc-350 text-primary focus:ring-primary focus:ring-offset-0 focus:ring-1 cursor-pointer"
                    />
                    <span className="text-[11px] font-medium text-zinc-650 group-hover:text-zinc-800 transition-colors select-none font-sans">
                      {signUpMode ? 'I accept all usage agreements' : 'Remember me on this browser'}
                    </span>
                  </label>
                </div>

                {/* Submit button following landing styles explicitly */}
                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 px-4 rounded-xl font-sans font-semibold text-sm transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
                >
                  <span>{signUpMode ? 'Create free account' : 'Sign in to workspace'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {/* SSO block dividers */}
                <div className="relative my-6 flex items-center">
                  <div className="flex-grow border-t border-zinc-150"></div>
                  <span className="flex-shrink mx-3 text-[10px] uppercase tracking-wider font-extrabold text-zinc-400 font-sans">Or continue with</span>
                  <div className="flex-grow border-t border-zinc-150"></div>
                </div>

                {/* Identity SSO Providers */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('Google')}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 border border-zinc-200/80 rounded-xl bg-white hover:bg-zinc-50 active:scale-98 transition-all text-xs font-sans font-semibold text-zinc-700 cursor-pointer shadow-xs"
                  >
                    <Chrome className="w-4 h-4 text-zinc-600" />
                    Google
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocialLogin('LinkedIn')}
                    className="flex items-center justify-center gap-2 py-2.5 px-4 border border-zinc-200/80 rounded-xl bg-white hover:bg-zinc-50 active:scale-98 transition-all text-xs font-sans font-semibold text-zinc-700 cursor-pointer shadow-xs"
                  >
                    <Linkedin className="w-4 h-4 text-blue-600" />
                    LinkedIn
                  </button>
                </div>

                {/* Sign up link toggle */}
                <div className="text-center pt-2">
                  <p className="text-xs text-zinc-500 font-sans">
                    {signUpMode ? 'Already have an account?' : "Don't have an account?"}{' '}
                    <button
                      type="button"
                      onClick={() => {
                        if (onSwitchToOnboarding) {
                          onSwitchToOnboarding();
                        } else {
                          setSignUpMode(!signUpMode);
                        }
                      }}
                      className="text-primary hover:underline font-bold transition-all cursor-pointer"
                    >
                      {signUpMode ? 'Sign in instead' : 'Create an account now'}
                    </button>
                  </p>
                </div>

              </form>
            ) : (
              // Enhanced high-fidelity authentication screen
              <div className="py-12 flex flex-col items-center justify-center space-y-6">
                {!success ? (
                  <>
                    <div className="relative flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full border-4 border-zinc-150 border-t-primary animate-spin"></div>
                      <ShieldCheck className="w-6 h-6 text-primary/45 absolute" />
                    </div>
                    <div className="text-center space-y-2">
                      <h4 className="text-sm font-bold text-zinc-900 font-sans animate-pulse">Authenticating</h4>
                      <p className="text-xs text-zinc-500 max-w-xs font-mono">{loadingText}</p>
                    </div>
                  </>
                ) : (
                  <motion.div 
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="flex flex-col items-center space-y-4"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-200 animate-bounce">
                      <UserCheck className="w-7 h-7" />
                    </div>
                    <div className="text-center space-y-1.5">
                      <h4 className="text-sm font-bold text-zinc-900 font-sans">Authorized Approved</h4>
                      <p className="text-xs text-emerald-600 font-medium">Entering secure workspace console...</p>
                    </div>
                  </motion.div>
                )}
              </div>
            )}

            {/* Inner bottom lock banner */}
            <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 font-sans">
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              <span>Secure Login | AES-256 Protocol Verified</span>
            </div>

          </motion.div>

          <button
            onClick={onBackToLanding}
            className="mt-6 text-xs text-zinc-400 hover:text-primary hover:underline transition-all font-sans font-medium"
          >
            ← Back to landing page
          </button>
        </div>

      </div>

      {/* Trust Signpost Footer Footer matches corporate style exactly */}
      <div className="text-center max-w-sm mx-auto mt-12">
        <p className="text-[10px] text-zinc-400/95 font-sans leading-relaxed tracking-wider uppercase">
          ✦ Secure Identity Server ✦ <br />
          Your resume data and credentials remain fully encrypted in alignment with sovereign privacy guidelines.
        </p>
      </div>

    </div>
  );
}
