// js/login.js
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        // Usuarios simulados
        const users = [
            { username: "admin", password: "admin", role: "admin" },
            { username: "vigilante", password: "vigilante", role: "vigilante" }
        ];

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            window.location.href = "dashboard.html";
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
});
