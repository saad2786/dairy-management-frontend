export const deleteBill = async (billId) => {

    try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/bills/${billId}`, {
            method: "DELETE",
            mode: "cors",
             headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-type": "application/json",
          "Accept": "application/json",
        }
        });
        console.log(res)
        const data = await res.json();
        return data
    } catch (err) {
        console.log(err);
  
        return err
    }
}