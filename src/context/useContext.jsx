import React, { createContext, useContext, useReducer } from "react";

export const Context = createContext();
export const DispatchContext = createContext();

export const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  return (
    <Context.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </Context.Provider>
  );
};

const INITIAL_STATE = {
  dairyId: sessionStorage.getItem("dairyId"),
  // dairyId: 'a0vNS00000N3PCjYAN',
  dairyName: sessionStorage.getItem("dairyName"),
  // dairyName: "saad",
  totalCustomer: 0,
  totalTransaction: 0,
  buffeloTransaction: 0,
  cowTransaction: 0,
  cowMilkPrice: 0,
  buffeloMilkPrice: 0,
  todayTransactionsAmount: 0,
  todayTransactionQty: 0,
};

function reducer(state, action) {
  switch (action.type) {
    case "authenticate":
      return {
        ...state,
        dairyId: action.payload.dairyId,
        dairyName: action.payload.dairyName,
      };
    case "customer":
      return {
        ...state,
        totalCustomer: action.payload.totalCustomer,
      };
    case "transaction":
      return {
        ...state,
        todayTransactionAmount: action.payload.todayTransactionAmount,
        totalTransaction: action.payload.totalTransaction,
        todayBuffeloMilk: action.payload.todayBuffeloMilk,
        todayCowMilk: action.payload.todayCowMilk,
        todayTransactionQty: action.payload.todayTransactionQty,
        buffeloTransaction: action.payload.buffeloTransaction,
        cowTransaction: action.payload.cowTransaction,
      };
    case "rate":
      return {
        ...state,
        cowMilkPrice: action.payload.cowMilkPrice,
        buffeloMilkPrice: action.payload.buffeloMilkPrice,
      };
    default:
      throw new Error("Unknown error: " + action.type);
  }
}

// async function fetchDetails() {
//   const customers = await fetchCustomers();
//   const transactions = await fetchTransactions();

//   const customerDetails = {
//     totalCustomer: customers?.length || 0,
//     activeCustomer:
//       customers?.filter?.((customer) => customer?.STATUS && customer).length ||
//       0,
//   };

//   const transactionDetails = {
//     todayTransactionAmount: Math.floor(
//       transactions?.reduce(
//         (amount, transaction) => (amount += transaction.PRICE),
//         0,
//       ),
//     ),
//     todayTransactionQty: Math.floor(
//       transactions?.reduce((qty, transaction) => (qty += transaction.QTY), 0),
//     ),
//     lastMonthBuffeloMilkQty: transactions?.reduce((qty, transaction) => {
//       if (!transaction.CATTLE_TYPE) qty += transaction.QTY;
//       return qty;
//     }, 0),
//     lastMonthCowMilkQty: transactions?.reduce((qty, transaction) => {
//       if (transaction.CATTLE_TYPE) qty += transaction.QTY;
//       return qty;
//     }, 0),
//     highestFatBuffelo: transactions?.reduce((fat, transaction) => {
//       if (!transaction.CATTLE_TYPE) fat = Math.max(fat, transaction.FAT);
//       return fat;
//     }, 0),
//     lowestFatBuffelo: transactions?.reduce((fat, transaction) => {
//       if (!transaction.CATTLE_TYPE) fat = Math.min(fat, transaction.FAT);
//       return fat;
//     }, Infinity),
//     highestFatCow: transactions?.reduce((fat, transaction) => {
//       if (transaction.CATTLE_TYPE) fat = Math.max(fat, transaction.FAT);
//       return fat;
//     }, 0),
//     lowestFatCow: transactions?.reduce((fat, transaction) => {
//       if (transaction.CATTLE_TYPE) fat = Math.min(fat, transaction.FAT);
//       return fat;
//     }, Infinity),
//   };

//   return { customerDetails, transactionDetails };
// }

export const useAuthContext = () => useContext(Context);
