import React, { useEffect, useRef } from "react";
import "./CursorBlur.css";

const CursorBlur = () => {
  const blurRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (blurRef.current) {
        blurRef.current.style.left = `${event.clientX}px`;
        blurRef.current.style.top = `${event.clientY}px`;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <div className="cursor-blur" ref={blurRef}></div>;
};

export default CursorBlur;
