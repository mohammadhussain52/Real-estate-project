import React, { useEffect, useState } from "react";
import Header from "./Components/Header";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Testimonials from "./Components/Testimonials";
import Contact from "./Components/Contact";
import { ToastContainer } from "react-toastify";
import Footer from "./Components/Footer";
import { FaArrowUp } from "react-icons/fa";

const App = () => {
  const [showBtn, setShowBtn] = useState("myBtn none");
  window.onscroll = function () {
    scrollFunction();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      setShowBtn("myBtn");
    } else {
      setShowBtn("none");
    }
  }

  function topFunction() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className="w-full overflow-hidden">
      <ToastContainer />
      <Header />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
      <button
        onClick={topFunction}
        id="myBtn"
        className={showBtn}
        title="Go to Top"
      >
        <FaArrowUp />
      </button>
    </div>
  );
};

export default App;
