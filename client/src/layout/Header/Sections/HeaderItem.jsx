import React from "react";
import { Link } from "react-router-dom";
import styles from "./HeaderItem.module.css";
import logo from "/src/assets/logo.png";
import { GoBell } from "react-icons/go";
import { useTranslation } from "react-i18next";

const HeaderItem = () => {
  const { t, i18n } = useTranslation();

  return (
    <div style={{ display: "flex", alignItems: "center", backgroundColor: "#0e1b0f", height: "130px" }}>
      
      <Link to="/" className={styles.logoArea} style={{ textDecoration: "none" }}>
        <img src={logo} alt="로고" className={styles.logoImg} />
        <div className={styles.logoText}>
          <div style={{ fontWeight: "bold", fontSize: "22px", color: "white" }}>
            {t("header.AI융합연구센터")}
          </div>
          <div style={{ color: "#aaa", fontSize: "15px" }}>
            {t("header.야생동물 데이터 수집")}
          </div>
        </div>
      </Link>

      <nav className={styles.headerNav}>
        <Link to="/" className={styles.navItem}>{t("header.관찰하기")}</Link>
        <Link to="/" className={styles.navItem}>{t("header.참여하기")}</Link>
        <Link to="/" className={styles.navItem}>{t("header.소통하기")}</Link>
        <Link to="/" className={styles.navItem}>{t("header.통계보기")}</Link>
      </nav>

      <div className={styles.rightArea}>
        {/* 한/영 변환 */}
        <div className="flex border border-gray-300 rounded overflow-hidden">
          <div
            onClick={() => i18n.changeLanguage("ko")}
            className={`px-3 py-1 cursor-pointer ${
              i18n.language === "ko" ? "bg-[#6C8372] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            Ko
          </div>
          <div
            onClick={() => i18n.changeLanguage("en")}
            className={`px-3 py-1 cursor-pointer ${
              i18n.language === "en" ? "bg-[#6C8372] text-white" : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            En
          </div>
        </div>
        <Link to="/mypage">
          <img src="https://placehold.co/32x32" alt="profile" className={styles.profileImg} />
        </Link>
        <Link to="/mypage" style={{ color: "white", fontSize: "14px", fontWeight: "500" }}>{t("header.mypage")}</Link>
        <GoBell color="white" size={20} />
      </div>
    </div>
  );
};

export default HeaderItem;
