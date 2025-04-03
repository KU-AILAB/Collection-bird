import React from "react";
import "./detailpost.css";
import { Link, useNavigate } from "react-router-dom";

const DetailPostPage = () => {
    const navigate = useNavigate();

    return (
        <div className="detail_background">
            {/* 임시 헤더 작성 */}
            <div className="header">
                <div className="header_L">
                    <Link to="/">네이처링_클론</Link>
                </div>
                <div className="header_R">
                    <div className="header_R_Top"></div>
                    <div className="header_R_Bottom">
                        <button onClick={() => navigate('/upload')}>
                            관찰 올리기
                        </button>
                    </div>
                </div>
            </div>

            <div className="Detail_info">
                <div className="SpeciesTitle">title_물까치</div>

                <div className="detailContainer">
                    <div className="detail_L">
                        <div className="detail_image">image</div>
                        <div className="detail_userInfo">
                            <div className="profileImage"></div>
                            <div className="profileInfo">
                                <div className="profileInfo_child">하가형</div>
                                <div className="profileInfo_child">2025년 3월 25일 오후 5:00</div>
                            </div>
                        </div>
                        <div className="detail_content">메모 내용</div>
                    </div>
                    <div className="detail_R">
                        <div className="관찰정보">
                            <div className="Detail_R_title">관찰정보</div>
                            <div className="Detail_ovserve_child">
                                위치
                            </div>
                            <div className="Detail_ovserve_child">관찰 시각</div>
                        </div>
                        <div className="Detail_R_title">생태정보</div>
                        <div className="Detail_R_title">유사관찰</div>
                    </div>
                </div>
            </div>
        </div>
    );
};
  
export default DetailPostPage;


// import React from "react";
// import "./detailpost.css";
// import { Link, useNavigate } from "react-router-dom";

// const DetailPostPage = () => {
//     const navigate = useNavigate();

//     return (
//         <div className="page">
//             <header className="header">
//                 <Link to="/" className="logo">네이처링_클론</Link>
//                 <button onClick={() => navigate('/upload')}>관찰 올리기</button>
//             </header>

//             <main className="content">
//                 <h1 className="title">title_물까치</h1>

//                 <section className="detail">
//                     <div className="left">
//                         <div className="image">image</div>
//                         <div className="user">user info</div>
//                     </div>
//                     <div className="right">
//                         <div className="section">
//                             <h2>관찰정보</h2>
//                             <p>위치</p>
//                             <p>관찰 시각</p>
//                         </div>
//                         <div className="section"><h2>생태정보</h2></div>
//                         <div className="section"><h2>유사관찰</h2></div>
//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// };

// export default DetailPostPage;
