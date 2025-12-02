import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";
import { VscRefresh } from "react-icons/vsc";

import TransactionTable from "./TransactionTable";
import TransactionFilter from "./TransactionFilter";
import AddTransaction from "./AddTransaction";
import { useTransaction } from "./useTransaction";
import { fetchByCustomer } from "./fetchByCustomer";
import { useState } from "react";
import { useCustomer } from "../customer/useCustomer";
import toast from "react-hot-toast";

export default function Transactions() {
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [customer, setCustomer] = useState("");
  const { transactions, isLoading, error, refetch, isRefetching } = useTransaction();
  const { customers } = useCustomer();

  const customerIds = customers?.map((item) => item.Id);
  async function SearchTransactions(data) {
  
    const response = await fetchByCustomer(data);
    const transactions = await response.transactions;

    if (customerIds?.find((customerId) => customerId == data.customerId)) {

      setCustomer(response);
      setFilteredTransactions(transactions);
    } else {
      toast.error("Customer is invalid");
    }
  }

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <div className=" grid h-full  w-full grid-cols-5 grid-rows-1  overflow-hidden rounded-md">
      <TransactionFilter
        transactions={transactions}
        filterTransactions={setFilteredTransactions}
        isLoading={isLoading}
      />
      {/* <ShowButton openModal={openModal}>+ Add Transaction</ShowButton> */}
      <div className="col-span-4  px-10 py-8">
        <AddTransaction
          SearchTransactions={SearchTransactions}
          customer={customer}
          setCustomer={setCustomer}
          setFilteredTransactions={setFilteredTransactions}
          isLoading={isLoading}
        />
        <button className="btn btn-circle bg-slate-400 mb-4" onClick={refetch} title="Refresh Table">
          <VscRefresh size={20} />
        </button>
        {!isRefetching &&

          <TransactionTable transactions={filteredTransactions} />
        }
        {/* {isOpenModal && (
          <Modal closeModal={closeModal}>
            <NewTransaction closeModal={closeModal} />
          </Modal>
        )} */}
      </div>
    </div>
  );
}
