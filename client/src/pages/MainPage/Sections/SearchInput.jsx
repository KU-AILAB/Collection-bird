import React from "react";
import { Link } from "react-router-dom";
import "./SearchInput.css";

const SearchInput = ({ onSearch, searchTerm }) => {
    return (
        <div>
            <input
                className="searchinput"
                type="text"
                placeholder="검색할 생물의 이름을 입력하세요"
                onChange={onSearch}
                value={searchTerm}
            />
        </div>
    );
};

export default SearchInput;