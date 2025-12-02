import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/useContext";
import { LuMilk } from "react-icons/lu";

export default function Navbar() {
  const { dairyId } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div
      className="navbar z-50 bg-base-100 font-outfit shadow-lg
    "
    >
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          <LuMilk size={25} />
          Milk Dairy
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal mx-2 gap-4 px-1">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="customer">Customer</NavLink>
          </li>
          <li>
            <NavLink to="transaction">Transaction</NavLink>
          </li>
          <li>
            <NavLink to="bill">Bill</NavLink>
          </li>
          <li>
            <NavLink to="rate">Rate</NavLink>
          </li>
        </ul>

        {dairyId !== null ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              sessionStorage.clear();
              navigate("login");
            }}
          >
            Logout
          </button>
        ) : (
          <NavLink to="login">
            <button className=" w-40 rounded-xl bg-green-600 px-3 py-2 text-xl uppercase text-white hover:bg-green-500 disabled:cursor-not-allowed disabled:bg-opacity-65">
              Login
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
}
