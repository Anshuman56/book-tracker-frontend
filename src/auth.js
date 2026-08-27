function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}
function clearToken() {
  localStorage.clearItem("token");
}

export { getToken, setToken, clearToken };
