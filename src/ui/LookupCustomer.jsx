import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useCustomer } from "../features/customer/useCustomer";

function LookupCustomer({ onSelect }) {
  const [search, setSearch] = useState("");
  const [debounced, setDebounced] = useState("");
  const [showOptions, setShowOptions] = useState(true);

  // Customers from React Query
  const { customers } = useCustomer();

  // Debounce search input

  useEffect(() => {
    setShowOptions(true);
    const timer = setTimeout(() => setDebounced(search), 1000);
    return () => clearTimeout(timer);
  }, [search]);

  const filtered =
    debounced && customers
      ? customers.filter(
          (c) =>
            c.Name.toLowerCase().includes(debounced.toLowerCase()) && c.Status__c
        )
      : [];

  return (
    <div className="relative h-full w-full">
      {/* Search Input */}
      <input
        type="text"
        value={search}
        placeholder="Search Customer..."
        onChange={(e) => setSearch(e.target.value)}
        className="h-full w-full rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 placeholder:font-normal focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-full"
      />

      {/* Dropdown */}
      {search.length > 0 && filtered.length > 0 && showOptions && (
        <ul className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-xl">
          {filtered.map((c) => (
            <li
              key={c.Id}
              onClick={() => {
                onSelect(c); // Pass selected record
                setSearch(""); // Clear input after selection
              }}
              className="cursor-pointer px-3 py-2 hover:bg-blue-100"
            >
              <div className="text-sm">{c.Name}</div>
              {/* <div className="text-xs text-gray-500">{c.Id}</div> */}
            </li>
          ))}
        </ul>
      )}
      {search.length > 0 && filtered.length == 0 && showOptions && (
        <ul className="absolute z-20 mt-1 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-xl">
          <li className="cursor-pointer px-3 py-2 hover:bg-blue-100">
            <div className="text-sm">Not Found</div>
            {/* <div className="text-xs text-gray-500">{c.Id}</div> */}
          </li>
        </ul>
      )}
    </div>
  );
}

export default React.memo(LookupCustomer);