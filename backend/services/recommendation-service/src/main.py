from fastapi import FastAPI
from src.routes.rec_Routes import router as rec_router   # adjust path if needed

app = FastAPI(
    title="Recommendation Service",
    version="1.0.0",
    description="API for degree recommendations"
)

# Health Check Route
@app.get("/health")
def health_check():
    return {"status": "ok"}

# Load Recommendation Routes
app.include_router(rec_router)

if __name__ == "__main__":
    import uvicorn
    import os

    port = int(os.environ.get("PORT", 3000))
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)
