import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaPen, FaCheck, FaTimes, FaTrash } from "react-icons/fa";
import { updateBillStatus } from "./updateBillStatus";
import { deleteBill } from "./deleteBill";
import { render } from "react-dom";
import Loader from "../../ui/Loader";

export default function BillRow({
  id,
  customer,
  fromDate,
  toDate,
  status,
  selectBill,
  selected,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [newStatus, setNewStatus] = useState(status);

  const picklistOptions = ["Draft", "Pending", "Paid", "Cancelled"];

  const queryClient = useQueryClient();

  // 🔥 Mutation setup
  const updateStatus = useMutation({
    mutationFn: updateBillStatus,
    onSuccess: () => {
      toast.success("Status updated");
      queryClient.invalidateQueries(["bills"]); // Refresh table
      setIsEditing(false);
    },
    onError: () => {
      toast.error("Failed to update");
    },
  });
  
  const deleteMutation = useMutation({
    mutationFn: deleteBill,
    onMutate: () => {
      selectBill(null);
      setIsDeleting(true);
    },
    onSuccess: () => {
      toast.success("Bill deleted");
      queryClient.invalidateQueries(["bills"]); // refresh table
    },
    onError: () => {
      toast.error("Failed to delete");
    },
   
  });

  const handleSave = () => {
    updateStatus.mutate({ billId: id, status: newStatus });
  };

  const handleDelete = () => {
    toast(
      (t) => (
        <div className="flex flex-col items-center gap-2">
          <span>
            Are you sure you want to delete this bill of{" "}
            <strong>{customer}</strong>?
          </span>
          <div className="flex w-full justify-end gap-2">
            <button
              className="btn btn-error px-3 py-1"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </button>
            <button
              className="btn btn-success px-3 py-1"
              onClick={() => {
                deleteMutation.mutate(id);
                toast.dismiss(t.id);
              }}
            >
              Yes
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
      },
    );
      setIsDeleting(false);
  };
  if(isDeleting) return <Loader />
  return (
    <tr
      className={`${selected ? "bg-slate-300" : ""} hover:bg-slate-200`}
      onClick={() => selectBill(id)}
    >
      <td>{customer}</td>
  
      <td className="py-2">
        <div className="w-40">{fromDate}</div>
      </td>
      <td className="py-2">
        <div className="w-40">{toDate}</div>
      </td>

      {/* STATUS CELL */}
      <td>
        {!isEditing ? (
          <div className="flex items-center justify-end gap-4">
            <span
              className={` rounded px-3 py-1 text-[16px] ${status == "Paid" ? " bg-green-200  text-green-800" : status == "Pending" ? "bg-amber-200 text-amber-800" : status == "Cancelled" ? "bg-red-200  text-red-800" : "bg-gray-200 text-gray-800"}`}
            >
              {status}
            </span>
            <button
              className="text-blue-600"
              onClick={() => setIsEditing(true)}
              title="Edit Status"
            >
              <FaPen size={14} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <select
              className="rounded border border-slate-400 px-2 py-1"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value)}
            >
              {picklistOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>

            {/* SAVE */}
            <button className="text-green-600" onClick={handleSave}>
              <FaCheck size={16} />
            </button>

            {/* CANCEL */}
            <button
              className="text-red-600"
              onClick={() => {
                setNewStatus(status);
                setIsEditing(false);
              }}
            >
              <FaTimes size={16} />
            </button>
          </div>
        )}
      </td>
      <td>
        <button
          className="rounded bg-red-100 px-3 py-2 text-red-800"
          title="Delete Bill Record"
          onClick={handleDelete}
        >
          <FaTrash size={14} />
        </button>
      </td>
    </tr>
  );
}
