import { format } from "date-fns";
import React from "react";

export default function TransactionRow({
  id,
  customer,
  cattle,
  mornqty,
  mornfat,
  mornprice,
  evenqty,
  evenfat,
  evenprice,
  totalMilk,
  totalPrice,
  date,
}) {
  return (
    <tr className="border-t border-slate-300 bg-slate-100">
      {/* <td className="py-2">{id}</td> */}
      <td className=" py-2 ">
        <div className="w-24">{format(date, "dd-LLL-yyyy")}</div>
      </td>
      <td className="py-2">
        <div className="w-40">{customer}</div>
      </td>
      <td className="py-2">{cattle}</td>
      <td className="py-2">{mornfat || "-"}</td>
      <td className="py-2">{mornqty || "-"}</td>
      <td className="py-2">{mornprice}</td>
      <td className="py-2">{evenfat || "-"}</td>
      <td className="py-2">{evenqty || "-"}</td>
      <td className="py-2">{evenprice}</td>
      <td className="py-2">{totalMilk}</td>
      <td className="py-2">{Math.floor(totalPrice)}</td>
    </tr>
  );
}
