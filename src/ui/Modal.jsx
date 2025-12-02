import React, { useState } from "react";

export default function Modal({ children, closeModal }) {
  // Manage modal state using useState

  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 z-[999] flex h-screen w-screen items-center justify-center bg-gray-600 bg-opacity-55 ">
      <div className="h-fit rounded-lg  px-8 py-24 sm:w-[40vw]">
        <div className="w-full flex justify-end mb-2">
          <button
            className="btn btn-circle bg-slate-200 font-extrabold"
            onClick={closeModal}
          >
            ✕
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
