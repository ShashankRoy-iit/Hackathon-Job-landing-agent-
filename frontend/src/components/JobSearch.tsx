import { useState } from 'react';
import { motion } from 'motion/react';
import { Job, Application } from '../types';
import { INITIAL_JOBS } from '../data';
import { Search, MapPin, DollarSign, Filter, Star, Sparkles, Send, GraduationCap, CheckCircle, Plus } from 'lucide-react';

interface JobSearchProps {
  jobs: Job[];
  onAddApplication: (app: Omit<Application, 'id' | 'dateUpdated'>) => void;
  onNavigateToTab: (tab: string, prefillData?: any) => void;
}

export default function JobSearch({ jobs, onAddApplication, onNavigateToTab }: JobSearchProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJob, setSelectedJob] = useState<Job>(jobs[0] || INITIAL_JOBS[0]);
  const [filterType, setFilterType] = useState('All');
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = 
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.skillsRequired.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()));
      
    const matchesType = filterType === 'All' || job.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleApply = (job: Job) => {
    if (appliedJobs[job.id]) return;
    
    onAddApplication({
      title: job.title,
      company: job.company,
      location: job.location,
      stage: 'applied',
      notes: `Applied through Dhurandhar Premium Job Finder. Smart Match calculated score: ${job.matchScore}%.`,
      matchScore: job.matchScore
    });

    setAppliedJobs(prev => ({ ...prev, [job.id]: true }));
  };

  return (
    <div className="space-y-6">
      {/* Header and Summary */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="font-sans text-2xl font-bold text-zinc-900">Premium Job Finder</h2>
          <p className="text-zinc-500 text-sm mt-1">Smart Match analyzes your active profile details to discover the highest scoring opportunities.</p>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/5 text-primary border border-primary/10 self-start">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Active ATS Profile Syncing</span>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="bg-white p-4 rounded-xl border border-zinc-200/60 shadow-sm flex flex-col md:flex-row gap-4 items-center">
        {/* Keyword Search field */}
        <div className="relative w-full md:flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
          <input
            type="text"
            placeholder="Search roles, companies, or tech stack e.g., PyTorch, Next.js..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-zinc-50 border border-zinc-200 rounded-lg text-sm font-sans focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all placeholder:text-zinc-400"
          />
        </div>

        {/* Filter Badges */}
        <div className="flex gap-1.5 overflow-x-auto self-start md:self-auto pb-1 md:pb-0 w-full md:w-auto">
          {['All', 'Full-time', 'Part-time', 'Remote', 'Contract'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-2 rounded-lg text-xs font-semibold font-sans cursor-pointer whitespace-nowrap transition-all ${
                filterType === type
                  ? 'bg-primary text-white shadow-sm shadow-primary/10'
                  : 'bg-zinc-50 hover:bg-zinc-100 text-zinc-600 border border-zinc-200/50'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Split Window */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Job List */}
        <div className="lg:col-span-5 space-y-3 h-[600px] overflow-y-auto pr-1">
          {filteredJobs.length === 0 ? (
            <div className="bg-white rounded-xl border border-dashed border-zinc-300 p-12 text-center">
              <Star className="w-8 h-8 text-zinc-300 mx-auto mb-3" />
              <p className="text-zinc-500 font-sans text-sm font-semibold">No synchronized roles match your search.</p>
              <button 
                onClick={() => { setSearchTerm(''); setFilterType('All'); }} 
                className="mt-2 text-primary font-sans text-xs font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredJobs.map((job) => (
              <div
                key={job.id}
                onClick={() => setSelectedJob(job)}
                className={`p-4 rounded-xl border transition-all cursor-pointer text-left relative ${
                  selectedJob.id === job.id
                    ? 'bg-primary/5 border-primary shadow-sm'
                    : 'bg-white hover:bg-zinc-50/50 border-zinc-200/80 shadow-xs'
                }`}
              >
                {/* Score Tag */}
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
                  {job.matchScore}% Match
                </div>

                {/* Main Identity */}
                <div className="flex items-start gap-3">
                  <div className={`w-11 h-11 rounded-lg flex items-center justify-center font-bold text-base font-sans ${job.logoColor}`}>
                    {job.logoLetter}
                  </div>
                  <div>
                    <h4 className="font-bold text-zinc-900 text-sm leading-tight pr-16 font-sans">
                      {job.title}
                    </h4>
                    <p className="text-zinc-500 text-xs font-sans mt-0.5">{job.company}</p>
                    
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-zinc-500 text-[11px] font-sans mt-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-zinc-400" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-3.5 h-3.5 text-zinc-400" />
                        {job.salary}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-3">
                      {job.skillsRequired.slice(0, 3).map((skill, i) => (
                        <span key={i} className="px-2 py-0.5 rounded-md bg-zinc-100 text-[#434655] text-[10px] font-medium font-sans">
                          {skill}
                        </span>
                      ))}
                      {job.skillsRequired.length > 3 && (
                        <span className="text-[10px] text-zinc-400 self-center pl-1">
                          +{job.skillsRequired.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Right Column: Detailed Pane */}
        {selectedJob && (
          <div className="lg:col-span-7 bg-white rounded-xl border border-zinc-200/70 shadow-xs p-6 h-[600px] flex flex-col justify-between">
            <div className="overflow-y-auto space-y-6 pr-1">
              {/* Header Info */}
              <div className="flex justify-between items-start gap-4 pb-4 border-b border-zinc-100">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-2xl ${selectedJob.logoColor}`}>
                    {selectedJob.logoLetter}
                  </div>
                  <div className="text-left">
                    <h3 className="font-sans text-lg font-bold text-zinc-900 leading-tight">
                      {selectedJob.title}
                    </h3>
                    <p className="text-zinc-600 text-sm font-sans font-medium mt-0.5">{selectedJob.company}</p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-zinc-500 text-xs font-sans mt-2">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-zinc-400" />
                        {selectedJob.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-zinc-400 animate-pulse" />
                        {selectedJob.salary}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="px-3.5 py-1.5 bg-primary/10 text-primary font-bold text-sm tracking-wide rounded-full font-sans flex items-center gap-1">
                    <Sparkles className="w-4 h-4 animate-spin-slow" />
                    {selectedJob.matchScore}% Match
                  </div>
                  <p className="text-[10px] text-zinc-400 mt-1.5 font-sans">Posted {selectedJob.postedTime}</p>
                </div>
              </div>

              {/* Job Description Text */}
              <div className="text-left space-y-4 font-sans text-[14.5px] leading-relaxed text-zinc-600">
                <h4 className="font-bold text-zinc-800 text-sm uppercase tracking-wide">Role Description</h4>
                <p>{selectedJob.description}</p>
              </div>

              {/* Skills requirements */}
              <div className="text-left space-y-3 pt-2">
                <h4 className="font-bold text-zinc-800 text-sm uppercase tracking-wide font-sans">Required Proficiencies</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedJob.skillsRequired.map((skill, i) => (
                    <span key={i} className="px-3 py-1 rounded-lg bg-indigo-50/70 text-primary border border-indigo-100/30 font-medium text-xs font-sans">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Strategic copilot routes buttons */}
            <div className="pt-4 border-t border-zinc-100 grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Core Apply Action */}
              <button
                onClick={() => handleApply(selectedJob)}
                disabled={appliedJobs[selectedJob.id]}
                className={`py-3 px-4 rounded-lg font-sans font-bold text-xs tracking-wide uppercase shadow-sm flex items-center justify-center gap-2 transition-all ${
                  appliedJobs[selectedJob.id]
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary-hover text-white active:scale-98 cursor-pointer'
                }`}
              >
                {appliedJobs[selectedJob.id] ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    Application Submitted
                  </>
                ) : (
                  <>
                    <Plus className="w-4 h-4" />
                    Submit Quick Apply
                  </>
                )}
              </button>

              {/* Cover Letter generation proxy */}
              <button
                onClick={() => onNavigateToTab('cover', { jobTitle: selectedJob.title, company: selectedJob.company })}
                className="bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-zinc-700 py-3 px-4 rounded-lg font-sans font-bold text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <Send className="w-3.5 h-3.5 text-zinc-500" />
                Tailor Cover Letter
              </button>

              {/* Mock preparation routing */}
              <button
                onClick={() => onNavigateToTab('coach', { jobTitle: selectedJob.title, company: selectedJob.company })}
                className="bg-indigo-50/45 hover:bg-indigo-50 text-indigo-700 border border-indigo-100/30 py-3 px-4 rounded-lg font-sans font-bold text-xs tracking-wide uppercase transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <GraduationCap className="w-4 h-4 text-indigo-500" />
                Practice Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
