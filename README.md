# Hackathon-Job-landing-agent-

## Overview

This repository is designed for an agentic job-hunting platform with a unified Python backend and a modern frontend dashboard. The system supports user onboarding, skill and psychology-based assessment, job matching, background agent execution, and AI-assisted resume generation.

The goal of the project is to automate job discovery and application support while keeping the user profile, assessment data, scraped job data, and generated resumes consistent across the stack.

## Target Directory Structure

```text
agentic-job-hunter/
├── backend/                        # Unified Python Backend
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI App Entrypoint
│   │   ├── config.py               # App configuration & Environment Variables
│   │   ├── database.py             # DB connection (Beanie/SQLAlchemy initialization)
│   │   ├── models/                 # Pydantic / DB Schemas
│   │   │   ├── user.py
│   │   │   ├── job.py
│   │   │   └── profile.py          # Stores psych/skill/resume mapping
│   │   ├── routers/                # API Endpoints
│   │   │   ├── auth.py             # Login, registration, session management
│   │   │   ├── assessment.py       # Psychological & skill adaptive questions
│   │   │   └── jobs.py             # Results, application logs, triggers
│   │   ├── workers/                # Celery / Background Task Definitions
│   │   │   ├── tasks.py            # task_run_agent_pipeline, task_compile_resume
│   │   │   └── celery_app.py       # Celery configuration with Redis broker
│   │   └── core_agents/            # Agentic Core Intelligence Layer
│   │       ├── __init__.py
│   │       ├── state.py            # LangGraph Shared State definitions
│   │       ├── graph.py            # Compiles the Multi-Agent workflow graph
│   │       ├── nodes/              # Specialized Agent Execution Blocks
│   │       │   ├── profiler.py     # Psychological profile & non-common skill evaluation
│   │       │   ├── scraper.py      # Playwright web crawler & recruiter locator
│   │       │   ├── standardizer.py # Matches profile data with scraped job description
│   │       │   └── latex_writer.py # Dynamically modifies and builds your .tex files
│   │       └── templates/
│   │           └── resume.tex      # Base LaTeX document configured with Jinja blocks
│   ├── requirements.txt
│   └── Dockerfile
└── frontend/                       # User Interface Dashboard (React/Next.js or Vue)
```

## Recommended Backend Tech Stack

The backend is best implemented with the following stack:

- Python 3.11+
- FastAPI for HTTP API endpoints
- Uvicorn as the ASGI server
- Pydantic v2 for request and response validation
- Pydantic Settings for environment management
- PostgreSQL for persistent relational data
- SQLAlchemy 2.0 for ORM access, or Beanie if you prefer MongoDB documents
- Alembic for database migrations when using SQLAlchemy
- Celery for background jobs
- Redis as the Celery broker and result backend
- LangGraph and LangChain for orchestrating the agent workflow
- Playwright for browser automation and job scraping
- Jinja2 for LaTeX templating and dynamic document rendering
- LaTeX toolchain for PDF compilation
- Docker for containerized development and deployment

If you want a single consistent production path, the most practical choice is FastAPI + PostgreSQL + SQLAlchemy + Celery + Redis + LangGraph + Playwright.

## File-by-File Development Guide

### `backend/app/main.py`

Purpose: application bootstrap and API entrypoint.

Tech stack:

- FastAPI
- Uvicorn
- Pydantic settings

Expected output:

- Creates the FastAPI app instance
- Registers routers for auth, assessment, and jobs
- Enables middleware, CORS, and startup/shutdown hooks
- Exposes health and readiness endpoints

### `backend/app/config.py`

Purpose: central configuration for the backend.

Tech stack:

- Pydantic Settings
- `python-dotenv` if `.env` loading is needed

Expected output:

- Reads environment variables such as database URL, Redis URL, JWT secret, and agent settings
- Provides typed configuration objects for the whole application

### `backend/app/database.py`

Purpose: database connection and initialization.

Tech stack:

- SQLAlchemy 2.0, or Beanie if MongoDB is chosen
- PostgreSQL or MongoDB
- Async driver such as `asyncpg` or `motor`

Expected output:

- Establishes database connectivity
- Exposes session or client providers
- Initializes models and prepares the persistence layer during startup

### `backend/app/models/user.py`

