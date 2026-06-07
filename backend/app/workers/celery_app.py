from celery import Celery

from ..config import settings

celery_app = Celery(
    "hackathon_job_landing_agent",
    broker=settings.redis_url,
    backend=settings.redis_url,
)
