export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string; // 'Full-time' | 'Part-time' | 'Remote' | 'Contract'
  salary: string;
  logoColor: string;
  logoLetter: string;
  matchScore: number;
  description: string;
  skillsRequired: string[];
  postedTime: string;
}

export interface Application {
  id: string;
  title: string;
  company: string;
  location: string;
  stage: 'applied' | 'first_interview' | 'technical' | 'final' | 'offer';
  dateUpdated: string;
  notes?: string;
  matchScore?: number;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  website: string;
  summary: string;
  experience: Array<{
    id: string;
    role: string;
    company: string;
    duration: string;
    bullets: string[];
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    year: string;
  }>;
  skills: string[];
}

export interface InterviewQuestion {
  id: string;
  category: string;
  question: string;
  idealAnswerBullets: string[];
}

export interface Milestone {
  id: string;
  title: string;
  description: string;
  duration: string;
  skills: string[];
  completed: boolean;
}
