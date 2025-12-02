import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/useContext";
import Spinner from "../../ui/Spinner";
import SubmitButtton from "../../ui/SubmitButtton";

export default function ChangeRate() {
  const { register, handleSubmit, reset } = useForm();
  const { dairyId } = useAuthContext();
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: (data) => onSubmit(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["rates"] });

      reset();
    },
    onError: () => {
      toast.error("Something went wrong!");
    },
  });
  const isChanging = status === "pending";
  async function onSubmit(data) {
    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/rates/new`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data, dairyId }),
      });
      if (res.ok) {
        toast.success("Rate milk changed successfully");
      } else {
        toast.error("Somthing went wrong!");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="flex flex-[1] h-full  w-full flex-col items-center justify-center gap-10  py-10 px-10  ">
      <form
        className="flex  flex-col items-start gap-5  bg-slate-300 py-10 px-10 rounded-lg shadow-lg"
        onSubmit={handleSubmit(mutate)}
      >
        <h3>Set New Rates</h3>
        <input
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="number"
          step="0.01"
          disabled={isChanging}
          required
          placeholder="Milk fat"
          id="fat"
          {...register("fat", {
            required: "This field is required",
          })}
        />
        <select
          disabled={isChanging}
          required
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          placeholder="Select Cattle"
          id="cattle"
          {...register("cattle")}
        >
          <option className="   text-base font-semibold">Buffalo</option>
          <option className="   text-base font-semibold">Cow</option>
        </select>
        <input
          className="h-12 w-[200px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
          type="number"
          required
          disabled={isChanging}
          placeholder="Rate(Price/Ltr)"
          id="quantity"
          {...register("rate", { required: "This field is required" })}
        />

        <SubmitButtton disabled={isChanging}>
          {isChanging ? <Spinner /> : "Update Rate"}
        </SubmitButtton>
      </form>
    </div>
  );
}
