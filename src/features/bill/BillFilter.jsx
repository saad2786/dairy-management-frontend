import React, { useEffect, useState } from "react";
import Sidebar from "../../ui/Sidebar";
import { compareAsc, format } from "date-fns";
import debounce from "lodash.debounce";
import LookupCustomer from "../../ui/LookupCustomer";

const TransactionFilter = ({ transactions, filterTransactions, isLoading }) => {
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  // const [fat, setFat] = useState("");
  const [isBuffeloChecked, setIsBuffeloChecked] = useState(false);
  const [isCowChecked, setIsCowChecked] = useState(false);
  const [isShowToday, setIsShowToday] = useState(false);

  const currentDate = format(new Date(), "yyyy-MM-dd");

  // 🔥 Debounced filter function
  const debouncedFilter = debounce(() => {
    let filtered = [...transactions];

    // ─── Date Filter ───────────────────────────────────────
    if (isShowToday) {
      filtered = filtered.filter(
        (t) => !compareAsc(currentDate, t.TranDate__c),
      );
    }

    // ─── Cattle Type Filter ────────────────────────────────
    if (isBuffeloChecked) {
      filtered = filtered.filter((t) => t.CattleType__c == "Buffalo");
    }

    if (isCowChecked) {
      filtered = filtered.filter((t) => t.CattleType__c == "Cow");
    }

    // ─── Customer Filter ───────────────────────────────────
    if (selectedCustomers.length > 0) {
      const ids = selectedCustomers.map((c) => c.Id);
      filtered = filtered.filter((t) => ids.includes(t.Contact__c));
    }

    // ─── Fat Filter ────────────────────────────────────────
    // if (fat) {
    //   filtered = filtered.filter((t) => t.Fat__c == fat);
    // }

    // Send filtered data to parent
    filterTransactions(filtered);
  }, 300);
  // console.log(transactions);
  useEffect(() => {
    if (!isLoading && transactions.length > 0) {
      debouncedFilter();
    }

    return () => debouncedFilter.cancel();
  }, [
    transactions,
    isShowToday,
    isBuffeloChecked,
    isCowChecked,
    selectedCustomers,
    // fat,
    isLoading,
    debouncedFilter,
  ]);

  return (
    <Sidebar>
      <h2 className="text-3xl">Filters</h2>

      {/* Date Filter */}
      <div className="form-control px-5 py-4">
        <h3 className="text-xl">Date</h3>

        <label className="label flex cursor-pointer justify-start gap-4 px-4">
          <input
            type="radio"
            className="radio h-5 w-5 border-slate-700"
            checked={isShowToday}
            onChange={() => setIsShowToday(true)}
          />
          <span className="label-text text-lg">Today's Transactions</span>
        </label>

        <label className="label flex cursor-pointer justify-start gap-4 px-4">
          <input
            type="radio"
            className="radio h-5 w-5 border-slate-700"
            checked={!isShowToday}
            onChange={() => setIsShowToday(false)}
          />
          <span className="label-text text-lg">All Transactions</span>
        </label>
      </div>

      {/* Customer Filter */}
      <div className="form-control px-5 py-4">
        <h3 className="text-xl">Customer Wise</h3>
        <label className="input input-bordered textarea-md mt-2 flex items-center gap-2">
          Customer
          {/* <input
            type="text"
            className="grow"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            placeholder="e.g. 12"
          /> */}
          <div className="h-8">
            <LookupCustomer
              onSelect={(cust) => {
                if (!selectedCustomers.some((c) => c.Id === cust.Id)) {
                  setSelectedCustomers([...selectedCustomers, cust]);
                }
              }}
            />
          </div>
        </label>
        <div className="mt-3 flex flex-wrap gap-2">
          {selectedCustomers.map((cust) => (
            <div
              key={cust.Id}
              className="flex items-center rounded-full bg-slate-50 px-3 py-1 text-sm text-slate-800 shadow-sm"
            >
              <span>{cust.Name}</span>
              <button
                className="ml-2 font-bold text-slate-500 hover:text-slate-700"
                onClick={() =>
                  setSelectedCustomers(
                    selectedCustomers.filter((c) => c.Id !== cust.Id),
                  )
                }
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Fat Filter */}
      {/* <div className="form-control px-5 py-4">
        <h3 className="text-xl">Fat</h3>
        <label className="input input-bordered textarea-md mt-2 flex items-center gap-2">
          Fat
          <input
            type="number"
            className="grow"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            placeholder="e.g. 4"
          />
        </label>
      </div> */}

      {/* Cattle Type Filter */}
      <div className="form-control px-5 py-4">
        <h3 className="text-xl">Cattle Type</h3>

        <label className="label flex cursor-pointer justify-start gap-4 px-4">
          <input
            type="radio"
            className="radio h-5 w-5 border-slate-700"
            checked={isBuffeloChecked}
            onChange={() => {
              setIsBuffeloChecked(true);
              setIsCowChecked(false);
            }}
          />
          <span className="label-text text-lg">Buffalo</span>
        </label>

        <label className="label flex cursor-pointer justify-start gap-4 px-4">
          <input
            type="radio"
            className="radio h-5 w-5 border-slate-700"
            checked={isCowChecked}
            onChange={() => {
              setIsCowChecked(true);
              setIsBuffeloChecked(false);
            }}
          />
          <span className="label-text text-lg">Cow</span>
        </label>

        <label className="label flex cursor-pointer justify-start gap-4 px-4">
          <input
            type="radio"
            className="radio h-5 w-5 border-slate-700"
            checked={!isCowChecked && !isBuffeloChecked}
            onChange={() => {
              setIsBuffeloChecked(false);
              setIsCowChecked(false);
            }}
          />
          <span className="label-text text-lg">Both</span>
        </label>
      </div>
    </Sidebar>
  );
};

export default TransactionFilter;
