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

  async function handleAddBook() {
    if (title.trim() === "" || author.trim() === "") {
      setError("you can not add empty fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch("/books", {
        method: "post",
        body: JSON.stringify({ title, author }),
      });
      console.log(data);
      setResult(data);
      setTitle("");
      setAuthor("");
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch(`/books/${id}`, {
        method: "delete",
      });
      console.log(data);
      setResult(data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function handleEdit(id, value) {
    setLoading(true);
    setError("");
    try {
      const data = await apiFetch(`/books/${id}`, {
        method: "put",
        body: JSON.stringify({ status: value }),
      });
      console.log(data);
      setResult(data);
    } catch (err) {
      console.log(err.message);
      setError(err.message);
    } finally {
      setLoading(false);
    }
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
      <div className=" flex gap-2 items-end mb-2 ">
        <div className="flex  gap-2 items-end ">
          <label htmlFor="">
            Title
            <input
              type="text"
              value={title}
              className="w-full p-3 border rounded resize-none"
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="">
            Author
            <input
              type="text"
              value={author}
              className="w-full p-3 border rounded resize-none"
              onChange={(e) => setAuthor(e.target.value)}
            />
          </label>
        </div>
        <button
          className=" py-3.5 px-7.5 bg-blue-600 text-white rounded hover:bg-blue-800 cursor-pointer"
          onClick={handleAddBook}
        >
          Add Book
        </button>
      </div>
      <div>
        {loading && <h2>Loading...</h2>}
        {error && <h2>{error}</h2>}
        {result && result.length === 0 ? (
          <h2>No result</h2>
        ) : (
          <ul>
            {result.map((item) => (
              <li
                key={item._id}
                className="bg-white border rounded p-4 mb-3 text-base"
              >
                {" "}
                {item.title}
                <br />
                <span className="text-xs text-gray-500 mt-2">
                  {item.author}
                </span>
                <button
                  className="text-xs ml-2 cursor-pointer text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </button>
                <button
                  className={`text-xs ml-2 p-1 rounded cursor-pointer text-blue-600 hover:text-blue-800 ${item.status === "want" ? " bg-blue-100 border-blue-500 " : ""}`}
                  onClick={() => handleEdit(item._id, "want")}
                >
                  Want
                </button>
                <button
                  className={`text-xs ml-2 p-1 rounded cursor-pointer text-blue-600 hover:text-blue-800 ${item.status === "reading" ? " bg-blue-100 border-blue-500" : ""}`}
                  onClick={() => handleEdit(item._id, "reading")}
                >
                  Reading
                </button>
                <button
                  className={`text-xs ml-2 p-1 rounded cursor-pointer text-blue-600 hover:text-blue-800 ${item.status === "done" ? " bg-blue-100 border-blue-500" : ""}`}
                  onClick={() => handleEdit(item._id, "done")}
                >
                  Done
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
