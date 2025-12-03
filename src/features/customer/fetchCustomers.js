export async function fetchCustomers(dairyId) {
  let data;

  try {
    const token = localStorage.getItem('token')
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/customers`, {
      method: "POST",
      mode: "cors",
      headers: {
        "authorization":`Bearer ${token}`,
        "Content-type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ dairyId }),
    });
    data = await res.json();
 
    data = await data.records;
    // console.log("Customers: "+JSON.stringify(data))

  } catch (err) {
    console.log(err);
  }

  return data;
}
