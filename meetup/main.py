from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os
from routers import user, hangout
from authenticator import authenticator

app = FastAPI()
app.include_router(user.router)
app.include_router(hangout.router)
app.include_router(authenticator.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[os.environ.get("CORS_HOST", "http://localhost:3000")],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
