// src/App.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import MainPage from "./pages/MainPage/Main";
import Header from "./layout/Header/Header";
import UploadPage from "./pages/Upload/UploadPage";
import DetailPostPage from "./pages/DetailPost/DetailPostPage";

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main style={{ paddingTop: "11vh" }}>{children}</main>
    </div>
  );
}

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<UploadPage />} />
        {/* 상세 페이지: URL 파라미터 id를 통해 생성된 관찰 데이터를 조회 */}
        <Route path="/detail/:id" element={<DetailPostPage />} />
      </Routes>
    </Layout>
  );
};

export default App;
