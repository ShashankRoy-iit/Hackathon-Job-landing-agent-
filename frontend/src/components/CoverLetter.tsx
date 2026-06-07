import { useState, useEffect } from 'react';
import { Sparkles, Copy, FileText, Download, RotateCcw, Edit, ClipboardCheck, Heading } from 'lucide-react';

interface CoverLetterProps {
  prefill?: { jobTitle: string; company: string } | null;
  applicantName: string;
}

export default function CoverLetter({ prefill, applicantName }: CoverLetterProps) {
  const [jobTitle, setJobTitle] = useState(prefill?.jobTitle || 'AI Research Scientist');
  const [company, setCompany] = useState(prefill?.company || 'Google');
  const [tone, setTone] = useState<'highly-technical' | 'bold-confident' | 'warm-collaborative'>('highly-technical');
  const [generatedLetter, setGeneratedLetter] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Auto pre-fill on change
  useEffect(() => {
    if (prefill) {
      setJobTitle(prefill.jobTitle);
      setCompany(prefill.company);
    }
  }, [prefill]);

  // Generative cover letter templates
  const handleGenerate = () => {
    setIsGenerating(true);
    setGeneratedLetter('');

    setTimeout(() => {
      let letter = '';
      const dateString = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

      if (tone === 'highly-technical') {
        letter = `${applicantName}
aditya.patel@geistsystems.io | +1 (555) 782-9012
github.com/adityapatel-ai

${dateString}

Hiring Committee, AI Operations
${company}

RE: Application for ${jobTitle}

Dear Hiring Committee,

I am writing to express my eager interest in the ${jobTitle} position at ${company}. Having tracked ${company}'s contributions to state-of-the-art computational systems, I am deeply inspired by your pursuit of robust scalable inference models. As a Stanford Artificial Intelligence student who has successfully built and deployed multi-agent LLM systems, I am eager to apply my technical proficiencies to support your engineering goals.

In my recent work at Cognitive Web Labs, I focused specifically on optimising model interfaces and multi-platform pipelines. I pioneered a custom parallelized multi-agent orchestrator which successfully slashed agent interaction times by 22%. This project forced me to build deep proficiencies with PyTorch execution matrices, Transformer architectures, and context preservation libraries. Additionally, having configured low-latency Next.js/Vite server infrastructures, I recognize the importance of matching mathematical precision with responsive design elements.

Your target profile lists technical mastery of deep neural engineering alongside distributed systems. I believe my academic foundation at Stanford paired with hands-on, high-concurrency software prototyping uniquely positions me to drive immediate impact. I am confident that my specialized focus on LLM benchmarks and responsive interfaces aligns with ${company}'s engineering values.

Thank you for your time, consideration, and dedication to pushing boundaries. I welcome the opportunity to discuss how my technical qualifications can translate to success for the team.

Sincerely,

${applicantName}`;
      } else if (tone === 'bold-confident') {
        letter = `${applicantName}
aditya.patel@geistsystems.io | +1 (555) 782-9012
github.com/adityapatel-ai

${dateString}

Hiring Manager
${company}

RE: Application for ${jobTitle} – Transforming AI Career Frontiers

Dear Hiring Leader,

When building next-generation AI platforms, the critical bottleneck is rarely raw compute power—it is engineering matching pipelines that let models reason efficiently. This is precisely why I am writing to apply for the ${jobTitle} role at ${company}. I am a high-performing developer finishing my Stanford AI studies, with a proven track record of writing clean, high-concurrency pipelines that deliver quantifiable results.

Throughout my experience, I have rejected default workflows. At Vector Matrix, I led a major frontend modernization initiative that replaced massive legacy structures with lightweight modular hooks and utility styles, which trimmed page latency indices by 350ms. Later, at Cognitive Web Labs, I designed robust, parallelized text-processing architectures that decreased operational token failures by 22%. I do not merely manage code; I design systems that optimize speed and human utility.

I am drawn to ${company} because you prioritize execution over trivial feature volume. I appreciate your commitment to high-end craftsmanship, clear structural layouts, and deep mathematical precision. I am seeking a team that values rigorous technical execution, where I can build complex pipelines and deploy tools that matter.

I look forward to meeting with your engineering leaders to discuss how we can build smarter systems and scale the ${jobTitle} domain together.

Warmest regards,

${applicantName}`;
      } else {
        letter = `${applicantName}
aditya.patel@geistsystems.io | +1 (555) 782-9012
github.com/adityapatel-ai

${dateString}

Community and Talent Team
${company}

RE: Application for ${jobTitle} position

Dear ${company} Team,

I have always believed that software should feel like a natural extension of human thoughts. That is why I was incredibly excited to discover the opening for a ${jobTitle} at ${company}. I appreciate how your team balances high-end technical architecture with approachable, accessible design paradigms, and I would love to contribute my skillset as a designer-focused system engineer.

My background bridges two worlds: the mathematical rigor of AI models and the creative empathy of frontend design. During my Stanford AI coursework and my engineering projects, I have dedicated myself to securing WCAG AA accessibility compliance, developing responsive design libraries, and engineering clean modular code. At Cognitive Web Labs, I had the privilege of building high-concurrency agent dashboards that users praised for their "effortless intelligence."

Collaborating on solutions that empower users to learn, grow, and achieve their potential is my primary career motivation. I am eager to bring this same energy to the ${company} team, working alongside your engineers and designers to build software that is both highly performant and deeply human.

I am grateful for your consideration and would love the opportunity to introduce myself and discuss how we can collaborate.

With gratitude,

${applicantName}`;
      }

      setGeneratedLetter(letter);
      setIsGenerating(false);
    }, 1500);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedLetter);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generatedLetter], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${applicantName.replace(/\s+/g, '_')}_Tailored_CoverLetter.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Generate an initial letter on mount or on prefill changes
  useEffect(() => {
    handleGenerate();
  }, [prefill, tone]);

  return (
    <div className="space-y-6 text-left">
      {/* Header and subtitle */}
      <div>
        <h2 className="font-sans text-2xl font-bold text-zinc-900">Cover Letter Tailoring</h2>
        <p className="text-zinc-500 text-sm mt-1">
          Generate an incredibly high-impact, persuasive cover letter perfectly tailored to any specific job description and company culture constraints.
        </p>
      </div>

      {/* Two Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Panel */}
        <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-zinc-200/60 shadow-xs space-y-5">
          <h3 className="font-sans text-sm font-bold text-zinc-800 uppercase tracking-widest border-b pb-2 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-primary" />
            Tailoring Constraints
          </h3>

          <div className="space-y-3.5">
            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">Target Position</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full text-xs font-semibold bg-zinc-50 border border-zinc-200 p-2.5 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">Company / Organization</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full text-xs font-semibold bg-zinc-50 border border-zinc-200 p-2.5 rounded-lg focus:ring-1 focus:ring-primary focus:outline-none"
              />
            </div>

            <div>
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">Persona & Tone Alignment</label>
              <div className="flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={() => setTone('highly-technical')}
                  className={`px-3 py-2 text-left rounded-lg text-xs font-sans font-bold border transition-all ${
                    tone === 'highly-technical'
                      ? 'bg-primary/5 text-primary border-primary'
                      : 'bg-zinc-50 hover:bg-zinc-100/50 text-zinc-600 border-zinc-200/60'
                  }`}
                >
                  💻 Quantitative/Technical Architect
                </button>
                <button
                  type="button"
                  onClick={() => setTone('bold-confident')}
                  className={`px-3 py-2 text-left rounded-lg text-xs font-sans font-bold border transition-all ${
                    tone === 'bold-confident'
                      ? 'bg-primary/5 text-primary border-primary'
                      : 'bg-zinc-50 hover:bg-zinc-100/50 text-zinc-600 border-zinc-200/60'
                  }`}
                >
                  🚀 Confident/Growth Catalyst
                </button>
                <button
                  type="button"
                  onClick={() => setTone('warm-collaborative')}
                  className={`px-3 py-2 text-left rounded-lg text-xs font-sans font-bold border transition-all ${
                    tone === 'warm-collaborative'
                      ? 'bg-primary/5 text-primary border-primary'
                      : 'bg-zinc-50 hover:bg-zinc-100/50 text-zinc-600 border-zinc-200/60'
                  }`}
                >
                  🤝 Empathetic/User-First Collaborator
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !jobTitle || !company}
            className="w-full bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-lg font-sans font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className={`w-4 h-4 ${isGenerating ? 'animate-spin' : ''}`} />
            {isGenerating ? 'Drafting Letter...' : 'Regenerate Draft'}
          </button>
        </div>

        {/* Right Column: Interactive Letter Sheet */}
        <div className="lg:col-span-8 bg-white rounded-xl border border-zinc-200 shadow-sm flex flex-col justify-between p-8 min-h-[550px]">
          {isGenerating ? (
            <div className="flex-1 flex flex-col items-center justify-center space-y-4">
              <div className="w-10 h-10 rounded-full border-4 border-indigo-200 border-t-primary animate-spin"></div>
              <p className="text-zinc-500 font-sans text-xs font-bold animate-pulse">
                AI Architect is aligning your experience bullets to {company}...
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-between">
              {/* Sheet actions toolbar */}
              <div className="flex items-center justify-between pb-4 border-b border-zinc-100 mb-6">
                <span className="text-xs text-zinc-400 font-mono font-semibold uppercase tracking-widest">
                  {tone.replace('-', ' ').toUpperCase()} TEMPLATE
                </span>
                
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 border border-zinc-100 rounded-lg cursor-pointer transition-all flex items-center gap-1 text-[11px] font-sans font-bold"
                  >
                    <Edit className="w-3.5 h-3.5" />
                    {isEditing ? 'Preview Sheet' : 'Edit Live'}
                  </button>

                  <button
                    onClick={handleCopy}
                    className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 border border-zinc-100 rounded-lg cursor-pointer transition-all flex items-center gap-1 text-[11px] font-sans font-bold"
                  >
                    {copied ? (
                      <>
                        <ClipboardCheck className="w-3.5 h-3.5 text-emerald-500" />
                        <span className="text-emerald-600 font-bold">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy Block</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleDownload}
                    className="p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-50 border border-zinc-100 rounded-lg cursor-pointer transition-all flex items-center gap-1 text-[11px] font-sans font-bold"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download TXT</span>
                  </button>
                </div>
              </div>

              {/* Text Area / Document sheet */}
              {isEditing ? (
                <textarea
                  rows={18}
                  value={generatedLetter}
                  onChange={(e) => setGeneratedLetter(e.target.value)}
                  className="w-full flex-1 p-4 bg-zinc-50 border border-zinc-200 rounded-lg text-xs leading-relaxed font-sans focus:outline-none resize-none font-sans"
                />
              ) : (
                <div className="whitespace-pre-line text-xs font-sans text-left leading-relaxed text-zinc-700 font-sans select-text max-h-[480px] overflow-y-auto pr-2">
                  {generatedLetter}
                </div>
              )}
            </div>
          )}

          {/* Footer badge */}
          <div className="text-[10px] text-zinc-400 border-t border-zinc-100 pt-4 mt-6 italic text-center font-sans uppercase tracking-widest font-semibold pb-1">
            Persuasion indexes: High. Tone sync matches corporate values.
          </div>
        </div>
      </div>
    </div>
  );
}
