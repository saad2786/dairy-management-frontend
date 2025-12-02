import React from "react";

export default function TableHead({ children }) {
  return (
    <div className="flex items-center justify-between gap-4 bg-stone-700 px-4 py-2 text-sm font-bold text-white  sm:py-4 sm:text-xl ">
      {children}
    </div>
  );
}
