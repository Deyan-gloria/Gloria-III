// 🔹 Simulación de sesión actual (esto viene del login)
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Si no hay usuario logueado, redirige al login
if (!currentUser) {
    window.location.href = "login.html";
}

// 🔹 Lista simulada de usuarios vigilantes
let usuarios = [
    { id: 1, nombre: "Carlos Vigilante", activo: true },
    { id: 2, nombre: "Pedro Vigilante", activo: false }
];

// Renderizar lista de usuarios
function renderUsuarios() {
    const lista = document.getElementById("userList");
    lista.innerHTML = "";

    usuarios.forEach(user => {
        const li = document.createElement("li");
        li.textContent = `${user.nombre} - ${user.activo ? "✅ Activo" : "⛔ Bloqueado"}`;

        // Solo ADMIN ve los botones de gestión
        if (currentUser.rol === "admin") {
            const btnToggle = document.createElement("button");
            btnToggle.textContent = user.activo ? "Bloquear" : "Activar";
            btnToggle.onclick = () => toggleEstado(user.id);

            const btnDelete = document.createElement("button");
            btnDelete.textContent = "Eliminar";
            btnDelete.onclick = () => eliminarUsuario(user.id);

            li.appendChild(btnToggle);
            li.appendChild(btnDelete);
        }

        lista.appendChild(li);
    });
}

// Cambiar estado (bloquear / activar)
function toggleEstado(id) {
    usuarios = usuarios.map(u =>
        u.id === id ? { ...u, activo: !u.activo } : u
    );
    renderUsuarios();
}

// Eliminar usuario
function eliminarUsuario(id) {
    usuarios = usuarios.filter(u => u.id !== id);
    renderUsuarios();
}

// Agregar usuario (solo admin)
function agregarUsuario() {
    const nombre = prompt("Nombre del nuevo vigilante:");
    if (nombre) {
        usuarios.push({
            id: usuarios.length + 1,
            nombre,
            activo: true
        });
        renderUsuarios();
    }
}

// Vincular botón de agregar
document.addEventListener("DOMContentLoaded", () => {
    renderUsuarios();

    if (currentUser.rol === "admin") {
        const btnAdd = document.getElementById("btnAddUser");
        if (btnAdd) btnAdd.addEventListener("click", agregarUsuario);
    } else {
        // Ocultar botón si no es admin
        const btnAdd = document.getElementById("btnAddUser");
        if (btnAdd) btnAdd.style.display = "none";
    }
});
