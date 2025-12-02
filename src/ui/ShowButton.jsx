import React from "react";
import { useNavigate } from "react-router-dom";

export default function ShowButton({ children, openModal }) {
  const navigate = useNavigate();
  return (
    <button
      className="r btn btn-success absolute right-10 top-20 mx-auto mb-4 self-end text-base disabled:cursor-not-allowed disabled:bg-opacity-65 "
      onClick={() => openModal(true)}
    >
      {children}
    </button>
  );
}
