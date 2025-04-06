from pydantic import BaseModel
from datetime import datetime

class ObservationBase(BaseModel):
    species_name: str
    species_category: str | None = None
    habitat_type: str | None = None
    observation_date: datetime | None = None
    location: str | None = None
    memo: str | None = None
    image_url: str | None = None

    # >>> 여기 추가 <<<
    video_url: str | None = None
    audio_url: str | None = None
    # ------------------

class ObservationCreate(ObservationBase):
    pass

class ObservationRead(ObservationBase):
    id: int
    created_at: datetime

    class Config:
        orm_mode = True
