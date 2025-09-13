import React from "react";
import CustomCursor from "@/components/custom-cursor";
import "@/components/styles/nocursor.css";
import { ParticleField } from "@/components/particleField";
import Desc from "@/components/uiHeroSection/Desc";
import { Navigation } from "@/components/navigation";
import "@/components/styles/nocursor.css";
import BorderLine from "@/components/BorderLine";
import Projects from "./Projects";
function page() {
  return (
    <>
      <CustomCursor />
      <Navigation />
      <section
        id="showcaseHero"
        className="overflow-x-hidden min-h-screen w-full flex flex-col items-center justify-start overflow-hidden relative py-20 px-4 sm:px-6 lg:px-8  pt-[100px]"
      >
        <ParticleField />

        <div className=" relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            {/* Name and Title */}
            <div className="space-y-3">
              <h1 className="text-5xl md:text-6xl font-bold">
                <span className="gradient-text">Showcase</span>
              </h1>
            </div>
            {/* Description */}
            <p className="md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Explore my portfolio of projects, showcasing my skills in
              full-stack development, web design, and modern technologies. Each
              project is a testament to my passion for creating innovative
              solutions and delivering exceptional user experiences.
            </p>{" "}
            <BorderLine />
          </div>
        </div>

        <div className="mt-10 max-w-6xl">
          {/* Projects Part */}
          <Projects />
        </div>
      </section>{" "}
    </>
  );
}

export default page;
