// import React, { useEffect, useState } from "react";
// import { assets, projectsData } from "../assets/assets";
// import { motion } from "framer-motion";

// const Projects = () => {
//   const [currentIndex, setcurrentIndex] = useState(0);
//   const [cardsToShow, setcardsToShow] = useState(1);

//   useEffect(() => {
//     const updateCardstoShow = () => {
//       if (window.innerWidth >= 1024) {
//         setcardsToShow(projectsData.length);
//       } else {
//         setcardsToShow(1);
//       }
//     };
//     updateCardstoShow();
//     window.addEventListener("resize", updateCardstoShow);
//     return () => window.removeEventListener("resize", updateCardstoShow);
//   }, []);

//   const nextproject = () => {
//     setcurrentIndex((prevIndex) => (prevIndex + 1) % projectsData.length);
//   };
//   const prevproject = () => {
//     setcurrentIndex((prevIndex) =>
//       prevIndex === 0 ? projectsData.length - 1 : prevIndex - 1
//     );
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, x: -200 }}
//       transition={{ duration: 1 }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once: true }}
//       className="container mx-auto py-4 pt-20 px-6 md:px-20 lg:px-32 my-20 w-full overflow-hidden"
//       id="Projects"
//     >
//       <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">
//         Projects{" "}
//         <span className="underline underline-offset-4 decoration-1 under font-light">
//           Completed
//         </span>
//       </h1>
//       <p className="text-gray-500 max-w-80 text-center mb-8 mx-auto">
//         Crafting Spaces, Building Legacies-explore Our Portfolio
//       </p>

//       {/* Slider Buttons  */}
//       <div className="flex justify-end items-center mb-8">
//         <button
//           onClick={prevproject}
//           className="p-3 bg-gray-200 rounded mr-2"
//           aria-label="Previous project"
//         >
//           <img src={assets.left_arrow} alt="Prev Arrow" />
//         </button>
//         <button
//           onClick={nextproject}
//           className="p-3 bg-gray-200 rounded mr-2"
//           aria-label="Next project"
//         >
//           <img src={assets.right_arrow} alt="Next Arrow" />
//         </button>
//       </div>

//       {/* Project Slider  */}
//       <div className="overflow-hidden">
//         <div
//           className="flex gap-8 transition-transform duration-500 ease-in-out"
//           style={{
//             transform: `translateX(-${(currentIndex * 100) / cardsToShow}%)`,
//           }}
//         >
//           {projectsData.map((project, index) => (
//             <div key={index} className="relative flex-shrink-0 w-full sm:w-1/4">
//               <img
//                 src={project.image}
//                 alt={project.title}
//                 className="w-full h-auto mb-14"
//               />
//               <div className="absolute left-0 right-0 bottom-5 flex justify-center">
//                 <div className="inline-block bg-white w-3/4 px-4 py-2 shadow-md">
//                   <h2 className="text-xl font-semibold text-gray-800">
//                     {project.title}
//                   </h2>
//                   <p className="text-gray-500 text-sm">
//                     {project.price} <span className="px-1">|</span>{" "}
//                     {project.location}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default Projects;

import React, { useEffect, useState, useRef } from "react";
import { assets, projectsData } from "../assets/assets";
import { motion } from "framer-motion";

const Projects = () => {
  const [currentIndex, setcurrentIndex] = useState(0);
  const [cardsToShow, setcardsToShow] = useState(1);
  const sliderRef = useRef(null);

  // State for smooth dragging logic
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0); // Yeh track karega ke mouse kitna drag hua

  useEffect(() => {
    const updateCardstoShow = () => {
      // For very small screens, ensure cardsToShow is at least 1
      if (window.innerWidth < 768) {
        setcardsToShow(1);
      } else if (window.innerWidth >= 1024) {
        // Adjust this number based on your design. Maybe you want to show 4 cards on large screens.
        setcardsToShow(4);
      } else {
        // For tablet sizes
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
    // Mouse click ke liye pageX aur touch ke liye touches[0].pageX
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
    setDragOffset(offset); // Drag ke dauraan slider ko live move karne ke liye offset set karein
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
      sliderRef.current.style.userSelect = "auto";
    }

    // Snap Logic: Decide karein ke slide change karni hai ya wapas apni jagah bhejna hai
    const cardWidth = sliderRef.current
      ? sliderRef.current.offsetWidth / cardsToShow
      : 0;
    const swipeThreshold = cardWidth / 4; // Agar card ki 25% width se zyada drag ho to slide change karein

    if (dragOffset < -swipeThreshold) {
      nextproject();
    } else if (dragOffset > swipeThreshold) {
      prevproject();
    }

    // Drag offset ko reset karein taake slider apni final position par smoothly settle ho jaye
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
          // Jab drag kar rahe hon to transition class hata dein taake movement instant ho
          className={`flex gap-8 ${
            !isDragging ? "transition-transform duration-300 ease-out" : ""
          }`}
          style={{
            // 'currentIndex' se base position set karein aur 'dragOffset' se live movement add karein
            transform: `translateX(calc(-${
              (currentIndex * 100) / projectsData.length
            }% + ${dragOffset}px))`,
            width: `${(projectsData.length / cardsToShow) * 100}%`, // Ensure the container is wide enough
            cursor: "grab",
          }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove} // Is handler ko add karna zaroori hai
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd} // Agar mouse bahar jaye to drag cancel ho jaye
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
