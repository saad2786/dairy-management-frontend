import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Spinner from "../../ui/Spinner";
import SubmitButtton from "../../ui/SubmitButtton";
import { Context } from "../../context/useContext";
// import { useCustomer } from "../customer/useCustomer";
import { fetchCustomers } from "../customer/fetchCustomers";

export default function NewTransaction({ closeModal }) {
  const { handleSubmit, register, reset } = useForm();
  const { dairyId } = useContext(Context);
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (data) => onSubmit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
  });
  const isSubmitting = status === "pending";
  async function isActiveCustomer({ customerId }) {
    const promise = fetchCustomers(dairyId);
    const customers = await promise;
    const res = await customers.find(
      (customer) => customer.Id === customerId,
    );

    const activeStatus = (await res.Status__c) ? true : false;
    return activeStatus;
  }
  async function onSubmit(data) {
    try {
      const active = await isActiveCustomer(data);

      if (!active) {
        toast("This customer is not an active customer", {
          icon: "⚠️",
        });
        return;
      }
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/transactions/new`,
        {
          method: "POST",
          mode: "cors",
           headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-type": "application/json",
          "Accept": "application/json",
        },
          body: JSON.stringify({ ...data, dairyId }),
        },
      );
      const newTransaction = await res.json();
      console.log(newTransaction);
      if (newTransaction === 5) {
        toast.success("Successfully added new transaction ");
        reset();
        closeModal();
      } else {
        toast.error("Invalid customer ID or cattle type ");
        throw new Error("Invalid customer ID or cattle type ");
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <>
      <h2 className="py-5 text-center">Add Transaction</h2>
      <form
        className="flex  flex-col items-center gap-10"
        onSubmit={handleSubmit(mutate)}
      >
        <input
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="text"
          required
          disabled={isSubmitting}
          placeholder="Customer ID"
          id="customerId"
          {...register("customerId", { required: "This field is required" })}
        />
        <select
          disabled={isSubmitting}
          required
          className="h-12 w-[300px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          placeholder="Select Cattle"
          id="cattle"
          {...register("cattle")}
        >
          <option className="text-base font-semibold">Buffalo</option>
          <option className="text-base font-semibold">Cow</option>
        </select>
        <input
          className="h-12 w-[300px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="number"
          step="0.01"
          disabled={isSubmitting}
          required
          placeholder="Milk fat"
          id="fat"
          {...register("fat", {
            required: "This field is required",
          })}
        />
        <input
          className="h-12 w-[300px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="number"
          required
          disabled={isSubmitting}
          placeholder="Quantity(in Liters)"
          id="quantity"
          {...register("quantity", { required: "This field is required" })}
        />

        <SubmitButtton disabled={isSubmitting}>
          {isSubmitting ? <Spinner /> : "Add"}
        </SubmitButtton>
      </form>
      {/* </form> */}
      {/* <button
        className="btn btn-active  w-80 rounded-xl px-3 py-2 text-xl uppercase  disabled:cursor-not-allowed disabled:bg-opacity-65"
        onClick={() => navigate(-1)}
        disabled={isSubmitting}
      >
        Show Transctions
      </button> */}
    </>
    // </div>
  );
}
