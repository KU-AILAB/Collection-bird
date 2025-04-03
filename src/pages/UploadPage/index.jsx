import React, { useState } from "react";
import "./upload.css";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const UploadPage = () => {
    const navigate = useNavigate();

    // 생물 이름 div 모달창
    const [speciesSelectModelOpen, setSpeciesSelectModelOpen] = useState(false);
    const [speciesNameModelOpen, setSpeciesNameModelOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [inputValue, setInputValue] = useState("");
    const [selectedSpecies, setSelectedSpecies] = useState(null);
    // 서식지 유형 선택 모달창
    const [habitatModalOpen, setHabitatModalOpen] = useState(false);
    const [selectedHabitat, setSelectedHabitat] = useState("");
    const [isEditingSpecies, setIsEditingSpecies] = useState(false);
    // 관찰 위치(map) 선택 모달창
    const [locationModalOpen, setLocationModalOpen] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState("");


    // const [uploadData, setUploadData] = useState([]);
    const [previewImg, setPreviewImg] = useState(null);

    // (첫 번째 모달) 생물 분류/생물 이름 선택 중 - 분류
    const openFirstModal = () => setSpeciesSelectModelOpen(true);
    const closeFirstModal = () => setSpeciesSelectModelOpen(false);

    // (두 번째 모달) 생물 분류/생물 이름 선택 중 - 생물 이름 선택
    const openSecondModal = (category) => {
        setSelectedCategory(category);
        setSpeciesSelectModelOpen(false); // 첫 번째 모달 닫기
        setSpeciesNameModelOpen(true); // 두 번째 모달 열기
    };

    // 두 번째 모달 닫기 (사용자 입력값 반영)
    const closeSecondModal = () => {
        if (inputValue.trim() !=="") {
            setSelectedSpecies({ category: selectedCategory, name: inputValue });
            setSpeciesNameModelOpen(false);

            if (!isEditingSpecies) { // 처음 입력하는 경우에만 서식지 선택으로 이동
                setHabitatModalOpen(true);
            }

            setInputValue("");
            setIsEditingSpecies(false)
        }
    }

    // 이미지 업로드
    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result); // 이미지 미리보기 설정
            };
            reader.readAsDataURL(file);
        }
        // console.log(file);
        //드래그 앤 드롭한 파일 정보 출력
    };

    // 클릭해서 업로드
    const handleChangeFile = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImg(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const navigateToPost = () => {
        navigate("/post")
    }

    const UploadBox = () => {
        return (
            <div>
                <label className="dropZone" onDrop={handleDrop} onDragOver={handleDragOver}>
                    <input type="file" className="file" style={{display: "none"}} onChange={handleChangeFile}/>
                    <div className="dropZoneContent">
                        <p>+</p>
                        <p>여기에 파일을 끌어놓거나 + 버튼을 클릭하세요</p>
                    </div>
                </label>

                <div>
                {previewImg && (
                        <img src={previewImg} alt="미리보기" className="previewImage" />
                    )}
            </div>
            </div>
            
        );
    };

    const [selectedDate, setSelectedDate] = useState(new Date());

   
    return(
        <div className="background">
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

            <div className="uploadInfo">
                <div className="name">
                    <div className="uploadInfo_title">생물 이름</div>
                    <div className="name_child" onClick={() => {
                        if (selectedSpecies) {
                            setIsEditingSpecies(true); // 이미 선택한 후 수정하는 경우
                            setSpeciesNameModelOpen(true);
                        } else {
                            setIsEditingSpecies(false); // 첫 선택인 경우
                            openFirstModal();
                        }
                    }}>
                        {selectedSpecies ? selectedSpecies.name : "생물 분류 / 생물 이름 선택"}
                    </div>
                    <div className="name_child" onClick={() => setHabitatModalOpen(true)}>
                        {selectedHabitat ? selectedHabitat : "서식지 유형 선택"}
                    </div>
                </div>

                {/* 첫 번째 모달 */}
                {speciesSelectModelOpen && (
                    <div className="modal" onClick={closeFirstModal}>
                        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                            <h3>생물 분류 선택</h3>
                            <button onClick={() => openSecondModal("조류")}>조류</button>
                            <button onClick={() => openSecondModal("포유류")}>포유류</button>
                            <button onClick={() => openSecondModal("어류")}>어류</button>
                            <button onClick={closeFirstModal}>닫기</button>
                        </div>
                    </div>
                )}

                {habitatModalOpen && (
                    <div className="modal" onClick={() => setHabitatModalOpen(false)}>
                        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                            <h3>서식지 유형 선택</h3>
                            <button onClick={() => { setSelectedHabitat("숲"); setHabitatModalOpen(false); }}>숲</button>
                            <button onClick={() => { setSelectedHabitat("강가"); setHabitatModalOpen(false); }}>강가</button>
                            <button onClick={() => { setSelectedHabitat("습지"); setHabitatModalOpen(false); }}>습지</button>
                            <button onClick={() => { setSelectedHabitat("도시"); setHabitatModalOpen(false); }}>도시</button>
                            <button onClick={closeFirstModal}>닫기</button>
                        </div>
                    </div>
                )}

                {/* 두 번째 모달 */}
                {speciesNameModelOpen && (
                    <div className="modal" onClick={() => setSpeciesNameModelOpen(false)}>
                        <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                            <button
                                className="modal_back_button"
                                onClick={() => {
                                    setSpeciesNameModelOpen(false);
                                    setSpeciesSelectModelOpen(true);
                                }}
                            >
                                {"< 생물 분류 선택"}
                            </button>

                            <h3>{selectedCategory} 입력</h3>
                            <input
                                type="text"
                                placeholder={`${selectedCategory} 이름을 입력하세요`}
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                            />
                            <button onClick={closeSecondModal}>확인</button>
                        </div>
                    </div>
                )}  

                <div className="data">
                    <div className="uploadInfo_title">사진 / 동영상 / 소리</div>

                    <div className="data_upload">
                        <div className="data_image">📷 사진/동영상 등록</div>
                        <div className="data_sound">🔊 소리 등록</div>
                    </div>

                    <UploadBox />

                    <div className="data_observation">
                        <div className="data_time">
                            <label>관찰 시각</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                dateFormat="yyy-MM-dd"
                                className="datapicker_input"
                            />
                            <select>
                                {Array.from({ length: 24 }, (_, i) => (
                                    <option key={i} value={i}>
                                        {i} 시
                                    </option>
                                ))}
                            </select>
                        </div>

                        {
                            locationModalOpen && (
                                <div className="modal" onClick={() => setLocationModalOpen(false)}>
                                <div className="modalContent" onClick={(e) => e.stopPropagation()}>
                                    <h3>관찰 위치 선택</h3>
                                    <button onClick={() => { setSelectedLocation("서울"); setLocationModalOpen(false); }}>서울</button>
                                    <button onClick={() => { setSelectedLocation("대전"); setLocationModalOpen(false); }}>대전</button>
                                    <button onClick={() => { setSelectedLocation("부산"); setLocationModalOpen(false); }}>부산</button>
                                    <button onClick={() => setLocationModalOpen(false)}>닫기</button>
                                </div>
                                </div>
                            )
                        }

                        <div className="data_location">
                            <label>관찰 위치</label>
                            <input
                                type="text"
                                placeholder="관찰 위치를 입력하세요"
                                value={selectedLocation}
                                readOnly
                                onClick={() => setLocationModalOpen(true)}
                            />
                            <div className="location_private">
                                <input type="checkbox" id="privateLocation" />
                                <label htmlFor="privateLocation">관찰 위치 비공개</label>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="memo">
                    <div className="uploadInfo_title">관찰 메모</div>
                    <textarea></textarea>
                </div>
                <div className="uploadButton">
                    <button onClick={navigateToPost}>게시</button>
                    <button>취소</button>
                    <button>관찰 올리기 추가</button>
                </div>
            </div>
        </div>
    );
};

export default UploadPage;