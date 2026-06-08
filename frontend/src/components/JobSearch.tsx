import { useEffect, useMemo, useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Application } from '../types';
import { INITIAL_JOBS } from '../data';
import {
  API_BASE_URL,
  fetchSearchQuestions,
  searchJobs,
  type JobSearchRequest,
  type JobSearchResponse,
  type MatchedJob,
  type SearchQuestion
} from '../api';
import { Search, MapPin, Sparkles, Send, GraduationCap, CheckCircle, Plus, Loader2, BrainCircuit, Tags, Globe2 } from 'lucide-react';

interface JobSearchProps {
  onAddApplication: (app: Omit<Application, 'id' | 'dateUpdated'>) => void;
  onNavigateToTab: (tab: string, prefillData?: any) => void;
  initialProfile?: any;
}

const FALLBACK_QUESTIONS: SearchQuestion[] = [
  {
    id: 'target_role',
    category: 'search',
    label: 'Which role are you targeting?',
    helper_text: 'This is the main search anchor for the agentic job search.',
    placeholder: 'AI Engineer, Product Manager, Data Analyst'
  },
  {
    id: 'skills',
    category: 'search',
    label: 'Which skills should the engine prioritize?',
    helper_text: 'Use comma-separated keywords so the engine can expand the search intelligently.',
    placeholder: 'Python, React, SQL, Prompt Engineering'
  },
  {
    id: 'location',
    category: 'search',
    label: 'Where do you want to work?',
    helper_text: 'This can be a city, country, or remote preference.',
    placeholder: 'Remote, Bengaluru, London, New York'
  },
  {
    id: 'work_mode',
    category: 'search',
    label: 'Which work mode should be preferred?',
    helper_text: 'Use this to target remote, hybrid, or on-site roles.',
    options: ['Remote', 'Hybrid', 'On-site', 'Flexible']
  },
  {
    id: 'experience_level',
    category: 'search',
    label: 'What experience level should the search target?',
    helper_text: 'This helps the engine choose junior, mid, or senior roles.',
    options: ['Intern', 'Entry', 'Mid', 'Senior', 'Lead']
  },
  {
    id: 'keywords',
    category: 'search',
    label: 'Any extra keywords or tools to search for?',
    helper_text: 'Add stack terms, certifications, or domains that matter to you.',
    placeholder: 'LangChain, AWS, Kubernetes, TypeScript'
  },
  {
    id: 'work_style',
    category: 'psychology',
    label: 'How do you prefer to work most of the time?',
    helper_text: 'This helps the engine infer whether you fit structured, creative, or analytical roles.',
    value_type: 'select',
    options: ['Highly structured', 'Balanced', 'Flexible', 'Self-directed']
  },
  {
    id: 'communication_style',
    category: 'psychology',
    label: 'Which communication style feels most natural?',
    helper_text: 'This helps align roles with written, spoken, or stakeholder-heavy work.',
    value_type: 'select',
    options: ['Written reports', 'One-to-one', 'Presentations', 'Cross-functional meetings']
  },
  {
    id: 'ambiguity_response',
    category: 'psychology',
    label: 'How do you react when a problem is ambiguous?',
    helper_text: 'This helps match you to research, operations, or executive-support workflows.',
    value_type: 'select',
    options: ['I want clear steps', 'I can adapt quickly', 'I like exploring options', 'I enjoy defining the structure']
  },
  {
    id: 'task_preference',
    category: 'skill-fit',
    label: 'Which type of tasks energize you most?',
    helper_text: 'Use this to steer toward report writing, executive support, analysis, or product roles.',
    value_type: 'select',
    options: ['Writing and summarizing', 'Coordinating people and schedules', 'Analyzing data', 'Building systems']
  },
  {
    id: 'uncommon_role_interest',
    category: 'role-discovery',
    label: 'Which lesser-known role style sounds most natural?',
    helper_text: 'These answers help discover roles that people often overlook, such as report writer or executive support positions.',
    value_type: 'select',
    options: ['Report writer', 'Executive assistant', 'Executive coordinator', 'Technical writer', 'Operations coordinator', 'Research assistant', 'Policy analyst']
  }
];

