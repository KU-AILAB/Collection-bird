// src/pages/MainPage/Sections/CardItem.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./CardItem.css";

function CardItem({ observation }) {
  return (
    <div className="card_item">
      <Link to={`/detail/${observation.id}`} className="card_link">
        <div className="card_image">
          {observation.image_url ? (
            <img
              src={`http://localhost:4000${observation.image_url}`}
              alt="관찰이미지"
            />
          ) : (
            <div className="no_image">이미지 없음</div>
          )}
        </div>
        <div className="card_content">
          <div className="card_title">{observation.species_name}</div>
          <div className="card_location">{observation.location || "위치 없음"}</div>
          <div className="card_date">
            {new Date(observation.created_at).toLocaleString()}
          </div>
        </div>
      </Link>
    </div>
  );
}

export default CardItem;
