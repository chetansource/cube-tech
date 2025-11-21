import React from "react";

interface RightArrowIconProps {
  color?: string;
  className?: string;
}

const RightArrowIcon: React.FC<RightArrowIconProps> = ({
  color = "white",
  className = "",
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path
        d="M20.5 12L14.5 18M20.5 12L14.5 6M20.5 12H10M4.5 12H7"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default RightArrowIcon;
