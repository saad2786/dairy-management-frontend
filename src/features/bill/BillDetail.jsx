import { useQuery } from "@tanstack/react-query";
import { getBillDetails } from "./fetchBillDetails";
import Spinner from "../../ui/Spinner";
import { FaPrint } from "react-icons/fa";
import { useRef } from "react";
import { format } from "date-fns";

export default function BillDetail({ billId }) {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["billDetail", billId],
    queryFn: () => getBillDetails(billId),
    enabled: !!billId,
    keepPreviousData: false
  });
  const printRef = useRef();
  if (!billId) {
    return (
      <div className="flex h-full w-full items-center justify-center gap-3 rounded-lg border border-slate-400 bg-slate-100 p-3 text-sm">
        No Bill Selected
      </div>
    );
  }

  const printOnlyThis = () => {
    const printContents = printRef.current.innerHTML;
    const original = document.body.innerHTML;

    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = original;
    window.location.reload(); // optional refresh
  };
  if (isLoading || !data )
    return (
  <div className="flex h-full w-full items-center justify-center gap-3 rounded-lg border border-slate-400 bg-slate-100 p-3 text-sm">
        <Spinner />
      </div>
    );
    const { bill, billLineItems } = data;
  if (isError)
    return <div className="p-3 text-red-600">Error loading bill</div>;

  
  return (
    <div className="flex  h-full w-full flex-col gap-3 rounded-lg border border-slate-400 bg-slate-100 p-3 text-sm">
      <div className="flex justify-end">
        <button
          onClick={() => printOnlyThis()}
          className="flex items-center justify-center gap-2 rounded-md bg-slate-700  px-5 py-2 text-[16px] text-white shadow transition hover:bg-slate-800"
        >
          <FaPrint size={18} />
          Print
        </button>
      </div>
      {/* Bill Details - Top 1/3 */}
      <div className="flex  h-full w-full flex-col gap-3" ref={printRef}>
       
        <div className="relative flex-1 rounded-lg border border-slate-300 bg-white p-4 shadow">
           <div className={`absolute top-2 right-2 py-1 px-3 text-[16px] rounded ${bill.Status__c == 'Paid'?" text-green-800  bg-green-200":(bill.Status__c == 'Pending'?"text-amber-800 bg-amber-200":(bill.Status__c == 'Cancelled'?"text-red-800  bg-red-200":"text-gray-800 bg-gray-200"))}`}>
              <p>{bill?.Status__c}</p>
            </div>
          <h2 className="mb-3 text-lg font-semibold text-slate-700">
            Bill Details
          </h2>

          <div className="grid grid-cols-2 gap-2 text-slate-700">
            <div>
              <p className="font-light opacity-75">Customer</p>
              <p>{bill.Contact__r?.Name}</p>
            </div>

            <div>
              <p className="font-light opacity-75">Cattle Type</p>
              <p>{bill.Contact__r?.CattleType__c}</p>
            </div>

            <div>
              <p className="font-light opacity-75">From Date</p>
              <p>{format(bill.FromDate__c, 'dd-MM-yyyy')}</p>
            </div>

            <div>
              <p className="font-light opacity-75">To Date</p>
              <p>{format(bill.ToDate__c, 'dd-MM-yyyy')}</p>
            </div>

            <div>
              <p className="font-light opacity-75">Total Quantity</p>
              <p className="font-bold">{bill.Quantity__c} Liters</p>
            </div>

            <div>
              <p className="font-light opacity-75">Total Price</p>
              <p className="font-bold text-slate-800">₹{bill.Price__c}</p>
            </div>

           
          </div>
        </div>

        {/* Bill Line Items - Bottom 2/3 */}
        <div className="flex-[2] overflow-hidden rounded-lg border border-slate-300 bg-white p-4 shadow">
          <h3 className="text-md mb-3 font-semibold text-slate-700">
            Transaction List
          </h3>

          <div className="max-h-full overflow-y-auto">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="bg-slate-200 text-slate-700">
                  <th className="border px-2 py-2">Date</th>
                  <th className="border px-2 py-2">Morn Qty</th>
                  <th className="border px-2 py-2">Morn Fat</th>
                  <th className="border px-2 py-2">Even Qty</th>
                  <th className="border px-2 py-2">Even Fat</th>
                  <th className="border px-2 py-2">Total Qty</th>
                  <th className="border px-2 py-2">Total Price</th>
                </tr>
              </thead>

              <tbody>
                {billLineItems.map((item) => (
                  <tr
                    key={item.Id}
                    className="border-b bg-slate-50 transition hover:bg-slate-200"
                  >
                    <td className="border px-2 py-2">{format(item.TranDate__c, 'dd-MM-yyyy')}</td>
                    <td className="border px-2 py-2">{item.MornQty__c}</td>
                    <td className="border px-2 py-2">{item.MornFat__c}</td>
                    <td className="border px-2 py-2">{item.EvenQty__c}</td>
                    <td className="border px-2 py-2">{item.EvenFat__c}</td>
                    <td className="border px-2 py-2">{item.TotalQty__c}</td>
                    <td className="border px-2 py-2 font-semibold">
                      ₹{item.TotalPrice__c}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
