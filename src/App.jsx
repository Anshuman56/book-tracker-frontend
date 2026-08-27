import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="/register" element={<h1>register</h1>} />
        <Route path="/books" element={<h1>books</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
