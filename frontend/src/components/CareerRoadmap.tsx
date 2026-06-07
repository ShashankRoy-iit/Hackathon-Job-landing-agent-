import { useState } from 'react';
import { Milestone } from '../types';
import { Sparkles, MapPin, CheckCircle2, Circle, TrendingUp, Cpu, Award, Zap, Sliders } from 'lucide-react';

export default function CareerRoadmap() {
  const [startPoint, setStartPoint] = useState('Frontend Javascript Learner');
  const [targetPoint, setTargetPoint] = useState('AI Research Architect');
  const [isGenerating, setIsGenerating] = useState(false);
  const [milestones, setMilestones] = useState<Milestone[]>([
    {
      id: 'm-1',
      title: 'Python Neural Pipeline Foundations',
      description: 'Acquire complete comfort with tensor matrix configurations, mathematical derivative bounds, and gradient descent formulations.',
      duration: 'Month 1 - 2',
      skills: ['NumPy', 'Pandas', 'Linear Algebra', 'Gradient Descent', 'PyTorch Basics'],
      completed: true
    },
    {
      id: 'm-2',
      title: 'Deep Learning & Foundational Architectures',
      description: 'Study neural layer dynamics, Convolution cells, Recurrent nodes, and the absolute mathematics of Transformer Attention blocks.',
      duration: 'Month 3 - 4',
      skills: ['Convolutional Networks', 'Transformers', 'Self-Attention Mechanisms', 'PyTorch Core'],
      completed: true
    },
    {
      id: 'm-3',
      title: 'Language Modeling & Tuning Operations',
      description: 'Construct custom multi-parameter fine-tuners, configure Reward Rank models, and establish high-coverage automated safety evaluation paradigms.',
      duration: 'Month 5 - 6',
      skills: ['Hugging Face', 'SFT tuning', 'RLHF', 'PEFT (LoRA / QLoRA)', 'Inference Optimizers'],
      completed: false
    },
    {
      id: 'm-4',
      title: 'Systems Scale & Agent Intermediaries',
      description: 'Connect models together using vector index databases, build parallel asynchronous tool brokers, and craft secure function call schemas.',
      duration: 'Month 7 - 8',
      skills: ['Vector Databases (Pinecone)', 'LangChain / AutoGen', 'Gemini API Connectors', 'Low-Latency Cache'],
      completed: false
    },
    {
      id: 'm-5',
      title: 'Enterprise AI Production & Architectures',
      description: 'Host and scale neural networks safely. Optimize model weight memory indices, configure load balancing gates, and deploy multi-cloud infrastructures.',
      duration: 'Month 9 - 10',
      skills: ['Triton Server', 'vLLM engines', 'Kubernetes Orchestration', 'Quantization (INT8/4)', 'Docker'],
      completed: false
    }
  ]);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      // Modify target milestone titles to matching values for realistic personalized results
      setMilestones([
        {
          id: 'm-1-new',
          title: `Baseline Conversion and ${startPoint.split(' ')[0] || 'Core'} Paradigms`,
          description: `Consolidate existing ${startPoint} skills. Focus purely on computational frameworks, typing guidelines, and compiler optimizations.`,
          duration: 'Month 1 - 2',
          skills: ['Advanced JS/TS', 'Node compilers', 'Python syntaxes', 'Profiling hooks'],
          completed: true
        },
        {
          id: 'm-2-new',
          title: 'Advanced AI Modeling Implementations',
          description: 'Dive deep into neural calculations. Master matrix vectorization mechanics, learning step schedules, and weights scaling algorithms.',
          duration: 'Month 3 - 4',
          skills: ['Tensor computations', 'Neural layouts', 'Back-propagation', 'Model rigs'],
          completed: false
        },
        {
          id: 'm-3-new',
          title: 'Fine-Tuning Adjustments & Quantized Optimizers',
          description: 'Establish custom models. Deploy low-rank adaptation matrices to minimize VRAM footprints while preserving capability indexes.',
          duration: 'Month 5 - 6',
          skills: ['PEFT / LoRA', 'Quantized execution', 'Dataset curation', 'Tuning evaluations'],
          completed: false
        },
        {
          id: 'm-4-new',
          title: `${targetPoint} Core Operational Systems`,
          description: `Construct robust middleware logic linking models, structured databases, and custom system tools tailored for ${targetPoint} scenarios.`,
          duration: 'Month 7 - 9',
          skills: ['LangChain / LlamaIndex', 'Token buffering', 'Vector Index schemas', 'API brokers'],
          completed: false
        }
      ]);
      setIsGenerating(false);
    }, 1500);
  };

  const toggleComplete = (id: string) => {
    setMilestones(prev => 
      prev.map(m => m.id === id ? { ...m, completed: !m.completed } : m)
    );
  };

  // Metrics
  const completedCount = milestones.filter(m => m.completed).length;
  const totalCount = milestones.length;
  const completionRatio = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  return (
    <div className="space-y-6 text-left">
      {/* Upper info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans text-2xl font-bold text-zinc-900">Dynamic Career Pathway Map</h2>
          <p className="text-zinc-500 text-sm mt-1">Generate step-by-step skill pathways from any starting experience point straight to your target dream role.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-100 self-start">
          <Award className="w-3.5 h-3.5" />
          <span>Active Learning Credentials Sync</span>
        </div>
      </div>

      {/* Constraints sandbox input panel */}
      <div className="bg-white p-5 rounded-xl border border-zinc-200/65 shadow-sm space-y-4">
        <h3 className="font-sans text-xs font-bold text-zinc-500 uppercase tracking-widest border-b pb-2 flex items-center gap-1.5">
          <Sliders className="w-4 h-4 text-primary" />
          Pathway Generator
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">My Starting Point</label>
            <input
              type="text"
              value={startPoint}
              onChange={(e) => setStartPoint(e.target.value)}
              className="w-full text-xs font-semibold bg-zinc-50 border border-zinc-200 p-2.5 rounded-lg focus:ring-1 focus:outline-none"
            />
          </div>
          <div>
            <label className="text-[10px] uppercase font-bold text-zinc-500 tracking-wide block mb-1">My Target Position</label>
            <input
              type="text"
              value={targetPoint}
              onChange={(e) => setTargetPoint(e.target.value)}
              className="w-full text-xs font-semibold bg-zinc-50 border border-zinc-200 p-2.5 rounded-lg focus:ring-1 focus:outline-none"
            />
          </div>

          <button
            onClick={handleGenerate}
            disabled={isGenerating || !startPoint || !targetPoint}
            className="bg-primary hover:bg-primary-hover text-white py-3 px-4 rounded-lg font-sans text-xs font-bold uppercase tracking-wider transition-all disabled:opacity-40 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-4 h-4" />
            {isGenerating ? 'Mapping Pathways...' : 'Generate Target Map'}
          </button>
        </div>
      </div>

      {isGenerating ? (
        <div className="py-24 bg-white rounded-xl border border-dashed flex flex-col items-center justify-center space-y-3">
          <div className="w-10 h-10 rounded-full border-4 border-zinc-100 border-t-primary animate-spin"></div>
          <p className="text-zinc-500 font-sans text-xs font-bold animate-pulse">Computing semantic progression clusters and certificate requirements...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Progress dashboard summary */}
          <div className="lg:col-span-4 bg-white p-5 rounded-xl border border-zinc-200/60 shadow-xs space-y-4">
            <h4 className="font-sans text-xs font-extrabold text-zinc-500 uppercase tracking-widest pb-1 border-b">Progress Scoreboard</h4>
            
            <div className="space-y-4 text-center py-4">
              {/* Progress counter meter */}
              <div className="text-5xl font-extrabold text-zinc-900 font-sans tracking-tight">
                {completionRatio}%
              </div>
              <div className="text-xs text-zinc-500 font-semibold uppercase tracking-wider">
                Path Completion Index
              </div>

              {/* Progress Bar */}
              <div className="w-full bg-zinc-100 h-2.5 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-500 rounded-full" 
                  style={{ width: `${completionRatio}%` }}
                ></div>
              </div>

              <div className="text-xs font-medium text-zinc-600 bg-zinc-50/50 p-2.5 rounded-lg border border-zinc-200/40 text-left">
                Checked off <span className="font-bold text-zinc-800">{completedCount}</span> out of <span className="font-bold text-zinc-800">{totalCount}</span> progression nodes. Keep leveling up your skills to qualify for enterprise opportunities!
              </div>
            </div>
          </div>

          {/* Vertical Gantt list of nodes */}
          <div className="lg:col-span-8 bg-white p-6 sm:p-8 rounded-xl border border-zinc-200/60 shadow-xs space-y-6">
            <div className="flex justify-between items-center pb-2 border-b">
              <h4 className="font-sans text-xs font-extrabold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-primary" />
                Target Milestones Pathway
              </h4>
              <span className="text-xs font-bold text-[#faf8ff] bg-primary px-3 py-1 rounded-full">{targetPoint} Pathway</span>
            </div>

            <div className="relative border-l border-zinc-200 ml-3 pl-8 space-y-8">
              {milestones.map((milestone, idx) => (
                <div key={milestone.id} className="relative text-left space-y-2 select-none group">
                  {/* Circle locator checkbox node */}
                  <button
                    onClick={() => toggleComplete(milestone.id)}
                    className="absolute -left-[45px] top-1.5 w-8 h-8 rounded-full bg-white border-2 flex items-center justify-center transition-all shadow-sm focus:outline-none cursor-pointer"
                  >
                    {milestone.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-primary fill-primary/10 transition-transform group-hover:scale-105" />
                    ) : (
                      <div className="w-4 h-4 rounded-full border-2 border-zinc-300 hover:border-primary transition-all"></div>
                    )}
                  </button>

                  {/* Header content card details */}
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <h5 className={`font-sans tracking-tight text-sm font-bold ${
                        milestone.completed ? 'text-zinc-500 line-through' : 'text-zinc-900'
                      }`}>
                        Stage {idx + 1}: {milestone.title}
                      </h5>
                      <span className="text-[10px] bg-zinc-100 font-bold border border-zinc-200 rounded-full px-2 py-0.5 whitespace-nowrap self-start sm:self-center font-mono text-zinc-600">
                        {milestone.duration}
                      </span>
                    </div>

                    <p className="text-zinc-500 text-xs leading-relaxed max-w-xl font-sans">
                      {milestone.description}
                    </p>
                  </div>

                  {/* Acquired tech stack tags list */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {milestone.skills.map((skill, index) => (
                      <span 
                        key={index} 
                        className={`text-[9.5px] font-bold font-sans px-2.5 py-0.5 rounded ${
                          milestone.completed
                            ? 'bg-zinc-100 text-zinc-400 border border-zinc-200/50'
                            : 'bg-primary/5 text-primary border border-primary/5'
                        }`}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
