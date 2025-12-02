import { useContext, useEffect } from "react";
import { DispatchContext } from "../../context/useContext";
import { format, compareAsc } from "date-fns";

export function useCalculateTransactionDetails({ transactions }) {
  const dispatch = useContext(DispatchContext);
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const today = new Date();
  const firstDateOfMonth = format(
    new Date(today.getFullYear(), today.getMonth(), 1),
    "yyyy-MM-dd",
  );
  useEffect(() => {
    const transactionDetails = {
      todayTransactionQty: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.TranDate__c);
          if (transactionDate === format(new Date(currentDate), "dd-MM-yyyy"))
            qty += transaction.TotalQty__c;
          return qty;
        }, 0),
      ),
      todayTransactionAmount: Math.floor(
        transactions?.reduce((amount, transaction) => {
          const transactionDate = new Date(transaction.TranDate__c);
          if (!compareAsc(currentDate, transactionDate)) {
            amount += transaction.TotalPrice__c;
          }
          return amount;
        }, 0),
      ),
      todayBuffeloMilk: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.TranDate__c);
          if (
            !compareAsc(currentDate, transactionDate) &&
            !transaction.CattleType__c
          ) {
            qty += transaction.TotalQty__c;
          }
          return qty;
        }, 0),
      ),
      todayCowMilk: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.TranDate__c);
          if (
            !compareAsc(currentDate, transactionDate) &&
            transaction.CattleType__c
          ) {
            qty += transaction.TotalQty__c;
          }
          return qty;
        }, 0),
      ),
      todayTransactionQty: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.TranDate__c);
          if (!compareAsc(currentDate, transactionDate)) {
            qty += transaction.TotalQty__c;
          }
          return qty;
        }, 0),
      ),
      totalTransaction: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.TranDate__c);
          if (
            transactionDate >= new Date(firstDateOfMonth) &&
            transactionDate <= new Date(currentDate)
          )
            qty += transaction.TotalQty__c;
          return qty;
        }, 0),
      ),
      buffeloTransaction: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.TranDate__c);
          if (
            transactionDate >= new Date(firstDateOfMonth) &&
            transactionDate <= new Date(currentDate) &&
            !transaction.CattleType__c
          )
            qty += transaction.TotalQty__c;
          return qty;
        }, 0),
      ),
      cowTransaction: Math.floor(
        transactions?.reduce((qty, transaction) => {
          const transactionDate = new Date(transaction.TranDate__c);
          if (
            transactionDate >= new Date(firstDateOfMonth) &&
            transactionDate < new Date(currentDate) &&
            transaction.CattleType__c
          )
            qty += transaction.TotalQty__c;
          return qty;
        }, 0),
      ),
    };
    dispatch({
      type: "transaction",
      payload: transactionDetails,
    });
  }, [transactions, currentDate, dispatch, firstDateOfMonth]);
}
