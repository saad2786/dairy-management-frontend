export async function getBillDetails(billId) {
  let data;
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/bills/details/${billId}`,
      {
        method: "GET",
      },
    );
    data = await res.json();
    console.log(data)
    return data
  } catch (err) {
    console.log(err);
  }

  return data;
}
