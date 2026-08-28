import { getToken } from "./auth";

async function apiFetch(path, option = {}) {
  const token = getToken();
  const headers = {
    ...option.headers,
    ...(option.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: "Bearer " + token } : {}),
  };
  option = { ...option, headers };
  const url = import.meta.env.VITE_API_URL + path;
  console.log(url);
  console.log(option);
  const response = await fetch(url, option);

  const result = await response.json();
  if (!response.ok) {
    throw new Error(result.error || "Response status " + response.status);
  }

  return result;
}

export { apiFetch };
