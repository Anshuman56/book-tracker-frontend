import { Link } from "react-router";

export default function Home() {
  return (
    <div className="">
      <Link className="p-4 underline" to={"/login"}>
        Login
      </Link>
      <Link className="p-4 underline" to={"/register"}>
        Register
      </Link>
      <h1>
        Welcome to{" "}
        <Link className="underline" to={"/books"}>
          Books
        </Link>
      </h1>
    </div>
  );
}
