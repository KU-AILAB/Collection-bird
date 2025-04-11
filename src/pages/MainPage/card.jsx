import { useNavigate } from "react-router-dom";
import React from "react";
import "./card.css";

export default function SocialCard() {

  const navigate = useNavigate();

  const navigateToDetails = () => {
      navigate("/details")
  }

  return (
    <div className="post-card">
      <div className="post-image-container">
        <img
          src="https://cdn.create.vista.com/api/media/small/24868497/stock-photo-photographer"
          alt="Green plant leaf"
          width={100}
          height={"100px"}
          className="post-image cursor-pointer"
          onClick={navigateToDetails}
        />
        
      </div>

      <div className="post-content">
        <div className="post-text">
          <h3>불가사리</h3>
          <p>경북 칠곡군 동명면 금암리</p>
        </div>

        <div className="author-info">
            <p className="author-date">2025.05.11</p>
        </div>
      </div>
    </div>
  );
}