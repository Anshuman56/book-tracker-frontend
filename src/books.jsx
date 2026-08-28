import { useEffect, useState } from "react";
import { apiFetch } from "./api";
import { clearToken } from "./auth";
import { useNavigate } from "react-router";

export default function Books() {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigator = useNavigate();

  useEffect(() => {
    let ignore = false;
    async function main() {
      setLoading(true);
      setError("");
      try {
        const data = await apiFetch("/books");
        console.log(data);
        if (!ignore) setResult(data);
      } catch (err) {
        console.error(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    main();
    return () => (ignore = true);
  }, []);

  function handleLogout() {
    clearToken();
    navigator("/login");
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="flex justify-between items-center w-full mb-5">
        <h1 className="text-2xl font-semibold">My Books</h1>
        <button
          className=" text-sm text-gray-600 hover:text-gray-900  cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <button>Add Book</button>
      </div>
      <div>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {result && result.length === 0 ? (
          <h2>No result</h2>
        ) : (
          <ul>
            {result.map((item) => (
              <li key={item._id}>{item.title}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
