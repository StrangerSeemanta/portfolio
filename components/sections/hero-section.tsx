import React from "react";
import TypeAnimationEffect from "../TypeAnimationEffect";
import { ParticleField } from "../particleField";
import GetInTouchBtn from "../uiHeroSection/GetInTouchBtn";
import ViewWorkBtn from "../uiHeroSection/ViewWorkBtn";
import Desc from "../uiHeroSection/Desc";
import ProfileImage from "../uiHeroSection/ProfileImage";
import SocialHeadsStatic from "../uiHeroSection/SocialHeadsStatic";
import SocialHeadsDynamic from "../uiHeroSection/SocialHeadsDynamic";

async function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-[100px]"
    >
      <ParticleField />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-8">
          <ProfileImage />
          {/* Name and Title */}
          <div className="space-y-3">
            <h1 className="text-5xl md:text-6xl font-bold">
              <span className="gradient-text">Shuvo Sarker</span>
            </h1>

            <TypeAnimationEffect />
          </div>

          {/* Description */}
          <Desc />
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {" "}
            <GetInTouchBtn />
            <ViewWorkBtn />
          </div>

          {/* Social Links */}
          <div className="flex flex-wrap justify-center items-center gap-6 py-8 ">
              <SocialHeadsStatic/>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center text-gray-400"
        >
          <span className="text-sm mb-2">Scroll Down</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div> */}
    </section>
  );
}
export default HeroSection;
