import React from "react";
import Link from "next/link";
import MobileMenuButton from "./MobileMenuButton";

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export function Navigation() {
  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[99999999] transition-all duration-300 h-[10vh]  backdrop-blur-md bg-gray-900/20  shadow-lg`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <span className="text-2xl font-bold gradient-text transition-opacity duration-500 opacity-100">
              SS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navItems.map((item, index) => (
                <Link
                  key={item.name + String(index)}
                  href={item.href}
                  className="text-gray-300 hover:text-[#00b4d8] px-3 py-2 text-sm font-medium transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ))}
              {/* <Button
                size="sm"
                className="ml-4 bg-gradient-to-r from-[#00b4d8] to-[#7209b7] hover:from-[#00a2c7] hover:to-[#6508a6] text-white"
              >
                Resume
              </Button> */}
            </div>
          </div>

          {/* Mobile menu button */}
          <MobileMenuButton />
        </div>
      </div>

      {/* Mobile Navigation */}
      {/* <MobileNavigation/> */}
    </nav>
  );
}
