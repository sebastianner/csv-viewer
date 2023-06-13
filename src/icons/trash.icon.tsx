import React from "react";

const TrashIcon: React.FC = () => {
  return (
    <svg
      className="pointer-events-none fill-current w-4 h-4 ml-auto"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="white"
    >
      <path
        className="pointer-events-none"
        d="M3 6l3 18h12l3-18h-18zm19-4v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.316c0 .901.73 2 1.631 2h5.711z"
      ></path>
    </svg>
  );
};

export default TrashIcon;
