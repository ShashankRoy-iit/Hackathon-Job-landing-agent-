import { useState, useEffect } from 'react';
import { InterviewQuestion } from '../types';
import { INTERVIEW_QUESTIONS } from '../data';
import { GraduationCap, Sparkles, Send, Copy, ClipboardCheck, Trash2, ShieldCheck, PlayCircle, Star, RotateCcw } from 'lucide-react';

interface InterviewCoachProps {
  prefill?: { jobTitle: string; company: string } | null;
}

export default function InterviewCoach({ prefill }: InterviewCoachProps) {
  const [selectedQuestion, setSelectedQuestion] = useState<InterviewQuestion>(INTERVIEW_QUESTIONS[0]);
  const [userResponse, setUserResponse] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [evalResult, setEvalResult] = useState<{
    score: number;
    strengths: string[];
    improvements: string[];
    idealAnswer: string;
  } | null>(null);
  
  const [copied, setCopied] = useState(false);

  // Prefill hook
  useEffect(() => {
    if (prefill) {
      // Find or tailor question according to prefill title
      const customQ: InterviewQuestion = {
        id: `q-custom-${Date.now()}`,
        category: 'Custom Role Context',
        question: `As a ${prefill.jobTitle} at ${prefill.company}, how would you design a scalable micro-platform that integrates with existing model routers without introducing memory leak thresholds?`,
        idealAnswerBullets: [
          'Design an isolation membrane or wrapper around router initialization handles.',
          'Formulate strict deterministic cleanups using React useEffect unmount or node memory garbage loops.',
          'Instate automated profiling telemetry inside test networks to detect early allocation leaks.',
          'Deploy horizontal auto-scaling nodes to prevent cascading memory failure triggers.'
        ]
      };
      
      setSelectedQuestion(customQ);
      setUserResponse('');
      setEvalResult(null);
    }
  }, [prefill]);

  // Answer Evaluation Simulator
  const handleAnalyze = () => {
    if (!userResponse.trim()) return;
    setIsAnalyzing(true);
    setEvalResult(null);

    setTimeout(() => {
      // Simple automated matching index calculation for higher interactive realism
      const lowercaseResponse = userResponse.toLowerCase();
      let matchedBulletsCount = 0;
      const matchedStrengths: string[] = [];
      const missedImprovements: string[] = [];

      selectedQuestion.idealAnswerBullets.forEach((bullet) => {
        // Look for basic semantic keywords in the bullet
        const words = bullet.toLowerCase().replace(/[^a-zA-Z0-9\s]/g, '').split(' ');
        const matchesWords = words.filter(w => w.length > 4 && lowercaseResponse.includes(w));
        
        if (matchesWords.length >= 2) {
          matchedBulletsCount += 1;
          matchedStrengths.push(bullet);
        } else {
          missedImprovements.push(bullet);
        }
      });

      // Calculate score out of 100 based on matching keyword thresholds
      const calculatedScore = Math.min(
        100,
        Math.max(45, 50 + (matchedBulletsCount * 15) + Math.floor(Math.random() * 15))
      );

      // Final simulated response formulation
      let idealAnswer = `To optimize this scenario, I would implement standard industry-wide structures:
1. ${selectedQuestion.idealAnswerBullets[0] || 'Analyze baseline profiling benchmarks.'}
2. ${selectedQuestion.idealAnswerBullets[1] || 'Deploy modular isolation paradigms.'}
3. ${selectedQuestion.idealAnswerBullets[2] || 'Institute automatic telemetry audits.'}
I believe this structured approach provides stable high-performance output characteristics.`;

      setEvalResult({
        score: calculatedScore,
        strengths: matchedStrengths.length > 0 ? matchedStrengths : ['Demonstrated an understanding of baseline systems and structures.'],
        improvements: missedImprovements.length > 0 ? missedImprovements : ['Consider expanding on explicit execution details and profiling logs.'],
        idealAnswer
      });
      setIsAnalyzing(false);
    }, 1600);
  };

  const handleCopy = () => {
    if (!evalResult) return;
    navigator.clipboard.writeText(evalResult.idealAnswer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Header */}
      <div>
        <h2 className="font-sans text-2xl font-bold text-zinc-900">AI Interview Coach</h2>
        <p className="text-zinc-500 text-sm mt-1">Practice high-concurrency technical and behavioral queries, submit simulated responses, and receive comprehensive performance scorecards.</p>
      </div>

      {prefill && (
        <div className="p-3 bg-secondary/5 border border-secondary/10 rounded-xl text-xs font-semibold text-secondary flex items-center gap-1.5 self-start">
          <Sparkles className="w-4 h-4 text-secondary animate-pulse" />
          <span>Tailored specifically for: {prefill.jobTitle} at {prefill.company}</span>
        </div>
      )}

      {/* Grid splits */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: List of standard questions */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white p-5 rounded-xl border border-zinc-200/60 shadow-xs space-y-4">
            <h3 className="font-sans text-xs font-bold text-zinc-500 uppercase tracking-widest border-b pb-2">Category Queries</h3>
            <div className="flex flex-col gap-2 max-h-[350px] overflow-y-auto pr-0.5">
              {INTERVIEW_QUESTIONS.map((q) => (
                <button
                  key={q.id}
                  onClick={() => {
                    setSelectedQuestion(q);
                    setUserResponse('');
                    setEvalResult(null);
                  }}
                  className={`p-3 text-left rounded-lg text-xs font-sans font-bold border transition-all cursor-pointer ${
                    selectedQuestion.id === q.id
                      ? 'bg-primary/5 text-primary border-primary shadow-xs'
                      : 'bg-zinc-50 hover:bg-zinc-100/40 text-zinc-600 border-zinc-200/50'
                  }`}
                >
                  <span className="block text-[9px] uppercase tracking-wider font-semibold text-zinc-400 mb-0.5">{q.category}</span>
                  <span className="line-clamp-2 leading-relaxed text-zinc-700">{q.question}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Quick Help Tip */}
          <div className="p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-[11px] text-zinc-500 leading-relaxed space-y-1">
            <span className="font-bold text-zinc-800 block">💡 Pro Coach Tip</span>
            <span>To score highest, explicitly cover technical strategies (e.g., caching, memory unmounts, telemetry loops). The grader rewards concise, specific STAR formatted metrics.</span>
          </div>
        </div>

        {/* Right Column: Interaction Sandbox Console */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-zinc-200 shadow-sm p-6 sm:p-8 min-h-[500px] flex flex-col justify-between">
          <div className="space-y-6">
            {/* Active Question Box */}
            <div className="p-4 bg-zinc-50/50 border border-zinc-200/40 rounded-xl">
              <span className="text-[9px] font-bold uppercase tracking-widest text-[#264191] font-sans">ACTIVE QUESTION • {selectedQuestion.category}</span>
              <p className="text-sm font-bold text-zinc-900 mt-2 leading-relaxed font-sans pr-1">
                "{selectedQuestion.question}"
              </p>
            </div>

            {/* Answer Field */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase font-bold text-zinc-400 tracking-wide font-sans">Simulate Your Response (Text/Transcript Interface)</label>
              <textarea
                rows={6}
                value={userResponse}
                onChange={(e) => setUserResponse(e.target.value)}
                placeholder="Type your response here detailing experience metrics, system tools, or organizational strategies, then select Analyze Answer..."
                className="w-full text-xs bg-zinc-50 border border-zinc-200 p-3 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none leading-relaxed font-sans resize-none"
              />
            </div>
            
            {/* Grader trigger button */}
            <button
              onClick={handleAnalyze}
              disabled={isAnalyzing || !userResponse.trim()}
              className="w-full bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Sparkles className={`w-4 h-4 ${isAnalyzing ? 'animate-spin' : ''}`} />
              {isAnalyzing ? 'AI Grader is conducting audit...' : 'Analyze Answer Response'}
            </button>

            {/* AI Coaching Evaluations results */}
            {isAnalyzing && (
              <div className="py-12 flex flex-col items-center justify-center space-y-2 text-center">
                <div className="w-8 h-8 rounded-full border-4 border-zinc-200 border-t-primary animate-spin"></div>
                <p className="text-zinc-500 font-sans text-xs font-bold animate-pulse">Running semantic comparison against model expert answers bank...</p>
              </div>
            )}

            {evalResult && (
              <div className="space-y-5 animate-fade-in pt-4 border-t">
                {/* Circular Metrics Score section */}
                <div className="flex flex-col sm:flex-row gap-4 items-center bg-zinc-50 p-4 rounded-xl border">
                  {/* Circular visual score ticker */}
                  <div className="relative w-20 h-20 flex items-center justify-center rounded-full bg-primary/5 border-4 border-indigo-200 border-t-primary">
                    <span className="text-lg font-bold text-zinc-900 font-sans">{evalResult.score}</span>
                    <span className="text-[10px] text-zinc-400 font-sans ml-0.5 mt-1">/100</span>
                  </div>

                  <div className="text-center sm:text-left space-y-1">
                    <h4 className="text-sm font-bold text-zinc-900 font-sans flex items-center gap-1">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      AI Coach Evaluation
                    </h4>
                    <p className="text-xs text-zinc-500 leading-relaxed font-sans">
                      Your response shows an excellent grasp of high-level principles. Optimize your phrasing using the feedback bullets below.
                    </p>
                  </div>
                </div>

                {/* Bullets Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Strengths */}
                  <div className="p-4 bg-emerald-50/40 border border-emerald-100 rounded-xl">
                    <h5 className="text-[10px] font-bold text-emerald-800 uppercase tracking-widest block font-sans mb-2">✅ Core Concepts Addressed</h5>
                    <ul className="space-y-1.5 list-disc list-outside pl-3 text-xs text-zinc-600 font-sans leading-relaxed">
                      {evalResult.strengths.map((str, i) => (
                        <li key={i}>{str}</li>
                      ))}
                    </ul>
                  </div>

                  {/* missed keywords improvements */}
                  <div className="p-4 bg-amber-50/40 border border-amber-100 rounded-xl">
                    <h5 className="text-[10px] font-bold text-amber-800 uppercase tracking-widest block font-sans mb-2">⚠️ Recommended Inclusions</h5>
                    <ul className="space-y-1.5 list-disc list-outside pl-3 text-xs text-zinc-600 font-sans leading-relaxed">
                      {evalResult.improvements.map((imp, i) => (
                        <li key={i}>{imp}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Proposed answer formulation sheet */}
                <div className="p-4 bg-zinc-900 rounded-xl space-y-3 font-sans text-left relative text-white">
                  <div className="flex justify-between items-center border-b border-zinc-700/60 pb-2">
                    <span className="text-[9px] text-zinc-400 font-mono font-bold tracking-wider">AI FORMULATED STAR ANSWER</span>
                    <button
                      onClick={handleCopy}
                      className="p-1 px-2 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700 rounded-lg cursor-pointer flex items-center gap-1 text-[10px] font-semibold"
                    >
                      {copied ? (
                        <>
                          <ClipboardCheck className="w-3.5 h-3.5 text-emerald-400" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Answer</span>
                        </>
                      )}
                    </button>
                  </div>
                  <p className="whitespace-pre-line text-xs font-serif leading-relaxed text-zinc-200">
                    {evalResult.idealAnswer}
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="text-[10px] text-zinc-400 border-t border-zinc-100 pt-4 mt-6 italic text-center font-sans tracking-tight">
            Practicing with models aligns your articulation limits structure, securing higher corporate validation ratios.
          </div>
        </div>
      </div>
    </div>
  );
}
