server
 ┣ db.py                # DB 연결 설정
 ┣ main.py              # FastAPI 엔트리 포인트
 ┣ models
 ┃ ┗ observation.py     # SQLAlchemy 모델 정의
 ┣ routers
 ┃ ┗ observation_router.py  # 라우팅(엔드포인트) 정의
 ┣ schemas
 ┃ ┗ observation_schema.py  # Pydantic 스키마(요청/응답)
 ┗ requirements.txt     # 필요한 라이브러리 명시
