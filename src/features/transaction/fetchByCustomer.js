export async function fetchByCustomer({ dairyId, customerId }) {
  let data;
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/transactions/customer`,
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ dairyId, customerId }),
      },
    );
    data = await res.json();
    console.log(data)

  } catch (err) {
    console.log(err.message);
  }
  return data;
}
