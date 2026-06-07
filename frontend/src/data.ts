import { Job, Application, ResumeData, InterviewQuestion } from './types';

export const INITIAL_JOBS: Job[] = [
  {
    id: 'job-1',
    title: 'AI Research Scientist',
    company: 'Google',
    location: 'Mountain View, CA',
    type: 'Full-time',
    salary: '$180,000 - $240,000',
    logoColor: 'bg-red-50 text-red-600 border border-red-200',
    logoLetter: 'G',
    matchScore: 96,
    postedTime: '2 days ago',
    description: 'We are looking for an AI Research Scientist to join our deep learning team. You will lead the research and development of next-generation foundational models, optimizing both training workflows and downstream safety alignments.',
    skillsRequired: ['PyTorch', 'Transformers', 'RLHF', 'Distributed Systems', 'LLM Alignment']
  },
  {
    id: 'job-2',
    title: 'ML Engineer',
    company: 'Microsoft',
    location: 'Remote',
    type: 'Full-time',
    salary: '$165,000 - $210,000',
    logoColor: 'bg-blue-50 text-blue-600 border border-blue-200',
    logoLetter: 'M',
    matchScore: 91,
    postedTime: '3 days ago',
    description: 'As a Machine Learning Engineer in Azure AI, you will scale inference architectures, build low-latency custom pipelines, and integrate state-of-the-art vision-language models into production services.',
    skillsRequired: ['Python', 'ONNX', 'CUDA', 'Azure', 'Docker', 'Kubernetes']
  },
  {
    id: 'job-3',
    title: 'Senior Frontend Architect',
    company: 'Vercel',
    location: 'San Francisco, CA (Hybrid)',
    type: 'Full-time',
    salary: '$170,000 - $220,000',
    logoColor: 'bg-zinc-100 text-black border border-zinc-300',
    logoLetter: 'V',
    matchScore: 88,
    postedTime: '1 day ago',
    description: 'Lead the next generation of visual rendering paradigms. You will drive performance optimizations in server components, develop gorgeous, highly accessible design systems, and collaborate on Vite improvements.',
    skillsRequired: ['React 19', 'Next.js', 'Vite', 'Tailwind CSS', 'TypeScript', 'Motion']
  },
  {
    id: 'job-4',
    title: 'Generative AI Developer',
    company: 'OpenAI',
    location: 'San Francisco, CA',
    type: 'Full-time',
    salary: '$200,000 - $280,000',
    logoColor: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
    logoLetter: 'O',
    matchScore: 84,
    postedTime: 'Just now',
    description: 'Help us push the boundaries of assistant interactions. You will design full-stack API brokers, develop custom tools for function calling systems, and build robust real-time streaming interfaces.',
    skillsRequired: ['Node.js', 'TypeScript', 'Gemini API', 'Vector Databases', 'LangChain']
  },
  {
    id: 'job-5',
    title: 'Product Designer - AI Tools',
    company: 'Figma',
    location: 'Remote',
    type: 'Contract',
    salary: '$110 - $140 / hr',
    logoColor: 'bg-purple-50 text-purple-600 border border-purple-200',
    logoLetter: 'F',
    matchScore: 78,
    postedTime: '5 days ago',
    description: 'Reimagine design authoring. Work closely with AI-ML research cells to prototype, user-test, and deploy beautiful canvas tools, autocomplete styling interfaces, and advanced prototyping copilots.',
    skillsRequired: ['Figma', 'Prototyping', 'Component Architectures', 'Design Systems', 'React']
  },
  {
    id: 'job-6',
    title: 'Machine Learning Intern',
    company: 'Tesla',
    location: 'Austin, TX',
    type: 'Full-time',
    salary: '$45 - $60 / hr',
    logoColor: 'bg-red-50 text-red-700 border border-red-300',
    logoLetter: 'T',
    matchScore: 92,
    postedTime: '1 week ago',
    description: 'Join the Autopilot vision division. Help annotate real-time datasets, build evaluation rigs for behavioral networks, and optimize deep models to run seamlessly on local vehicle hardware chips.',
    skillsRequired: ['Python', 'C++', 'Computer Vision', 'PyTorch', 'TensorRT']
  }
];

