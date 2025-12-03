export async function fetchRates(dairyId) {
  try {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/rates`, {
      method: "POST",
      mode: "cors",
       headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-type": "application/json",
          "Accept": "application/json",
        },
      body: JSON.stringify({
        dairyId,
      }),
    });
    let rawData = await res.json();
  
    return rawData.data;
  } catch (err) {
    console.log(err);
    return err;
  }
}
