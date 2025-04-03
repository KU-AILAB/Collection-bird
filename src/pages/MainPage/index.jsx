import React from "react";
import "./main.css";
import { Link, useNavigate } from "react-router-dom";

const MainPage = () => {
    const navigate = useNavigate();

    const navigateToUpload = () => {
        navigate("/upload")
    }
    return (
      <div className="background">
        <div className="header">
            <div className="header_L">
                <Link
                    to="/"
                >
                    네이처링_클론
                </Link>
            </div>
            <div className="header_R">
                <div className="header_R_Top"></div>
                <div className="header_R_Bottom">
                    <button onClick={navigateToUpload}>
                        관찰 올리기
                    </button>
                </div>
            </div>
        </div>

        <div className="Main">
            <div className="search">search</div>
            <div className="post">post</div>
        </div>
      </div>
    );
};
  
export default MainPage;