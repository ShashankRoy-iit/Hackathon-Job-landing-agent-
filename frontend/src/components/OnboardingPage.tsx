import { useMemo, useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Sparkles, 
  User,
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  Chrome, 
  Linkedin, 
  Check,
  Award,
  ArrowRight, 
  ArrowLeft,
  Search,
  Briefcase,
  Target,
  ShieldCheck,
  Users2,
  FileCheck2,
  GitMerge,
  ThumbsUp
} from 'lucide-react';

interface OnboardingPageProps {
  onOnboardingComplete: (userData: any) => void;
  onBackToLanding: () => void;
  onSwitchToLogin: () => void;
}

type QuestionOption = {
  id: string;
  label: string;
  helper: string;
  options: string[];
};

export default function OnboardingPage({ onOnboardingComplete, onBackToLanding, onSwitchToLogin }: OnboardingPageProps) {
  // Account Form states
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Flow State Control (0 = Account Signup, 1 = Step 1, 2 = Step 2, 3 = Step 3, 4 = Step 4, 5 = Welcome Screen)
  const [flowStep, setFlowStep] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Questionnaire States
  const [userRole, setUserRole] = useState(''); // Student, Fresher, Working Professional, Career Switcher
  const [targetRole, setTargetRole] = useState(''); // Searchable input field
  const [experienceLevel, setExperienceLevel] = useState(''); // 0-1, 1-3, 3-5, 5+
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]); // Build ATS Resume, etc.
  const [psychAnswers, setPsychAnswers] = useState<Record<string, string>>({});

  // Target role predefined search suggestions for smooth feel
  const [roleSearchFocused, setRoleSearchFocused] = useState(false);
  const suggestions = [
    'Machine Learning Architect',
    'AI Engineer Intern',
    'Product Manager',
    'Frontend Developer',
    'Data Scientist',
    'Engineering Director'
  ];

  // Goals choices
  const goalOptions = [
    { id: 'resume', label: 'Build ATS Resume' },
    { id: 'interviews', label: 'Get More Interviews' },
    { id: 'cover', label: 'Generate Cover Letters' },
    { id: 'roadmap', label: 'Career Roadmap' },
    { id: 'prep', label: 'Interview Preparation' },
    { id: 'match', label: 'Job Matching' }
  ];

  const psychQuestions: QuestionOption[] = [
    {
      id: 'work_style',
      label: 'How do you prefer to work most of the time?',
      helper: 'This helps the engine infer whether you fit structured, creative, or analytical roles.',
      options: ['Highly structured', 'Balanced', 'Flexible', 'Self-directed']
    },
    {
      id: 'communication_style',
      label: 'Which communication style feels most natural?',
      helper: 'This helps align roles with written, spoken, or stakeholder-heavy work.',
      options: ['Written reports', 'One-to-one', 'Presentations', 'Cross-functional meetings']
    },
    {
      id: 'ambiguity_response',
      label: 'How do you react when a problem is ambiguous?',
      helper: 'This helps match you to research, operations, or executive-support workflows.',
      options: ['I want clear steps', 'I can adapt quickly', 'I like exploring options', 'I enjoy defining the structure']
    },
    {
      id: 'task_preference',
      label: 'Which type of tasks energize you most?',
      helper: 'Use this to steer toward report writing, executive support, analysis, or product roles.',
      options: ['Writing and summarizing', 'Coordinating people and schedules', 'Analyzing data', 'Building systems']
    },
    {
      id: 'uncommon_role_interest',
      label: 'Which lesser-known role style sounds most natural?',
      helper: 'This helps discover roles that people often overlook, such as report writer or executive support positions.',
      options: ['Report writer', 'Executive assistant', 'Executive coordinator', 'Technical writer', 'Operations coordinator', 'Research assistant', 'Policy analyst']
    }
  ];

  const previewRoles = useMemo(() => {
    const answersBlob = Object.values(psychAnswers).join(' ').toLowerCase();
    const preview: { role: string; reason: string }[] = [];

    if (targetRole) {
      preview.push({
        role: targetRole,
        reason: 'Primary target role from your onboarding input.'
      });
    }

    if (answersBlob.includes('report') || answersBlob.includes('writing') || answersBlob.includes('summarizing') || answersBlob.includes('document')) {
      preview.push({ role: 'Report Writer', reason: 'Your answers point to structured writing and summarization work.' });
      preview.push({ role: 'Technical Writer', reason: 'You appear suited for documentation-heavy roles.' });
    }

    if (answersBlob.includes('executive') || answersBlob.includes('meeting') || answersBlob.includes('schedule') || answersBlob.includes('coordination')) {
      preview.push({ role: 'Executive Assistant', reason: 'Your answers suggest scheduling and stakeholder coordination strengths.' });
      preview.push({ role: 'Executive Coordinator', reason: 'You may fit roles centered on support and cross-team coordination.' });
    }

    if (answersBlob.includes('research') || answersBlob.includes('analysis') || answersBlob.includes('insight') || answersBlob.includes('policy')) {
      preview.push({ role: 'Research Assistant', reason: 'Your answers suggest analysis and structured investigation work.' });
      preview.push({ role: 'Policy Analyst', reason: 'You may fit analytical roles that support decisions and research.' });
    }

    if (answersBlob.includes('operations') || answersBlob.includes('process') || answersBlob.includes('structure')) {
      preview.push({ role: 'Operations Coordinator', reason: 'Your answers point to process-oriented and organized work.' });
      preview.push({ role: 'Workflow Specialist', reason: 'You may fit work that improves systems and operating rhythm.' });
    }

    if (preview.length === 0) {
      preview.push({
        role: targetRole || 'General Software Engineer',
        reason: 'Complete the rest of the onboarding to refine your search profile.'
      });
    }

    return preview.filter((item, index, items) => items.findIndex((candidate) => candidate.role === item.role) === index).slice(0, 6);
  }, [psychAnswers, targetRole]);

  const handleAccountCreate = (e: FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !password || !confirmPassword) return;
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    if (!agreeTerms) {
      alert('Please agree to the Terms of Service and Privacy Policy to proceed.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setFlowStep(1); // Proceed to Step 1 of Onboarding questionnaire
    }, 1200);
  };

  const toggleGoalSelection = (goal: string) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleFinishOnboarding = () => {
    onOnboardingComplete({
      fullName,
      email,
      userRole,
      targetRole,
      experienceLevel,
      selectedGoals,
      psychAnswers
    });
  };

  const filteredSuggestions = targetRole 
    ? suggestions.filter(s => s.toLowerCase().includes(targetRole.toLowerCase()))
    : suggestions;

  return (
    <div className="min-h-screen w-full electroshade-bg flex flex-col justify-between pt-24 pb-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-6xl w-full mx-auto my-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
        
        {/* Left Section: Welcome pitch, feature checkmarks & trusted metrics statistics */}
        <div className="lg:col-span-6 space-y-8 text-left hidden lg:block">
          
          {/* Header metadata tag */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 bg-[#004ac6]/10 text-[#004ac6] rounded-full border border-[#004ac6]/20"
            >
              <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-wider font-sans">Career Accel Hub</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight"
            >
              Start Your Career <br />
              <span className="text-primary font-black">Transformation</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[#475569] text-[15px] leading-relaxed max-w-lg font-sans font-medium"
            >
              Create your Dhurandhar account and unlock AI-powered resume building, cover letter generation, interview preparation, and personalized career roadmaps.
            </motion.p>
          </div>

          {/* Checklist of premium advantages */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              'AI Resume Builder',
              'ATS Optimization',
              'Cover Letter Generator',
              'Career Roadmaps',
              'Interview Coach',
              'Smart Job Matching'
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-[#475569] font-medium font-sans">
                <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5 stroke-[3]" />
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* High value Trust metrics */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="pt-6 border-t border-zinc-200/60 grid grid-cols-3 gap-4"
          >
            <div>
              <p className="text-2xl font-extrabold text-[#0F172A] leading-none">10,000+</p>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#475569] mt-1.5 block">Resumes Built</span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#0F172A] leading-none">95%</p>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#475569] mt-1.5 block">ATS Success</span>
            </div>
            <div>
              <p className="text-2xl font-extrabold text-[#0F172A] leading-none">500+</p>
              <span className="text-[10px] uppercase tracking-wider font-bold text-[#475569] mt-1.5 block">Paths Created</span>
            </div>
          </motion.div>

        </div>

        {/* Right Section: Multi-step Signup Card & Questionnaire flow */}
        <div className="lg:col-span-6 w-full max-w-md mx-auto">
          
          <motion.div 
            layout
            className="w-full bg-white rounded-[20px] border border-zinc-200/60 p-8 shadow-xl relative overflow-hidden"
          >
            <AnimatePresence mode="wait">
              
              {/* flowStep 0: Core Signup Card */}
              {flowStep === 0 && (
                <motion.div
                  key="step-signup"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div 
                      onClick={onBackToLanding}
                      className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-md shadow-primary/25 cursor-pointer hover:scale-105 transition-transform"
                    >
                      <Sparkles className="w-6 h-6" />
                    </div>
                    <h2 className="text-2xl font-bold text-zinc-950 font-sans tracking-tight">Create Your Account</h2>
                    <p className="text-zinc-500 text-xs font-sans">Get started on your AI-powered professional workspace for free</p>
                  </div>

                  {!isSubmitting ? (
                    <form onSubmit={handleAccountCreate} className="space-y-4">
                      {/* Full Name */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-[#475569] font-sans" htmlFor="onboard-name">FullName</label>
                        <div className="relative">
                          <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                          <input 
                            id="onboard-name"
                            type="text"
                            required
                            placeholder="Aditya Patel"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-zinc-800"
                          />
                        </div>
                      </div>

                      {/* Email Address */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-[#475569] font-sans" htmlFor="onboard-email">Email Address</label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                          <input 
                            id="onboard-email"
                            type="email"
                            required
                            placeholder="you@corporate.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-zinc-800"
                          />
                        </div>
                      </div>

                      {/* Password */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-[#475569] font-sans" htmlFor="onboard-pass">Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                          <input 
                            id="onboard-pass"
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="Minimum 8 characters"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full pl-11 pr-11 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-zinc-800"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-655 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      {/* Confirm Password */}
                      <div className="space-y-1.5 text-left">
                        <label className="text-xs font-bold text-[#475569] font-sans" htmlFor="onboard-confirm">Confirm Password</label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                          <input 
                            id="onboard-confirm"
                            type={showPassword ? 'text' : 'password'}
                            required
                            placeholder="Retype password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-zinc-800"
                          />
                        </div>
                      </div>

                      {/* Terms Acceptance */}
                      <div className="flex items-center text-left py-1">
                        <label className="flex items-center gap-2.5 cursor-pointer group">
                          <input 
                            type="checkbox"
                            checked={agreeTerms}
                            onChange={(e) => setAgreeTerms(e.target.checked)}
                            className="w-4 h-4 rounded border-zinc-300 text-primary focus:ring-primary focus:ring-offset-0 cursor-pointer"
                          />
                          <span className="text-[11px] font-medium text-[#475569] group-hover:text-zinc-950 transition-colors select-none font-sans">
                            I agree to the <span className="text-primary hover:underline font-bold">Terms of Service</span> and <span className="text-primary hover:underline font-bold">Privacy Policy</span>
                          </span>
                        </label>
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 px-4 rounded-xl font-sans font-semibold text-sm transition-all duration-200 text-center flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-[0.98]"
                      >
                        Create Account
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      {/* SSO dividers */}
                      <div className="relative my-4 flex items-center">
                        <div className="flex-grow border-t border-zinc-150"></div>
                        <span className="flex-shrink mx-3 text-[10px] uppercase tracking-wider font-extrabold text-zinc-400">or continue with</span>
                        <div className="flex-grow border-t border-zinc-150"></div>
                      </div>

                      {/* Identity Providers */}
                      <div className="grid grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            setFullName('Google User');
                            setEmail('user.google@gmail.com');
                            setAgreeTerms(true);
                            setFlowStep(1);
                          }}
                          className="flex items-center justify-center gap-2 py-2.5 px-4 border border-zinc-200/80 rounded-xl bg-white hover:bg-zinc-50 active:scale-98 transition-all text-xs font-sans font-semibold text-zinc-700 cursor-pointer shadow-xs"
                        >
                          <Chrome className="w-4 h-4 text-zinc-650" />
                          Google
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setFullName('LinkedIn Professional');
                            setEmail('user.linkedin@linkedin.com');
                            setAgreeTerms(true);
                            setFlowStep(1);
                          }}
                          className="flex items-center justify-center gap-2 py-2.5 px-4 border border-zinc-200/80 rounded-xl bg-white hover:bg-zinc-50 active:scale-98 transition-all text-xs font-sans font-semibold text-zinc-700 cursor-pointer shadow-xs"
                        >
                          <Linkedin className="w-4 h-4 text-blue-600" />
                          LinkedIn
                        </button>
                      </div>

                      {/* Back link toggles */}
                      <div className="text-center pt-3 border-t border-zinc-100">
                        <p className="text-xs text-zinc-500 font-sans">
                          Already have an account?{' '}
                          <button
                            type="button"
                            onClick={onSwitchToLogin}
                            className="text-primary hover:underline font-bold transition-all cursor-pointer"
                          >
                            Sign In
                          </button>
                        </p>
                      </div>
                    </form>
                  ) : (
                    <div className="py-12 flex flex-col items-center justify-center space-y-4">
                      <div className="w-12 h-12 rounded-full border-4 border-zinc-150 border-t-primary animate-spin"></div>
                      <p className="text-xs text-zinc-500 font-mono">Securing profile record details...</p>
                    </div>
                  )}
                </motion.div>
              )}

              {/* flowStep 1: Questionnaire - Step 1/4 - Profile Description */}
              {flowStep === 1 && (
                <motion.div
                  key="step-qs1"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary">Onboarding • Step 1 of 4</span>
                    <h3 className="text-xl font-bold text-zinc-950">What best describes you?</h3>
                    <p className="text-zinc-500 text-xs">This matches layout logic and templates dynamically</p>
                  </div>

                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'Student', desc: 'Currently enrolled or studying' },
                      { id: 'Fresher', desc: 'Graduated recently, looking for placement' },
                      { id: 'Working Professional', desc: 'Employed, seeking growth or transition' },
                      { id: 'Career Switcher', desc: 'Migrating industries or technology paths' }
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setUserRole(opt.id)}
                        className={`p-4 text-left border rounded-xl transition-all cursor-pointer flex flex-col gap-1 ${
                          userRole === opt.id 
                            ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <span className="text-sm font-bold text-zinc-950 font-sans">{opt.id}</span>
                        <span className="text-[11px] text-[#475569]">{opt.desc}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <button
                      onClick={() => setFlowStep(0)}
                      className="text-xs text-zinc-400 hover:text-zinc-600 transition-all font-sans font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                    <button
                      disabled={!userRole}
                      onClick={() => setFlowStep(2)}
                      className={`px-5 py-2.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                        userRole 
                          ? 'bg-primary text-white hover:bg-primary-hover shadow-xs' 
                          : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      Next Step
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* flowStep 2: Questionnaire - Step 2/4 - Target Role Searchable Filter */}
              {flowStep === 2 && (
                <motion.div
                  key="step-qs2"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary">Onboarding • Step 2 of 4</span>
                    <h3 className="text-xl font-bold text-zinc-950 font-sans">What is your target role?</h3>
                    <p className="text-zinc-500 text-xs">Help pre-configure target ATS matching parameters</p>
                  </div>

                  <div className="relative space-y-2">
                    <div className="relative">
                      <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-440" />
                      <input 
                        type="text"
                        placeholder="Search or enter target designation..."
                        value={targetRole}
                        onChange={(e) => setTargetRole(e.target.value)}
                        onFocus={() => setRoleSearchFocused(true)}
                        onBlur={() => setTimeout(() => setRoleSearchFocused(false), 200)}
                        className="w-full pl-11 pr-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary focus:bg-white transition-all text-zinc-800"
                      />
                    </div>

                    {/* Popover suggestions based on focus states */}
                    {roleSearchFocused && (
                      <motion.div 
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute w-full bg-white border border-zinc-200/85 rounded-xl shadow-lg z-30 max-h-48 overflow-y-auto overflow-hidden divide-y divide-zinc-100"
                      >
                        {filteredSuggestions.length > 0 ? (
                          filteredSuggestions.map((item, i) => (
                            <div
                              key={i}
                              onMouseDown={() => setTargetRole(item)}
                              className="px-4 py-2.5 text-xs text-zinc-650 hover:bg-zinc-50 hover:text-primary cursor-pointer font-sans select-none flex items-center justify-between"
                            >
                              <span>{item}</span>
                              <Briefcase className="w-3.5 h-3.5 text-zinc-350" />
                            </div>
                          ))
                        ) : (
                          <div className="px-4 py-3 text-xs text-zinc-400 font-sans italic text-center">
                            Press Enter key or Continue to create "{targetRole}" custom target
                          </div>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {targetRole ? (
                    <div className="p-4 rounded-xl bg-orange-50 border border-orange-100 text-orange-800 text-xs">
                      ⚡ <strong>Excellent choice!</strong> AI will configure <strong>{targetRole}</strong> matching specifications upon onboarding completion.
                    </div>
                  ) : (
                    <div className="p-4 rounded-xl bg-zinc-50 border text-zinc-500 text-xs text-center italic">
                      Type your target dream role to advance. Let AI map keywords.
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <button
                      onClick={() => setFlowStep(1)}
                      className="text-xs text-zinc-400 hover:text-zinc-600 transition-all font-sans font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                    <button
                      disabled={!targetRole}
                      onClick={() => setFlowStep(3)}
                      className={`px-5 py-2.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                        targetRole 
                          ? 'bg-primary text-white hover:bg-primary-hover shadow-xs' 
                          : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      Next Step
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* flowStep 3: Questionnaire - Step 3/4 - Experience Levels selection */}
              {flowStep === 3 && (
                <motion.div
                  key="step-qs3"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary">Onboarding • Step 3 of 4</span>
                    <h3 className="text-xl font-bold text-zinc-950 font-sans">What is your experience level?</h3>
                    <p className="text-zinc-500 text-xs">Calibrates scoring, interview coach, and goal parameters</p>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { id: '0–1 Years', desc: 'Entry Tier / Internship' },
                      { id: '1–3 Years', desc: 'Junior Specialist' },
                      { id: '3–5 Years', desc: 'Senior Specialist' },
                      { id: '5+ Years', desc: 'Leadership / Architect Level' }
                    ].map((lvl) => (
                      <button
                        key={lvl.id}
                        onClick={() => setExperienceLevel(lvl.id)}
                        className={`p-4 text-center border rounded-xl transition-all cursor-pointer flex flex-col gap-1 items-center justify-center ${
                          experienceLevel === lvl.id 
                            ? 'border-primary bg-primary/5 ring-1 ring-primary' 
                            : 'border-zinc-200 hover:border-zinc-300 bg-white'
                        }`}
                      >
                        <span className="text-sm font-bold text-zinc-950 font-sans">{lvl.id}</span>
                        <span className="text-[10px] text-[#475569]">{lvl.desc}</span>
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <button
                      onClick={() => setFlowStep(2)}
                      className="text-xs text-zinc-400 hover:text-zinc-600 transition-all font-sans font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                    <button
                      disabled={!experienceLevel}
                      onClick={() => setFlowStep(4)}
                      className={`px-5 py-2.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                        experienceLevel 
                          ? 'bg-primary text-white hover:bg-primary-hover shadow-xs' 
                          : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      Next Step
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* flowStep 4: Questionnaire - Step 4/5 - Psychology & Skill Fit */}
              {flowStep === 4 && (
                <motion.div
                  key="step-qs4"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary">Onboarding • Step 4 of 5</span>
                    <h3 className="text-xl font-bold text-zinc-950 font-sans">Psychology and skill-fit questions</h3>
                    <p className="text-zinc-500 text-xs">These answers help match you to jobs and uncommon role types.</p>
                  </div>

                  <div className="space-y-4">
                    {psychQuestions.map((question) => (
                      <div key={question.id} className="space-y-2">
                        <div>
                          <span className="block text-xs font-bold uppercase tracking-wide text-zinc-600">{question.label}</span>
                          <p className="text-xs text-zinc-500 mt-1">{question.helper}</p>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {question.options.map((option) => {
                            const isSelected = psychAnswers[question.id] === option;
                            return (
                              <button
                                key={option}
                                type="button"
                                onClick={() => setPsychAnswers((prev) => ({ ...prev, [question.id]: option }))}
                                className={`p-3 text-left border rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                                  isSelected
                                    ? 'border-primary bg-primary/5 text-primary'
                                    : 'border-zinc-200 bg-white text-zinc-805 hover:bg-zinc-50'
                                }`}
                              >
                                <span>{option}</span>
                                <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center border transition-all ${
                                  isSelected
                                    ? 'bg-primary border-primary text-white font-black'
                                    : 'border-zinc-300'
                                }`}>
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <button
                      onClick={() => setFlowStep(3)}
                      className="text-xs text-zinc-400 hover:text-zinc-600 transition-all font-sans font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                    <button
                      disabled={Object.keys(psychAnswers).length < psychQuestions.length}
                      onClick={() => setFlowStep(5)}
                      className={`px-5 py-2.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                        Object.keys(psychAnswers).length === psychQuestions.length 
                          ? 'bg-primary text-white hover:bg-primary-hover shadow-xs' 
                          : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      Next Step
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* flowStep 5: Questionnaire - Step 5/5 - Target Goals Checkboxes */}
              {flowStep === 5 && (
                <motion.div
                  key="step-qs5"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  className="space-y-6"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary">Onboarding • Step 5 of 5</span>
                    <h3 className="text-xl font-bold text-zinc-950 font-sans">What are your primary goals?</h3>
                    <p className="text-zinc-500 text-xs">Choose as many as represent your path goals</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {goalOptions.map((goal) => {
                      const isSelected = selectedGoals.includes(goal.id);
                      return (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => toggleGoalSelection(goal.id)}
                          className={`p-3 text-left border rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-between ${
                            isSelected 
                              ? 'border-primary bg-primary/5 text-primary' 
                              : 'border-zinc-200 bg-white text-zinc-805 hover:bg-zinc-50'
                          }`}
                        >
                          <span>{goal.label}</span>
                          <span className={`w-4.5 h-4.5 rounded-full flex items-center justify-center border transition-all ${
                            isSelected 
                              ? 'bg-primary border-primary text-white font-black' 
                              : 'border-zinc-300'
                          }`}>
                            {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
                    <button
                      onClick={() => setFlowStep(4)}
                      className="text-xs text-zinc-400 hover:text-zinc-600 transition-all font-sans font-medium flex items-center gap-1 cursor-pointer"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" />
                      Back
                    </button>
                    <button
                      disabled={selectedGoals.length === 0}
                      onClick={() => setFlowStep(6)}
                      className={`px-5 py-2.5 rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center gap-1 cursor-pointer transition-all ${
                        selectedGoals.length > 0 
                          ? 'bg-primary text-white hover:bg-primary-hover shadow-xs' 
                          : 'bg-zinc-100 text-zinc-400 cursor-not-allowed'
                      }`}
                    >
                      Finish Onboarding
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </motion.div>
              )}

              {/* flowStep 6: Questionnaire Finished - Personalised Welcome Screen */}
              {flowStep === 6 && (
                <motion.div
                  key="step-qs6"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="space-y-6 text-center py-4"
                >
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-150 flex items-center justify-center animate-bounce">
                      <Target className="w-8 h-8" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] uppercase font-bold text-emerald-600 tracking-wider">Setup Successful</span>
                      <h3 className="text-2xl font-bold font-sans text-zinc-950">Welcome to Dhurandhar</h3>
                      <p className="text-zinc-500 text-xs font-sans max-w-xs mx-auto">
                        Your AI Career Copilot is Ready, <strong>{fullName}</strong>. Let's start advancing your profile score.
                      </p>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-50 border border-zinc-200/50 text-xs divide-y divide-zinc-200/50 space-y-2">
                    <div className="flex justify-between items-center text-left py-1 text-zinc-700 font-sans">
                      <span className="font-medium text-zinc-500">Workspace Target</span>
                      <strong className="text-zinc-900 font-bold">{targetRole}</strong>
                    </div>
                    <div className="flex justify-between items-center text-left py-1 text-zinc-700 font-sans pt-2">
                      <span className="font-medium text-zinc-500">Initial Experience Level</span>
                      <strong className="text-zinc-900 font-bold">{experienceLevel}</strong>
                    </div>
                    <div className="flex justify-between items-center text-left py-1 text-zinc-700 font-sans pt-2">
                      <span className="font-medium text-zinc-500">Psychology Answers</span>
                      <strong className="text-zinc-900 font-bold">{Object.keys(psychAnswers).length} Recorded</strong>
                    </div>
                    <div className="flex justify-between items-center text-left py-1 text-zinc-700 font-sans pt-2">
                      <span className="font-medium text-zinc-500">Target Goals Integrated</span>
                      <strong className="text-zinc-900 font-bold">{selectedGoals.length} Active Goals</strong>
                    </div>
                  </div>

                  <div className="text-left rounded-xl border border-primary/15 bg-primary/5 p-4 space-y-3">
                    <div>
                      <span className="text-[10px] uppercase tracking-wider font-extrabold text-primary">Role preview</span>
                      <p className="text-zinc-600 text-xs mt-1">These are inferred from your psychology, skill-fit, and uncommon-role answers.</p>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {previewRoles.map((role) => (
                        <div key={role.role} className="rounded-lg border border-white/70 bg-white px-3 py-2.5 shadow-xs">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="text-sm font-bold text-zinc-950">{role.role}</p>
                              <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{role.reason}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => {
                                setTargetRole(role.role);
                                setFlowStep(5);
                              }}
                              className="shrink-0 rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-primary hover:bg-primary hover:text-white transition-all"
                            >
                              Use
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={handleFinishOnboarding}
                    className="w-full bg-primary hover:bg-primary-hover text-white py-3.5 px-4 rounded-xl font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1 shadow-md shadow-primary/20 active:scale-98 cursor-pointer"
                  >
                    Go To Dashboard
                    <ArrowRight className="w-4 h-4 stroke-[2]" />
                  </button>
                </motion.div>
              )}

            </AnimatePresence>

            {/* Inner bottom secure signpost */}
            <div className="mt-8 pt-4 border-t border-zinc-100 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400 font-sans">
              <ShieldCheck className="w-4 h-4 text-zinc-400" />
              <span>Secure Connection | GDPR Compliant Policy</span>
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

      {/* Footer Branding elements */}
      <div className="text-center max-w-sm mx-auto mt-12">
        <p className="text-[10px] text-zinc-400/95 font-sans leading-relaxed tracking-wider uppercase">
          ✦ Cloud Security Framework ✦ <br />
          Enterprise sovereign guardrails are actively validated for secure identity authorization.
        </p>
      </div>

    </div>
  );
}
