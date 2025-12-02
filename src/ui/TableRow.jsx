import React from "react";

export default function TableRow({ children }) {
  return (
    <li className="flex items-center justify-between gap-[10px] border-b border-stone-300 bg-stone-50 p-2 px-4 text-sm sm:text-xl ">
      {children}
    </li>
  );
}
