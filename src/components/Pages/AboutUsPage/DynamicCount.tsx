"use client";

import React, { useEffect, useRef, useState } from "react";

type DynamicCountProps = {
  target: number;
  duration?: number;
};

const DynamicCount: React.FC<DynamicCountProps> = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const startTime = useRef<number | null>(null);

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      const elapsed = timestamp - startTime.current;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * target);
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target, duration]);

  return <span>{count.toLocaleString()}</span>;
};

export default DynamicCount;
