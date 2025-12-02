export const updateBillStatus = async ({ billId, status }) => {
    
    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/bills/status`, {
              method: "PUT",
              mode: "cors",
              headers: {
                "Content-type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({billId, status}),
            });

    const data = await res.json();
    console.log(data)
  } catch (err) {
    console.log(err);
    }
}