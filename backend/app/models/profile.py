from pydantic import BaseModel


class Profile(BaseModel):
    id: str | None = None
    user_id: str
    psychometric_summary: str | None = None
    skill_summary: str | None = None
    resume_focus: str | None = None
