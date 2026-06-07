from fastapi import FastAPI

app = FastAPI(title="Hackathon Job Landing Agent")


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok"}
