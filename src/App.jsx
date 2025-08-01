import React, { useEffect } from "react";
import Header from "./Components/Header";
import About from "./Components/About";
import Projects from "./Components/Projects";
import Testimonials from "./Components/Testimonials";
import Contact from "./Components/Contact";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./Components/Footer";

const App = () => {
  // useEffect(() => {
  //   const handleScroll = () => {
  //     const headers = document.querySelector("#Header");

  //     if (window.scrollY > 100) {
  //       headers?.classList.add("sticky-active");
  //       headers?.classList.remove("sticky-soon");
  //     } else if (window.scrollY > 10) {
  //       headers?.classList.add("sticky-soon");
  //       headers?.classList.remove("sticky-active");
  //     } else {
  //       headers?.classList.remove("sticky-active");
  //       headers?.classList.remove("sticky-soon");
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <div className="w-full overflow-hidden">
      <ToastContainer />
      <Header />
      <About />
      <Projects />
      <Testimonials />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
