import { format } from "date-fns";
import React from "react";

const InvoiceTable = ({ transactions }) => {
  const totalMorningMilk = transactions.reduce((amt, transaction) => {
    amt += transaction.MornQty_c;
    return amt;
  }, 0);
  const totalEveningMilk = transactions.reduce((amt, transaction) => {
    amt += transaction.EvenQty__c;
    return amt;
  }, 0);
  const totalMorningAmt = transactions.reduce((amt, transaction) => {
    amt += transaction.MornPrice__c;
    return amt;
  }, 0);
  const totalEveningAmt = transactions.reduce((amt, transaction) => {
    amt += transaction.EvenPrice__c;
    return amt;
  }, 0);
  const totalAmount = transactions.reduce((amt, transaction) => {
    amt += transaction.TotalPrice__c;
    return amt;
  }, 0);

  return (
    <div className="overflow-x-auto">
      <table className="table table-xs border-slate-600 text-center">
        <thead>
          <tr className="border border-slate-300 bg-slate-200 text-black">
            <th>Date</th>
            <th>MR.fat</th>
            <th>MR.rate</th>
            <th>MR.price</th>
            <th>MR.qty</th>
            <th>EN.qty</th>
            <th>EN.fat</th>
            <th>EN.rate</th>
            <th>EN.price</th>
            <th>Total Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction) => {
            return (
              <tr className="border-b border-slate-300 *:font-normal">
                <td>
                  {transaction.TranDate__c
                    ? format(new Date(transaction.TranDate__c), "dd-MM-yyyy")
                    : null}
                </td>
                <th>
                  {transaction.MornQty_c ? transaction.MornQty_c : "-"}
                </th>
                <th>
                  {transaction.MornFat__c ? transaction.MornFat__c : "-"}
                </th>
                <th>
                  {transaction.MornQty_c
                    ? transaction.MornPrice__c / transaction.MornQty_c
                    : "-"}
                </th>
                <th>
                  {transaction.MornPrice__c ? transaction.MornPrice__c : "-"}
                </th>
                <th>
                  {transaction.EvenQty__c ? transaction.EvenQty__c : "-"}
                </th>
                <th>
                  {transaction.EvenFat__c ? transaction.EvenFat__c : "-"}
                </th>
                <th>
                  {transaction.EvenQty__c
                    ? transaction.EvenPrice__c / transaction.EvenQty__c
                    : "-"}
                </th>
                <th>
                  {transaction.EvenPrice__c ? transaction.EvenPrice__c : "-"}
                </th>
                <th>
                  {transaction.TotalPrice__c ? transaction.TotalPrice__c : "-"}
                </th>
              </tr>
            );
          })}
        </tbody>
        <tfoot className="border-b border-l border-r border-slate-300 bg-slate-200 text-red-500">
          <tr>
            <th>Total Milk</th>
            <th>{totalMorningMilk}</th>
            <th colSpan={2}>Total Amount</th>
            <th>{totalMorningAmt}</th>
            <th>{totalEveningMilk}</th>
            <th colSpan={2}>Total Amount</th>
            <th>{totalEveningAmt}</th>
            <th>{totalAmount}</th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default InvoiceTable;
