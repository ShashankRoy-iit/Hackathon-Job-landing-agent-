const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000';

export interface SearchQuestion {
  id: string;
  category: string;
  label: string;
  helper_text: string;
  placeholder?: string;
  value_type?: string;
  options?: string[];
}

export interface JobSearchRequest {
  target_role: string;
  location: string;
  work_mode: string;
  experience_level: string;
  skills: string[];
  interests: string[];
  keywords: string[];
  preferred_industries: string[];
  salary_expectation: string;
  question_answers: Record<string, string | string[]>;
}

export interface RoleSuggestion {
  role: string;
  reason: string;
  keyword_focus: string[];
}

export interface MatchedJob {
  title: string;
  company: string;
  location: string;
  url: string;
  source: string;
  summary: string;
  match_score: number;
  tags: string[];
  role_fit: string;
}

export interface JobSearchResponse {
  search_query: string;
  keywords: string[];
  role_suggestions: RoleSuggestion[];
  jobs: MatchedJob[];
  summary: string;
}

async function requestJson<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {})
    },
    ...init
  });

  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export function fetchSearchQuestions(): Promise<SearchQuestion[]> {
  return requestJson<{ questions: SearchQuestion[] }>('/assessment/questions').then((response) => response.questions);
}

export function searchJobs(payload: JobSearchRequest): Promise<JobSearchResponse> {
  return requestJson<JobSearchResponse>('/jobs/search', {
    method: 'POST',
    body: JSON.stringify(payload)
  });
}

export { API_BASE_URL };