export async function fetchBills(dairyId) {
  let data;
  try {
    const res = await fetch(
      `${import.meta.env.VITE_BASE_URL}/bills/${dairyId}`,
      {
        method: "GET",
      },
    );
    data = await res.json();
    data = await data.records;
  } catch (err) {
    console.log(err);
  }

  return data;
}
