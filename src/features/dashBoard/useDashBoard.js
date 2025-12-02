import { useContext } from "react";
import { Context } from "../../context/useContext";

import { useCustomer } from "../customer/useCustomer";
import { useTransaction } from "../transaction/useTransaction";
import { useRate } from "../rate/useRate";

export function useDashBoard() {
  const state = useContext(Context);

  const { isFetching: customerFetching, error: customerError } = useCustomer();
  const { isFetching: transactionFetching, error: transactionError } =
    useTransaction();
  const { isFetching: rateFetching, error: rateError } = useRate();
  return {
    state,
    customerFetching,
    transactionFetching,
    customerError,
    transactionError,
    rateFetching,
    rateError,
  };
}
