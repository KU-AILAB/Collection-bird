// src/pages/DetailPost/DetailPostPage.jsx
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./detailpost.css";

function DetailPostPage() {
  const { id } = useParams();
  const [observation, setObservation] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // 캐러셀 현재 인덱스
  const [lightboxOpen, setLightboxOpen] = useState(false); // 확대 모달
  const [mediaList, setMediaList] = useState([]); // 여러 미디어 (이미지/동영상)
  const [zoomScale, setZoomScale] = useState(1); // 확대/축소 scale

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://222.116.135.70:6500/observations/${id}`);
        if (!res.ok) throw new Error("데이터 조회 실패");
        const data = await res.json();
        setObservation(data);

        if (data.media_list) {
          setMediaList(data.media_list);
        } else {
          // 단일 image_url만 있을 경우 배열로 변환
          const arr = [];
          if (data.image_url) {
            arr.push({ type: "image", url: data.image_url });
          }
          if (data.video_url) {
            arr.push({ type: "video", url: data.video_url });
          }
          setMediaList(arr);
        }
      } catch (err) {
        console.error("에러:", err);
      }
    };
    if (id) fetchData();
  }, [id]);

  if (!observation) {
    return <div>로딩 중...</div>;
  }

  // 캐러셀 이전/다음
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? mediaList.length - 1 : prev - 1));
  };
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === mediaList.length - 1 ? 0 : prev + 1));
  };

  // Lightbox 열기/닫기 및 확대/축소
  const openLightbox = () => {
    setLightboxOpen(true);
    setZoomScale(1); // 초기화
  };
  const closeLightbox = () => setLightboxOpen(false);
  const handleZoomIn = () => setZoomScale((prev) => Math.min(prev + 0.2, 3));
  const handleZoomOut = () => setZoomScale((prev) => Math.max(prev - 0.2, 0.5));

  const currentMedia = mediaList[currentIndex];

  return (
    <div className="detail_background">
      <div className="header">
        <div className="header_L">
          <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
            <span>네이처링_클론</span>
          </Link>
        </div>
      </div>

      <div className="Detail_info">
        <div className="SpeciesTitle">
          {observation.species_name} ({observation.species_category})
        </div>

        <div className="detailContainer">
          <div className="detail_L">
            {mediaList.length > 0 ? (
              <div className="carousel_container">
                <div className="carousel_slide" onClick={openLightbox}>
                  {currentMedia.type === "image" && (
                    <img
                      src={`http://222.116.135.70:6500${currentMedia.url}`}
                      alt="관찰 이미지"
                    />
                  )}
                  {currentMedia.type === "video" && (
                    <video controls style={{ maxWidth: "100%" }}>
                      <source
                        src={`http://222.116.135.70:6500${currentMedia.url}`}
                        type="video/mp4"
                      />
                      동영상을 지원하지 않는 브라우저입니다.
                    </video>
                  )}
                </div>
                {mediaList.length > 1 && (
                  <>
                    <button className="carousel_arrow left" onClick={prevSlide}>
                      &lt;
                    </button>
                    <button className="carousel_arrow right" onClick={nextSlide}>
                      &gt;
                    </button>
                  </>
                )}
                <div className="carousel_indicator">
                  {mediaList.map((_, idx) => (
                    <span
                      key={idx}
                      className={`dot ${idx === currentIndex ? "active" : ""}`}
                      onClick={() => setCurrentIndex(idx)}
                    >
                      ●
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <div className="detail_image">이미지/동영상 없음</div>
            )}

            <div className="detail_userInfo">
              <div className="profileImage" />
              <div className="profileInfo">
                <div className="profileInfo_child">작성자(가정)</div>
                <div className="profileInfo_child">
                  {new Date(observation.created_at).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="detail_content">
              <p>{observation.memo || "메모 없음"}</p>
            </div>
          </div>

          <div className="detail_R">
            <div className="관찰정보">
              <div className="Detail_R_title">관찰정보</div>
              <div className="Detail_ovserve_child">
                위치: {observation.location || "정보 없음"}
              </div>
              <div className="Detail_ovserve_child">
                관찰 시각:{" "}
                {observation.observation_date
                  ? new Date(observation.observation_date).toLocaleString()
                  : "정보 없음"}
              </div>
            </div>

            <div className="Detail_R_section">
              <div className="Detail_R_title">생태정보</div>
              <p>예시 텍스트...</p>
            </div>

            <div className="Detail_R_section">
              <div className="Detail_R_title">유사관찰</div>
              <p>예시 텍스트...</p>
            </div>
          </div>
        </div>
      </div>

      {lightboxOpen && (
        <div className="lightbox_overlay" onClick={closeLightbox}>
          <div className="lightbox_container" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox_sidebar">
              <h2>{observation.species_name}</h2>
              <p>{observation.species_category}</p>
              <p>
                {observation.observation_date
                  ? new Date(observation.observation_date).toLocaleString()
                  : "정보 없음"}
              </p>
              <p>{observation.location}</p>
              <p>{observation.memo}</p>
            </div>
            <div className="lightbox_main">
              <div className="lightbox_toolbar">
                <button onClick={handleZoomIn}>+</button>
                <button onClick={handleZoomOut}>-</button>
                {mediaList.length > 1 && (
                  <>
                    <button onClick={prevSlide}>&lt;</button>
                    <button onClick={nextSlide}>&gt;</button>
                  </>
                )}
                <button className="lightbox_close" onClick={closeLightbox}>
                  ✕
                </button>
              </div>
              <div className="lightbox_media">
                {currentMedia.type === "image" && (
                  <img
                    src={`http://222.116.135.70:6500${currentMedia.url}`}
                    alt="확대 이미지"
                    style={{ transform: `scale(${zoomScale})` }}
                  />
                )}
                {currentMedia.type === "video" && (
                  <video controls style={{ transform: `scale(${zoomScale})`, maxWidth: "100%" }}>
                    <source
                      src={`http://222.116.135.70:6500${currentMedia.url}`}
                      type="video/mp4"
                    />
                    동영상을 지원하지 않는 브라우저입니다.
                  </video>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default DetailPostPage;