Purpose: user schema and persistence model.

Tech stack:

- Pydantic
- SQLAlchemy ORM or Beanie document models

Expected output:

- Stores user identity, authentication data, role, and account state
- Supports registration, login, and session-related operations

### `backend/app/models/job.py`

Purpose: job listing and application data model.

Tech stack:

- Pydantic
- SQLAlchemy ORM or Beanie document models

Expected output:

- Stores job title, company, location, source URL, match score, and application status
- Tracks scraped jobs and application history

### `backend/app/models/profile.py`

Purpose: user profile intelligence model.

Tech stack:

- Pydantic
- SQLAlchemy ORM or Beanie document models

Expected output:

- Stores assessment responses, psychometric signals, skill summaries, resume preferences, and agent recommendations
- Connects raw user data to the final matching and resume-generation pipeline

### `backend/app/routers/auth.py`

Purpose: authentication and session management API.

Tech stack:

- FastAPI routers
- JWT auth libraries such as `python-jose`
- Password hashing with `passlib` or `bcrypt`

Expected output:

- Registration endpoint
- Login endpoint
- Token refresh or session validation endpoints
- Secure user identity handling

### `backend/app/routers/assessment.py`

Purpose: assessment workflow endpoints.

Tech stack:

- FastAPI routers
- Pydantic request/response models

Expected output:

- Serves adaptive assessment questions
- Captures psychological and skill-based answers
- Produces a structured profile result for downstream agents

### `backend/app/routers/jobs.py`

Purpose: job results and application log endpoints.

Tech stack:

- FastAPI routers
- Database access layer
- Celery task triggers if needed

Expected output:

- Returns matched jobs and recommendations
- Tracks saved jobs, applied jobs, and execution logs
- Triggers pipeline runs such as scraping or resume generation

### `backend/app/workers/celery_app.py`

Purpose: Celery application configuration.

Tech stack:

- Celery
- Redis

Expected output:

- Creates the Celery app
- Defines broker and backend configuration
- Registers task modules

### `backend/app/workers/tasks.py`

Purpose: asynchronous background jobs.

Tech stack:

- Celery
- LangGraph or direct agent orchestration

Expected output:

- `task_run_agent_pipeline` for end-to-end agent execution
- `task_compile_resume` for resume generation and PDF output
- Non-blocking processing for scraping, matching, and document compilation

### `backend/app/core_agents/state.py`

Purpose: shared state schema for the multi-agent workflow.

Tech stack:

- LangGraph
- Pydantic or typed Python data structures

Expected output:

- Defines the data passed between agent nodes
- Keeps profile, job, and resume state consistent through the workflow

### `backend/app/core_agents/graph.py`

Purpose: orchestration graph for the agentic workflow.

Tech stack:

- LangGraph

Expected output:

- Builds and compiles the multi-step workflow
- Controls branching between profiling, scraping, standardization, and resume writing

### `backend/app/core_agents/nodes/profiler.py`

Purpose: infer user strengths, skill gaps, and profile traits.

Tech stack:

- LangChain or direct LLM API calls
- Pydantic

Expected output:

- Generates a structured user profile
- Identifies non-obvious strengths and weaknesses
- Produces data that improves job matching and resume tailoring

### `backend/app/core_agents/nodes/scraper.py`

Purpose: discover jobs and recruiter information from the web.

Tech stack:

- Playwright
- HTML parsing utilities such as BeautifulSoup if needed

Expected output:

- Crawls job boards and recruiter pages
- Extracts job listings, descriptions, company data, and source URLs

### `backend/app/core_agents/nodes/standardizer.py`

Purpose: normalize and compare profile data with job descriptions.

Tech stack:

- Python text processing libraries
- Optional NLP or embeddings support

Expected output:

- Converts unstructured job descriptions into comparable fields
- Calculates profile-to-job fit and match scores

### `backend/app/core_agents/nodes/latex_writer.py`

Purpose: generate the final resume document.

Tech stack:

- Jinja2
- LaTeX engine such as `pdflatex` or `xelatex`

Expected output:

- Renders `.tex` content from profile data
- Compiles a professional PDF resume
- Produces output files ready for download or email

### `backend/app/core_agents/templates/resume.tex`

