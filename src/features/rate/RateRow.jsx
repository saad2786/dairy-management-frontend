import React from "react";

export default function RateRow({ fat, rate, cattle, startDate, active }) {
  console.log(active)
  return (
    <tr className={`${active? "bg-green-100 font-semibold":""} mt-10`}>
      <td>{cattle }</td>
      <td>{fat}</td>
      <td>{rate}</td>
      <td>{startDate}</td>
    </tr>
  );
}
