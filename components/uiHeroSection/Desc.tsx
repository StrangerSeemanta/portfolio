"use client"
import React from "react";
import { motion } from "framer-motion";
function Desc() {
  return (
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.8 }}
      className="md:text-lg text-gray-400 max-w-3xl mx-auto leading-relaxed"
    >
      Passionate about creating scalable web applications with modern
      technologies. Specializing in React, Node.js, and cloud-native solutions
      that drive business growth.
    </motion.p>
  );
}

export default Desc;
