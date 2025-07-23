// src/pages/Upload/UploadPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./UploadPage.css";

const UploadPage = () => {
  const navigate = useNavigate();

  // 생물 이름/분류 관련 상태
  const [speciesSelectModelOpen, setSpeciesSelectModelOpen] = useState(false);
  const [speciesNameModelOpen, setSpeciesNameModelOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState(null);

  // 서식지 유형 관련 상태
  const [habitatModalOpen, setHabitatModalOpen] = useState(false);
  const [selectedHabitat, setSelectedHabitat] = useState("");
  const [isEditingSpecies, setIsEditingSpecies] = useState(false);

  // 관찰 위치(미사용 시 ESLint 경고를 무시하기 위해 주석 or _ 처리)
  const [selectedLocation /* eslint-disable no-unused-vars */, setSelectedLocation] = useState("");

  // **미디어 타입**: "photoVideo" (사진/동영상), "audio"
  const [mediaType, setMediaType] = useState("photoVideo");

  // 사진/동영상 미리보기 및 파일 배열
  const [previewPhotoVideo, setPreviewPhotoVideo] = useState([]); // base64나 파일명, 동영상 썸네일 데이터 URL
  const [photoVideoFiles, setPhotoVideoFiles] = useState([]);     // 실제 파일들

  // 오디오 미리보기 및 파일 배열
  const [previewAudio, setPreviewAudio] = useState([]); 
  const [audioFiles, setAudioFiles] = useState([]);

  // 관찰 시각 상태
  const [selectedDate, setSelectedDate] = useState(new Date());

  // 모달 관련 함수들
  const openFirstModal = () => setSpeciesSelectModelOpen(true);
  const closeFirstModal = () => setSpeciesSelectModelOpen(false);

  const openSecondModal = (category) => {
    setSelectedCategory(category);
    setSpeciesSelectModelOpen(false);
    setSpeciesNameModelOpen(true);
  };
  const closeSecondModal = () => {
    if (inputValue.trim() !== "") {
      setSelectedSpecies({ category: selectedCategory, name: inputValue });
      setSpeciesNameModelOpen(false);
      if (!isEditingSpecies) {
        setHabitatModalOpen(true);
      }
      setInputValue("");
      setIsEditingSpecies(false);
    }
  };
  const closeHabitatModal = () => {
    setHabitatModalOpen(false);
  };

  // 파일 처리: 사진/동영상(photoVideo), 오디오(audio)
  const handleFiles = (files, type) => {
    const fileArray = Array.from(files);
    if (type === "photoVideo") {
      fileArray.forEach((file) => {
        if (file.type.startsWith("image/")) {
          // 이미지 파일인 경우: base64 미리보기 생성
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewPhotoVideo((prev) => [...prev, reader.result]);
          };
          reader.readAsDataURL(file);
        } else if (file.type.startsWith("video/")) {
          // 동영상 파일인 경우: 동영상의 첫 프레임을 캡쳐하여 썸네일로 생성
          const videoUrl = URL.createObjectURL(file);
          const video = document.createElement("video");
          video.src = videoUrl;
          // 영상의 첫 프레임 캡쳐를 위해 currentTime 설정
          video.currentTime = 1;
          video.onloadeddata = () => {
            const canvas = document.createElement("canvas");
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");
            ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
            const thumbnail = canvas.toDataURL("image/png");
            // 썸네일을 미리보기 배열에 추가
            setPreviewPhotoVideo((prev) => [...prev, thumbnail]);
            URL.revokeObjectURL(videoUrl);
          };
        }
      });
      setPhotoVideoFiles((prev) => [...prev, ...fileArray]);
    } else {
      // 오디오 파일 처리
      fileArray.forEach((file) => {
        setPreviewAudio((prev) => [...prev, file.name]);
      });
      setAudioFiles((prev) => [...prev, ...fileArray]);
    }
  };

  // 드래그 앤 드롭
  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    handleFiles(files, mediaType);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
  };
  // 파일 선택
  const handleChangeFile = (event) => {
    const files = event.target.files;
    handleFiles(files, mediaType);
  };

  // POST 요청
  const handleSubmit = async () => {
    const memoValue = document.querySelector("textarea").value;
    const formData = new FormData();
    formData.append("species_category", selectedSpecies?.category || "");
    formData.append("species_name", selectedSpecies?.name || "");
    formData.append("habitat_type", selectedHabitat || "");
    const formattedDate = selectedDate.toISOString().slice(0, 19).replace("T", " ");
    formData.append("observation_date", formattedDate);
    formData.append("location", selectedLocation || "");
    formData.append("memo", memoValue || "");

    // 사진/동영상 파일 추가
    photoVideoFiles.forEach((file) => {
      formData.append("photoVideo", file);
    });
    // 오디오 파일 추가
    audioFiles.forEach((file) => {
      formData.append("audios", file);
    });

    try {
      const response = await fetch("http://222.116.135.70:6500/observations", {
        method: "POST",
        body: formData,
      });
      if (!response.ok) {
        throw new Error("관찰 데이터 업로드 실패");
      }
      const createdObservation = await response.json();
      console.log("생성된 관찰:", createdObservation);
      navigate(`/detail/${createdObservation.id}`);
    } catch (error) {
      console.error("업로드 에러:", error);
    }
  };

  // 미디어 타입 버튼: 사진/동영상, 오디오
  const MediaTypeButtons = () => (
    <div className="media_type_buttons">
      <button
        className={`media_type_button ${mediaType === "photoVideo" ? "active" : ""}`}
        onClick={() => setMediaType("photoVideo")}
      >
        📷 사진/동영상
      </button>
      <button
        className={`media_type_button ${mediaType === "audio" ? "active" : ""}`}
        onClick={() => setMediaType("audio")}
      >
        🎵 오디오
      </button>
    </div>
  );

  // 업로드 박스
  const UploadBox = () => (
    <div className="dropzone_container">
      <MediaTypeButtons />
      <label className="dropZone" onDrop={handleDrop} onDragOver={handleDragOver}>
        <input
          type="file"
          className="file"
          style={{ display: "none" }}
          multiple
          accept={mediaType === "photoVideo" ? "image/*,video/*" : "audio/*"}
          onChange={handleChangeFile}
        />
        <div className="dropZoneContent">
          <p>+</p>
          <p>여기에 {mediaType === "photoVideo" ? "사진/동영상" : "오디오"} 파일을 끌어놓거나 클릭하세요</p>
        </div>
      </label>
      {/* 미리보기 */}
      {mediaType === "photoVideo" && (
        <div className="previewMediaContainer">
          {previewPhotoVideo.map((item, idx) => {
            // item이 base64 문자열(이미지/동영상 썸네일)인지, 파일명인지 구분
            if (item.startsWith("data:image/")) {
              return (
                <img key={idx} src={item} alt={`미리보기-${idx}`} className="previewImage" />
              );
            }
            return (
              <div key={idx} className="previewFile">
                {item}
              </div>
            );
          })}
        </div>
      )}
      {mediaType === "audio" && (
        <div className="previewFilesContainer">
          {previewAudio.map((name, idx) => (
            <div key={idx} className="previewFile">{name}</div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="background">
      <div className="uploadInfo">
        <div className="name">
          <div className="uploadInfo_title">생물 이름</div>
          <div
            className="name_child"
            onClick={() => {
              if (selectedSpecies) {
                setIsEditingSpecies(true);
                setSpeciesNameModelOpen(true);
              } else {
                setIsEditingSpecies(false);
                openFirstModal();
              }
            }}
          >
            {selectedSpecies ? selectedSpecies.name : "생물 분류 / 생물 이름 선택"}
          </div>
          <div className="name_child" onClick={() => setHabitatModalOpen(true)}>
            {selectedHabitat ? selectedHabitat : "서식지 유형 선택"}
          </div>
        </div>

        {/* 분류 선택 모달 */}
        {speciesSelectModelOpen && (
          <div className="modal" onClick={closeFirstModal}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <h3>생물 분류 선택</h3>
              <button className="modalButton" onClick={() => openSecondModal("조류")}>조류</button>
              <button className="modalButton" onClick={() => openSecondModal("포유류")}>포유류</button>
              <button className="modalButton" onClick={() => openSecondModal("어류")}>어류</button>
              <button className="modalButton" onClick={closeFirstModal}>닫기</button>
            </div>
          </div>
        )}

        {/* 서식지 유형 모달 */}
        {habitatModalOpen && (
          <div className="modal" onClick={closeHabitatModal}>
            <div className="modalContent" onClick={(e) => e.stopPropagation()}>
              <h3>서식지 유형 선택</h3>
              <button className="modalButton" onClick={() => setSelectedHabitat("숲")}>숲</button>
              <button className="modalButton" onClick={() => setSelectedHabitat("강가")}>강가</button>
              <button className="modalButton" onClick={() => setSelectedHabitat("습지")}>습지</button>
              <button className="modalButton" onClick={() => setSelectedHabitat("도시")}>도시</button>
              <button className="modalButton" onClick={closeHabitatModal}>닫기</button>
            </div>
          </div>
        )}

        {/* 생물 이름 입력 모달 */}
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
              <button className="modalButton" onClick={closeSecondModal}>확인</button>
            </div>
          </div>
        )}

        {/* 사진/동영상, 오디오 업로드 */}
        <div className="data">
          <div className="data_upload"></div>
          <UploadBox />
        </div>

        {/* 관찰 시각 / 위치 */}
        <div className="data_observation">
          <div className="data_time">
            <label>관찰 시각</label>
            <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date)}
              dateFormat="yyyy-MM-dd"
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
          <div className="data_location">
            <label>관찰 위치</label>
            <input
              type="text"
              placeholder="관찰 위치를 입력하세요"
              value={selectedLocation}
              readOnly
              onClick={() => {}}
            />
            <div className="location_private">
              <input type="checkbox" id="privateLocation" />
              <label htmlFor="privateLocation">관찰 위치 비공개</label>
            </div>
          </div>
        </div>

        {/* 메모 */}
        <div className="memo" style={{ marginTop: "20px" }}>
          <div className="uploadInfo_title">관찰 메모</div>
          <textarea placeholder="메모를 입력하세요..." style={{ marginTop: "10px" }}></textarea>
        </div>

        {/* 버튼 */}
        <div className="uploadButton">
          <button className="btn-primary" onClick={handleSubmit}>게시</button>
          <button className="btn-cancel">취소</button>
          <button className="btn-add">관찰 올리기 추가</button>
        </div>
      </div>
    </div>
  );
};

export default UploadPage;
