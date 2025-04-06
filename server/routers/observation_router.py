# routers/observation_router.py
import os
from datetime import datetime
from typing import List
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session

from db import get_db
from models.observation import Observation

router = APIRouter(prefix="/observations", tags=["observations"])

# 업로드 폴더 및 하위 폴더 설정
UPLOAD_DIR = "uploads"
IMG_DIR = os.path.join(UPLOAD_DIR, "img")
VIDEO_DIR = os.path.join(UPLOAD_DIR, "mp4")
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)
if not os.path.exists(IMG_DIR):
    os.makedirs(IMG_DIR)
if not os.path.exists(VIDEO_DIR):
    os.makedirs(VIDEO_DIR)

@router.post("/", response_model=dict)
async def create_observation(
    species_category: str = Form(...),
    species_name: str = Form(...),
    habitat_type: str = Form(...),
    observation_date: str = Form(...),
    location: str = Form(None),
    memo: str = Form(None),
    # 클라이언트에서 images와 동영상 파일을 photoVideo 필드로 전송
    photoVideo: List[UploadFile] = File([]),
    db: Session = Depends(get_db)
):
    image_urls = []
    video_url = None
    # photoVideo 필드 내의 파일들을 MIME 타입으로 구분하여 처리
    if photoVideo:
        for file in photoVideo:
            content_type = file.content_type
            # 이미지 파일 처리
            if content_type.startswith("image"):
                image_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
                image_path = os.path.join(IMG_DIR, image_filename)
                with open(image_path, "wb") as f:
                    f.write(await file.read())
                image_urls.append(f"/uploads/img/{image_filename}")
            # 동영상 파일 처리 (여러 개일 경우 첫 번째만 사용하거나, 필요 시 리스트로 관리)
            elif content_type.startswith("video"):
                video_filename = f"{datetime.now().strftime('%Y%m%d_%H%M%S')}_{file.filename}"
                video_path = os.path.join(VIDEO_DIR, video_filename)
                with open(video_path, "wb") as f:
                    f.write(await file.read())
                video_url = f"/uploads/mp4/{video_filename}"
    # observation_date 문자열을 datetime 객체로 변환 (시간 정보 포함 시와 미포함 시 모두 처리)
    try:
        obs_date = datetime.strptime(observation_date, "%Y-%m-%d %H:%M:%S")
    except Exception:
        obs_date = datetime.strptime(observation_date, "%Y-%m-%d")
    # Observation 객체 생성 (이미지 URL은 콤마로 구분하여 저장)
    new_obs = Observation(
        species_category=species_category,
        species_name=species_name,
        habitat_type=habitat_type,
        observation_date=obs_date,
        location=location,
        memo=memo,
        image_url=", ".join(image_urls) if image_urls else None,
        video_url=video_url
    )
    db.add(new_obs)
    db.commit()
    db.refresh(new_obs)
    
    # 반환할 response에 media_list 구성 (이미지와 동영상)
    response = {
        "id": new_obs.id,
        "species_category": new_obs.species_category,
        "species_name": new_obs.species_name,
        "habitat_type": new_obs.habitat_type,
        "observation_date": new_obs.observation_date,
        "location": new_obs.location,
        "memo": new_obs.memo,
        "created_at": new_obs.created_at,
        "image_url": new_obs.image_url,
        "video_url": new_obs.video_url,
        "media_list": [{"type": "image", "url": url} for url in image_urls]
    }
    if video_url:
        response["media_list"].append({"type": "video", "url": video_url})
    return response

@router.get("/{observation_id}", response_model=dict)
def get_observation(observation_id: int, db: Session = Depends(get_db)):
    obs = db.query(Observation).filter(Observation.id == observation_id).first()
    if not obs:
        raise HTTPException(status_code=404, detail="Observation not found")
    image_urls = []
    if obs.image_url:
        image_urls = [url.strip() for url in obs.image_url.split(",")]
    response = {
        "id": obs.id,
        "species_category": obs.species_category,
        "species_name": obs.species_name,
        "habitat_type": obs.habitat_type,
        "observation_date": obs.observation_date,
        "location": obs.location,
        "memo": obs.memo,
        "created_at": obs.created_at,
        "image_url": obs.image_url,
        "video_url": obs.video_url,
        "media_list": [{"type": "image", "url": url} for url in image_urls]
    }
    if obs.video_url:
        response["media_list"].append({"type": "video", "url": obs.video_url})
    return response

@router.get("/", response_model=List[dict])
def get_all_observations(db: Session = Depends(get_db)):
    observations = db.query(Observation).all()
    result = []
    for obs in observations:
        image_urls = []
        if obs.image_url:
            image_urls = [url.strip() for url in obs.image_url.split(",")]
        res = {
            "id": obs.id,
            "species_category": obs.species_category,
            "species_name": obs.species_name,
            "habitat_type": obs.habitat_type,
            "observation_date": obs.observation_date,
            "location": obs.location,
            "memo": obs.memo,
            "created_at": obs.created_at,
            "image_url": obs.image_url,
            "video_url": obs.video_url,
            "media_list": [{"type": "image", "url": url} for url in image_urls]
        }
        if obs.video_url:
            res["media_list"].append({"type": "video", "url": obs.video_url})
        result.append(res)
    return result
