import React, { useState, useEffect } from "react";
import styles from "./page.module.css";
import Footer from "../../layout/Footer/footer";
import SocialCard from "./card";
import Button from "./Button";
import { IoSearch } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const MainPage = () => {
  const navigate = useNavigate();
  // 관찰 데이터를 저장할 상태
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const response = await axios.get("http://222.116.135.70:6500/observations");
        // 응답 데이터가 배열형식이고, created_at을 기준으로 내림차순 정렬
        const sortedData = response.data.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at)
        );
        setObservations(sortedData);
      } catch (error) {
        console.error("관찰 데이터 가져오기 오류:", error);
      }
    };
    fetchObservations();
  }, []);

  const handleClick = () => {
    navigate("/upload");
  };

  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.mainContainer}>
        <section id="top" className={styles.searchSection}>
          <div className={styles.searchContainer}>
            {/* 가로 정렬: 버튼들 + 검색창 + 기록버튼 */}
            <div className="flex justify-between w-full items-center gap-4">
              <div className="buttons flex gap-3">
                <Button label={t("main.전체")} />
                <Button label={t("main.식물")} />
                <Button label={t("main.동물")} />
                <Button label={t("main.곤충")} />
                <Button label={t("main.기타")} />
              </div>

              <div className={styles.searchBar1}>
                <span style={{ padding: "8px 6px 6px 14px" }}>
                  <IoSearch fontSize={18} color="#758C80" />
                </span>
                <input
                  type="text"
                  placeholder={t("main.생물 이름 입력_검색")}
                  className={styles.searchInput}
                />
              </div>

              <div
                className="min-w-[120px] h-[38px] flex items-center justify-center gap-2 px-[18px] bg-[#758C80] text-white rounded-md cursor-pointer"
                onClick={handleClick}
              >
                <CiEdit fontSize={24} />
                <span>{t("main.업로드")}</span>
              </div>
            </div>
          </div>

          <div
            style={{ maxWidth: "1200px", margin: "8px auto 0", display: "flex", justifyContent: "flex-start", paddingLeft: "20px" }}
          >
            <span style={{ fontSize: "14px", color: "#4B5563" /* Tailwind의 text-gray-600 */ }}>
              {t("main.관찰 수")} | {observations.length}
            </span>
          </div>
        </section>       

        {/* Observation Grid - 가로 4개씩 배치 */}
        <main className={styles.main}>
          <div className={styles.observationGrid}>
            {observations.map((obs) => (
              <SocialCard key={obs.id} observation={obs} />
            ))}
          </div>
        </main>
        {/* <Footer /> */}
      </div>

      {/* 위로 가기 버튼 */}
      {/* <a href="#top" className={styles.topButton}>
        <span style={{ fontSize: 16, fontWeight: 900 }}>▲</span>
      </a> */}
    </div>
  );
};

export default MainPage;
