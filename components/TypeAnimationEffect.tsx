"use client";
// This component is a type animation effect that cycles through various phrases related to web development and AI.
// It uses the `react-type-animation` library to create a smooth typing effect.
import React from "react";
import { TypeAnimation } from "react-type-animation";
function TypeAnimationEffect() {
  return (
    <div className="text-xl md:text-2xl text-gray-300 h-8">
      <TypeAnimation
        sequence={[
          "AI Agent Builder",
          1500,
          "Python Enthusiast",
          1500,
          "Full-Stack Developer",
          1500,
          "MERN Stack Expert",
          1500,
          "React Lover",
          1500,
          "Node.js Developer",
          1500,

          "Prompt Engineering",
          1500,
          "AI-ML Developer",
          1500,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
      />
    </div>
  );
}

export default TypeAnimationEffect;
