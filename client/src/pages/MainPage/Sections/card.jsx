// src/pages/MainPage/Sections/CardItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./card.css";

const CardItem = ({ observation }) => {
  return (
    <div className="card_item">
      <Link to={`/detail/${observation.id}`} className="card_link">
        <div className="card_image">
          {observation.image_url ? (
            // 이미지가 있는 경우 이미지 태그로 표시
            <img
              src={`http://222.116.135.70:6500${observation.image_url}`}
              alt="관찰이미지"
            />
          ) : observation.video_url ? (
            // 이미지가 없고 동영상이 있는 경우 동영상 태그를 썸네일처럼 표시
            <video
              src={`http://222.116.135.70:6500${observation.video_url}`}
              muted
              preload="metadata"
              playsInline
            />
          ) : (
            <div className="no_image">이미지 없음</div>
          )}
        </div>
        <div className="card_content">
          <div className="card_title">{observation.species_name}</div>
          <div className="card_location">
            {observation.location || "위치 없음"}
          </div>
          <div className="card_date">
            {new Date(observation.created_at).toLocaleString()}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CardItem;
