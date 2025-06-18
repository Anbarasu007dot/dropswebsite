import { useState, useEffect } from 'react';
import "./Preloader.css";

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Prevent scrolling during preloader
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Set preloader duration
    const timer = setTimeout(() => {
      setIsVisible(false);
      
      // Restore body styles and call onComplete
      setTimeout(() => {
        document.body.style.overflow = originalOverflow;
        onComplete();
      }, 300);
    }, 1500);

    return () => {
      clearTimeout(timer);
      document.body.style.overflow = originalOverflow;
    };
  }, [onComplete]);

  if (!isVisible) return null;

  return (
    <div className="preloader-container">
      <div className="atom-spinner">
        <div className="spinner-inner">
          <div className="spinner-line"></div>
          <div className="spinner-line"></div>
          <div className="spinner-line"></div>
          <div className="spinner-circle">&#9679;</div>
        </div>
      </div>
    </div>
  );
};