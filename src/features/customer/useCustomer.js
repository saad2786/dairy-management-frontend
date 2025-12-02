import { useContext, useEffect, useState } from "react";
import { Context, DispatchContext } from "../../context/useContext";
import { fetchCustomers } from "./fetchCustomers";
import { useQuery } from "@tanstack/react-query";

export function useCustomer() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch = useContext(DispatchContext);
  const { dairyId } = useContext(Context);

  //React Query for fetching data
 const {
  data: customers,
  isFetching,
  isLoading,
  error,
} = useQuery({
  queryKey: ["customers", dairyId],
  queryFn: () => fetchCustomers(dairyId),
  select: (data) => data || [], // memoizes the array
});

  //Calcaulte customer details
  useEffect(() => {
    const customerDetails = {
      totalCustomer: customers?.length,
    };
    dispatch({
      type: "customer",
      payload: customerDetails,
    });
  }, [customers, dispatch]);
  function openModal() {
    setIsOpenModal(true);
  }
  function closeModal() {
    setIsOpenModal(false);
  }

  return {
    customers,
    isFetching,
    isLoading,
    error,
    isOpenModal,
    openModal,
    closeModal,
  };
}
