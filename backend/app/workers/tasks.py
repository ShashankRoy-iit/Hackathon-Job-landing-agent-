from .celery_app import celery_app


@celery_app.task(name="task_run_agent_pipeline")
def task_run_agent_pipeline() -> dict[str, str]:
    return {"status": "agent pipeline completed"}


@celery_app.task(name="task_compile_resume")
def task_compile_resume() -> dict[str, str]:
    return {"status": "resume compiled"}
