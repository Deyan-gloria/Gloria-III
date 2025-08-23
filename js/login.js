document.getElementById('show-login').addEventListener('click', () => {
  document.getElementById('login-form').classList.toggle('hidden');
});

document.getElementById('login-btn').addEventListener('click', () => {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  const adminPass = document.getElementById('admin-pass').value;

  if (user && pass) {
    if(adminPass === "admin123"){
      window.location.href = "dashboard.html";
    } else {
      alert("Contraseña de administrador incorrecta. Cerrando sesión.");
      window.location.href = "index.html";
    }
  } else {
    alert("Complete los campos.");
  }
});
