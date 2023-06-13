import React from "react";

const DragOverIcon: React.FC = () => {
  function rgb(arg0: number, arg1: number, arg2: number): string | undefined {
    throw new Error("Function not implemented.");
  }

  return (
    <svg
      className="fill-current w-12 h-12 mb-3 text-blue-700"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="#1D4ED8"
    >
      <path d="M19.479 10.092c-.212-3.951-3.473-7.092-7.479-7.092-4.005 0-7.267 3.141-7.479 7.092-2.57.463-4.521 2.706-4.521 5.408 0 3.037 2.463 5.5 5.5 5.5h13c3.037 0 5.5-2.463 5.5-5.5 0-2.702-1.951-4.945-4.521-5.408zm-7.479-1.092l4 4h-3v4h-2v-4h-3l4-4z" />
    </svg>
  );
};

export default DragOverIcon;
