import React from "react";
import { Route, Routes, Router } from "react-router-dom";
import './App.css';
import MainPage from './pages/MainPage';
import Header from "./layout/Header/Header";
import UploadPage from "./pages/UploadPage";
import DetailPostPage from "./pages/DetailPostPage";
import DetailPage from "./pages/DetailsPage";
import 'leaflet/dist/leaflet.css';

//import { WebSocketProvider } from "./context/WebSocketContext"

function Layout({ children }) {
  return (
    <div className="layout">
      {/* <Header /> */}
      <main style={{}}>{children}</main>
    </div>
  );
}

const App = () => {
  
  return (
    <Layout>
      <Header/>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/details" element={<DetailPage />} />
        <Route path="/upload" element={<UploadPage />} />
        <Route path="/post" element={<DetailPostPage />} />
      </Routes>
    </Layout>
  );
};

export default App;