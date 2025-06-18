
import { useEffect, useState } from 'react';

export const FloatingMolecules = () => {
  const [molecules, setMolecules] = useState<Array<{ id: number; delay: number; size: number; top: number }>>([]);

  useEffect(() => {
    const moleculeArray = Array.from({ length: 6 }, (_, i) => ({
      id: i,
      delay: i * 3,
      size: Math.random() * 20 + 30,
      top: Math.random() * 80 + 10,
    }));
    setMolecules(moleculeArray);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {molecules.map((molecule) => (
        <div
          key={molecule.id}
          className="floating-molecule"
          style={{
            top: `${molecule.top}%`,
            width: `${molecule.size}px`,
            height: `${molecule.size}px`,
            animationDelay: `${molecule.delay}s`,
          }}
        >
          <div className="chemical-molecule">
            <div className="absolute inset-2 border-2 border-white rounded-full opacity-60"></div>
          </div>
        </div>
      ))}
      
      {/* Chemical formulas floating */}
      <div className="absolute top-1/4 left-1/4 opacity-10 text-blue-300 text-2xl font-mono particle-float">
        H₂O
      </div>
      <div className="absolute top-3/4 right-1/4 opacity-10 text-blue-300 text-xl font-mono particle-float" style={{ animationDelay: '5s' }}>
        CO₂
      </div>
      <div className="absolute top-1/2 left-1/3 opacity-10 text-blue-300 text-lg font-mono particle-float" style={{ animationDelay: '8s' }}>
        NaCl
      </div>
    </div>
  );
};
