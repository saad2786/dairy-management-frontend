import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast from "react-hot-toast";
import TableRow from "../../ui/TableRow";

export default function CustomerRow({
  idx,
  recordId,
  name,
  dairy,
  cattle,
  phone,
  status,
  isFetching,
}) {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["customers"] });
    },
  });
  async function handleDelete() {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/customers/${recordId}`,
      {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          status: !status,
        }),
      },
    );
   const data = await res.json()
    if (data.success) {
      toast.success(`Successfully changed status of ${name} `);
    } else {
      toast.error(`Error: ${data.message}`);
    }
  }

  return (
    <tr>
      <td>{idx}</td>
      <td>{name}</td>
      <td>{dairy}</td>
      <td>{cattle}</td>
      <td>{phone}</td>
      <td>
        <button
          className={` rounded-md ${status ? "bg-green-200" : "bg-red-200"} px-2 py-1 text-center text-xs  font-bold ${status ? "text-green-700" : "text-red-700"}  disabled:cursor-not-allowed sm:text-base`}
          onClick={mutate}
          disabled={isFetching}
        >
          {status ? "Active" : "Inactive"}
        </button>
      </td>
    </tr>
  );
}
