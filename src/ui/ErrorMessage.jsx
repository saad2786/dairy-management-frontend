import React from "react";
import { BiError } from "react-icons/bi";
import { PiSmileySadDuotone } from "react-icons/pi";

export default function ErrorMessage() {
  return (
    <div className=" stats  flex flex-col items-center gap-10 rounded-xl bg-rose-100 px-8 py-10 shadow-lg">
      {/* <BiError style={{ fontSize: "100px", color: "red" }} /> */}
      <PiSmileySadDuotone style={{ fontSize: "100px", color: "crimson" }} />
      <p>Server is down right now , please try after some time🙏</p>
    </div>
  );
}
