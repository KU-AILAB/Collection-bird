<<<<<<< HEAD
import React, { useRef, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../../redux/thunkFunctions";
import { FaUser } from "react-icons/fa";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoLogOutSharp } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";
import styles from "./HeaderItem.module.css";
import { toast } from "react-toastify";
import { GoBell } from "react-icons/go";
import { FaBell } from "react-icons/fa6";

const routes = [
  { to: "/signup", name: "회원가입", auth: false },
  { to: "/login", name: "로그인", auth: false },
  {
    to: "/product/upload",
    auth: true,
    uploadIcon: <CiCirclePlus style={{ fontSize: "2rem" }} />,
  },
  {
    to: "",
    auth: true,
    userIcon: null, // userIcon은 조건부로 렌더링
  },
  {
    to: "",
    auth: true,
    bellIcon: <GoBell style={{ fontSize: "1.7rem" }} />,
  },
];

const HeaderItem = ({ mobile }) => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  //const userData = useSelector((state) => state.user?.userData);
  const cart = useSelector((state) => state.user?.userData?.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const modalBackground = useRef(); // 모달창 이외의 배경 누르면 사라지게 하기 위함
  const [search, setSearch] = useState(false);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).then(() => {
        navigate("/login");
      });
      toast.info("로그아웃을 완료 했습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <ul
      className={`text-md leading-7 justify-center w-full flex gap-4 items-center
                  ${mobile && "flex-col bg-gray-900 h-full"} items-center`}
    >
      {routes.map(
        ({ to, name, auth, icon, searchIcon, uploadIcon, userIcon }, index) => {
          if (isAuth !== auth) return null;
          if (name === "로그아웃") {
            return (
              <li
                key={`logout-${index}`}
                className="py-2 text-center border-b-4 cursor-pointer"
              >
                <Link onClick={handleLogout}>{name}</Link>
              </li>
            );
          } else if (icon) {
            return (
              <li
                key={`icon-${index}`}
                className="relative py-2 text-center border-b-4 cursor-pointer"
              >
                <Link to={to}>
                  {icon}
                  <span className="absolute top-0 inline-flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -right-3">
                    {cart?.length}
                  </span>
                </Link>
              </li>
            );
          } else if (name) {
            return (
              <li
                key={`name-${index}`}
                className="py-2 text-center border-b-4 cursor-pointer"
              >
                <Link to={to}>{name}</Link>
              </li>
            );
          } else if (uploadIcon) {
            return (
              <li
                key={`uploadIcon-${index}`}
                className="relative py-2 text-center cursor-pointer w-10 rounded-full"
              >
                <Link to={to}>{uploadIcon}</Link>
              </li>
            );
          } else if (userIcon !== undefined) {
            return (
              <li
                key={`userIcon-${index}`}
                className="relative py-2 text-center cursor-pointer w-10 rounded-full"
              >
                {/* 조건부 렌더링: avatar가 있으면 이미지를, 없으면 기본 아이콘을 표시
                {userData?.avatar ? (
                  <img
                    src={`${process.env.REACT_APP_BASE_URL}/${userData.avatar}`}
                    alt="User Avatar"
                    className="w-8 h-8 rounded-full cursor-pointer"
                    onClick={() => setDropdownOpen((prev) => !prev)}
                  />
                ) : (
                  <HiOutlineUserCircle
                    style={{ fontSize: "2rem" }}
                    onClick={() => setDropdownOpen((prev) => !prev)}
                    className="cursor-pointer"
                  />
                )} */}
                {dropdownOpen && (
                  <div className={styles.DropdownMenu} ref={dropdownRef}>
                    <Link
                      to="/mypage"
                      className={styles.DropdownItem}
                      onClick={() => setDropdownOpen(false)}
                    >
                      <FaUser className={styles.DropdownItemIcon} />
                      MyPage
                    </Link>
                    <hr />
                    {/* <button
                      onClick={() => setAlert(true)}
                      className={styles.DropdownItem}
                    >
                      <FaBell className={styles.DropdownItemIcon} />
                      Alert
                    </button> */}
                    <hr />
                    <button
                      onClick={() => {
                        handleLogout();
                        setDropdownOpen(false); // 드롭다운 닫기
                      }}
                      className={styles.DropdownItem}
                    >
                      <IoLogOutSharp className={styles.DropdownItemIcon} />
                      Log out
                    </button>
                  </div>
                )}
              </li>
            );
          } else if (searchIcon) {
            return (
              <li
                key={`searchIcon-${index}`}
                className="relative py-2 text-center cursor-pointer mt-[7px]"
              >
                <div>
                  <button onClick={() => setSearch(true)}>{searchIcon}</button>
                </div>
                {search && (
                  <div
                    className="fixed inset-0"
                    ref={modalBackground}
                    onClick={(e) => {
                      if (e.target === modalBackground.current) {
                        setSearch(false);
                      }
                    }}
                  ></div>
                )}
              </li>
            );
          }
          return null;
        }
      )}
    </ul>
  );
};

export default HeaderItem;
=======
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
>>>>>>> V1
