"use client"
import React from "react";
import {motion}from "framer-motion"
import { TypeAnimation } from "react-type-animation";
function TypeAnimationEffect() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="text-xl md:text-2xl text-gray-300 h-8"
    >
      <TypeAnimation
        sequence={[
          "Full-Stack Developer",
          2000,
          "MERN Stack Expert",
          2000,
          "React Specialist",
          2000,
          "Node.js Developer",
          2000,
        ]}
        wrapper="span"
        speed={50}
        repeat={Infinity}
      />
    </motion.div>
  );
}

export default TypeAnimationEffect;
