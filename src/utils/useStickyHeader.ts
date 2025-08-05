import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const useStickyHeader = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY < 50) {
        setIsSticky(false);
        setIsVisible(true);
      } else {
        setIsSticky(true);
        setIsVisible(currentY < lastScrollY);
      }

      setLastScrollY(currentY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return { isSticky, isVisible };
};

export default useStickyHeader;
