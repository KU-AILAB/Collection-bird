//import React, { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="relative z-10 text-black bg-white w-screen border-b">
      <div className="w-full">
        <div className="flex items-center justify-between mx-5 sm:mx-10 lg:mx-20">
          {/* Logo */}
          <div className="flex items-center text-xl text-[rgb(80,81,255)] font-bold h-14">
            <Link
              to="/"
              className="text-inherit no-underline visited:text-inherit"
            >
              네이처링
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;