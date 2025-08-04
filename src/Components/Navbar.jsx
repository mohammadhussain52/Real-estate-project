import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";

const Navbar = () => {
  const [showMobileMenu, setshowMobileMenu] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const headers = document.querySelector("#main-nav");

      if (window.scrollY > 100) {
        headers?.classList.add("sticky-active");
        headers?.classList.remove("sticky-soon");
      } else if (window.scrollY > 10) {
        headers?.classList.add("sticky-soon");
        headers?.classList.remove("sticky-active");
      } else {
        headers?.classList.remove("sticky-active");
        headers?.classList.remove("sticky-soon");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [setshowMobileMenu]);

  return (
    <div className="fixed top-0 left-0 w-full z-10" id="main-nav">
      <div className="container mx-auto flex justify-between items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
        <img src={assets.logo} alt="" />
        <ul className="hidden md:flex gap-7 text-white">
          <a
            onClick={() => setshowMobileMenu(false)}
            href="#Header"
            className="cursor-pointer hover:text-gray-400"
          >
            Home
          </a>
          <a
            onClick={() => setshowMobileMenu(false)}
            href="#About"
            className="cursor-pointer hover:text-gray-400"
          >
            About
          </a>
          <a
            onClick={() => setshowMobileMenu(false)}
            href="#Projects"
            className="cursor-pointer hover:text-gray-400"
          >
            Projects
          </a>
          <a
            onClick={() => setshowMobileMenu(false)}
            href="#Testimonials"
            className="cursor-pointer hover:text-gray-400"
          >
            Testimonials
          </a>
        </ul>
        <button className="hidden md:block bg-white px-8 py-2 rounded-full cursor-pointer">
          Sign up
        </button>
        <img
          onClick={() => setshowMobileMenu(true)}
          src={assets.menu_icon}
          className="md:hidden w-7 cursor-pointer"
          alt=""
        />
      </div>

      {/* -------Mobile-menu------ */}
      <div
        className={`md:hidden ${
          showMobileMenu ? "fixed w-full" : "h-0 w-0"
        }  right-0 top-0 bottom-0 overflow-hidden bg-white transition-all`}
      >
        <div className="flex justify-end p-6 cursor-pointer">
          <img
            onClick={() => setshowMobileMenu(false)}
            src={assets.cross_icon}
            className="w-6"
            alt=""
          />
        </div>
        <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
          <a
            onClick={() => setshowMobileMenu(false)}
            href="#Header"
            className="px-4 py-2 rounded-full inline-block"
          >
            Home
          </a>
          <a
            onClick={() => setshowMobileMenu(false)}
            href="#About"
            className="px-4 py-2 rounded-full inline-block"
          >
            About
          </a>
          <a
            onClick={() => setshowMobileMenu(false)}
            href="#Projects"
            className="px-4 py-2 rounded-full inline-block"
          >
            Projects
          </a>
          <a
            onClick={() => setshowMobileMenu(false)}
            href="#Testimonials"
            className="px-4 py-2 rounded-full inline-block"
          >
            Testimonials
          </a>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
