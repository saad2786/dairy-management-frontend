import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../ui/Spinner";

export default function Signup() {
  const [dairyName, setDairyName] = useState("");
  const [owner, setOwner] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const data = { dairyName, owner, username, password };

    try {
      setIsLoading(true);
      setError("");

      const res = await fetch(`${import.meta.env.VITE_BASE_URL}/auth/signup`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await res.json();
      console.log(response);
      if (res.status == 400) {
        setIsLoading(false);
        setError(
          "Already created account using this email, try with different one!",
        );
      }
      if ([200, 201, 204].includes(res.status)) {
        setIsLoading(false);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      setError("Signup failed. Try again!");
    }
  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="ml-4 text-center lg:text-left">
          <h1 className="text-5xl font-bold">Create Account</h1>
          <p className="py-6 text-xl">
            Register your dairy to use the Milk Dairy Collection Management
            System.
          </p>
        </div>

        <div className="card w-full max-w-2xl bg-base-100 shadow-2xl">
          <form className="card-body" onSubmit={handleSignup}>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* LEFT COLUMN */}
              <div className="flex flex-col gap-4">
                {/* Dairy Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Dairy Name</span>
                  </label>
                  <input
                    type="text"
                    value={dairyName}
                    disabled={isLoading}
                    onChange={(e) => setDairyName(e.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>

                {/* Email */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Email</span>
                  </label>
                  <input
                    type="email"
                    value={username}
                    disabled={isLoading}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="flex flex-col gap-4">
                {/* Owner Name */}
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Owner Name</span>
                  </label>
                  <input
                    type="text"
                    value={owner}
                    disabled={isLoading}
                    onChange={(e) => setOwner(e.target.value)}
                    className="input input-bordered"
                    required
                  />
                </div>
              </div>
            </div>

            {/* THIRD ROW — PASSWORD + CONFIRM PASSWORD */}
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  value={password}
                  disabled={isLoading}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Confirm Password</span>
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  disabled={isLoading}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input input-bordered"
                  required
                />
              </div>
            </div>

            {error && (
              <p className="mt-2 text-center font-semibold text-red-600">
                {error}
              </p>
            )}

            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn btn-success disabled:cursor-not-allowed disabled:bg-opacity-65"
                disabled={isLoading}
              >
                {isLoading ? <Spinner /> : "Sign Up"}
              </button>
              <Link to={'/login'}>
              <p className="text-center text-sm text-blue-700 underline mt-3">
              Login Account
              </p>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
