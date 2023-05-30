from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import user, schedule, hangout

app = FastAPI()
app.include_router(user.router)
app.include_router(schedule.router)
app.include_router(hangout.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get("CORS_HOST", "http://localhost:3000")
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

