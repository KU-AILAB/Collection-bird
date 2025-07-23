// src/pages/MainPage/MainPage.jsx
import React, { useState, useEffect } from "react";
import Header from "../../layout/Header/Header";
import SearchInput from "./Sections/SearchInput";
import CardItem from "./Sections/card";
import SearhFilterModal from "./Sections/SearchFilterModal";
import "./mainPage.css";

const MainPage = () => {
  const [searchFilerModal, setSearchFilerModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [observations, setObservations] = useState([]);

  useEffect(() => {
    const fetchObservations = async () => {
      try {
        const res = await fetch("http://222.116.135.70:6500/observations");
        if (!res.ok) throw new Error("관찰 데이터 조회 실패");
        const data = await res.json();
        // 최신 글 순으로 정렬 (id 내림차순)
        data.sort((a, b) => b.id - a.id);
        setObservations(data);
      } catch (error) {
        console.error("에러:", error);
      }
    };
    fetchObservations();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    console.log("검색어:", e.target.value);
  };

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
          <div className="search_input">
            <SearchInput onSearch={handleSearch} searchTerm={searchTerm} />
          </div>
          <div className="search_info">
            자연관찰 | {observations.length}
          </div>
        </div>
        <div className="post">
          {observations.map((obs) => (
            <CardItem key={obs.id} observation={obs} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
