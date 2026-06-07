from fastapi import APIRouter

router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("/")
def list_jobs() -> dict[str, list[dict[str, str]]]:
    return {"jobs": []}


@router.post("/trigger")
def trigger_pipeline() -> dict[str, str]:
    return {"message": "pipeline triggered"}
