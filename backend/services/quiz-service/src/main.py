from fastapi import FastAPI
from .routes import quiz_Routes

app = FastAPI(
    title="Adaptive Quiz Service",
    description="Microservice for Adaptive RIASEC Assessment",
    version="1.0.0"
)

app.include_router(quiz_Routes.router)

@app.get("/health")
def health_check():
    return {"status": "ok", "service": "quiz-service"}