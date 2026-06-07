from pydantic import BaseModel


class AgentState(BaseModel):
    user_id: str | None = None
    profile_summary: str | None = None
    matched_jobs: list[dict[str, str]] = []
