import React, { useEffect, useState, useRef } from "react";
import { assets, projectsData } from "../assets/assets";
import { motion } from "framer-motion";

const Projects = () => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const [cardsToShow, setcardsToShow] = useState(1);
  const sliderRef = useRef(null);

  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0); // Yeh track karega ke mouse kitna drag hua

  useEffect(() => {
    const updateCardstoShow = () => {
      if (window.innerWidth < 768) {
        setcardsToShow(1);
      } else if (window.innerWidth >= 1024) {
        setcardsToShow(4);
      } else {
        setcardsToShow(2);
      }
    };
    updateCardstoShow();
    window.addEventListener("resize", updateCardstoShow);
    return () => window.removeEventListener("resize", updateCardstoShow);
  }, []);

  const nextproject = () => {
    setcurrentIndex((prevIndex) =>
      prevIndex === projectsData.length - cardsToShow
        ? prevIndex
        : prevIndex + 1
    );
  };

  const prevproject = () => {
    setcurrentIndex((prevIndex) => (prevIndex === 0 ? 0 : prevIndex - 1));
  };

  // --- Drag Handler Functions ---

  const handleDragStart = (e) => {
    setIsDragging(true);
    setStartX(e.pageX || e.touches[0].pageX);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grabbing";
      sliderRef.current.style.userSelect = "none";
    }
  };

  const handleDragMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const currentX = e.pageX || e.touches[0].pageX;
    const offset = currentX - startX;
    setDragOffset(offset);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
      sliderRef.current.style.userSelect = "auto";
    }

    const cardWidth = sliderRef.current
      ? sliderRef.current.offsetWidth / cardsToShow
      : 0;
    const swipeThreshold = cardWidth / 4;

    if (dragOffset < -swipeThreshold) {
      nextproject();
    } else if (dragOffset > swipeThreshold) {
      prevproject();
    }

    setDragOffset(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -200 }}
      transition={{ duration: 1 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
      id="Projects"
    >
      <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
        Projects{" "}
        <span className="underline underline-offset-4 decoration-1 under font-light">
          Completed
        </span>
      </h1>
      <p className="text-gray-500 max-w-80 text-center mb-8 mx-auto">
        Crafting Spaces, Building Legacies-explore Our Portfolio
      </p>

      {/* Slider Buttons */}
      <div className="flex justify-end items-center mb-8">
        <button
          onClick={prevproject}
          className="p-3 bg-gray-200 rounded mr-2 disabled:opacity-50"
          aria-label="Previous project"
          disabled={currentIndex === 0}
        >
          <img src={assets.left_arrow} alt="Prev Arrow" />
        </button>
        <button
          onClick={nextproject}
          className="p-3 bg-gray-200 rounded mr-2 disabled:opacity-50"
          aria-label="Next project"
          disabled={currentIndex === projectsData.length - cardsToShow}
        >
          <img src={assets.right_arrow} alt="Next Arrow" />
        </button>
      </div>

      {/* Project Slider */}
      <div className="overflow-hidden">
        <div
          ref={sliderRef}
          className={`flex gap-8 ${
            !isDragging ? "transition-transform duration-300 ease-out" : ""
          }`}
          style={{
            transform: `translateX(calc(-${
              (currentIndex * 100) / projectsData.length
            }% + ${dragOffset}px))`,
            width: `${(projectsData.length / cardsToShow) * 100}%`,
            cursor: "grab",
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {projectsData.map((project, index) => (
            <div
              key={index}
              className="relative flex-shrink-0"
              style={{ width: `${100 / projectsData.length}%` }}
              onDragStart={(e) => e.preventDefault()}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-auto mb-14 object-cover"
              />
              <div className="absolute left-0 right-0 bottom-5 flex justify-center">
                <div className="inline-block bg-white w-3/4 px-4 py-2 shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {project.title}
                  </h2>
                  <p className="text-gray-500 text-sm">
                    {project.price} <span className="px-1">|</span>{" "}
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
