import React from "react";
import BillRow from "./BillRow";

const BillTable = ({ bills, selectedBill, setSelectedBill }) => {

  return (
    <div className="shadow-md shadow-slate-700 ">
      {/* Scrollable table container */}
      <div className="max-h-[80hv] overflow-y-scroll ">
        <table className="table h-full w-full text-center ">
          {/* Header */}
          <thead className="sticky top-0 z-10 bg-slate-300 text-base font-semibold text-slate-800">
            <tr className="border-b border-slate-500">
              <th>Customer</th>
              {/* <th>Cattle Type</th>
              <th>Total Milk</th>
              <th>Total Price</th> */}
              <th>From</th>
              <th>To</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="relative">
            {bills?.length > 0 ? (
              [...bills]
                .reverse()
                .map((bill) => (
                  <BillRow
                    key={bill.Id}
                    id={bill.Id}
                    customer={bill.Contact__r.Name}
                    cattle={bill.Contact__r.CattleType__c}
                    totalMilk={bill.Quantity__c}
                    totalPrice={bill.Price__c}
                    fromDate={bill.FromDate__c}
                    toDate={bill.ToDate__c}
                    status={bill.Status__c}
                    selectBill={setSelectedBill}
                    selected={selectedBill == bill.Id}
                  />
                ))
            ) : (
              <tr>
                <td colSpan="11" className="py-4">
                  No Bill Record is available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillTable;