type SearchFormState = Omit<JobSearchRequest, 'skills' | 'interests' | 'keywords' | 'preferred_industries' | 'question_answers'> & {
  skills: string;
  interests: string;
  keywords: string;
  preferred_industries: string;
};

function splitTerms(value: string): string[] {
  return value
    .split(',')
    .map((term) => term.trim())
    .filter(Boolean);
}

function toPreviewJobs(responseJobs: MatchedJob[]): MatchedJob[] {
  if (responseJobs.length > 0) {
    return responseJobs;
  }

  return INITIAL_JOBS.slice(0, 3).map((job) => ({
    title: job.title,
    company: job.company,
    location: job.location,
    url: 'https://remotive.com',
    source: 'Fallback',
    summary: job.description,
    match_score: job.matchScore,
    tags: job.skillsRequired,
    role_fit: job.title
  }));
}

export default function JobSearch({ onAddApplication, onNavigateToTab, initialProfile }: JobSearchProps) {
  const [questions, setQuestions] = useState<SearchQuestion[]>(FALLBACK_QUESTIONS);
  const [loadingQuestions, setLoadingQuestions] = useState(true);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [selectedJob, setSelectedJob] = useState<MatchedJob | null>(null);
  const [appliedJobs, setAppliedJobs] = useState<Record<string, boolean>>({});
  const [searchResult, setSearchResult] = useState<JobSearchResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [questionAnswers, setQuestionAnswers] = useState<Record<string, string>>({});
  const [searchState, setSearchState] = useState<SearchFormState>({
    target_role: 'AI Engineer',
    location: 'Remote',
    work_mode: 'Remote',
    experience_level: 'Mid',
    skills: 'Python, React, SQL',
    interests: 'AI, automation, product',
    keywords: 'LLM, LangChain, FastAPI',
    preferred_industries: 'Software, AI, SaaS',
    salary_expectation: '',
  });

  useEffect(() => {
    let isMounted = true;

    fetchSearchQuestions()
      .then((items) => {
        if (isMounted && items.length > 0) {
          setQuestions(items);
        }
      })
      .catch(() => {
        if (isMounted) {
          setQuestions(FALLBACK_QUESTIONS);
        }
      })
      .finally(() => {
        if (isMounted) {
          setLoadingQuestions(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!initialProfile) {
      return;
    }

    if (initialProfile.targetRole) {
      setSearchState((current) => ({ ...current, target_role: initialProfile.targetRole }));
    }

    if (initialProfile.experienceLevel) {
      setSearchState((current) => ({ ...current, experience_level: initialProfile.experienceLevel }));
    }

    if (initialProfile.workStyle || initialProfile.communicationStyle || initialProfile.ambiguityResponse || initialProfile.taskPreference || initialProfile.uncommonRoleInterest) {
      setQuestionAnswers((current) => ({
        ...current,
        work_style: initialProfile.workStyle ?? current.work_style ?? '',
        communication_style: initialProfile.communicationStyle ?? current.communication_style ?? '',
        ambiguity_response: initialProfile.ambiguityResponse ?? current.ambiguity_response ?? '',
        task_preference: initialProfile.taskPreference ?? current.task_preference ?? '',
        uncommon_role_interest: initialProfile.uncommonRoleInterest ?? current.uncommon_role_interest ?? ''
      }));
    }

    if (Array.isArray(initialProfile.selectedGoals) && initialProfile.selectedGoals.length > 0) {
      setSearchState((current) => ({
        ...current,
        keywords: [current.keywords, ...initialProfile.selectedGoals].filter(Boolean).join(', ')
      }));
    }
  }, [initialProfile]);

  useEffect(() => {
    setQuestionAnswers((current) => {
      const nextAnswers = { ...current };
      questions.forEach((question) => {
        if (!(question.id in nextAnswers)) {
          nextAnswers[question.id] = question.options?.[0] ?? '';
        }
      });
      return nextAnswers;
    });
  }, [questions]);

  useEffect(() => {
    const previewJobs = toPreviewJobs(searchResult?.jobs ?? []);
    if (!selectedJob && previewJobs.length > 0) {
      setSelectedJob(previewJobs[0]);
      return;
    }

    if (selectedJob && previewJobs.length > 0) {
      const matchedSelected = previewJobs.find((job) => job.title === selectedJob.title && job.company === selectedJob.company);
      if (matchedSelected) {
        setSelectedJob(matchedSelected);
      } else {
        setSelectedJob(previewJobs[0]);
      }
    }
  }, [searchResult, selectedJob]);

  const visibleJobs = useMemo(() => toPreviewJobs(searchResult?.jobs ?? []), [searchResult]);
  const roleSuggestions = searchResult?.role_suggestions ?? [];
  const keywords = searchResult?.keywords ?? [];

  const buildPayload = (): JobSearchRequest => ({
    target_role: searchState.target_role,
    location: searchState.location,
    work_mode: searchState.work_mode,
    experience_level: searchState.experience_level,
    skills: splitTerms(searchState.skills),
    interests: splitTerms(searchState.interests),
    keywords: splitTerms(searchState.keywords),
    preferred_industries: splitTerms(searchState.preferred_industries),
    salary_expectation: searchState.salary_expectation,
    question_answers: {
      target_role: searchState.target_role,
      location: searchState.location,
      work_mode: searchState.work_mode,
      experience_level: searchState.experience_level,
      skills: splitTerms(searchState.skills),
      interests: splitTerms(searchState.interests),
      keywords: splitTerms(searchState.keywords),
      preferred_industries: splitTerms(searchState.preferred_industries),
      ...questionAnswers
    }
  });

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoadingSearch(true);
    setErrorMessage('');

    try {
      const response = await searchJobs(buildPayload());
      setSearchResult(response);
      setSelectedJob(response.jobs[0] ?? null);
    } catch (error) {
      const fallbackResponse: JobSearchResponse = {
        search_query: buildPayload().target_role,
        keywords: splitTerms(searchState.skills),
        role_suggestions: [],
        jobs: [],
        summary: error instanceof Error ? error.message : 'Search failed. Showing fallback matches.'
      };

      setSearchResult(fallbackResponse);
      setErrorMessage('Live search is unavailable right now, so fallback matches are shown instead.');
      setSelectedJob(INITIAL_JOBS[0] ? {
        title: INITIAL_JOBS[0].title,
        company: INITIAL_JOBS[0].company,
        location: INITIAL_JOBS[0].location,
        url: 'https://remotive.com',
        source: 'Fallback',
        summary: INITIAL_JOBS[0].description,
        match_score: INITIAL_JOBS[0].matchScore,
        tags: INITIAL_JOBS[0].skillsRequired,
        role_fit: INITIAL_JOBS[0].title
      } : null);
    } finally {
      setLoadingSearch(false);
    }
  };

  const handleApply = (job: MatchedJob) => {
    if (appliedJobs[job.title + job.company]) return;

    onAddApplication({
      title: job.title,
      company: job.company,
      location: job.location,
      stage: 'applied',
      notes: `Applied through the live job search engine. Source: ${job.source}. Match score: ${job.match_score}%.`,
      matchScore: job.match_score
    });

    setAppliedJobs((prev: Record<string, boolean>) => ({ ...prev, [job.title + job.company]: true }));
  };

  const pickRoleSuggestion = (role: string) => {
    setSearchState((prev: SearchFormState) => ({ ...prev, target_role: role }));
  };

  function updateField<K extends keyof SearchFormState>(field: K) {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setSearchState((prev: SearchFormState) => ({
        ...prev,
        [field]: event.target.value,
      }));
    };
  }

  const renderQuestionInput = (question: SearchQuestion) => {
    const value = questionAnswers[question.id] ?? '';

    if (question.value_type === 'select') {
      return (
        <select
          value={value}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => setQuestionAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
          className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
        >
          {(question.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        value={value}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setQuestionAnswers((current) => ({ ...current, [question.id]: event.target.value }))}
        placeholder={question.placeholder}
        className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
      />
    );
  };

  const psychQuestions = questions.filter((question) => question.category === 'psychology' || question.category === 'skill-fit' || question.category === 'role-discovery');

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary font-bold">Live internet search</p>
                <h2 className="font-sans text-2xl font-bold text-zinc-950 mt-1">Agentic Job Search</h2>
                <p className="text-sm text-zinc-500 mt-2">Answer a few focused questions and the backend will expand them into live job searches and role suggestions.</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <BrainCircuit className="w-6 h-6" />
              </div>
            </div>

            <form onSubmit={handleSearch} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-zinc-600">Target role</span>
                  <input
                    value={searchState.target_role}
                    onChange={updateField('target_role')}
                    placeholder={questions[0]?.placeholder ?? 'AI Engineer, Product Manager'}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                  />
                </label>
                <label className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-zinc-600">Location</span>
                  <input
                    value={searchState.location}
                    onChange={updateField('location')}
                    placeholder={questions[2]?.placeholder ?? 'Remote'}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-zinc-600">Skills to prioritize</span>
                  <textarea
                    value={searchState.skills}
                    onChange={updateField('skills')}
                    placeholder={questions[1]?.placeholder ?? 'Python, React, SQL'}
                    className="min-h-24 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                  />
                </label>
                <label className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-zinc-600">Extra keywords</span>
                  <textarea
                    value={searchState.keywords}
                    onChange={updateField('keywords')}
                    placeholder={questions[5]?.placeholder ?? 'LangChain, AWS, Kubernetes'}
                    className="min-h-24 w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                  />
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-zinc-600">Work mode</span>
                  <select
                    value={searchState.work_mode}
                    onChange={updateField('work_mode')}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                  >
                    {(questions[3]?.options ?? ['Remote', 'Hybrid', 'On-site', 'Flexible']).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
                <label className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-zinc-600">Experience level</span>
                  <select
                    value={searchState.experience_level}
                    onChange={updateField('experience_level')}
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                  >
                    {(questions[4]?.options ?? ['Intern', 'Entry', 'Mid', 'Senior', 'Lead']).map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <label className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-zinc-600">Interests</span>
                  <input
                    value={searchState.interests}
                    onChange={updateField('interests')}
                    placeholder="AI, automation, product"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                  />
                </label>
                <label className="space-y-2">
                  <span className="block text-xs font-bold uppercase tracking-wide text-zinc-600">Preferred industries</span>
                  <input
                    value={searchState.preferred_industries}
                    onChange={updateField('preferred_industries')}
                    placeholder="Software, SaaS, AI"
                    className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm focus:border-primary focus:bg-white focus:outline-none"
                  />
                </label>
              </div>

              <button
                type="submit"
                disabled={loadingSearch}
                className="w-full rounded-xl bg-primary px-4 py-3 font-sans text-sm font-bold uppercase tracking-[0.18em] text-white transition-all hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {loadingSearch ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
                Search Live Jobs
              </button>
            </form>

            <div className="rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary font-bold">Psychology and skill-fit questions</p>
                <p className="text-sm text-zinc-500 mt-1">These answers help the engine match your profile to jobs and uncover less common roles.</p>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {psychQuestions.map((question) => (
                  <label key={question.id} className="space-y-2">
                    <span className="block text-xs font-bold uppercase tracking-wide text-zinc-600">{question.label}</span>
                    <p className="text-xs text-zinc-500 leading-relaxed">{question.helper_text}</p>
                    {renderQuestionInput(question)}
                  </label>
                ))}
              </div>
            </div>

            {errorMessage ? (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                {errorMessage}
              </div>
            ) : null}

            {loadingQuestions ? (
              <div className="text-sm text-zinc-500 flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin" />
                Loading the search prompt builder...
              </div>
            ) : null}

            <div className="flex flex-wrap gap-2">
              {questions.map((question) => (
                <span key={question.id} className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs text-zinc-600">
                  <Sparkles className="w-3.5 h-3.5 text-primary" />
                  {question.label}
                </span>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-zinc-900">
              <Tags className="w-4 h-4 text-primary" />
              Live keyword expansion
            </div>
            <div className="flex flex-wrap gap-2">
              {(keywords.length > 0 ? keywords : splitTerms(searchState.skills)).slice(0, 12).map((keyword) => (
                <span key={keyword} className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                  {keyword}
                </span>
              ))}
            </div>
            {searchResult ? <p className="text-sm text-zinc-500">{searchResult.summary}</p> : <p className="text-sm text-zinc-500">The engine will generate search keywords and role variants once you run a search.</p>}
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-primary font-bold">Role suggestions</p>
                <h3 className="text-lg font-bold text-zinc-950">Different job roles based on your answers</h3>
              </div>
              <div className="flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600">
                <Globe2 className="w-3.5 h-3.5 text-primary" />
                Search source: {API_BASE_URL}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {(roleSuggestions.length > 0 ? roleSuggestions : [{ role: searchState.target_role || 'General Software Engineer', reason: 'Initial suggestion based on your inputs.', keyword_focus: [] }]).map((suggestion) => (
                <button
                  key={suggestion.role}
                  onClick={() => pickRoleSuggestion(suggestion.role)}
                  className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-left transition-all hover:border-primary hover:bg-primary/5"
                >
                  <span className="block text-sm font-semibold text-zinc-900">{suggestion.role}</span>
                  <span className="mt-1 block max-w-xs text-xs text-zinc-500">{suggestion.reason}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <AnimatePresence>
              {visibleJobs.map((job) => (
                <motion.article
                  key={`${job.title}-${job.company}`}
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  onClick={() => setSelectedJob(job)}
                  className={`cursor-pointer rounded-3xl border p-5 text-left transition-all ${selectedJob?.title === job.title && selectedJob.company === job.company ? 'border-primary bg-primary/5 shadow-sm' : 'border-zinc-200 bg-white hover:border-zinc-300'}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base font-bold text-zinc-950">{job.title}</h4>
                      <p className="text-sm text-zinc-500">{job.company} · {job.location}</p>
                    </div>
                    <div className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">{job.match_score}% Match</div>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 line-clamp-3">{job.summary}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.tags.slice(0, 5).map((tag) => (
                      <span key={tag} className="rounded-full bg-zinc-100 px-3 py-1 text-[11px] font-semibold text-zinc-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {selectedJob ? (
        <div className="rounded-3xl border border-zinc-200/70 bg-white p-6 shadow-sm">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-zinc-950">{selectedJob.title}</h3>
                  <p className="text-sm text-zinc-500">{selectedJob.company} · {selectedJob.location}</p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-500">
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1"><MapPin className="w-3.5 h-3.5" />{selectedJob.location}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1">Source: {selectedJob.source}</span>
                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1">Role fit: {selectedJob.role_fit || searchState.target_role}</span>
              </div>

              <p className="max-w-3xl text-sm leading-relaxed text-zinc-600">{selectedJob.summary}</p>
            </div>

            <div className="flex min-w-[220px] flex-col gap-3">
              <button
                onClick={() => handleApply(selectedJob)}
                disabled={Boolean(appliedJobs[selectedJob.title + selectedJob.company])}
                className={`rounded-xl px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] transition-all flex items-center justify-center gap-2 ${appliedJobs[selectedJob.title + selectedJob.company] ? 'cursor-not-allowed border border-emerald-200 bg-emerald-50 text-emerald-700' : 'bg-primary text-white hover:bg-primary-hover'}`}
              >
                {appliedJobs[selectedJob.title + selectedJob.company] ? <CheckCircle className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                {appliedJobs[selectedJob.title + selectedJob.company] ? 'Application Submitted' : 'Quick Apply'}
              </button>

              <button
                onClick={() => onNavigateToTab('cover', { jobTitle: selectedJob.title, company: selectedJob.company })}
                className="rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-zinc-700 transition-all hover:bg-zinc-100 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                Tailor Cover Letter
              </button>

              <button
                onClick={() => onNavigateToTab('coach', { jobTitle: selectedJob.title, company: selectedJob.company })}
                className="rounded-xl border border-indigo-100 bg-indigo-50/60 px-4 py-3 text-xs font-bold uppercase tracking-[0.18em] text-indigo-700 transition-all hover:bg-indigo-50 flex items-center justify-center gap-2"
              >
                <GraduationCap className="w-4 h-4" />
                Practice Interview
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
