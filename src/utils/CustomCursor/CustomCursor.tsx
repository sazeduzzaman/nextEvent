"use client";
import React, { useEffect, useRef, useState } from "react";

const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isPointer, setIsPointer] = useState(false);

  const targetX = useRef(0);
  const targetY = useRef(0);
  const currentX = useRef(0);
  const currentY = useRef(0);

  const animate = () => {
    currentX.current += (targetX.current - currentX.current) * 0.15;
    currentY.current += (targetY.current - currentY.current) * 0.15;

    if (cursorRef.current) {
      cursorRef.current.style.left = `${currentX.current}px`;
      cursorRef.current.style.top = `${currentY.current}px`;
    }

    requestAnimationFrame(animate);
  };

  useEffect(() => {
    animate();

    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;

      const element = e.target as HTMLElement;
      const computedCursor = window
        .getComputedStyle(element)
        .getPropertyValue("cursor");

      const interactiveTags = [
        "A",
        "BUTTON",
        "INPUT",
        "SELECT",
        "TEXTAREA",
        "LABEL",
      ];
      const isClickable =
        computedCursor === "pointer" ||
        interactiveTags.includes(element.tagName) ||
        element.getAttribute("role") === "button" ||
        element.closest('button, a, [role="button"], [role="link"]');

      setIsPointer(!!isClickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const flareSize = isPointer ? 0 : 30;
  const cursorStyle = isPointer ? { left: "-100px", top: "-100px" } : {};

  return (
    <div
      ref={cursorRef}
      className={`flare ${isPointer ? "pointer" : ""}`}
      style={{
        ...cursorStyle,
        width: `${flareSize}px`,
        height: `${flareSize}px`,
      }}
    >
      <div className="cursor-dot"></div>
    </div>
  );
};

export default CustomCursor;
