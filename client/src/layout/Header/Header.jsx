import React from "react";
<<<<<<< HEAD
import { Link, useNavigate } from "react-router-dom";
import "./../../style/Header.css"

const Header = () => {
  const navigate = useNavigate();

  const navigateToUpload = () => {
    navigate("/upload");
  };

  return (
    <div className="header">
            <div className="header_L">
                <Link to="/">네이처링_클론</Link>
            </div>
            <div className="header_R">
                <div className="header_R_Top"></div>
                <div className="header_R_Bottom">
                    <button onClick={navigateToUpload}>관찰 올리기</button>
                </div>
            </div>
        </div>
  );
};

export default Header;
=======
import HeaderItem from "./Sections/HeaderItem";

const Header = () => {
  return (
    <header>
      <HeaderItem />
    </header>
  );
};

export default Header;
>>>>>>> V1
