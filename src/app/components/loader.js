"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import SplitType from "split-type";

const Loading = () => {
  useEffect(() => {
    // Split text using SplitType
    const loadingText = new SplitType(".loading-text.initial", { types: "chars" });
    const completeText = new SplitType(".loading-text.complete", { types: "chars" });
    const titleText = new SplitType(".content h1", { types: "chars" });
    const paragraphText = new SplitType(".content p", { types: "chars" });

    // Initial states
    gsap.set(".loading-text.complete", { y: "100%", opacity: 0 });
    gsap.set(loadingText.chars, { opacity: 0, y: 100 });
    gsap.set(completeText.chars, { opacity: 0, y: 100 });

    // Animate in loading text
    gsap.to(loadingText.chars, {
      opacity: 1,
      y: 0,
      duration: 0.3,
      stagger: 0.05,
      ease: "power2.out",
    });

    const colorStages = [
      { bg: "#E0D9C6", text: "#000000" },
      { bg: "#FDFDFD", text: "rgb(60, 66, 55)" },
      { bg: "#3758F9", text: "#000000" },
      { bg: "#000000", text: "#ffffff" },
    ];

    function updateColors(progress) {
      const stage = Math.floor(progress / 25);
      if (stage < colorStages.length) {
        const preloader = document.querySelector(".preloader");
        const progressBar = document.querySelector(".progress-bar");
        const textElements = document.querySelectorAll(".loading-text .char, .percentage");

        if (preloader) preloader.style.backgroundColor = colorStages[stage].bg;
        if (progressBar) progressBar.style.backgroundColor = colorStages[stage].text;
        textElements.forEach((el) => {
          el.style.color = colorStages[stage].text;
        });
      }
    }

    const tl = gsap.timeline();

    tl.to(".progress-bar", {
      width: "100%",
      duration: 1.5, // shortened duration for the progress bar animation
      ease: "power1.inOut",
      onUpdate: function () {
        const progress = Math.round(this.progress() * 100);
        const percentageElement = document.querySelector(".percentage");
        if (percentageElement) {
          percentageElement.textContent = `${progress}`;
        }
        updateColors(progress);
      },
    })
      .to(".loading-text.initial", {
        y: "-100%",
        duration: 0.3, // shortened duration for initial loading text
        ease: "power2.inOut",
      })
      .to(
        ".loading-text.complete",
        {
          y: "0%",
          opacity: 1,
          duration: 0.3, // shortened duration for complete loading text
          ease: "power2.inOut",
        },
        "<"
      )
      .to(
        completeText.chars,
        {
          opacity: 1,
          y: 0,
          duration: 0.2, // shortened duration for complete text chars
          stagger: 0.02,
          ease: "power2.out",
        },
        "<0.1"
      )
      .to(
        ".preloader",
        {
          y: "-100vh",
          duration: 0.5, // shortened duration for preloader removal
          ease: "power2.inOut",
          delay: 0.5, // small delay before preloader removal
        }
      )
      .set(
        ".content",
        {
          visibility: "visible",
        },
        "-=0.5"
      )
      .to(
        [titleText.chars, paragraphText.chars],
        {
          opacity: 1,
          y: 0,
          duration: 0.7, // adjusted for fast intro of content text
          stagger: 0.01,
          ease: "power4.out",
        },
        "-=0.3"
      )
      .set(".preloader", {
        display: "none",
      });
  }, []);

  return (
    <div>
      {/* Preloader Section */}
      <div className="preloader fixed top-0 left-0 w-full h-screen bg-gray-800 flex justify-center items-center flex-col z-[1000]">
        <div className="progress-container w-72 h-0.5 bg-white bg-opacity-10 mb-5 relative z-2">
          <div className="progress-bar absolute top-0 left-0 h-full w-0 bg-white"></div>
        </div>
        <div className="text-container h-12 relative overflow-hidden mb-5 w-48">
          <div className="loading-text complete absolute w-full text-center text-white text-sm uppercase tracking-tight opacity-0">
          Visa Journey Begins!
          </div>
        </div>
        <div className="percentage fixed bottom-8 right-8 text-white font-bold text-9xl opacity-10">0</div>
      </div>
    </div>
  );
};

export default Loading;
