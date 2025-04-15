<<<<<<< HEAD
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
=======
# server/routers/observation_router.py

import os
import re
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
import traceback
import logging

from db import get_db
from models.observation import Observation
from schemas.observation_schema import ObservationRead  # 응답 모델 임포트

router = APIRouter(prefix="/observations", tags=["observations"])

# 업로드용 디렉토리 경로 설정
UPLOAD_DIR = "uploads"
IMG_DIR = os.path.join(UPLOAD_DIR, "img")
VIDEO_DIR = os.path.join(UPLOAD_DIR, "mp4")
AUDIO_DIR = os.path.join(UPLOAD_DIR, "audio")

# 디렉토리 없으면 생성
for folder in [UPLOAD_DIR, IMG_DIR, VIDEO_DIR, AUDIO_DIR]:
    if not os.path.exists(folder):
        os.makedirs(folder)

def sanitize_filename(filename: str) -> str:
    """
    파일명에서 공백 및 특수문자를 밑줄(_)로 치환
    """
    filename = filename.strip()
    filename = re.sub(r"\s+", "_", filename)
    return filename

# 정적 파일 URL 접속용 서버 도메인
BACKEND_URL = "http://localhost:4000"

@router.post("/", response_model=ObservationRead)
>>>>>>> V1
async def create_observation(
    species_category: str = Form(...),
    species_name: str = Form(...),
    habitat_type: str = Form(...),
    observation_date: str = Form(...),
    location: str = Form(None),
    memo: str = Form(None),
<<<<<<< HEAD
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
=======
    latitude: Optional[str] = Form(None),   # 빈 문자열 처리 위해 문자열로 받고 이후 None 변환
    longitude: Optional[str] = Form(None),
    # 여러 파일을 받기 위해 단순히 List[UploadFile]로 선언 (여러 파일이 없으면 None)
    photoVideo: List[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    """
    클라이언트에서 FormData로 받은 관찰 정보를 DB에 저장하는 엔드포인트.
    - 필수: species_category, species_name, habitat_type, observation_date
    - 선택: location, memo, latitude, longitude, photoVideo(이미지/비디오/오디오 파일)
    """
    image_urls = []
    video_urls = []
    audio_urls = []

    # photoVideo가 존재하면 파일 처리 (파일 객체의 filename이 공백이면 무시)
    if photoVideo:
        logging.info("Received %d photoVideo files", len(photoVideo))
        # enumerate를 통해 각 파일마다 고유한 인덱스를 부여
        for idx, file in enumerate(photoVideo):
            if file and file.filename and file.filename.strip() != "":
                try:
                    content_type = file.content_type
                    safe_filename = sanitize_filename(file.filename)
                    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
                    # 파일명에 index를 추가하여 고유하게 처리
                    unique_filename = f"{timestamp}_{idx}_{safe_filename}"
                    if content_type.startswith("image"):
                        path = os.path.join(IMG_DIR, unique_filename)
                        with open(path, "wb") as f:
                            f.write(await file.read())
                        image_urls.append(f"{BACKEND_URL}/uploads/img/{unique_filename}")
                    elif content_type.startswith("video"):
                        path = os.path.join(VIDEO_DIR, unique_filename)
                        with open(path, "wb") as f:
                            f.write(await file.read())
                        video_urls.append(f"{BACKEND_URL}/uploads/mp4/{unique_filename}")
                    elif content_type.startswith("audio"):
                        path = os.path.join(AUDIO_DIR, unique_filename)
                        with open(path, "wb") as f:
                            f.write(await file.read())
                        audio_urls.append(f"{BACKEND_URL}/uploads/audio/{unique_filename}")
                except Exception as file_err:
                    logging.error("파일 처리 중 오류 발생: %s", file_err, exc_info=True)
                    raise HTTPException(status_code=422, detail="파일 업로드 중 오류가 발생했습니다.")
            else:
                continue

    # 날짜 파싱: 두 가지 형식 지원
    try:
        try:
            obs_date = datetime.strptime(observation_date, "%Y-%m-%d %H:%M:%S")
        except ValueError:
            obs_date = datetime.strptime(observation_date, "%Y-%m-%d")
    except Exception as e:
        logging.error("날짜 파싱 실패: %s", e, exc_info=True)
        raise HTTPException(status_code=422, detail="유효한 날짜 형식이 아닙니다.")

    # latitude, longitude 빈 문자열 처리 및 숫자 변환
    try:
        lat = float(latitude) if latitude and latitude.strip() != "" else None
    except ValueError as ve:
        logging.error("위도 변환 실패: %s", ve)
        raise HTTPException(status_code=422, detail="유효한 위도 값이 아닙니다.")
    try:
        lng = float(longitude) if longitude and longitude.strip() != "" else None
    except ValueError as ve:
        logging.error("경도 변환 실패: %s", ve)
        raise HTTPException(status_code=422, detail="유효한 경도 값이 아닙니다.")

    logging.info("새 관찰 데이터 생성: species_category=%s, species_name=%s, habitat_type=%s, observation_date=%s, location=%s, memo=%s, latitude=%s, longitude=%s",
                 species_category, species_name, habitat_type, observation_date, location, memo, lat, lng)

    # Observation 객체 생성
>>>>>>> V1
    new_obs = Observation(
        species_category=species_category,
        species_name=species_name,
        habitat_type=habitat_type,
        observation_date=obs_date,
        location=location,
        memo=memo,
        image_url=", ".join(image_urls) if image_urls else None,
<<<<<<< HEAD
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
=======
        video_url=", ".join(video_urls) if video_urls else None,
        audio_url=", ".join(audio_urls) if audio_urls else None,
        latitude=lat,
        longitude=lng
    )
    db.add(new_obs)

    try:
        db.commit()
    except Exception as e:
        db.rollback()
        logging.error("DB 커밋 중 예외 발생: %s", e, exc_info=True)
        raise HTTPException(status_code=500, detail="서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.")

    db.refresh(new_obs)
    return new_obs

@router.get("/", response_model=List[ObservationRead])
def list_observations(db: Session = Depends(get_db)):
    """
    전체 관찰 데이터를 최신순(내림차순)으로 조회하는 엔드포인트
    """
    observations = db.query(Observation).order_by(Observation.id.desc()).all()
    return observations

@router.get("/{observation_id}", response_model=ObservationRead)
def get_observation(observation_id: int, db: Session = Depends(get_db)):
    """
    단일 Observation 데이터를 조회하는 엔드포인트.
    URL 예: GET /observations/26
    """
    obs = db.query(Observation).filter(Observation.id == observation_id).first()
    if not obs:
        raise HTTPException(status_code=404, detail="Observation not found")
    return obs
>>>>>>> V1