Purpose: base LaTeX resume template.

Tech stack:

- LaTeX
- Jinja2 templating blocks

Expected output:

- A reusable resume template that can be filled with user-specific content
- Consistent layout for generated resumes across different jobs

### `backend/requirements.txt`

Purpose: dependency manifest for the Python backend.

Tech stack:

- pip package management

Expected output:

- A reproducible installation list for all backend dependencies

### `backend/Dockerfile`

Purpose: container build specification for the backend.

Tech stack:

- Docker

Expected output:

- A deployable backend image
- Consistent runtime environment for local development and production

## Frontend Recommendation

The frontend directory is currently a placeholder, but the recommended stack is:

- Next.js with React
- TypeScript
- Tailwind CSS
- shadcn/ui or a similar component system
- TanStack Query for server state
- Zod for validation
- Framer Motion for transitions

Expected frontend output:

- User registration and login screens
- Assessment interface with adaptive question flows
- Job dashboard with search, recommendations, and application status
- Resume preview and download screen
- Settings and profile management UI

## Expected End-to-End Output

When implemented, the system should:

1. Let a user register and sign in.
2. Collect assessment data for skills and psychological fit.
3. Run the agent pipeline to profile the user.
4. Scrape relevant jobs and normalize them against the user profile.
5. Return ranked matches and application logs.
6. Generate a tailored resume and compile it into a PDF.
7. Present all results in a polished frontend dashboard.

## Professional AI Prompt for Building the Website

Use the following prompt with an AI coding assistant when you want the full project implemented:

```text
You are a senior full-stack engineer and agentic systems architect. Build a production-ready job-hunting web application named “Hackathon-Job-landing-agent-” with the following architecture:

Backend requirements:
- Use Python 3.11+, FastAPI, Pydantic v2, Uvicorn, Celery, Redis, LangGraph, LangChain, Playwright, Jinja2, and a relational database such as PostgreSQL with SQLAlchemy 2.0.
- Implement the backend structure exactly as:
	backend/app/main.py
	backend/app/config.py
	backend/app/database.py
	backend/app/models/user.py
	backend/app/models/job.py
	backend/app/models/profile.py
	backend/app/routers/auth.py
	backend/app/routers/assessment.py
	backend/app/routers/jobs.py
	backend/app/workers/celery_app.py
	backend/app/workers/tasks.py
	backend/app/core_agents/state.py
	backend/app/core_agents/graph.py
	backend/app/core_agents/nodes/profiler.py
	backend/app/core_agents/nodes/scraper.py
	backend/app/core_agents/nodes/standardizer.py
	backend/app/core_agents/nodes/latex_writer.py
	backend/app/core_agents/templates/resume.tex
- Provide JWT-based authentication, user registration, session validation, assessment submission, job match retrieval, and resume generation endpoints.
- Add clear request/response schemas, typed service boundaries, and environment-based configuration.
- Support background task execution through Celery and Redis.
- Build a LangGraph-based agent pipeline that profiles the user, scrapes jobs, standardizes job data, and compiles a tailored resume.

Frontend requirements:
- Build a modern dashboard in Next.js with React and TypeScript.
- Use Tailwind CSS and a clean component system.
- Include screens for landing, signup/login, assessment, job matches, application tracking, and resume preview/download.
- Make the UI responsive, accessible, and visually polished.

Quality requirements:
- Use clean architecture and keep logic separated by layer.
- Add validation, error handling, and meaningful loading states.
- Include a Dockerfile and a clear README.
- Prefer production-ready patterns over demo shortcuts.
- Generate code that is easy to extend and maintain.

Deliverables:
- A working monorepo with backend and frontend.
- A clear file structure aligned with the architecture above.
- Runnable development instructions.
- A professional user experience that supports the full job-hunting workflow.
```

## Suggested Development Order

1. Configure `config.py` and `database.py`.
2. Implement auth, assessment, and job routers.
3. Add the Celery worker and agent graph.
4. Implement scraping, profile standardization, and resume generation.
5. Build the frontend dashboard.
6. Connect all outputs end to end.

## Notes

- If you want, this README can be turned into a full project scaffold next.
- If you already know whether you want PostgreSQL or MongoDB, the backend stack can be narrowed to one persistence path for a cleaner implementation.