import React from "react";
import clsx from "clsx";

interface ContinueButtonProps {
  onClick: () => void;
  className?: string;
}

const ContinueButton = ({ onClick, className }: ContinueButtonProps) => (
  <button
    onClick={onClick}
    className={clsx(
      "w-full bg-white text-black py-2 rounded-md font-bold hover:bg-gray-200 transition cursor-pointer",
      className
    )}
  >
    Continue to Dashboard
  </button>
);

export default ContinueButton;
