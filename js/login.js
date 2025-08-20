// login.js
const usuariosSistema = [
  { username: "admin", password: "1234", rol: "admin" },
  { username: "vigilante", password: "1234", rol: "vigilante" }
];

document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const user = usuariosSistema.find(
    u => u.username === username && u.password === password
  );

  if (user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
    window.location.href = "dashboard.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const currentUser = localStorage.getItem("currentUser");
  if (currentUser && window.location.pathname.endsWith("login.html")) {
    window.location.href = "dashboard.html";
  }
});
