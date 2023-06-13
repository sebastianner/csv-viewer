import React from "react";

type Props = { children: JSX.Element };

function OptionsModal({ children }: Props) {
  return (
    <div className="bg-gray-500 h-screen w-screen sm:px-8 md:px-16 sm:py-8 ">
      <main className="container mx-auto max-w-screen-lg h-full">
        {children}
      </main>
    </div>
  );
}

export default OptionsModal;
