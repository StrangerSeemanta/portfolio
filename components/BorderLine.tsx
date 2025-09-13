"use client";
import React from "react";
import { motion } from "framer-motion";
function BorderLine() {
  return (
    <>
      {/* Bottom Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="mt-8 h-px bg-gradient-to-r from-transparent via-[#00b4d8] to-transparent"
      />
    </>
  );
}

export default BorderLine;
