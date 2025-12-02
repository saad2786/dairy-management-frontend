import { useContext, useState } from "react";
import { Context } from "../../context/useContext";
import { useQuery } from "@tanstack/react-query";
import { fetchTransactions } from "./fetchTransactions";
import { useCalculateTransactionDetails } from "./transactionCalculate";
export function useTransaction() {
  const state = useContext(Context);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { dairyId } = state;

  const {
    data: transactions,
    isLoading,
    isFetching,
    error,
    refetch,
    isRefetching
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: () => fetchTransactions(dairyId),
  });

  useCalculateTransactionDetails({ transactions });

  function openModal() {
    setIsOpenModal(true);
  }
  function closeModal() {
    setIsOpenModal(false);
  }
 
  return {
    openModal,
    closeModal,
    transactions,
    isLoading,
    error,
    isOpenModal,
    isFetching,
    refetch,
    isRefetching
  };
}
