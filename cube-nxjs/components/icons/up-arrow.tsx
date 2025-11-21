import React from "react";

interface UpArrowIconProps {
  color?: string;
  className?: string;
}

const UpArrowIcon: React.FC<UpArrowIconProps> = ({
  color = "white",
  className = "",
}) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 16 17"
      fill="none"
    >
      <path
        d="M8 3.16406L4 7.16406M8 3.16406L12 7.16406M8 3.16406V10.1641M8 13.8307V12.1641"
        stroke={color}
        strokeWidth="0.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export default UpArrowIcon;
