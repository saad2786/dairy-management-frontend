export async function deleteTransaction(transactionId) {
  let data;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/transactions/${transactionId}`,
      {
        method: "DELETE",
      },
    );
    data = await res.json();
    data = await data.recordset;
  } catch (err) {}
  return data;
}
