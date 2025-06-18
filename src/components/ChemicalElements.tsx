
import React from 'react';

export const ChemicalElements = () => {
  return (
    <>
      {/* Floating Chemical Molecules */}
      <div className="chemical-element top-20 left-10">
        <div className="chemical-molecule chemical-float"></div>
      </div>
      
      <div className="chemical-element top-40 right-20">
        <div className="chemical-beaker chemical-bounce"></div>
      </div>
      
      <div className="chemical-element top-60 left-1/4">
        <div className="chemical-flask chemical-rotate"></div>
      </div>
      
      <div className="chemical-element bottom-40 right-10">
        <div className="chemical-molecule chemical-pulse"></div>
      </div>
      
      <div className="chemical-element bottom-20 left-20">
        <div className="chemical-beaker chemical-float"></div>
      </div>
      
      <div className="chemical-element top-1/3 right-1/3">
        <div className="chemical-flask chemical-bounce"></div>
      </div>
      
      <div className="chemical-element bottom-1/3 left-1/3">
        <div className="chemical-molecule chemical-rotate"></div>
      </div>
      
      <div className="chemical-element top-1/2 right-1/4">
        <div className="chemical-beaker chemical-pulse"></div>
      </div>
    </>
  );
};
