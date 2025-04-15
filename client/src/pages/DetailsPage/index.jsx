// src/pages/DetailsPage/index.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Footer from "../../layout/Footer/footer";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import KakaoMap from "./KakaoMap";
import CommentSection from "./CommentSection";
import ElevationWeatherInfo from "./ElevationWeatherInfo"; // 고도/날씨 정보 컴포넌트
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { useTranslation } from "react-i18next";

// 커스텀 다음 화살표
function NextArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        right: "10px",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <IoIosArrowDroprightCircle size={36} color="#758C80" />
    </div>
  );
}

// 커스텀 이전 화살표
function PrevArrow(props) {
  const { onClick } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "10px",
        transform: "translateY(-50%)",
        zIndex: 2,
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <IoIosArrowDropleftCircle size={36} color="#758C80" />
    </div>
  );
}

// 날짜 포맷팅 함수 (오전/오후 포함)
function formatAMPM(date, lang = "ko") {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  const isPM = hours >= 12;

  // 12시간제 변환
  hours = hours % 12;
  hours = hours || 12; // 0일 경우 12로 표시

  const paddedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

  if (lang === "en") {
    const ampm = isPM ? "PM" : "AM";
    return `${hours}:${paddedMinutes} ${ampm}`;
  } else {
    const ampm = isPM ? "오후" : "오전";
    return `${ampm} ${hours}시${minutes !== 0 ? ` ${minutes}분` : ""}`;
  }
}

export default function DetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [observation, setObservation] = useState(null);

  const sliderSettings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  useEffect(() => {
    const fetchObservation = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/observations/${id}`);
        setObservation(response.data);
      } catch (error) {
        console.error("관찰 데이터 가져오기 오류:", error);
      }
    };
    fetchObservation();
  }, [id]);

  const handleUploadClick = () => {
    navigate("/");
  };

  const { t, i18n } = useTranslation();

  if (!observation) {
    return <div style={{ marginTop: "91px", padding: "20px" }}>Loading...</div>;
  }

  // 이미지 목록 (콤마 분리)
  const imageList = observation.image_url
    ? observation.image_url.split(",").map((url) => url.trim()).filter(Boolean)
    : [];
  // 영상 목록 (콤마 분리)
  const videoList = observation.video_url
    ? observation.video_url.split(",").map((url) => url.trim()).filter(Boolean)
    : [];
  // 미디어 목록 생성
  const mediaList = [
    ...videoList.map((url) => ({ type: "video", url })),
    ...imageList.map((url) => ({ type: "image", url })),
  ];

  // 날짜 포맷팅
  const obsDate = new Date(observation.observation_date);
  const formattedDate = isNaN(obsDate)
    ? t("detail.날짜 정보 없음")
    : t("detail.Date", {
        year: obsDate.getFullYear(),
        month: obsDate.toLocaleString(i18n.language, { month: "long" }),
        day: obsDate.getDate(),
        time: formatAMPM(obsDate, i18n.language),
      });
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "0 16px",
        backgroundColor: "#f6f6f6",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          padding: "24px",
        }}
      >
        {/* 상단: 뒤로가기 버튼 */}
        <div style={{ marginBottom: "24px" }}>
          <div
            style={{
              width: "120px",
              height: "38px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "0 16px",
              backgroundColor: "#758C80",
              color: "white",
              borderRadius: "6px",
              cursor: "pointer",
            }}
            onClick={handleUploadClick}
          >
            <IoIosArrowBack style={{ fontSize: 24 }} />
            <span>{t("detail.뒤로가기")}</span>
          </div>
        </div>

        {/* 메인 영역 */}
        <div style={{ display: "flex", gap: "35px", alignItems: "flex-start" }}>
          {/* 왼쪽: 미디어 슬라이더 */}
          <div style={{ flex: 2, maxWidth: "600px", borderRadius: "8px", overflow: "hidden" }}>
            {mediaList.length > 0 ? (
              <Slider {...sliderSettings} style={{ width: "100%", height: "100%" }}>
                {mediaList.map((media, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      overflow: "hidden",
                    }}
                  >
                    {media.type === "image" ? (
                      <img
                        src={media.url}
                        alt={`slide-${idx}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    ) : (
                      <video
                        src={media.url}
                        controls
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                    )}
                  </div>
                ))}
              </Slider>
            ) : (
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#eee",
                }}
              >
                <img
                  src="https://via.placeholder.com/500x300"
                  alt="No Media"
                  style={{ width: "100%", height: "100%", objectFit: "contain" }}
                />
              </div>
            )}
            <div style={{ marginTop: "32px" }}>
              <CommentSection observationId={observation.id} />
            </div>
          </div>


          {/* 오른쪽: 관찰정보, 지도, 버튼 영역 */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", textAlign: "left" }}>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", textAlign: "left", marginTop: "10px" }}>
              <h1 style={{ fontSize: "28px", marginBottom: "8px", fontWeight: "bold", color: "#00240A" }}>
                {observation.species_name || "이름 없음"}
              </h1>
            </div>
            {/* 관찰정보 섹션 */}
            <div style={{ marginBottom: "16px" }}>
              <hr style={{ marginBottom: "16px", border: "none", borderTop: "1px solid #758C80" }} />
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ display: "block", fontWeight: 750, marginBottom: "4px", color: "#254D31" }}>📍 {t("detail.위치")}</strong>
                <div className="ml-5">{observation.location || t("detail.위치정보 없음")}</div>
              </div>
              {/* 고도 & 날씨 */}
              <div style={{ marginBottom: "12px" }}>
                <ElevationWeatherInfo
                  lat={observation.latitude}
                  lon={observation.longitude}
                  address={observation.location}
                />
              </div>
              {/* 관찰시각 */}
              <div style={{ marginBottom: "12px" }}>
                <strong style={{ display: "block", fontWeight: 750, marginBottom: "4px", color: "#254D31" }}>⏰ {t("detail.관찰시각")}</strong>
                <div className="ml-5 color-[#254D31]">{formattedDate}</div>
                {/* {formattedDate} */}
              </div>
            </div>

            {/* 지도 영역 */}
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: "8px",
                overflow: "hidden",
                marginBottom: "16px",
              }}
            >
              <KakaoMap
                address={observation.location}
                lat={observation.latitude || 0}
                lon={observation.longitude || 0}
              />
            </div>

            {/* 버튼 영역 */}
            <div style={{ display: "flex", gap: "10px" }}>
              <a
                href={`https://ko.wikipedia.org/wiki/${observation.species_name}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  textAlign: "center",
                  border: "1px solid #758C80",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  color: "#758C80",
                  textDecoration: "none",
                }}
              >
                {t("detail.위키피디아 정보")}
              </a>
              <a
               // href={`https://species.nibr.go.kr/home/mainHome.do?cont_link=009&subMenu=009002&contCd=009002&pageMode=view&ktsn=${
                //  observation.species_name === "참새" ? "120000002157" : "기본값"
                // }`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  flex: 1,
                  textAlign: "center",
                  border: "1px solid #758C80",
                  padding: "8px 16px",
                  borderRadius: "4px",
                  color: "#758C80",
                  textDecoration: "none",
                }}
              >
                {t("detail.환경부 국립생물자원관 정보")}
              </a>
            </div>
          </div>
        </div>
        {/* <Footer /> */}
      </div>
    </div>
  );
}