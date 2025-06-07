"use client";

import { frame, hover, motion, useMotionValue, useSpring } from "framer-motion";
import { RefObject, useEffect, useRef, useState } from "react";

export default function Drag() {
  const ref = useRef<HTMLDivElement>(null);
  const { x, y } = useFollowPointer(ref);

  const spring_ref = useRef<HTMLDivElement>(null);
  const { sx, sy } = useFollowPointerSpring(spring_ref);
  const isHover = useFollowerHover(spring_ref);
  return (
    <>
      <motion.div
        ref={ref}
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{ x, y }}
        animate={{
          scale: isHover ? 1.3 : 1,
        }}
      >
        {" "}
        <div className="w-8 h-8 border-2 border-[#00b4d8] rounded-full backdrop-blur-sm" />
      </motion.div>
      <motion.div
        ref={spring_ref}
        animate={{
          opacity:isHover?0.2:1,
          scale:isHover?1.6:1
        }}
        className="fixed pointer-events-none z-[9998] mix-blend-difference"
        style={{ x: sx, y: sy, position: "fixed" }}
      >
        {" "}
        <div className="w-4 h-4 bg-gradient-to-tr from-[#00b4d8] to-[#ad00d8] rounded-full" />
      </motion.div>
    </>
  );
}

const spring = { damping: 3, stiffness: 10, restDelta: 0.001 };

export function useFollowPointerSpring(ref: RefObject<HTMLDivElement | null>) {
  const x = useSpring(0, spring);
  const y = useSpring(0, spring);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        y.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref, x, y]);

  return { sx: x, sy: y };
}
export function useFollowPointer(ref: RefObject<HTMLDivElement | null>) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;

      frame.read(() => {
        x.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        y.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    window.addEventListener("pointermove", handlePointerMove);

    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [ref, x, y]);

  return { x: x, y: y };
}

export const useFollowerHover = (ref: RefObject<HTMLDivElement | null>) => {
  const [isHover, setHover] = useState<boolean | null>(null);
  useEffect(() => {
    if (!ref.current) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a"
      ) {
        // Hover started on interactive element
        if (ref.current) {
          setHover(true);
        }
      }
    };

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a"
      ) {
        // Hover ended on interactive element
        if (ref.current) {
          setHover(false);
        }
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseLeave);

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseLeave);
    };
  }, [ref]);
  return isHover;
};
