// src/pages/NewScan.tsx
import React from "react";
import Scan from "@/features/Scan";
import UNavBar from "@/components/UNavBar"; // Assuming you have a top nav component

const NewScan = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-12 flex flex-col items-center relative font-sans">
      <UNavBar />

      <Scan />

     
    </div>
  );
};

export default NewScan;
