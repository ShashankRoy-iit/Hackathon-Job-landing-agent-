from fastapi import APIRouter

router = APIRouter(prefix="/assessment", tags=["assessment"])


@router.get("/questions")
def get_questions() -> dict[str, list[str]]:
    return {"questions": ["What skills are you strongest in?", "What work environment helps you perform best?"]}


@router.post("/submit")
def submit_assessment() -> dict[str, str]:
    return {"message": "assessment submitted"}
