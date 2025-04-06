import { FaRegBookmark, FaRegHeart } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";
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
        <div className="post-count">4</div>
        <div className="post-actions">
          <button className="action-btn">⊕</button>
          <button className="action-btn">↑</button>
        </div>
      </div>

      <div className="post-content">
        <div className="post-buttons">
          <div className="left-buttons">
            <div className="icon-btn">
              <FaRegHeart width={20} height={20} />
              <span>0</span>
            </div>
            <div className="icon-btn">
              <FaRegMessage width={20} height={20} />
              <span>0</span>
            </div>
            <div className="icon-btn">
              <FaRegBookmark width={20} height={20} />
              <span>0</span>
            </div>
          </div>
          <div className="icon-btn1">
            <FiShare2 width={20} height={20} />
          </div>
        </div>

        <div className="post-text">
          <h3>형매화</h3>
          <p>참이 살아서 봄이구 마음도</p>
        </div>

        <div className="author-info">
          <div className="author-avatar">김</div>
          <div>
            <p className="author-name">김영주</p>
            <p className="author-date">2023년 4월 5일 오후 2:25</p>
          </div>
        </div>
      </div>
    </div>
  );
}




// function ObservationCard({ image, title, location, author, date }) {
//     return (
//         <div className={styles.card}>
//           <div className={styles.cardImageContainer}>
//             <img src={image} alt={title} width={400} height={300} className={styles.cardImage} />
//             <div className={styles.imageCount}>4</div>
//             <div className={styles.imageActions}>
//               <button className={styles.imageActionButton}>
//                 <img src="https://cdn.create.vista.com/api/media/small/24868497/stock-photo-photographer" alt="Like" width={16} height={16} />
//               </button>
//               <button className={styles.imageActionButton}>
//                 <img src="/placeholder.svg?height=16&width=16" alt="Comment" width={16} height={16} />
//               </button>
//             </div>
//           </div>
//           <div className={styles.cardContent}>
//             <h3 className={styles.cardTitle}>{title}</h3>
//             <p className={styles.cardLocation}>{location}</p>
//             <div className={styles.cardAuthor}>
//               <div className={styles.authorAvatar}></div>
//               <div className={styles.authorInfo}>
//                 <div className={styles.authorName}>{author}</div>
//                 <div className={styles.authorDate}>{date}</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )
//   }