import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCustomer } from "../features/customer/useCustomer";
import { useTransaction } from "../features/transaction/useTransaction";
import { format } from "date-fns";
import Spinner from "./Spinner";
import InvoiceTable from "../features/invoice/InvoiceTable";
import ErrorMessage from "./ErrorMessage";
import Loader from "./Loader";

function PrintPage() {
  const { customerId } = useParams();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [billno, setBillno] = useState("");
  const { customers, isLoading, error } = useCustomer();
  const {
    transactions: allTransactions,
    isLoading: isLoadingTransactions,
    error: transactionError,
  } = useTransaction();
  const todayDate = format(new Date(), "dd-MM-yyyy");
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const fromParam = queryParams.get("from");
    const toParam = queryParams.get("to");
    const billnoParam = queryParams.get("billNo");
    setFrom(fromParam);
    setBillno(billnoParam);
    setTo(toParam);
  }, []);

  const name = customers?.find(
    (customer) => customer.CUSTOMER_ID === Number(customerId),
  )?.CUSTOMER_NAME;
  const transactions = allTransactions
    ?.filter((transaction) => transaction.CUSTOMER_ID === Number(customerId))
    ?.filter(
      (transaction) => transaction.DATE >= from && transaction.DATE <= to,
    );
  // console.log(transactions);

  if (isLoading) return <Loader />;
  if (error || transactionError) return <ErrorMessage />;

  return (
    <>
      <span className="absolute left-8 top-6 text-base font-light ">
        {todayDate}
      </span>
      <header className="w-full px-10">
        <h1 className="mb-4 text-center text-3xl">The Milk Dairy</h1>
        <div className="w-full border border-slate-700  text-base font-normal">
          <div className="flex items-center justify-center border-b border-slate-600">
            <div className="w-1/3 border-r  border-slate-600 p-2">
              Bill No.: {billno}
            </div>
            <div className="w-2/3 p-2">Name: {name} </div>
          </div>

          <div className="flex items-center justify-center ">
            <div className="w-1/3 border-r  border-slate-600 p-2">
              Account No.: {customerId}
            </div>
            <div className="w-1/3 border-r  border-slate-600 p-2">
              From Date: {from && format(new Date(from), "dd MMM yyyy")}
            </div>
            <div className="w-1/3  p-2">
              To Date: {to && format(new Date(to), "dd MMM yyyy")}
            </div>
          </div>
        </div>
      </header>
      {isLoadingTransactions ? (
        <Spinner />
      ) : (
        <main className="mt-8 bg-white p-4">
          <InvoiceTable transactions={transactions} />
        </main>
      )}
    </>
  );
}

export default PrintPage;
