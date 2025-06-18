"use client";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import MobileNavigation from "./MobileNavigation";

function MobileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="md:hidden">
        <Button variant="ghost" size="sm" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>
      <MobileNavigation isOpen={isOpen} />
    </>
  );
}

export default MobileMenuButton;
