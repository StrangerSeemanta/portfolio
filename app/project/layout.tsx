import React from "react";
import CustomCursor from "@/components/custom-cursor";
import "@/components/styles/nocursor.css"; // hide cursor when custom cursor is active
import { ParticleField } from "@/components/particleField";
export default function ProjectLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <CustomCursor />
      <section className="relative min-h-screen overflow-hidden">
        <ParticleField/>
        {children}
      </section>
    </>
  );
}
