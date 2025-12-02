import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { DispatchContext } from "../context/useContext";
import Spinner from "../ui/Spinner";

export default function Login() {
  const dispatch = useContext(DispatchContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  async function handleLogin(e) {
    e.preventDefault();
    let data = { username, password };

    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ ...data }),
      });
      console.log(res);

      data = await res.json();
      console.log(data);
      const dairyId = data.Id;
      const dairyName = data.Name;
      dispatch({
        type: "authenticate",
        payload: { dairyId, dairyName },
      });
      sessionStorage.setItem("dairyId", dairyId);
      sessionStorage.setItem("dairyName", dairyName);
      setIsLoading(false);
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="ml-4 text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6 text-xl">
              Welcome to our presentation on the Milk Dairy Collection
              Management System, a comprehensive solution designed to streamline
              milk collection operations and enhance the efficiency of your
              dairy business.
            </p>
          </div>
          <div className="card w-full max-w-sm shrink-0 bg-base-100 shadow-2xl">
            <form className="card-body" onSubmit={(e) => handleLogin(e)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  disabled={isLoading}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input input-bordered"
                  autoComplete="username"
                  required
                  autoFocus
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  id="current-password"
                  name="password"
                  type="password"
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <button
                  type="submit"
                  className="btn btn-success  disabled:cursor-not-allowed disabled:bg-opacity-65"
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner /> : "Login"}
                </button>
                <Link
                  to={"/signup"}
                  className="mt-2 text-center text-sm font-light text-blue-700 underline"
                >
                  Create New Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
