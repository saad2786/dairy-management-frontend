import React, { useContext } from "react";
import Clock from "./Clock";
import { Context } from "../context/useContext";

export default function CardSkeleton() {
  const { dairyName } = useContext(Context);
  return (
    <div className="h-ful w-full px-20 py-8">
      <div className="grid h-[84vh] grid-cols-4 grid-rows-4 gap-4 font-outfit">
        {/* First Row */}
        <div className="stats col-span-4 row-span-1 flex w-full items-center justify-between bg-gray-200 bg-opacity-60 bg-[url('/images/dairyFarm.jpg')] bg-cover bg-no-repeat px-4 py-1 shadow">
          <div className="stat">
            <div className="w-fit rounded-md bg-slate-200 bg-opacity-70 px-4 py-4  backdrop-blur-sm *:text-slate-700">
              <div className="stat-title">Hello, Welcome</div>
              <div className="stat-value">{dairyName}</div>
            </div>
          </div>
          <div className="stat ">
            <div className="w-fit  rounded-md bg-slate-200 bg-opacity-70 px-4 py-3 text-slate-700 backdrop-blur-sm">
              <span className="stat-value font-mono text-4xl">
                <Clock />
              </span>
              <div className="stat-value  text-2xl font-semibold">
                {new Date().toDateString()}
              </div>
            </div>
          </div>
        </div>

        <div className="stats bg-gray-200 shadow">
          <div className=" flex w-full flex-col gap-4">
            <div className="skeleton h-full w-full"></div>
          </div>
        </div>
        <div className="stats bg-gray-200 shadow">
          {" "}
          <div className=" flex w-full flex-col gap-4">
            <div className="skeleton h-full w-full"></div>
          </div>
        </div>
        <div className="stats bg-gray-200 shadow">
          {" "}
          <div className=" flex w-full flex-col gap-4">
            <div className="skeleton h-full w-full"></div>
          </div>
        </div>
        <div className="stats bg-gray-200 shadow">
          {" "}
          <div className=" flex w-full flex-col gap-4">
            <div className="skeleton h-full w-full"></div>
          </div>
        </div>

        {/* Second Row */}

        <div className="stats relative col-span-3 row-span-1 bg-gray-200 shadow">
          <div className=" flex w-full flex-col gap-4">
            <div className="skeleton h-full w-full"></div>
          </div>
        </div>
        <div className="stats stats-vertical col-span-1 row-span-2 bg-gray-200 shadow">
          <div className=" flex w-full flex-col gap-4">
            <div className="skeleton h-full w-full"></div>
          </div>
        </div>
        <div className="stats relative col-span-3 row-span-1 bg-gray-200 shadow">
          <div className=" flex w-full flex-col gap-4">
            <div className="skeleton h-full w-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
