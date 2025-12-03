export async function deleteTransaction(transactionId) {
  let data;

  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/transactions/${transactionId}`,
      {
        method: "DELETE",
         headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-type": "application/json",
          "Accept": "application/json",
        }
      },
    );
    data = await res.json();
    data = await data.recordset;
  } catch (err) {}
  return data;
}
