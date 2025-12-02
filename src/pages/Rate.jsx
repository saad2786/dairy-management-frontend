import React from "react";
import { useForm } from "react-hook-form";
import ChangeRate from "../features/rate/ChangeRate";
import CurrentRates from "../features/rate/CurrentRates";
import RateDetails from "../features/rate/RateDetails";

export default function Rate() {
  return (
    <div className="flex items-center justify-center h-full  w-full overflow-scroll py-10 px-10">
      <RateDetails/>
      <ChangeRate />
    </div>
  );
}
