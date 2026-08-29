import { useState } from "react";
import { apiFetch } from "./api";
import { Link, useNavigate } from "react-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();
  async function handleRegister() {
    setLoading(true);
    if (email.trim() === "" || password.trim() === "") {
      setError("Field most not be empty");
      return;
    }

    try {
      const data = await apiFetch("/register", {
        method: "post",
        body: JSON.stringify({ email, password }),
      });
      console.log(data);
      navigator("/login");
    } catch (err) {
      console.log(err.message);
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="max-w-sm mx-auto mt-16">
      <h1 className="text-2xl font-semibold mb-6">Register</h1>
      <label htmlFor="">
        Email
        <input
          type="text"
          value={email}
          className="w-full mb-4 px-3 py-2 border rounded"
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label htmlFor="">
        Password
        <input
          type="password"
          value={password}
          className="w-full mb-4 px-3 py-2 border rounded"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      {loading && <h2>Loading...</h2>}
      {error && <h2 className="text-sm text-red-600">{error}</h2>}
      <button
        className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        onClick={handleRegister}
      >
        Register
      </button>
      <small>
        Already have an account?
        <Link className="underline" to={"/login"}>
          Login
        </Link>
      </small>
    </div>
  );
}
