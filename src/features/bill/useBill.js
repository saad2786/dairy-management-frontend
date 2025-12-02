import { useContext, useEffect } from "react";
import { Context } from "../../context/useContext";
import { useQuery } from "@tanstack/react-query";
import { fetchBills } from "./fetchBills";

function useBill() {
  const state = useContext(Context);
  const { dairyId } = state;
  // const dispatch = useContext(DispatchContext);

  //React Query for fetching data
  const {
    data: bills,
    error,
    isFetching,
    isLoading
  } = useQuery({
    queryKey: ["bills"],
    queryFn: () => fetchBills(dairyId),
  });

  // useEffect(() => {
  //   const billDetails = {
  //     paidCustomer: bills?.filter((bill) => {
  //       if (bill?.STATUS) return bill;
  //       return null;
  //     }).length,
  //     unpaidCustomer: bills?.filter((bill) => {
  //       if (!bill?.STATUS) return bill;
  //       return null;
  //     }).length,
  //   };
  //   dispatch({
  //     type: "bill",
  //     payload: billDetails,
  //   });
  // }, [bills, dispatch]);
  return { bills, error, isFetching, isLoading };
}
export default useBill;
