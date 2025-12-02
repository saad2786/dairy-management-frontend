import React from "react";
import RateRow from "./RateRow";

export default function CurrentRates({ rates }) {
  return (
    <div className=" my-4 w-4/5 overflow-y-scroll rounded-md shadow-sm shadow-slate-700">
      <table className=" table   overflow-y-hidden  border-t-2 ">
        <thead className="text-base  font-semibold shadow-sm shadow-slate-300">
          <tr className="border-b border-slate-500 bg-slate-200">
            <th>Cattle Type</th>
            <th>Fat</th>
            <th>Price/Ltr.</th>
            <th>Start Date</th>
          </tr>
        </thead>
        <tbody>
          {rates?.buffaloRate.length && (
            <tr className={`text-lg`}>
              <td>Buffalo</td>
              <td>{rates.buffaloRate[0].fat__c}</td>
              <td>{rates.buffaloRate[0].Price__c}</td>
              <td>{rates.buffaloRate[0].StartDate__c}</td>
            </tr>
          )}
          {rates?.cowRate.length && (
            <tr className={`text-lg `}>
              <td>Cow</td>
              <td>{rates.cowRate[0].fat__c}</td>
              <td>{rates.cowRate[0].Price__c}</td>
              <td>{rates.cowRate[0].StartDate__c}</td>
            </tr>
          )}
          {!rates?.cowRate.length && !rates?.buffaloRate.length && (
            <tr className="px-8 py-10 text-center">
              There is no any rate, add rate👇
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
