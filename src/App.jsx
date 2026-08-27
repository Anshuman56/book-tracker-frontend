import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./home";
import Register from "./register";
import Login from "./login";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/books" element={<h1>books</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
