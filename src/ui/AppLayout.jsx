import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function AppLayout() {
  return (
    <div className="flex h-screen  w-screen flex-col bg-slate-50 ">
      <Navbar />
      <div className=" mx-auto h-[90%]  w-full  ">
        <Outlet />
      </div>
    </div>
  );
}
