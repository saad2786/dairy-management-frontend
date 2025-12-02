import Loader from "../../ui/Loader";
import CustomerRow from "./CustomerRow";
import ShowButton from "../../ui/ShowButton";
import ErrorMessage from "../../ui/ErrorMessage";
import CreateCustomer from "./CreateCustomer";
import Modal from "../../ui/Modal";
import Sidebar from "../../ui/Sidebar";
import { useCustomer } from "./useCustomer";
import { useEffect, useState } from "react";

export default function Customers() {
  const [isBuffeloChecked, setIsBuffeloChecked] = useState(false);
  const [isCowChecked, setIsCowChecked] = useState(false);
  const [isActiveChecked, setIsActiveChecked] = useState(false);
  const [isInactiveChecked, setIsInactiveChecked] = useState(false);
  const {
    customers,
    isFetching,
    isLoading,
    error,
    isOpenModal,
    openModal,
    closeModal,
  } = useCustomer();
  const [filteredCustomers, setFilteredCustomers] = useState(customers);

  useEffect(
    function () {
      setFilteredCustomers(customers);
      if (isActiveChecked) {
        setFilteredCustomers((prev) => {
          return prev.filter((customer) =>
            customer.Status__c ? customer : null,
          );
        });
      }
      if (isInactiveChecked) {
        setFilteredCustomers((prev) => {
          return prev.filter((customer) =>
            customer.Status__c ? null : customer,
          );
        });
      }
      if (isBuffeloChecked) {
        setFilteredCustomers((prev) => {
          return prev.filter((customer) => customer.CattleType__c == "Buffalo");
        });
      }
      if (isCowChecked) {
        setFilteredCustomers((prev) => {
          return prev.filter((customer) => customer.CattleType__c == "Cow");
        });
      }
    },
    [
      isFetching,
      isActiveChecked,
      isBuffeloChecked,
      isCowChecked,
      isInactiveChecked,
      customers,
    ],
  );
  if (isLoading) return <Loader />;
  if (error) return <ErrorMessage />;
  return (
    <div className=" grid h-full  w-full  grid-cols-5 grid-rows-1">
      <Sidebar>
        <h2 className="text-3xl">Filters</h2>
        <div
          className="form-control
        px-5 py-4"
        >
          <h3 className="text-xl">Status</h3>
          <div className="form-control">
            <label className="label flex w-fit  cursor-pointer gap-4 px-4">
              <input
                type="radio"
                name="radio-10"
                className="radio h-5 w-5 border-slate-600"
                checked={isActiveChecked}
                onChange={() => {
                  setIsInactiveChecked(false);
                  setIsActiveChecked(true);
                }}
              />
              <span className="label-text text-lg">Active</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex w-fit  cursor-pointer gap-4 px-4">
              <input
                type="radio"
                name="radio-10"
                className="radio h-5 w-5 border-slate-600"
                checked={isInactiveChecked}
                onChange={() => {
                  setIsInactiveChecked(true);
                  setIsActiveChecked(false);
                }}
              />
              <span className="label-text text-lg">Inactive</span>
            </label>
          </div>
          <div className="form-control">
            <label className="label flex w-fit  cursor-pointer gap-4 px-4">
              <input
                type="radio"
                name="radio-10"
                className="radio h-5 w-5 border-slate-600"
                checked={!isInactiveChecked && !isActiveChecked}
                onChange={() => {
                  setIsInactiveChecked(false);
                  setIsActiveChecked(false);
                }}
              />
              <span className="label-text text-lg">Show All</span>
            </label>
          </div>
        </div>

        <div
          className="form-control
        px-5 py-4"
        >
          <h3 className="text-xl">Cattle Type</h3>

          <label className="label flex w-fit  cursor-pointer gap-4 px-4">
            <input
              type="radio"
              className="radio h-5 w-5 border-slate-600"
              checked={isBuffeloChecked}
              onChange={() => {
                setIsCowChecked(false);
                setIsBuffeloChecked(true);
              }}
            />
            <span className="label-text text-lg">Buffelo</span>
          </label>
          <label className="label flex w-fit  cursor-pointer gap-4 px-4">
            <input
              type="radio"
              className="radio h-5 w-5  border-slate-600"
              checked={isCowChecked}
              onChange={() => {
                setIsCowChecked(true);
                setIsBuffeloChecked(false);
              }}
            />
            <span className="label-text text-lg">Cow</span>
          </label>
          <label className="label flex w-fit  cursor-pointer gap-4 px-4">
            <input
              type="radio"
              className="radio h-5 w-5  border-slate-600"
              checked={!isCowChecked && !isBuffeloChecked}
              onChange={() => {
                setIsCowChecked(false);
                setIsBuffeloChecked(false);
              }}
            />
            <span className="label-text text-lg">Both</span>
          </label>
        </div>
      </Sidebar>
      <ShowButton openModal={openModal}>+ Add Customer</ShowButton>
      <div className="  col-span-4 mt-10 px-10 py-8 ">
        <div className="mb-4 max-h-[75vh]  overflow-y-scroll rounded-md  shadow-md shadow-slate-700 ">
          <table className=" table  h-full  w-full   border-t-2">
            <thead className="text-base  font-semibold text-slate-800 shadow-sm shadow-slate-300">
              <tr className="border-b border-slate-500 bg-slate-200">
                <th>Ser.No</th>
                <th>Name</th>
                <th>Dairy</th>
                <th>Cattle Type</th>
                <th>Phone</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers?.length ? (
                filteredCustomers?.map((customer, idx) => {
                  return (
                    <CustomerRow
                      key={customer.Id}
                      idx={idx+1}
                      recordId={customer.Id}
                      name={customer.Name}
                      dairy={customer.Dairy__r.Name}
                      cattle={customer.CattleType__c}
                      phone={customer.Phone}
                      isFetching={isFetching}
                      status={customer.Status__c}
                    />
                  );
                })
              ) : (
                <tr className="px-8 py-10 text-center">
                  <td>There is no any customer, add new customer 👇</td>
                </tr>
              )}
            </tbody>
          </table>
          {isOpenModal && (
            <Modal closeModal={closeModal}>
              <CreateCustomer closeModal={closeModal} />
            </Modal>
          )}
        </div>
      </div>
    </div>
  );
}
