import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { DatePicker } from "../../ui/DatePicker";
import SubmitButtton from "../../ui/SubmitButtton";
import Spinner from "../../ui/Spinner";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useAuthContext } from "../../context/useContext";
import { useNavigate } from "react-router-dom";
import LookupCustomer from "../../ui/LookupCustomer";
import { format } from "date-fns";
import { data } from "autoprefixer";

export default function GenerateBill({ setBills, closeModal }) {
  const {
    handleSubmit,
    reset,
    control,
    watch,
    formState: { errors },
  } = useForm();

  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const [customer, setCustomer] = useState("");
  const { dairyId } = useAuthContext();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate, status } = useMutation({
    mutationFn: (data) => onSubmit(data),
    onSuccess: () => {
      queryClient.invalidateQueries(["bills"]);
    },
    onError: () => {
      toast.error("Somthing went wrong!");
    },
  });

  const isCreating = status === "pending";

  async function onSubmit(data) {
    if (!customer) {
      toast.error("Please select a customer!");
      return;
    }
    console.log(data);

    try {
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/bills`, {
        method: "POST",
        mode: "cors",
        headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify({
          endDate: format(data.endDate, "yyyy-MM-dd"),
          startDate: format(data.startDate, "yyyy-MM-dd"),
          dairyId,
          customerId: customer.Id,
        }),
      });
      console.log(res);
      if (res.status == 204) {
        console.log(res.status);
        toast(
          "There are no transaction of selected customer in this date range",
          { icon: "⚠️" },
        );
      } else if (res.status == 200) {
        const responseData = await res.json();
        console.log(responseData);
        reset();
        setBills((prev) => [...prev, responseData.record]);
        toast.success("Bill has been created");
        closeModal();
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="w-full">
      <div className="w-full  rounded-xl bg-white p-10 shadow-lg">
        <h2 className="mb-6 text-center text-xl font-semibold">
          Calculate Bill
        </h2>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit(mutate)}>
          {/* Customer */}
          <div className="flex w-full flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Customer <span className="text-red-500">*</span>
            </label>

            {!customer && <LookupCustomer onSelect={(e) => setCustomer(e)} />}

            {customer && (
              <div className="flex items-center justify-between rounded-lg border border-stone-700 bg-gray-50 px-3 py-2 text-sm">
                <span className="font-medium text-gray-800">
                  {customer.Name}
                </span>
                <button
                  type="button"
                  onClick={() => setCustomer("")}
                  className="ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-gray-300 text-sm font-bold hover:bg-gray-400"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Customer Error */}
            {!customer && (
              <p className="text-sm text-red-500">Customer is required</p>
            )}
          </div>

          {/* Start Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Start Date <span className="text-red-500">*</span>
            </label>

            <DatePicker
              control={control}
              placeholder="From which date?"
              name="startDate"
              disabled={isCreating}
              rules={{
                required: "Start date is required",
                validate: {
                  notFuture: (value) =>
                    value <= new Date() || "Start date cannot be a future date",
                },
              }}
            />

            {errors.startDate && (
              <p className="text-sm text-red-500">{errors.startDate.message}</p>
            )}
          </div>

          {/* End Date */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              End Date <span className="text-red-500">*</span>
            </label>

            <DatePicker
              control={control}
              placeholder="To which date?"
              name="endDate"
              disabled={isCreating}
              rules={{
                required: "End date is required",
                validate: {
                  afterStart: (value) =>
                    !startDate ||
                    value >= startDate ||
                    "End date must be after Start date",
                  notFuture: (value) =>
                    value <= new Date() || "End date cannot be a future date",
                },
              }}
            />

            {errors.endDate && (
              <p className="text-sm text-red-500">{errors.endDate.message}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="mt-4 flex justify-end">
            <SubmitButtton className="w-[48%] " disabled={isCreating}>
              {isCreating ? <Spinner /> : "Create Bill"}
            </SubmitButtton>
          </div>
        </form>
      </div>
    </div>
  );
}
