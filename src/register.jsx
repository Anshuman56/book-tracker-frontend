import { useState } from "react";
import { apiFetch } from "./api";
import { useNavigate } from "react-router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();
  async function handleRegister() {
    try {
      const data = await apiFetch("/register", {
        method: "post",
        body: JSON.stringify({ email, password }),
      });
      console.log(data);
      navigator("/login");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <div>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
