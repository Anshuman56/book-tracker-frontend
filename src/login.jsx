import { useState } from "react";
import { apiFetch } from "./api";
import { useNavigate } from "react-router";
import { setToken } from "./auth";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigator = useNavigate();
  async function handleLogin() {
    try {
      const data = await apiFetch("/login", {
        method: "post",
        body: JSON.stringify({ email, password }),
      });
      console.log(data);
      setToken(data.token);
      navigator("/books");
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
      <button onClick={handleLogin}>Login</button>
    </div>
  );
}
