import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "react-i18next";
// import i18n from "./../../locales/i18n";


const UploadPage = () => {
    const navigate = useNavigate();

    const { t, i18n } = useTranslation();
    const changelangeuageToKo = () => i18n.changeLanguage("ko");
    const changelangeuageToEn = () => i18n.changeLanguage("en");

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

    const navigateToMain = () => {
        navigate("/")
    }

    const navigateToPost = () => {
        navigate("/details")
    }

    const UploadBox = () => {
        return (
            <div>
                <label
                    className="w-[250px] h-[250px] border-2 text-[#E3EBE7] text-center flex flex-col justify-center items-center text-xs cursor-pointer mx-auto rounded"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                >
                    <input type="file" className="hidden" style={{display: "none"}} onChange={handleChangeFile}/>
                    <div className="dropZoneContent">
                        <p className="text-[#E3EBE7] text-[70px]">+</p>
                        <p className="text-[#758C80]">{t("upload.drag and drop files here")}</p>
                        <p className="text-[#758C80]">{t("upload.or click the + button")}</p>
                    </div>
                </label>

                <div>
                {previewImg && (
                        <img src={previewImg} alt="미리보기" className="w-[150px] h-[150px] mx-auto mt-4" />
                    )}
                </div>
            </div>
            
        );
    };

    const [selectedDate, setSelectedDate] = useState(new Date());

   
    return(
        <div className="w-full min-h-screen flex flex-col items-center bg-white">
            <div className="w-[41%] p-4 flex flex-col gap-6">

                <div className="w-full flex items-center space-x-4 mt-7">
                    <div className="text-[#00240A] font-bold text-[20px]">{t("upload.creature name")}</div>
                    <div
                        className="w-[300px] px-4 py-2 border border-[#758C80] cursor-pointer text-sm rounded-md"
                        onClick={() => {
                        if (selectedSpecies) {
                            setIsEditingSpecies(true); // 이미 선택한 후 수정하는 경우
                            setSpeciesNameModelOpen(true);
                        } else {
                            setIsEditingSpecies(false); // 첫 선택인 경우
                            openFirstModal();
                        }
                    }}>
                        {selectedSpecies ? selectedSpecies.name : t("upload.select_species_name")}
                    </div>
                    <div
                        className="w-[300px] px-4 py-2 border border-[#758C80] cursor-pointer text-sm rounded-md"
                        onClick={() => setHabitatModalOpen(true)}
                    >
                        {selectedHabitat ? selectedHabitat : t("upload.select_habitat_type")}
                    </div>
                    <button onClick={changelangeuageToKo}>Korean</button>
                    <button onClick={changelangeuageToEn}>English</button>
                </div>
                
                {/* 구분선 */}
                <div className="border-t border-[#758C80] pt-6 mt-6"></div>


                {/* 첫 번째 모달 - 생물 분류 선택 */}
                {speciesSelectModelOpen && (
                    <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={closeFirstModal} // 👉 배경 클릭 시 닫기
                    >
                        <div
                        className="bg-white rounded-lg p-6 shadow-lg w-[400px] text-center"
                        onClick={(e) => e.stopPropagation()} // 👉 모달 내부 클릭은 무시
                        >
                            <h3 className="text-lg font-semibold mb-4">{t("upload.select_biological_classification")}</h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                <button onClick={() => openSecondModal("조류")} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.avian")}</button>
                                <button onClick={() => openSecondModal("포유류")} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.mammalia")}</button>
                                <button onClick={() => openSecondModal("어류")} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.pisces")}</button>
                                <button onClick={() => openSecondModal("곤충")} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.insect")}</button>
                                <button onClick={() => openSecondModal("파충류")} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.reptiles")}</button>
                                <button onClick={() => openSecondModal("양서류")} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.amphibia")}</button>
                                <button onClick={() => openSecondModal("거미류")} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.arachnid")}</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* 두 번째 모달 */}
                {speciesNameModelOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setSpeciesNameModelOpen(false)}
                    >
                        <div
                        className="bg-white rounded-lg p-6 shadow-lg w-[320px] text-center relative"
                        onClick={(e) => e.stopPropagation()}
                        >
                        <button
                            className="absolute top-1 left-1 text-gray-400 text-sm hover:bg-gray-100 hover:text-gray-800 px-2 py-1 rounded"
                            onClick={() => {
                                setSpeciesNameModelOpen(false);
                                setSpeciesSelectModelOpen(true);
                            }}
                        >
                            {"< 생물 분류 선택"}
                        </button>

                        <h3 className="text-lg font-semibold mt-6 mb-4">{selectedCategory} 입력</h3>
                        <input
                            type="text"
                            placeholder={`${selectedCategory} 이름을 입력하세요`}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded mb-4"
                        />
                        <button
                            onClick={closeSecondModal}
                            className="bg-[#6C8372] text-white font-medium py-2 px-6 rounded hover:bg-[#5a7464]"
                        >
                            확인
                        </button>
                        </div>
                    </div>
                )}

                {/* 서식지 유형 선택 모달 */}
                {habitatModalOpen && (
                    <div
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                        onClick={() => setHabitatModalOpen(false)}
                    >
                        <div
                        className="bg-white rounded-lg p-6 shadow-lg w-[300px] text-center"
                        onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-semibold mb-4">{t("upload.select_habitat_type")}</h3>
                            <div className="flex flex-wrap justify-center gap-3">
                                <button onClick={() => { setSelectedHabitat("산림/계곡"); setHabitatModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.forest/valley")}</button>
                                <button onClick={() => { setSelectedHabitat("평지숲"); setHabitatModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.flat forest")}</button>
                                <button onClick={() => { setSelectedHabitat("경작지/들판"); setHabitatModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.plow/field")}</button>
                                <button onClick={() => { setSelectedHabitat("동굴"); setHabitatModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.cave")}</button>
                                <button onClick={() => { setSelectedHabitat("해양"); setHabitatModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.marine")}</button>
                                <button onClick={() => { setSelectedHabitat("하천/호수"); setHabitatModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.river/lake")}</button>
                                <button onClick={() => { setSelectedHabitat("습지"); setHabitatModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.marsh")}</button>
                                <button onClick={() => { setSelectedHabitat("거주지역"); setHabitatModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.residential district")}</button>
                                <button onClick={() => { setSelectedHabitat("인공시설"); setHabitatModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.artificial facility")}</button>
                                <button onClick={() => { setSelectedHabitat("기타"); setHabitatModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">{t("upload.etc")}</button>
                            </div>
                        </div>
                    </div>
                )}
        

                <div className="data">
                    <div className="text-[#00240A] font-bold text-left text-[20px]">{t("upload.register photos, videos, and sounds")}</div>

                    <div className="flex gap-10 text-xs mb-4 mt-3">
                        <div className="flex-1 bg-[#E3EBE7] text-[15px] text-center cursor-pointer rounded py-3 hover:bg-[#5a7464]">📷 {t("upload.photos")}</div>
                        <div className="flex-1 bg-[#E3EBE7] text-[15px] text-center cursor-pointer rounded py-3 hover:bg-[#5a7464]">📷 {t("upload.videos")}</div>
                        <div className="flex-1 bg-[#E3EBE7] text-[15px] text-center cursor-pointer rounded py-3 hover:bg-[#5a7464]">🔊 {t("upload.sounds")}</div>
                    </div>
                    <div className="flex gap-10 w-full mt-12">
                        <div className="flex-1">
                            <UploadBox />
                        </div>
                        <div className="flex-1 flex flex-col gap-6 px-2">
                            <div className="flex flex-col gap-2 text-md text-[#00240A] font-bord">
                                <div className="text-[#00240A] font-bold text-left text-[18px]">{t("upload.observation time")}</div>
                                <div className="flex gap-2">
                                    <DatePicker
                                        selected={selectedDate}
                                        onChange={(date) => setSelectedDate(date)}
                                        dateFormat="yyy-MM-dd"
                                        className="p-2 border border-gray-300 bg-gray-100 rounded text-center w-full"
                                    />
                                    <select className="p-2 border border-gray-300 bg-gray-100 rounded">
                                        {Array.from({ length: 24 }, (_, i) => (
                                            <option key={i} value={i}>
                                                {i} 시
                                            </option>
                                        ))}
                                    </select>
                                    <select className="p-2 border border-gray-300 bg-gray-100 rounded">
                                        {Array.from({ length: 60 }, (_, i) => (
                                            <option key={i} value={i}>{i} 분</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {
                                locationModalOpen && (
                                    <div
                                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                                        onClick={() => setLocationModalOpen(false)}
                                    >
                                    <div
                                        className="bg-white rounded-lg p-6 shadow-lg w-[300px] text-center"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <h3 className="text-lg font-semibold mb-4">관찰 위치 선택</h3>
                                        <button onClick={() => { setSelectedLocation("서울"); setLocationModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">서울</button>
                                        <button onClick={() => { setSelectedLocation("대전"); setLocationModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">대전</button>
                                        <button onClick={() => { setSelectedLocation("부산"); setLocationModalOpen(false); }} className="bg-[#6C8372] text-white font-medium py-2 px-4 rounded hover:bg-[#5a7464]">부산</button>
                                    </div>
                                    </div>
                                )
                            }

                            <div className="flex flex-col text-[#00240A] font-bord gap-2 text-[15px] w-full">
                                <div className="text-[#00240A] font-bold text-left text-[18px]">{t("upload.observation location")}</div>
                                <div className="flex gap-2">
                                    <input
                                    type="text"
                                    placeholder={t("upload.please enter your observation location")}
                                    value={selectedLocation}
                                    readOnly
                                    onClick={() => setLocationModalOpen(true)}
                                    className="p-2 border border-gray-300 bg-gray-100 rounded"
                                    />
                                    <button
                                        className="px-4 py-2 border border-[#6C8372] text-[#6C8372] rounded text-sm"
                                        onClick={() => setLocationModalOpen(true)}
                                    >
                                    {t("upload.my location")}
                                    </button>
                                </div>
                                <div className="text-left">
                                    <input type="checkbox" id="privateLocation" />
                                    <label htmlFor="privateLocation" className="ml-2 text-sm">{t("upload.observation location private")}</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 구분선 */}
                <div className="border-t border-[#758C80] pt-6 mt-6"></div>


                <div className="w-full">
                    <div className="text-[#00240A] font-bold text-left text-[20px] mb-2">{t("upload.observation notes")}</div>
                    <textarea className="w-full border border-gray-300 p-3 rounded h-24 bg-gray-50" />
                </div>
                <div className="flex justify-center gap-4 mt-6">
                    <button className="px-6 py-2 bg-[#E3EBE7] text-[#758C80] rounded hover:bg-[#5a7464] hover:text-white" onClick={navigateToPost}>{t("upload.register")}</button>
                    <button className="px-6 py-2 bg-[#E3EBE7] text-[#758C80] rounded hover:bg-[#5a7464] hover:text-white" onClick={navigateToMain}>{t("upload.cancel")}</button>
                    {/* <button className="px-6 py-2 bg-[#E3EBE7] text-white rounded">관찰 올리기 추가</button> */}
                </div>
            </div>
        </div>
    );
};

export default UploadPage;