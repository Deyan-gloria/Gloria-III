// js/usuarios.js
document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("currentUser"));
    const userList = document.getElementById("userList");
    const btnAddUser = document.getElementById("btnAddUser");

    if (!user) {
        alert("Debes iniciar sesión");
        window.location.href = "login.html";
        return;
    }

    // Lista simulada de usuarios vigilantes
    let usuarios = [
        { id: 1, nombre: "Carlos", estado: "Activo" },
        { id: 2, nombre: "María", estado: "Bloqueado" }
    ];

    function renderUsuarios() {
        userList.innerHTML = "";

        usuarios.forEach(u => {
            const li = document.createElement("li");
            li.textContent = `${u.nombre} - ${u.estado}`;

            if (user.role === "admin") {
                const btnEliminar = document.createElement("button");
                btnEliminar.textContent = "Eliminar";
                btnEliminar.onclick = () => eliminarUsuario(u.id);

                const btnBloquear = document.createElement("button");
                btnBloquear.textContent = (u.estado === "Activo") ? "Bloquear" : "Activar";
                btnBloquear.onclick = () => toggleEstado(u.id);

                li.appendChild(btnEliminar);
                li.appendChild(btnBloquear);
            }

            userList.appendChild(li);
        });
    }

    function eliminarUsuario(id) {
        usuarios = usuarios.filter(u => u.id !== id);
        renderUsuarios();
    }

    function toggleEstado(id) {
        usuarios = usuarios.map(u => {
            if (u.id === id) {
                u.estado = (u.estado === "Activo") ? "Bloqueado" : "Activo";
            }
            return u;
        });
        renderUsuarios();
    }

    if (user.role === "admin") {
        btnAddUser.style.display = "inline-block";
        btnAddUser.addEventListener("click", () => {
            const nombre = prompt("Nombre del nuevo vigilante:");
            if (nombre) {
                usuarios.push({ id: Date.now(), nombre, estado: "Activo" });
                renderUsuarios();
            }
        });
    } else {
        btnAddUser.style.display = "none"; // Ocultar botón para vigilante
    }

    renderUsuarios();
});
