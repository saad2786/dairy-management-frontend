import React from "react";
import CurrentRates from "./CurrentRates";
import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";
import { useRate } from "./useRate";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

function RateDetails() {
  const { rates, isLoading, error } = useRate();

  if (isLoading) return <Loader />;
  if (error || !rates.success) return <ErrorMessage />;
  return (
    <div className="h-full flex-[3] ">
      <h1>Rate Management</h1>
      <CurrentRates rates={rates} />
      <div className="flex items-center ">
        <div className="flex-[4] rounded-lg border border-slate-600 bg-slate-200 px-10 py-4">
          <h4 className="mb-4 text-xl">New Rate Preview</h4>
          <div className="flex items-center text-[16px] font-light">
            {rates?.cowRate[0]?.OldRate__r != null && (
              <div className="flex-1 space-y-1">
                <p className="text-lg font-medium">Cow </p>
                <p>
                  Current Rate:
                  <span className="font-medium ml-2">
                   {rates?.cowRate[0].Price__c}  {"  "}₹/Ltr
                  </span>
                </p>
                <p>
                  Old Rate:{" "}
                  <span className="font-medium ml-2">
                   {rates?.cowRate[0].OldRate__r.Price__c}  {"  "}₹/Ltr
                  </span>{" "}
                </p>
                <p className="flex">
                  Diffrence:{" "}
                  <span className={`font-medium ml-2  ${(rates?.cowRate[0].Price__c -
                      rates?.cowRate[0].OldRate__r.Price__c) > 0?"text-green-500":"text-red-500"}`}>
                    
                    {rates?.cowRate[0].Price__c -
                      rates?.cowRate[0].OldRate__r.Price__c} ₹
                  </span>
                  <span className="flex items-center ml-1">
                     {(rates?.cowRate[0].Price__c -
                      rates?.cowRate[0].OldRate__r.Price__c) > 0? <FaAngleDoubleUp size={16}/>: <FaAngleDoubleDown size={20}/>}
                  </span>
                </p>
              </div>
            )}
            {rates?.buffaloRate[0]?.OldRate__r != null && (
              <div className="flex-1 space-y-1">
                <p className="text-lg font-medium">Bufflalo</p>
                <p>
                  Current Rate:{" "}
                  <span className="font-medium ml-2">
                   {rates?.buffaloRate[0].Price__c}  {"  "}₹/Ltr
                  </span>
                </p>
                <p>
                  Old Rate:
                  <span className="font-medium ml-2">
                   {rates?.buffaloRate[0].OldRate__r.Price__c}  {"  "}₹/Ltr
                  </span>{" "}
                </p>
                <p className="flex flex-row">
                  Diffrence:{" "}
                  <span className={`font-medium ml-2  ${(rates?.buffaloRate[0].Price__c -
                      rates?.buffaloRate[0].OldRate__r.Price__c) > 0?"text-green-500":"text-red-500"}`}>
                    
                    {rates?.buffaloRate[0].Price__c -
                      rates?.buffaloRate[0].OldRate__r.Price__c} ₹
                  </span>
                  <span className="flex items-center ml-1">
                     {(rates?.buffaloRate[0].Price__c -
                      rates?.buffaloRate[0].OldRate__r.Price__c) > 0? <FaAngleDoubleUp size={16}/>: <FaAngleDoubleDown size={20}/>}
                  </span>
                </p>
              </div>
            )}
            {rates?.buffaloRate[0]?.OldRate__r == null &&
              rates?.cowRate[0]?.OldRate__r == null && (
                <div>No Data to show</div>
              )}
          </div>
        </div>
        <div className="flex-[3]"></div>
      </div>
    </div>
  );
}

export default RateDetails;
