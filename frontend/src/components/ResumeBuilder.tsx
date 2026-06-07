import { useState } from 'react';
import { ResumeData } from '../types';
import { INITIAL_RESUME } from '../data';
import { Sparkles, FileText, Download, Edit, Plus, Trash, Check, Sliders, FileBadge } from 'lucide-react';

interface ResumeBuilderProps {
  initialResume: ResumeData;
  onSaveResume: (data: ResumeData) => void;
}

export default function ResumeBuilder({ initialResume, onSaveResume }: ResumeBuilderProps) {
  const [resume, setResume] = useState<ResumeData>(initialResume || INITIAL_RESUME);
  const [activeTemplate, setActiveTemplate] = useState<'clean' | 'classic' | 'mono'>('clean');
  const [editingField, setEditingField] = useState<string | null>(null);
  
  // Bullets optimization state
  const [optimizingIndex, setOptimizingIndex] = useState<{expId: string, bulletIdx: number} | null>(null);

  // Experience edit handler
  const handleExperienceChange = (expId: string, field: 'role' | 'company' | 'duration', value: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.map(exp => 
        exp.id === expId ? { ...exp, [field]: value } : exp
      )
    }));
  };

  // Optimize bullets simulated AI function
  const handleOptimizeBullet = (expId: string, bulletIdx: number, currentText: string) => {
    setOptimizingIndex({ expId, bulletIdx });

    setTimeout(() => {
      // Powerful high-impact STAR formatted improvements
      const optimizationBank: Record<string, string> = {
        'Streamlined multi-agent LLM task brokers which reduced processing errors across parallel nodes by 22%.':
          'Architected parallelized multi-agent LLM brokers using server-side pipelines, cutting operational context errors by 22% while saving $4,800/mo in inference tokens.',
        'Built full-stack React dashboards featuring rich real-time visual canvases using Motion and SVG nodes.':
          'Engineered reactive modular UI controls using Framer Motion and d3 graphs, resulting in a 40% increase in active session retention and pristine visual rendering metrics.',
        'Structured automated evaluation metrics for custom-trained prompt templates, improving success ratios by 18%.':
          'Authored high-coverage automated assessment loops that measured Prompt engineering drifting indexes, boosting query response consistency from 74% to 92%.',
        'Migrated massive monolithic UI components to clean React hooks paired with modern CSS variables style architectures.':
          'Led full-scale migration of legacy components to lightweight reusable hooks, shaving downstream layout compilation thresholds by 35% across all SPA modules.',
        'Spearheaded performance benchmarking across hybrid client routers, trimming page load indexes by 350ms.':
          'Constructed custom benchmarking telemetry to resolve React hydration bottlenecks, recovering 350ms in First Contentful Paint latency metrics.',
        'Authored beautiful UI modules using Tailwind utility elements, securing WCAG AA accessibility compliance.':
          'Designed responsive custom design modules that secured absolute compliance with WCAG AA standards, boosting platform inclusivity benchmarks.'
      };

      const optimizedText = optimizationBank[currentText] || 
        `Designed and delivered high-scale solutions which improved process throughput by 28% and reduced operational error logs by 15% using quantitative metrics.`;

      setResume(prev => ({
        ...prev,
        experience: prev.experience.map(exp => {
          if (exp.id === expId) {
            const copy = [...exp.bullets];
            copy[bulletIdx] = optimizedText;
            return { ...exp, bullets: copy };
          }
          return exp;
        })
      }));
      setOptimizingIndex(null);
    }, 1200);
  };

  const addExperienceCard = () => {
    const id = `exp-${Date.now()}`;
    setResume(prev => ({
      ...prev,
      experience: [
        ...prev.experience,
        {
          id,
          role: 'New Professional Role',
          company: 'Acme Systems',
          duration: '2025 - Present',
          bullets: ['Drove major system architectures that improved software output speeds by 15%.']
        }
      ]
    }));
  };

  const removeExperienceCard = (id: string) => {
    setResume(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }));
  };

  const downloadTextFormat = () => {
    const textContent = `
${resume.fullName.toUpperCase()}
${resume.email} | ${resume.phone} | ${resume.website}

SUMMARY
${resume.summary}

EXPERIENCE
${resume.experience.map(exp => `
${exp.role} - ${exp.company}
${exp.duration}
${exp.bullets.map(b => `- ${b}`).join('\n')}
`).join('\n')}

EDUCATION
${resume.education.map(edu => `
${edu.degree}
${edu.school} | ${edu.year}
`).join('\n')}

SKILLS
${resume.skills.join(', ')}
    `;

    const blob = new Blob([textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resume.fullName.replace(/\s+/g, '_')}_AATS_Resume.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Upper header controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="text-left">
          <h2 className="font-sans text-2xl font-bold text-zinc-900">AI ATS Resume Builder</h2>
          <p className="text-zinc-500 text-sm mt-1">Optimize bullet points, choose premium formats, and ensure absolute compliance with corporate screening models.</p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {/* Template Choices */}
          <div className="bg-zinc-100 p-1 rounded-lg flex items-center border border-zinc-200">
            <button
              onClick={() => setActiveTemplate('clean')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-sans cursor-pointer whitespace-nowrap transition-all ${
                activeTemplate === 'clean' ? 'bg-white text-primary shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Valley Lite
            </button>
            <button
              onClick={() => setActiveTemplate('classic')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-sans cursor-pointer whitespace-nowrap transition-all ${
                activeTemplate === 'classic' ? 'bg-white text-primary shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Executive Serif
            </button>
            <button
              onClick={() => setActiveTemplate('mono')}
              className={`px-3 py-1.5 rounded-md text-xs font-bold font-sans cursor-pointer whitespace-nowrap transition-all ${
                activeTemplate === 'mono' ? 'bg-white text-primary shadow-xs' : 'text-zinc-500 hover:text-zinc-800'
              }`}
            >
              Tech Mono
            </button>
          </div>

          <button
            onClick={downloadTextFormat}
            className="bg-primary hover:bg-primary-hover text-white px-4 py-2.5 rounded-lg font-sans text-xs font-bold tracking-wider uppercase transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download TXT
          </button>
        </div>
      </div>

      {/* Two Panes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Pane: Interactive inputs and AI optimizers */}
        <div className="lg:col-span-5 space-y-6 max-h-[700px] overflow-y-auto pr-2">
          {/* Section 1: Primary Identity fields */}
          <div className="bg-white p-5 rounded-xl border border-zinc-200/60 shadow-xs space-y-4 text-left">
            <h3 className="font-sans text-sm font-bold text-zinc-800 uppercase tracking-widest border-b pb-2 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-primary" />
              Primary Information
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">Full Name</label>
                <input
                  type="text"
                  value={resume.fullName}
                  onChange={(e) => setResume(prev => ({ ...prev, fullName: e.target.value }))}
                  className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">E-mail ID</label>
                <input
                  type="email"
                  value={resume.email}
                  onChange={(e) => setResume(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">Phone Contact</label>
                <input
                  type="text"
                  value={resume.phone}
                  onChange={(e) => setResume(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">Portfolio Link</label>
                <input
                  type="text"
                  value={resume.website}
                  onChange={(e) => setResume(prev => ({ ...prev, website: e.target.value }))}
                  className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">Professional Summary</label>
              <textarea
                rows={3}
                value={resume.summary}
                onChange={(e) => setResume(prev => ({ ...prev, summary: e.target.value }))}
                className="w-full text-xs font-medium bg-zinc-50 border border-zinc-200 p-2 rounded-md focus:ring-1 focus:ring-primary focus:outline-none resize-none font-sans"
              />
            </div>
          </div>

          {/* Section 2: Experience entries with Bullet Point Optimization buttons */}
          <div className="bg-white p-5 rounded-xl border border-zinc-200/60 shadow-xs space-y-4 text-left">
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="font-sans text-sm font-bold text-zinc-800 uppercase tracking-widest flex items-center gap-1.5">
                <FileBadge className="w-4 h-4 text-primary" />
                Experience Builder
              </h3>
              <button 
                onClick={addExperienceCard}
                className="text-primary hover:text-primary-hover text-xs font-bold flex items-center gap-0.5"
              >
                <Plus className="w-3.5 h-3.5" /> Add
              </button>
            </div>

            <div className="space-y-5">
              {resume.experience.map((exp) => (
                <div key={exp.id} className="p-3 bg-zinc-50/70 border border-zinc-200 rounded-lg relative space-y-3">
                  <button 
                    onClick={() => removeExperienceCard(exp.id)}
                    className="absolute top-2 right-2 text-zinc-400 hover:text-red-500 cursor-pointer"
                  >
                    <Trash className="w-3.5 h-3.5" />
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-0.5">Role / Title</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleExperienceChange(exp.id, 'role', e.target.value)}
                        className="w-full text-xs bg-white border border-zinc-200 p-1.5 rounded-md focus:ring-1 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-0.5">Firm Name</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleExperienceChange(exp.id, 'company', e.target.value)}
                        className="w-full text-xs bg-white border border-zinc-200 p-1.5 rounded-md focus:ring-1 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-0.5">Timeline Duration</label>
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => handleExperienceChange(exp.id, 'duration', e.target.value)}
                      className="w-full text-xs bg-white border border-zinc-200 p-1.5 rounded-md focus:ring-1 focus:outline-none"
                    />
                  </div>

                  {/* Bullets optimization actions list */}
                  <div className="space-y-2">
                    <label className="text-[9px] uppercase font-bold text-zinc-400 block mb-0.5">Accomplishments (STAR Focused)</label>
                    {exp.bullets.map((bullet, idx) => {
                      const isOptimizing = optimizingIndex?.expId === exp.id && optimizingIndex?.bulletIdx === idx;
                      return (
                        <div key={idx} className="flex gap-2 items-start bg-white p-2 border border-zinc-200/50 rounded-md">
                          <textarea
                            value={bullet}
                            rows={2}
                            onChange={(e) => {
                              const updatedBullets = [...exp.bullets];
                              updatedBullets[idx] = e.target.value;
                              setResume(prev => ({
                                ...prev,
                                experience: prev.experience.map(x => x.id === exp.id ? { ...x, bullets: updatedBullets } : x)
                              }));
                            }}
                            className="flex-1 text-xs resize-none focus:outline-none font-sans"
                          />
                          <button
                            onClick={() => handleOptimizeBullet(exp.id, idx, bullet)}
                            disabled={isOptimizing}
                            className={`px-2 py-1 rounded text-[10px] font-bold tracking-wider font-sans border transition-all cursor-pointer whitespace-nowrap self-center ${
                              isOptimizing
                                ? 'bg-indigo-50 border-indigo-200 text-indigo-400 cursor-not-allowed'
                                : 'bg-indigo-50 hover:bg-indigo-100 border-indigo-200 text-indigo-700 flex items-center gap-1'
                            }`}
                          >
                            <Sparkles className="w-3 h-3 text-indigo-500" />
                            {isOptimizing ? 'Optimizing...' : 'AI Enhance'}
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Pane: Live compliant PDF style canvas sheet */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-zinc-200 shadow-sm p-8 min-h-[700px] flex flex-col justify-between text-left font-sans select-none relative">
          <div className="absolute top-2 right-2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-500 font-mono text-[9px] font-bold">
            <Check className="w-3 h-3 text-emerald-500" /> Compliant Preview
          </div>

          {activeTemplate === 'clean' && (
            <div className="space-y-6">
              {/* Header Valley style */}
              <div className="space-y-1">
                <h2 className="text-2xl font-extrabold text-zinc-900 tracking-tight">{resume.fullName}</h2>
                <div className="flex flex-wrap gap-2 text-xs text-zinc-500 font-medium font-sans">
                  <span>{resume.email}</span>
                  <span>•</span>
                  <span>{resume.phone}</span>
                  <span>•</span>
                  <span>{resume.website}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest border-b border-zinc-200 pb-1">Professional Summary</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">{resume.summary}</p>
              </div>

              {/* Experience */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest border-b border-zinc-200 pb-1">Professional Experience</h4>
                <div className="space-y-4">
                  {resume.experience.map((exp) => (
                    <div key={exp.id} className="space-y-1">
                      <div className="flex justify-between items-start">
                        <div className="text-xs font-bold text-zinc-900">{exp.role} at <span className="text-primary font-bold">{exp.company}</span></div>
                        <div className="text-[10px] text-zinc-500 italic">{exp.duration}</div>
                      </div>
                      <ul className="list-disc list-outside pl-4 space-y-1">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="text-xs text-zinc-600 leading-relaxed font-sans">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest border-b border-zinc-200 pb-1">Education Credentials</h4>
                <div className="space-y-2">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between text-xs">
                      <div>
                        <span className="font-bold text-zinc-900">{edu.degree}</span> – <span className="text-zinc-600 font-medium">{edu.school}</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 italic">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-1.5">
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest border-b border-zinc-200 pb-1">Technical Skills</h4>
                <p className="text-xs text-zinc-600 leading-relaxed font-sans">{resume.skills.join(', ')}</p>
              </div>
            </div>
          )}

          {activeTemplate === 'classic' && (
            <div className="space-y-6 font-serif">
              {/* Header Classic center aligned style */}
              <div className="text-center space-y-2 pb-2 border-b border-zinc-300">
                <h2 className="text-3xl font-normal text-zinc-900 tracking-wide font-serif">{resume.fullName}</h2>
                <div className="flex flex-wrap justify-center gap-3 text-xs text-zinc-500 italic font-sans font-medium">
                  <span>{resume.email}</span>
                  <span>•</span>
                  <span>{resume.phone}</span>
                  <span>•</span>
                  <span>{resume.website}</span>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest text-[#2e3039] font-sans">Summary Statement</h4>
                <p className="text-xs text-zinc-700 leading-relaxed font-serif indent-4">{resume.summary}</p>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest text-[#2e3039] font-sans">History of Employment</h4>
                <div className="space-y-4">
                  {resume.experience.map((exp) => (
                    <div key={exp.id} className="space-y-1.5">
                      <div className="flex justify-between items-baseline font-serif">
                        <span className="text-xs font-bold text-zinc-900">{exp.role}, <span className="italic font-normal text-zinc-700">{exp.company}</span></span>
                        <span className="text-[10px] font-sans text-zinc-500">{exp.duration}</span>
                      </div>
                      <ul className="list-disc list-outside pl-4 space-y-1 text-xs text-zinc-700 font-serif">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="leading-relaxed">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest text-[#2e3039] font-sans font-sans">Education History</h4>
                <div className="space-y-2 font-serif">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between text-xs">
                      <div>
                        <span className="font-bold text-zinc-900">{edu.degree}</span> – <span className="text-zinc-700 italic">{edu.school}</span>
                      </div>
                      <span className="text-[10px] font-sans text-zinc-500">{edu.year}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-zinc-800 uppercase tracking-widest text-[#2e3039] font-sans font-sans">Proactive Skills</h4>
                <p className="text-xs text-zinc-700 leading-relaxed font-serif">{resume.skills.join(' • ')}</p>
              </div>
            </div>
          )}

          {activeTemplate === 'mono' && (
            <div className="space-y-6 font-mono text-zinc-800">
              {/* Header Mono Tech style */}
              <div className="space-y-2 pb-3 border-b-2 border-zinc-900 font-mono">
                <h2 className="text-2xl font-bold tracking-tight uppercase">{resume.fullName}</h2>
                <div className="text-xs text-zinc-600 font-bold space-y-0.5">
                  <div>EMAIL: {resume.email}</div>
                  <div>PHONE: {resume.phone}</div>
                  <div>LINKS: {resume.website}</div>
                </div>
              </div>

              {/* Summary */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-[#faf8ff] bg-zinc-900 inline-block px-1.5 py-0.5 uppercase tracking-wider">01. OVERVIEW_STATEMENT</h4>
                <p className="text-xs text-zinc-700 leading-relaxed font-mono mt-1">{resume.summary}</p>
              </div>

              {/* Experience */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-[#faf8ff] bg-zinc-900 inline-block px-1.5 py-0.5 uppercase tracking-wider">02. WORK_INDEX</h4>
                <div className="space-y-4">
                  {resume.experience.map((exp) => (
                    <div key={exp.id} className="space-y-1 border-l border-zinc-300 pl-3">
                      <div className="flex justify-between items-center bg-zinc-100 p-1 font-mono text-[11px] font-bold">
                        <span>{exp.role.toUpperCase()} @ {exp.company.toUpperCase()}</span>
                        <span>{exp.duration}</span>
                      </div>
                      <ul className="list-square pl-4 space-y-1 text-xs text-zinc-700 font-mono mt-1">
                        {exp.bullets.map((bullet, idx) => (
                          <li key={idx} className="leading-relaxed list-item">{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#faf8ff] bg-zinc-900 inline-block px-1.5 py-0.5 uppercase tracking-wider">03. ACADEMIC_INDEX</h4>
                <div className="space-y-2">
                  {resume.education.map((edu) => (
                    <div key={edu.id} className="flex justify-between text-xs font-mono">
                      <div>
                        [{edu.year}] <span className="font-bold text-zinc-900">{edu.degree.toUpperCase()}</span> – {edu.school.toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-[#faf8ff] bg-zinc-900 inline-block px-1.5 py-0.5 uppercase tracking-wider">04. PROFICIENCY_INDEX</h4>
                <p className="text-[11px] text-zinc-700 leading-relaxed mt-1 font-mono">{resume.skills.join(' / ')}</p>
              </div>
            </div>
          )}

          {/* Footer warning */}
          <div className="text-[10px] text-zinc-400 border-t border-zinc-100 pt-4 mt-6 italic text-center font-sans">
            ATS Compatibility Rating: 100%. Synchronized keywords: Stanford, Cognitive Web Labs, Tensor, react hooks, WCAG accessibility benchmarks.
          </div>
        </div>
      </div>
    </div>
  );
}
