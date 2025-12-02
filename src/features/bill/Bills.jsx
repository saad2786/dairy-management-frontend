import ErrorMessage from "../../ui/ErrorMessage";
import Loader from "../../ui/Loader";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useBill from "./useBill";
import BillTable from "./BillTable";
import ShowButton from "../../ui/ShowButton";
import GenerateBill from "./GenerateBill";
import Modal from "../../ui/Modal";
import BillDetail from "./BillDetail";

export default function Bills() {
  const [selectedBill, setSelectedBills] = useState("");
  const { bills, isLoading, error, isFetching } = useBill();

  const [filteredBills, setFilteredBills] = useState([]);
  const [isOpenModal, setIsOpenModal] = useState(false);

  // ⭐ NEW: State for dropdown filter
  const [statusFilter, setStatusFilter] = useState("All");

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  // Sync table on load
  useEffect(() => {
    if (bills) {
      setStatusFilter("All");      // Reset filter after refetch
    setFilteredBills(bills); 
    }
  }, [bills]);

  // ⭐ NEW: Filtering Function
  const handleStatusFilter = (value) => {
    setStatusFilter(value);

    if (value === "All") {
      setFilteredBills(bills);
      return;
    }

    const newData = bills?.filter((bill) => bill.Status__c === value);

    setFilteredBills(newData);
  };

  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;

  return (
    <div className="flex flex-row overflow-hidden">
      <ShowButton openModal={openModal}>Generate Bill</ShowButton>

      <div className="flex w-full justify-end gap-10 px-10 py-20">
        <BillDetail billId={selectedBill} />

        <div className="flex w-full flex-col">
          {/* ⭐ NEW: FILTER DROPDOWN */}
          {/* ⭐ UPDATED FILTER DROPDOWN WITH LABEL + SMALL FONT */}
          <div className="mb-4 flex items-center justify-end gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Filter By Status:
            </label>

            <select
              className="rounded border border-slate-400 px-2 py-1 text-sm"
              value={statusFilter}
              onChange={(e) => handleStatusFilter(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Draft">Draft</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {!isLoading && (
            <BillTable
              bills={filteredBills}
              selectedBill={selectedBill}
              setSelectedBill={setSelectedBills}
            />
          )}
        </div>

        {isOpenModal && (
          <Modal closeModal={closeModal}>
            <GenerateBill closeModal={closeModal} setBills={setFilteredBills} />
          </Modal>
        )}
      </div>
    </div>
  );
}
