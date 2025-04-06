import React from "react";
import { Route, Routes, Router } from "react-router-dom";
import './App.css';
import MainPage from './pages/MainPage';
import Header from "./layout/Header/Header";
import UploadPage from "./pages/UploadPage";
import DetailPostPage from "./pages/DetailPostPage";

function Layout({ children }) {
  return (
    <div className="layout">
      <Header />
      <main style={{ paddingTop: "11vh" }}>{children}</main> {/* 헤더 높이만큼 여백 줌 */}
    </div>
  );
}

const App = () => {
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/post" element={<DetailPostPage />} />
      </Routes>
    </Layout>
  );
};

export default App;