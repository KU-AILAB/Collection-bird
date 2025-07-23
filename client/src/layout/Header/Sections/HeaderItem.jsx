import React, { useState, useRef, useEffect } from "react"; // useRef, useEffect 훅 추가
import { Link } from "react-router-dom";
import styles from "./HeaderItem.module.css";
import logo from "/src/assets/logo.png";
import { RxHamburgerMenu } from "react-icons/rx";
import { useTranslation } from "react-i18next";

const HeaderItem = () => {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // 드롭다운 메뉴 DOM 요소에 접근하기 위한 ref 생성
  const dropdownRef = useRef(null);

  // 햄버거 메뉴 아이콘 클릭 시 호출될 함수
  const handleHamburgerClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // 외부 클릭을 감지하는 useEffect 훅
  useEffect(() => {
    const handleClickOutside = (event) => {
      // 드롭다운 메뉴가 열려 있고, 클릭된 요소가 드롭다운 메뉴 내부에 있지 않을 때
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // 드롭다운 닫기
      }
    };

    // document에 클릭 이벤트 리스너 추가
    if (isDropdownOpen) { // 드롭다운이 열렸을 때만 리스너 활성화
      document.addEventListener("mousedown", handleClickOutside);
    }

    // 컴포넌트 언마운트 시 또는 드롭다운이 닫힐 때 이벤트 리스너 제거
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]); // isDropdownOpen 상태가 변경될 때마다 이펙트 재실행

  return (
    <div style={{ display: "flex", alignItems: "center", backgroundColor: "#0e1b0f", height: "130px" }}>
      
      <Link to="/" className={styles.logoArea} style={{ textDecoration: "none" }}>
        <img src={logo} alt="로고" className={styles.logoImg} />
        <div className={styles.logoText}>
          <div className={styles.logoTitle}>
            {t("header.야생동물 데이터 수집")}
          </div>
          <div className={styles.logoSubtitle}>
            {t("header.AI융합연구센터")}
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
        
        <RxHamburgerMenu
          color="white"
          size={40}
          className={styles.hamburgerIcon}
          onClick={handleHamburgerClick}
        />

        {/* isDropdownOpen 상태가 true일 때만 드롭다운 메뉴 렌더링 */}
        {isDropdownOpen && (
          // dropdownRef를 드롭다운 메뉴 div에 연결
          <div className={styles.dropdownMenu} ref={dropdownRef}>
            <a href="http://222.116.135.71:9000/" target="_blank" rel="noopener noreferrer" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
              {t("CVAT 라벨링 툴")}
            </a>
            <Link to="/" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
              {t("비디오 클리핑 툴")}
            </Link>
            <Link to="/" className={styles.dropdownItem} onClick={() => setIsDropdownOpen(false)}>
              {t("트레킹 웹")}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeaderItem;