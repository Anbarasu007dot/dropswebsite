import { Leaf, Droplets, Beaker, Apple } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { ChemicalElements } from "@/components/ChemicalElements";

export const Expertise = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return null;
};
