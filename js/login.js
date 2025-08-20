// 🔹 Simulación de usuarios del sistema
const usuariosSistema = [
    { username: "admin", password: "1234", rol: "admin" },
    { username: "vigilante", password: "1234", rol: "vigilante" }
];

// Manejar el submit del formulario de login
document.getElementById("loginForm").addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Buscar usuario en la lista
    const user = usuariosSistema.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        // Guardar usuario en localStorage
        localStorage.setItem("currentUser", JSON.stringify(user));

        // Redirigir al dashboard
        window.location.href = "index.html";
    } else {
        alert("❌ Usuario o contraseña incorrectos");
    }
});

// Si ya hay un usuario logueado, evitar volver al login
document.addEventListener("DOMContentLoaded", () => {
    const currentUser = localStorage.getItem("currentUser");
    if (currentUser) {
        window.location.href = "index.html";
    }
});
