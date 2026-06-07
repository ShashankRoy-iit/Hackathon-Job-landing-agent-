from typing import Any

from .config import settings


async def connect_to_database() -> dict[str, Any]:
    return {"database_url": settings.database_url, "status": "connected"}
