import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Context } from "../../context/useContext";
import { DatePicker } from "../../ui/DatePicker";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import toast from "react-hot-toast";
import LookupCustomer from "../../ui/LookupCustomer";

const AddTransaction = ({
  SearchTransactions,
  customer,
  setCustomer,
 
}) => {
  const { control } = useForm();
  const [customerId, setCustomerId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [fat, setFat] = useState("");
  const [shift, setShift] = useState(false);
  const [rate, setRate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [totalPrice, setTotalPrice] = useState("");
  const state = useContext(Context);
  const { dairyId } = state;
  const cattle = customer.CattleType__c;
  // Reference for date picker
  const dateRef = useRef(null);
  const nameRef = useRef(null);
  // Fetch rates data using useQuery hook
  // const { data: rates } = useQuery({
  //   queryKey: ["rates"],
  //   queryFn: () => fetchRates(dairyId),
  // });
  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();

    if (hours >= 12) {
      setShift(0);
    } else {
      setShift(1);
    }
  }, []);
  // Handler for form submission
  async function handleSubmit() {
    const data = {
      customerId,
      dairyId,
      cattle,
      fat,
      shift,
      quantity,
      date: format(dateRef.current.props.selected, "yyyy-MM-dd"),
    };

    //  Perform API call to save transaction data
    try {
      setIsLoading(true);
      const res = await fetch(
        `${import.meta.env.VITE_BASE_URL}/transactions/new`,
        {
          method: "POST",
          mode: "cors",
           headers: {
          "authorization": `Bearer ${localStorage.getItem('token')}`,
          "Content-type": "application/json",
          "Accept": "application/json",
        },
          body: JSON.stringify(data), // Sending the transaction data in the request body
        },
      );

      if (res.ok) {
        toast.success("Transaction Added Successfully");
        resetForm();
      } else {
        toast.error("Failed to save transaction:", res.statusText);
      }
    } catch (error) {
      toast.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  }
  const handleSelectCustomer = useCallback(
    (cust) => {
      setCustomerId(cust.Id);
      setCustomer(cust);
    },
    [setCustomer], // IMPORTANT
  );

  //Reset Forms
  function resetForm() {
    setCustomerId("");
    setFat("");
    setQuantity("");
    setRate("");
    setTotalPrice("");
    setCustomer("");
    nameRef.current.value = "";
  }

  // Fetch rate based on fat and cattle type
  // function fetchRate() {
  //   const currRate = rates?.find(
  //     (rate) => rate.Fat__c === Number(fat) && rate.CattleType__c === cattle,
  //   );
  //   if (currRate) {
  //     setRate(currRate.Price__c);
  //     const price = currRate.Price__c * quantity;
  //     setTotalPrice(price);
  //   }
  // }

  return (
    <div className="mb-6 flex items-start justify-between rounded-lg bg-slate-300 p-6">
      <div className="flex w-1/2 flex-col items-start justify-start gap-4">
        {/* Search form */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            SearchTransactions({ dairyId, customerId });
          }}
        >
          <div className="h-10 w-[150px] sm:w-[25vw]">
          <LookupCustomer onSelect={handleSelectCustomer} />
          </div>
        </form>
        {/* Display customer name */}
        <div>
          <input
            type="text"
            className="h-10 w-[150px] rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 focus:outline-none focus:ring-4 disabled:bg-opacity-65 sm:w-[25vw]"
            value={customer.Name}
            ref={nameRef}
            disabled
            placeholder="Customer Name"
          />
        </div>
        {/* Date picker */}
        <div className="h-8 w-[150px] sm:w-[25vw] flex items-center justify-between">
          <label htmlFor="date" className="text-lg">
          Transaction Date: 
          </label>
          <DatePicker
            control={control}
            dateRef={dateRef}
            name="date"
            disabled={false}
            defaultValue={Date.now()}
           
          />
        </div>
        {/* Shift selection */}
        <div className="relative mt-4 flex w-fit items-center justify-start gap-4 rounded-2xl border border-slate-800 px-4 py-4">
          <span className="absolute -top-3 left-3 bg-slate-300 px-2 text-base font-semibold">
            Select Time
          </span>
          <div className="flex items-center justify-center gap-2 text-[18px]">
            <input
              type="radio"
              name="radio-1"
              id="radio1"
              className="radio radio-sm"
              checked={shift}
              onChange={() => setShift(true)}
            />
            <label htmlFor="radio1">Morning</label>
          </div>
          <div className="flex items-center justify-center gap-2 text-[18px]">
            <input
              type="radio"
              name="radio-1"
              id="radio2"
              className="radio radio-sm"
              checked={!shift}
              onChange={() => setShift(false)}
            />
            <label htmlFor="radio2">Evening</label>
          </div>
        </div>
      </div>
      <div className="w-1/3  text-base">
        {/* Transaction details form */}
        {customer && (
          <>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-2 rounded-md border border-slate-800 p-4 shadow-md"
            >
              {/* Quantity input */}
              <div className="w-full">
                <label htmlFor="qty">Quantity:</label>
                <input
                  type="number"
                  name="qty"
                  id="qty"
                  placeholder="Enter Milk Quantity"
                  className="h-10 w-full rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 placeholder:font-normal focus:outline-none focus:ring-4 disabled:bg-opacity-65"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              {/* Fat input */}
              <div className="w-full">
              
                  <label htmlFor="qty">Fat:</label>
                  <input
                    type="number"
                    name="qty"
                    id="qty"
                    placeholder="Enter Milk Fat"
                    className="h-10 w-full rounded-lg border border-solid border-stone-700 px-2 py-3 text-base font-semibold ring-stone-400 placeholder:font-normal focus:outline-none focus:ring-4 disabled:bg-opacity-65"
                    value={fat}
                    onChange={(e) => setFat(e.target.value)}
                    required
                  />
                </div>
    
              {/* Total price input */}
            </form>
            {/* Buttons */}
            <div className="flex items-center gap-2 px-2 py-4">
              <button
                className="btn btn-success btn-sm px-4 shadow-md disabled:opacity-60"
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Save
              </button>
              <button
                disabled={isLoading}
                className="btn btn-error btn-sm px-4 shadow-md disabled:opacity-60"
                onClick={resetForm}
              >
                Cancel{" "}
              </button>
              {/* <button
                className="btn btn-error btn-sm px-4 shadow-md"
                onClick={handleDelete}
              >
                Delete
              </button>
              <button
                className="btn-red btn btn-sm px-4 shadow-md"
                onClick={() => setCustomer("")}
              >
                Close
              </button> */}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddTransaction;
