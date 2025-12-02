import React from "react";

export default function Table({ children }) {
  return (
    <div className="mx-auto  w-[80vw]  sm:w-[70vw] ">
      <div className=" mt-4  max-h-[80vh] overflow-y-scroll rounded-md border-2 border-stone-600 ">
        {children}
      </div>
    </div>
  );
}
