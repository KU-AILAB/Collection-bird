# models/observation.py
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Text, DateTime
from sqlalchemy.sql import func

Base = declarative_base()

class Observation(Base):
    __tablename__ = "observations"

    id = Column(Integer, primary_key=True, index=True)
    species_category = Column(String(50), nullable=False)  # 예: '조류', '포유류', '어류'
    species_name = Column(String(100), nullable=False)
    habitat_type = Column(String(50), nullable=False)      # 예: '숲', '강가', '습지', '도시'
    observation_date = Column(DateTime, nullable=True)
    location = Column(String(100), nullable=True)
    memo = Column(Text, nullable=True)
    image_url = Column(String(255), nullable=True)
    video_url = Column(String(255), nullable=True)  # 새로 추가된 필드
    audio_url = Column(String(255), nullable=True) 
    created_at = Column(DateTime, server_default=func.now())
