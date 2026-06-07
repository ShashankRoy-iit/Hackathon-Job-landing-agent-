from pydantic import BaseModel, EmailStr


class User(BaseModel):
    id: str | None = None
    email: EmailStr
    full_name: str | None = None
    is_active: bool = True
