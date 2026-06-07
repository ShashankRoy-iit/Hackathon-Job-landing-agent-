from pydantic import BaseModel, HttpUrl


class Job(BaseModel):
    id: str | None = None
    title: str
    company: str
    location: str | None = None
    source_url: HttpUrl | None = None
    match_score: float | None = None
