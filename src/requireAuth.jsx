import { useNavigate } from "react-router";
import { getToken } from "./auth";
import { useEffect } from "react";

export default function RequireAuth({ children }) {
  const navigator = useNavigate();
  const token = getToken();
  useEffect(() => {
    if (!token) navigator("/login");
  });

  return children;
}
