"use client";
import React from "react";
import { motion } from "framer-motion";
import { Github, Link, Linkedin, Mail, Youtube } from "lucide-react";
function SocialHead({ label, href }: { label: string; href: string }) {
  let Icon;
  switch (label.trim().toLowerCase()) {
    case "github":
      Icon = Github;
      break;
    case "linkedin":
      Icon = Linkedin;
      break;
    case "email":
      Icon = Mail;
      break;
    case "youtube":
      Icon = Youtube;
      break;
    default:
      Icon = Link;
  }
  return (
    <motion.a
      key={label}
      href={href}
      whileHover={{ scale: 1.2, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      className="p-5 glass-card rounded-full hover-glow transition-all duration-300"
      aria-label={label}
    >
      <Icon className="w-10 h-10 text-gray-300 hover:text-[#00b4d8]" />
    </motion.a>
  );
}

export default SocialHead;
