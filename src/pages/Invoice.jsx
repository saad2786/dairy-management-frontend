import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import PrintPage from "../ui/PrintPage";

function Invoice() {
  const contentToPrint = useRef(null);
  const handlePrint = useReactToPrint({
    documentTitle: "Print This Document",
    removeAfterPrint: true,
  });

  return (
    <div className="flex  flex-col items-center justify-center pt-12  ">
      <div className="w-[800px] pb-6">
        <header className=" flex w-full flex-col  items-end justify-end rounded-t-md bg-gray-200 p-6 shadow-md">
          <button
            onClick={() => {
              handlePrint(null, () => contentToPrint.current);
            }}
            className="btn btn-primary btn-sm rounded-md px-4 font-normal"
          >
            Print
          </button>
        </header>
        <main
          className="shadow-x-md print-page   relative   flex  h-full w-full flex-col   items-center  justify-center rounded-md  bg-gray-200 px-6 pt-6"
          ref={contentToPrint}
        >
          <PrintPage />
          <footer className="footer footer-center mt-6  w-[800px] rounded-b-md bg-gray-300 p-4 text-base-content">
            <aside className="">
              <div className=" flex w-full items-center justify-between gap-10">
                <p>
                  <span className="font-semibold">MN- </span>
                  Morning Shift
                </p>
                <p>
                  <span className="font-semibold">EN- </span>
                  Evening Shift
                </p>
              </div>
              <p>Copyright © 2024 - All right reserved by Sapp</p>
            </aside>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default Invoice;
