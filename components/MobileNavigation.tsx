"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
// This component is a placeholder for mobile navigation.
// It can be expanded with links, buttons, or other interactive elements as needed.
import React from "react";

function MobileNavigation({isOpen}: { isOpen: boolean }) {
  
  const navItems = React.useMemo(
    () => [
      { name: "Home", href: "#hero" },
      { name: "About", href: "#about" },
      { name: "Projects", href: "#projects" },
      { name: "Skills", href: "#skills" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden absolute z-[99999999] top-[10vh] left-0 w-full backdrop-blur-lg bg-gradient-to-br from-black/90 via-gray-900/80 to-gray-800/90 dark:from-black/95 dark:via-gray-900/90 dark:to-black/90 shadow-2xl"
          style={{
            backgroundImage: `
              repeating-linear-gradient(
            135deg,
            rgba(255,255,255,0.03) 0px,
            rgba(255,255,255,0.03) 2px,
            transparent 2px,
            transparent 8px
              ),
              linear-gradient(
            to bottom right,
            rgba(0,0,0,0.95) 0%,
            rgba(31,41,55,0.85) 50%,
            rgba(31,41,55,0.9) 100%
              )
            `
          }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
            key={item.name}
            href={item.href}
            className="text-gray-100 hover:text-sky-400 block px-3 py-2 text-base font-medium w-full text-left transition-colors duration-200"
              >
            {item.name}
              </Link>
            ))}
            {/* <Button
            size="sm"
            className="mt-4 w-full bg-gradient-to-r from-[#0ea5e9] to-[#6366f1]"
              >
            <Download className="w-4 h-4 mr-2" />
            Download Resume
              </Button> */}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default MobileNavigation;
