"use client";
import React from "react";

function RippleLoader({ children }: { children?: React.ReactNode }) {
  return (
    <div className="w-full min-h-screen p-20 flex justify-center items-center">
      <div className="min-w-12 min-h-12 gap-20 flex flex-col justify-center items-center">
        <div className="min-w-12 min-h-12 relative flex justify-center items-center ">
          <div className="absolute w-8 h-8 rounded-full bg-blue-600 z-40 "></div>
          <div className="absolute w-10 h-10 rounded-full bg-blue-300 z-30 animate-ping  delay-200"></div>
          <div className="absolute w-16 h-16 rounded-full bg-blue-200 z-20 animate-ping delay-100"></div>
          <div className="absolute w-20 h-20 rounded-full bg-blue-100 z-20 animate-ping "></div>
        </div>
        {children && <h1 className="text-3xl  ">{children}</h1>}
      </div>
    </div>
  );
}

export default RippleLoader;
