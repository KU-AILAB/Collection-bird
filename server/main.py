from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from db import engine
from models.observation import Base
from routers.observation_router import router as observation_router

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 개발 단계에서는 모든 도메인 허용
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 정적 파일 제공: uploads 폴더 내 파일들을 /uploads 경로로 서비스
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

@app.get("/")
def read_root():
    return {"message": "ㅜㅡㅜ"}

Base.metadata.create_all(bind=engine)
app.include_router(observation_router)
