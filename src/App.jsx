import React from "react";
import { Route, Routes } from "react-router-dom";
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
      <main>{children}</main> {/* 여기에 children을 추가해야 페이지 내용이 보임 */}
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



// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import MainPage from './pages/MainPage'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vite.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
