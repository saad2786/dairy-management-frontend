import React from "react";
import TransactionRow from "./TransactionRow";
import { calcaulteTotal } from "./calculateTotal";
import '../../index.css'
const TransactionTable = ({ transactions }) => {
  const {evenPrice, evenQty, mornPrice, mornQty, totalPrice, totalQty} = calcaulteTotal(transactions)
  return (
   <div className="shadow-md shadow-slate-700 ">

  {/* Scrollable table container */}
  <div className="max-h-[32vh] overflow-y-scroll ">
    <table className="table h-full w-full text-center ">

      {/* Header */}
      <thead className="text-base font-semibold text-slate-800 sticky top-0 bg-slate-300 z-1">
        <tr className="border-b border-slate-500">
          <th>Date</th>
          <th>Customer</th>
          <th>Cattle Type</th>
          <th>Morning Fat</th>
          <th>Morning Quantity</th>
          <th>Morning Price</th>
          <th>Evening Fat</th>
          <th>Evening Quantity</th>
          <th>Evening Price</th>
          <th>Total Milk</th>
          <th>Total Price</th>
        </tr>
      </thead>

      {/* Body */}
      <tbody>
        {transactions?.length ? (
          [...transactions].reverse().map((transaction) => (
            <TransactionRow
              key={transaction.Id}
              id={transaction.Id}
              customer={transaction.Contact__r.Name}
              cattle={transaction.CattleType__c}
              mornqty={transaction.MornQty__c}
              mornfat={transaction.MornFat__c}
              mornprice={transaction.MornPrice__c}
              evenqty={transaction.EvenQty__c}
              evenfat={transaction.EvenFat__c}
              evenprice={transaction.EvenPrice__c}
              totalMilk={transaction.TotalQty__c}
              totalPrice={transaction.TotalPrice__c}
              date={transaction.TranDate__c}
            />
          ))
        ) : (
          <tr>
            <td colSpan="11" className="py-4">There is no transaction</td>
          </tr>
        )}
      </tbody>

    </table>
  </div>

  {/* Sticky Footer OUTSIDE table */}
  <div className="bg-slate-200 rounded-b-sm px-4 py-2 text-sm font-semibold flex justify-between sticky bottom-0 z-20">
    <span>Morning Qty: {mornQty}</span>
    <span>Morning Price: {mornPrice}</span>
    <span>Evening Qty: {evenQty}</span>
    <span>Evening Price: {evenPrice}</span>
    <span>Total Qty: {totalQty}</span>
    <span>Total Price: {totalPrice}</span>
  </div>

</div>

  );
};

export default TransactionTable;
