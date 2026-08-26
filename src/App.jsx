import { BrowserRouter, Route, Routes } from "react-router";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>hello</h1>} />
        <Route path="/login" element={<h1>login</h1>} />
        <Route path="/register" element={<h1>register</h1>} />
        <Route path="/books" element={<h1>books</h1>} />
      </Routes>
    </BrowserRouter>
  );
}
