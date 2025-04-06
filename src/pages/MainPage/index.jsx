import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
import Header from "../../layout/Header/Header";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/CardItem";
import SearhFilterModal from "./Sections/SearchFilterModal";
import "./../../style/main.css";
import "./../../style/CardItem.css"

const MainPage = () => {
    
    const [searchFilerModal, setSearchFilerModal] = useState(false);

    // const [posts, setPosts] = useState([1, 2, 3, 4, 5, 6]);

    return (
      <div className="main_background">
        <Header />

        <div className="Main">
            <div className="search">
            <div
                className={`search_filter ${searchFilerModal ? "active" : ""}`}
                onClick={() => setSearchFilerModal(true)}
                >
                search filter
                </div>

                {searchFilerModal && (
                <SearhFilterModal onClose={() => setSearchFilerModal(false)} />
                )}

                <div className="search_"><SearchInput /></div>
                <div className="search_">자연관찰 | 1,000</div>
                <div className="search_btn">1</div>
                <div className="search_btn">2</div>
            </div>
            <div className="post">
                <CardItem />
                <CardItem />
                <CardItem />
                <CardItem />
                {/* {posts.map((post, idx) => (
                    <CardItem key={idx} />
                ))} */}
            </div>
        </div>
      </div>
    );
};
  
export default MainPage;