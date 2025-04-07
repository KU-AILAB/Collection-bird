import React from "react";
import styles from "../../pages/MainPage/page.module.css";
import "./../../style/Header.css";
import { Link } from "react-router-dom";
import {IoIosCamera} from 'react-icons/io';

const Header = () => {


  return (
    <>
      {/* Header */}
      <header className={styles.header}>
            <div className={styles.headerContent}>
              <div className={styles.headerButtons}>
                <button className={styles.button}>Login</button>
                <button className={styles.button}>About</button>
                <button className={styles.button}>2024 Event List</button>
              </div>
            </div>
          </header>
    
          {/* Navigation */}
          <nav className={styles.nav}>
            <hr style={{height:'4px', background:'#DFDFDF', border:'none', margin:'12px 4px'}} />
            <div className={styles.navContent}>
              <div className={styles.navContainer}>
                <Link to="/" className={styles.logo}>NatureLog</Link>
              </div>
              {/* <button className={styles.uploadButton}>
                <IoIosCamera fontSize={24} /> Upload Observation
              </button> */}
              <Link to="/upload" className={styles.uploadButton}>
                <IoIosCamera fontSize={24} /> Upload Observation
              </Link>
            </div>
          </nav>
    </>
  )
}

export default Header;

//import React, { useState } from "react";
// import { Link } from "react-router-dom";

// const Header = () => {
//   return (
//     <div className="relative z-10 text-black bg-white w-screen border-b">
//       <div className="w-full">
//         <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
//           {/* Logo */}
//           <div className="flex items-center text-xl text-[rgb(80,81,255)] font-bold h-14">
//             <Link
//               to="/"
//               className="text-inherit no-underline visited:text-inherit"
//             >
//               네이처링
//             </Link>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;