export const INITIAL_APPLICATIONS: Application[] = [
  {
    id: 'app-1',
    title: 'AI Research Scientist',
    company: 'Google',
    location: 'Mountain View, CA',
    stage: 'technical',
    dateUpdated: '2026-06-05',
    notes: 'Completed secondary screen. Technical rounds focused on Transformer architectures and parallelized cluster training scheduled for Tuesday.',
    matchScore: 96
  },
  {
    id: 'app-2',
    title: 'ML Engineer',
    company: 'Microsoft',
    location: 'Remote',
    stage: 'first_interview',
    dateUpdated: '2026-06-06',
    notes: 'Recruiter call scheduled. Be prepared to talk about previous experience with ONNX runtimes and low-gravity latency scaling.',
    matchScore: 91
  },
  {
    id: 'app-3',
    title: 'Full Stack Engineer',
    company: 'Stripe',
    location: 'San Francisco, CA',
    stage: 'applied',
    dateUpdated: '2026-06-04',
    notes: 'Submitted customized ATS resume through Dhurandhar AI tracker.',
    matchScore: 87
  },
  {
    id: 'app-4',
    title: 'AI Engineer Intern',
    company: 'Anthropic',
    location: 'San Francisco, CA',
    stage: 'offer',
    dateUpdated: '2026-06-07',
    notes: 'Received written offer! Base $55/hr + housing stipend. Reviewing benefits guidelines and sign-on packets.',
    matchScore: 92
  }
];

export const INITIAL_RESUME: ResumeData = {
  fullName: 'Aditya Patel',
  email: 'aditya.patel@geistsystems.io',
  phone: '+1 (555) 782-9012',
  website: 'github.com/adityapatel-ai',
  summary: 'Inquisitive Machine Learning Student and Frontend Developer in transition. Highly proficient in designing responsive, data-intensive web experiences as well as building foundational natural language engineering pipelines.',
  experience: [
    {
      id: 'exp-1',
      role: 'Founding ML Engineer Assistant',
      company: 'Cognitive Web Labs',
      duration: 'Jun 2025 - Present',
      bullets: [
        'Streamlined multi-agent LLM task brokers which reduced processing errors across parallel nodes by 22%.',
        'Built full-stack React dashboards featuring rich real-time visual canvases using Motion and SVG nodes.',
        'Structured automated evaluation metrics for custom-trained prompt templates, improving success ratios by 18%.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Software Frontend Intern',
      company: 'Vector Matrix',
      duration: 'Jan 2024 - Jun 2025',
      bullets: [
        'Migrated massive monolithic UI components to clean React hooks paired with modern CSS variables style architectures.',
        'Spearheaded performance benchmarking across hybrid client routers, trimming page load indexes by 350ms.',
        'Authored beautiful UI modules using Tailwind utility elements, securing WCAG AA accessibility compliance.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'Master of Science in Artificial Intelligence',
      school: 'Stanford University',
      year: 'Expected 2027'
    },
    {
      id: 'edu-2',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of Texas at Austin',
      year: '2025'
    }
  ],
  skills: ['Python', 'TypeScript', 'TensorFlow', 'PyTorch', 'React', 'Motion', 'Tailwind', 'Next.js', 'PostgreSQL', 'Docker', 'NLP', 'Git']
};

export const INTERVIEW_QUESTIONS: InterviewQuestion[] = [
  {
    id: 'q-1',
    category: 'System Performance & LLMs',
    question: 'How do you optimize Transformer inference latency for a real-time, streaming conversational agent?',
    idealAnswerBullets: [
      'Implement Key-Value (KV) Caching to avoid re-computing past states.',
      'Use model quantization (e.g., INT8/INT4 weight formatting) to reduce IO constraints.',
      'Enable speculative decoding with a smaller, faster draft model.',
      'Leverage FlashAttention to optimize hardware memory bandwidth and reduce computational overhead.'
    ]
  },
  {
    id: 'q-2',
    category: 'React Architecture',
    question: 'Explain React 19 Server Components and how they improve performance over traditional Client-Side rendering.',
    idealAnswerBullets: [
      'Server Components execute on the server, excluding heavy dependencies from the client-side JavaScript bundle.',
      'They fetch data closer to the source (databases/microservices) reducing network rounds.',
      'HTML is streamed directly, boosting First Contentful Paint (FCP) and SEO capability.',
      'Client components can still be leaf nodes to offer full interactive client capabilities.'
    ]
  },
  {
    id: 'q-3',
    category: 'Machine Learning',
    question: 'What is RLHF (Reinforcement Learning from Human Feedback), and why is it preferred over simple direct super-guided fine-tuning?',
    idealAnswerBullets: [
      'SFT (Supervised Fine-Tuning) often leads to overfitting, robotic repetition, or hallucinations of training biases.',
      'RLHF aligns model output with human preferences of helpfulness, honesty, and safety.',
      'It creates a Reward Model that ranks outputs, guiding policy modification with Proximal Policy Optimization (PPO).',
      'It allows generalization to novel queries where strict direct reference labels do not exist.'
    ]
  },
  {
    id: 'q-4',
    category: 'Problem Solving',
    question: 'How do you handle a scenario where you discover a critical data leak in an active machine learning pipeline?',
    idealAnswerBullets: [
      'Stop live ingestion and quarantine the contaminated model evaluations immediately.',
      'Trace the training partition source to identify where validation fields leaked into training folds.',
      'Establish fresh, mathematically clean cross-validation partitions.',
      'Document the root cause and implement deterministic automated guards in standard CI/CD pipelines.'
    ]
  }
];
