import React from "react";
import { PiUsersThreeFill } from "react-icons/pi";

import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";
import { BiRupee } from "react-icons/bi";
import { useDashBoard } from "../features/dashBoard/useDashBoard";
import Clock from "../ui/Clock.jsx";
import CardSkeleton from "../ui/CardSkeleton";
import { Link } from "react-router-dom";

export default function Home() {
  const {
    state,
    customerFetching,
    transactionFetching,
    customerError,
    transactionError,
    rateFetching,
    rateError,
  } = useDashBoard();
  const {
    dairyName,
    totalCustomer,
    todayTransactionAmount,
    totalTransaction,
    cowMilkPrice,
    buffeloMilkPrice,
    todayTransactionQty,
    todayBuffeloMilk,
    todayCowMilk,
    buffeloTransaction,
    cowTransaction,
  } = state;

  if (customerFetching && transactionFetching && rateFetching)
    return <CardSkeleton />;
  if (transactionError || customerError || rateError) return <ErrorMessage />;
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
              {/* <div className="stat-value ">
                {12} : {30} : {40}
              </div> */}
              <span className="stat-value font-mono text-4xl">
                <Clock />
              </span>
              <div className="stat-value  text-2xl font-semibold">
                {new Date().toDateString()}
              </div>
            </div>
          </div>
        </div>
        <div className="stats bg-gray-200 p-4 shadow">
          <div className="stat">
            <div className="stat-title">Total Customers</div>
            <div className="stat-value flex items-center justify-between underline">
              <Link to="customer">{totalCustomer}</Link>
              <PiUsersThreeFill />
            </div>
          </div>
        </div>
        <div className="stats bg-gray-200 p-4 shadow">
          <div className="stat">
            <div className="stat-title">Total Transaction </div>
            <div className="stat-value flex items-baseline gap-1  ">
              <Link to="transaction" className="underline">
                {totalTransaction}
              </Link>
              <span className="text-xl font-light italic">Ltr</span>
            </div>
          </div>
        </div>
        <div className="stats bg-gray-200 p-4 shadow">
          <div className="stat">
            <div className="stat-title">Today's Trans</div>
            <div className="stat-value flex items-baseline gap-1    py-2">
              {todayTransactionQty}
              <span className="text-lg font-light italic">Ltr</span>
            </div>
          </div>
        </div>
        <div className="stats bg-gray-200 p-4 shadow">
          <div className="stat">
            <div className="stat-title">Today's Revenue</div>
            <div className="stat-value flex items-center ">
              <BiRupee />
              {todayTransactionAmount}
            </div>
          </div>
        </div>

        {/* Second Row */}

        <div className="stats relative col-span-3 row-span-1 bg-gray-200 p-4 shadow">
          <div
            className="text-vertical absolute left-0 top-0 h-full bg-red-500 px-2 py-4 text-center tracking-widest
          text-white "
          >
            Buffelo
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Total Milk </div>
            <div className="stat-value">
              {buffeloTransaction}{" "}
              <span className="text-lg font-light italic">Ltr</span>
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Today's Milk</div>
            <div className="stat-value">
              {todayBuffeloMilk}{" "}
              <span className="text-lg font-light italic">Ltr</span>
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Price</div>
            <div className="stat-value flex items-baseline gap-1 text-secondary">
              {buffeloMilkPrice}
              <span className="text-lg font-light italic">Rs/Ltr</span>
            </div>
          </div>
        </div>
        <div className="stats stats-vertical col-span-1 row-span-2 bg-gray-200 p-4 shadow">
          <div className="stat place-items-center">
            <div className="stat-title">Buffelo Milk Price</div>
            <div className="stat-value">{buffeloMilkPrice}</div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Cow Milk Price</div>
            <div className="stat-value">{cowMilkPrice}</div>
          </div>
        </div>
        <div className="stats relative col-span-3 row-span-1 bg-gray-200 p-4 shadow">
          <div
            className="text-vertical absolute left-0 top-0 h-full bg-green-500 px-2 py-4 text-center tracking-widest
          text-white "
          >
            Cow
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Total Milk </div>
            <div className="stat-value">
              {cowTransaction}{" "}
              <span className="text-lg font-light italic">Ltr</span>
            </div>
          </div>
          <div className="stat place-items-center">
            <div className="stat-title">Today's Milk</div>
            <div className="stat-value">
              {todayCowMilk}{" "}
              <span className="text-lg font-light italic">Ltr</span>
            </div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title">Price</div>
            <div className="stat-value flex items-baseline gap-1 text-secondary">
              {cowMilkPrice}
              <span className="text-lg font-light italic">Rs/Ltr</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
