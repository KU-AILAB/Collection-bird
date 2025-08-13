# 🐦 야생동물 데이터 수집 서비스 (Wildlife Observation Platform)

[![Backend-FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi&logoColor=white)](#)
[![DB-MySQL](https://img.shields.io/badge/DB-MySQL-4479A1?logo=mysql&logoColor=white)](#)
[![기간](https://img.shields.io/badge/기간-2025.03–2025.04-6E7781)](#)

**관찰자가 야생동물(사진·영상·소리)을 기록**하면  
백엔드가 **좌표·주소(카카오 지도)와 관찰 시각**을 이용해 **날씨(OpenWeatherMap)·고도 정보를 결합**하여 저장/조회하는 서비스입니다.

> **담당 역할(본인)**: 백엔드 개발 · DB 설계/구축 · 프론트와 연동(React 데이터 공급) · 외부 API 통합

---

## 목차
- [핵심 기능](#핵심-기능)
- [화면](#화면)
- [아키텍처](#아키텍처)
- [기술 스택](#기술-스택)
- [내 역할 & 성과](#내-역할--성과)
- [데이터 모델(ERD)](#데이터-모델erd)
- [로컬 실행](#로컬-실행)
- [폴더 구조](#폴더-구조)

---

## 핵심 기능

- **관찰 카드 리스트**: 종 이름, 관찰 위치(주소), 관찰 일시를 카드로 표시. 카테고리 탭/검색 제공.
- **업로드 폼**: 생물종 분류·종 이름·서식지 유형 선택, **사진/동영상/소리** 업로드(드래그앤드롭/파일 선택).
- **지도 연동**: 카카오 지도에서 마커를 클릭하면 **주소가 자동 계산** 되어 입력란에 반영.
- **상세 페이지**: 미디어, 주소, **고도/날씨(기온·강수·풍속)**, 관찰 시각, 지도, **댓글(이름+내용)** 표시.
- **다국어 토글**: 한국어/영어 UI(프론트 제공) · CORS/보안 설정으로 서비스화 준비.

---

## 화면

<p align="center">
  <img src="./server/assets/main.png" alt="메인(관찰 카드 리스트)" width="45%">
  <img src="./server/assets/upload.png" alt="업로드 폼" width="45%"><br/>
  <img src="./server/assets/location.png" alt="관찰 위치 입력(카카오 지도)" width="45%">
  <img src="./server/assets/detail.png" alt="상세 페이지" width="45%">
</p>

> 저장소 루트에 `assets/` 폴더를 두면 README가 이미지를 자동으로 표시합니다.

---

## 아키텍처

```mermaid
flowchart LR
  A[React Client] -->|REST/JSON · multipart| B[FastAPI]
  B -->|SQLAlchemy| C[(MySQL)]
  B -->|OpenWeatherMap API| D[Weather Service]
  B -->|Kakao Map JS SDK| E[Reverse Geocoding]
  subgraph Storage
    C
  end
```

---

## 기술 스택

- **Backend**: FastAPI, Uvicorn, Pydantic, SQLAlchemy
- **DB**: MySQL(utf8mb4), PyMySQL, 마이그레이션 스크립트(수동/자동 혼합)
- **외부 서비스**: Kakao Map JS SDK(지도/역지오코딩), OpenWeatherMap(날씨)
- **Infra/기타**: python-dotenv(환경변수), CORS 설정, 파일 업로드 보안(확장자/크기 제한)

---

## 내 역할 & 성과

- DB 설계·구축: 관찰(Observation)–미디어(Media)–댓글(Comment) 스키마/관계 정의, 인덱스 최적화.
- 파일 업로드 파이프라인: 사진/영상/오디오 멀티파트 업로드 → 저장 경로/메타 저장 → 응답 스키마 설계.
- 오픈 API 통합: 관찰 좌표·시각 기반 OpenWeatherMap 날씨/고도 계산, 카카오 지도 역지오코딩.
- 프론트 연동: React UI에 데이터 바인딩, 리스트/상세/업로드 E2E 플로우 검증.
- 코드 모듈화: `observation.py`, `observation_router.py`, `observation_schema.py`, `comment.py`, `comment_schema.py`, `db.py` 등으로 도메인·라우팅·스키마 분리.
- 운영 고려: CORS 화이트리스트, `.env` 분리, 로그 개인정보 최소화, 업로드 파일 검증.

---

## 데이터 모델(ERD)

```mermaid
erDiagram
    observations ||--o{ comments : has

    observations {
        int id
        string species_category
        string species_name
        string habitat_type
        datetime observation_date
        string location
        string memo
        string image_url
        string video_url
        string audio_url
        datetime created_at
        float latitude
        float longitude
    }

    comments {
        int id
        int observation_id
        string username
        string content
        datetime created_at
    }


```


---

## 로컬 실행

### 1) 요구사항
- Python 3.10+
- MySQL 8.x
- Node.js 18+ (프론트 확인 시)

### 2) 환경 변수
루트에 `.env` 생성:

```env
DB_URL=mysql+pymysql://USER:PASSWORD@localhost:3306/wildlife?charset=utf8mb4
OPENWEATHER_API_KEY=YOUR_OPENWEATHERMAP_KEY
KAKAO_JS_KEY=YOUR_KAKAO_MAP_JS_KEY
CORS_ORIGINS=http://localhost:5173,http://localhost:3000
```

### 3) 백엔드 실행

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt  # 또는: pip install fastapi uvicorn sqlalchemy PyMySQL python-dotenv
uvicorn main:app --reload  # 실제 엔트리포인트 모듈명:app
```

### 4) 프론트(예시: Vite)

```bash
npm i
npm run dev
```

---

## 폴더 구조

```
.
├── client/                         # 프론트엔드(React/Vite 등)
│
├── server/                         # 백엔드(FastAPI) 루트
│   ├── main.py                     # FastAPI 엔트리포인트 (app, 라우터 include, CORS 등)
│   ├── db.py                       # DB 연결/세션, Base 선언, 환경변수 로딩
│   │
│   ├── models/                     # SQLAlchemy 모델 레이어(테이블)
│   │   ├── comment.py              # 댓글(Comment) 모델
│   │   └── observation.py          # 관찰(Observation) 모델
│   │
│   ├── routers/                    # 라우팅(엔드포인트) 모듈
│   │   ├── comment_router.py       # /api/observations/{id}/comments 등 댓글 API
│   │   └── observation_router.py   # /api/observations CRUD, 파일 업로드, 조회 등
│   │
│   ├── schemas/                    # Pydantic 스키마(입출력 검증)
│   │   ├── comment_schema.py       # 댓글 요청/응답 스키마
│   │   └── observation_schema.py   # 관찰/미디어/날씨 응답 스키마
│   │
│   └── uploads/                    # 런타임 업로드 저장 경로(서비스용)
│       ├── audio/                  # 업로드 오디오
│       ├── img/                    # 업로드 이미지
│       └── mp4/                    # 업로드 비디오
│
├── Makefile                        # 자주 쓰는 명령(서버 실행, 포맷팅 등) 스크립트화(선택)
├── requirements.txt                # 백엔드 의존성(패키지) 목록
├── readme.md                       # (저장소 설명) README
├── .env                            # 환경변수(로컬) — 커밋 금지
├── .gitignore                      # venv, __pycache__, .env, uploads 등 제외
├── venv/                           # 가상환경 — 커밋 금지
└── assets/                         # (README 전용) 스크린샷 폴더
    ├── main.png
    ├── upload.png
    ├── location.png
    └── detail.png
```

---
