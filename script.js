// ==========================
// Login con Roles
// ==========================
const usuarios = [
  { usuario: "admin", password: "1234", rol: "Administrador" },
  { usuario: "vigilante", password: "1234", rol: "Vigilancia" }
];

function login(event) {
  event.preventDefault();
  const user = document.getElementById("usuario").value;
  const pass = document.getElementById("password").value;

  const encontrado = usuarios.find(u => u.usuario === user && u.password === pass);

  if (encontrado) {
    localStorage.setItem("rol", encontrado.rol);
    window.location.href = "index.html";
  } else {
    alert("Usuario o contraseña incorrectos");
  }
}

// ==========================
// Función para verificar rol
// ==========================
function getRol() {
  return localStorage.getItem("rol") || "Vigilancia";
}

// ==========================
// CRUD Residentes-Vehículos
// ==========================
let residentes = JSON.parse(localStorage.getItem("residentes")) || [];

function mostrarResidentes() {
  const tabla = document.getElementById("tablaResidentes");
  if (!tabla) return;

  tabla.innerHTML = "";
  residentes.forEach((residente, index) => {
    let fila = `
      <tr>
        <td>${residente.nombre}</td>
        <td>${residente.cedula}</td>
        <td>${residente.torre}</td>
        <td>${residente.apartamento}</td>
        <td>${residente.tipo}</td>
        <td>${residente.placa}</td>
        <td>${residente.condicion}</td>
        ${getRol() === "Administrador" ? `
        <td>
          <button onclick="editarResidente(${index})">Editar</button>
          <button onclick="eliminarResidente(${index})">Eliminar</button>
        </td>` : ""}
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

function agregarResidente(event) {
  event.preventDefault();
  if (getRol() !== "Administrador") {
    alert("Solo el administrador puede agregar residentes.");
    return;
  }

  const nuevo = {
    nombre: document.getElementById("nombre").value,
    cedula: document.getElementById("cedula").value,
    torre: document.getElementById("torre").value,
    apartamento: document.getElementById("apartamento").value,
    tipo: document.getElementById("tipo").value,
    placa: document.getElementById("placa").value,
    condicion: document.getElementById("condicion").value
  };

  residentes.push(nuevo);
  localStorage.setItem("residentes", JSON.stringify(residentes));
  mostrarResidentes();
  document.getElementById("formResidentes").reset();
}

function editarResidente(index) {
  const r = residentes[index];
  document.getElementById("nombre").value = r.nombre;
  document.getElementById("cedula").value = r.cedula;
  document.getElementById("torre").value = r.torre;
  document.getElementById("apartamento").value = r.apartamento;
  document.getElementById("tipo").value = r.tipo;
  document.getElementById("placa").value = r.placa;
  document.getElementById("condicion").value = r.condicion;

  eliminarResidente(index);
}

function eliminarResidente(index) {
  if (getRol() !== "Administrador") {
    alert("Solo el administrador puede eliminar.");
    return;
  }
  residentes.splice(index, 1);
  localStorage.setItem("residentes", JSON.stringify(residentes));
  mostrarResidentes();
}

// ==========================
// CRUD Pagos
// ==========================
let pagos = JSON.parse(localStorage.getItem("pagos")) || [];

function mostrarPagos() {
  const tabla = document.getElementById("tablaPagos");
  if (!tabla) return;

  tabla.innerHTML = "";
  pagos.forEach((pago, index) => {
    let fila = `
      <tr>
        <td>${pago.nombre}</td>
        <td>${pago.apartamento}</td>
        <td>${pago.mes}</td>
        <td>${pago.estado}</td>
        <td>${pago.deuda || "Ninguna"}</td>
        ${getRol() === "Administrador" ? `
        <td>
          <button onclick="editarPago(${index})">Editar</button>
          <button onclick="eliminarPago(${index})">Eliminar</button>
        </td>` : ""}
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

function agregarPago(event) {
  event.preventDefault();
  if (getRol() !== "Administrador") {
    alert("Solo el administrador puede registrar pagos.");
    return;
  }

  const nuevo = {
    nombre: document.getElementById("pagoNombre").value,
    apartamento: document.getElementById("pagoApartamento").value,
    mes: document.getElementById("pagoMes").value,
    estado: document.getElementById("pagoEstado").value,
    deuda: document.getElementById("pagoDeuda").value
  };

  pagos.push(nuevo);
  localStorage.setItem("pagos", JSON.stringify(pagos));
  mostrarPagos();
  document.getElementById("formPagos").reset();
}

function editarPago(index) {
  const p = pagos[index];
  document.getElementById("pagoNombre").value = p.nombre;
  document.getElementById("pagoApartamento").value = p.apartamento;
  document.getElementById("pagoMes").value = p.mes;
  document.getElementById("pagoEstado").value = p.estado;
  document.getElementById("pagoDeuda").value = p.deuda;

  eliminarPago(index);
}

function eliminarPago(index) {
  if (getRol() !== "Administrador") {
    alert("Solo el administrador puede eliminar pagos.");
    return;
  }
  pagos.splice(index, 1);
  localStorage.setItem("pagos", JSON.stringify(pagos));
  mostrarPagos();
}

// ==========================
// Al cargar cada página
// ==========================
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("tablaResidentes")) mostrarResidentes();
  if (document.getElementById("tablaPagos")) mostrarPagos();
});
