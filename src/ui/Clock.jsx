import React, { useEffect, useState } from "react";
import { format } from "date-fns";
export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      const dateObject = new Date();

      // const hour = dateObject.getHours();
      // const minute = dateObject.getMinutes();
      // const second = dateObject.getSeconds();

      // const currentTime = { hour, minute, second };

      setTime(dateObject);
    }, 1000);
  }, []);
  return (
    <div className=" text-4xl">
      {/* <span>{time.hour}</span> :<span>{time.minute}</span> :
      <span>{time.second}</span> */}
     { format(time, "hh:mm:ss aa")}
    </div>
  );
}
