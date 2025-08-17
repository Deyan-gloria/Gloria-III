// ====== Manejo de Roles en Login ======
function login() {
  const rol = document.getElementById("rol").value;

  if (rol === "admin") {
    localStorage.setItem("rol", "admin");
  } else {
    localStorage.setItem("rol", "vigilancia");
  }

  // Redirige al módulo de residentes
  window.location.href = "residentes.html";
}

// ====== Funciones CRUD ======

// Estructura inicial de residentes
let residentes = JSON.parse(localStorage.getItem("residentes")) || [];

// Renderiza tabla
function renderTable() {
  const tbody = document.querySelector("#tabla-residentes tbody");
  tbody.innerHTML = "";

  residentes.forEach((residente, index) => {
    let row = `
      <tr>
        <td>${residente.cedula}</td>
        <td>${residente.nombre}</td>
        <td>${residente.torre}</td>
        <td>${residente.apartamento}</td>
        <td>${residente.tipo}</td>
        <td>${residente.vehiculo}</td>
        <td>${residente.placa}</td>
        <td>${residente.propietario}</td>
        <td>
          <div class="actions">
            <button class="edit" onclick="editResidente(${index})">✏️</button>
            <button class="delete" onclick="deleteResidente(${index})">🗑️</button>
          </div>
        </td>
      </tr>
    `;
    tbody.innerHTML += row;
  });

  aplicarRol();
}

// Agregar residente
function addResidente() {
  const cedula = document.getElementById("cedula").value;
  const nombre = document.getElementById("nombre").value;
  const torre = document.getElementById("torre").value;
  const apartamento = document.getElementById("apartamento").value;
  const tipo = document.getElementById("tipo").value;
  const vehiculo = document.getElementById("vehiculo").value;
  const placa = document.getElementById("placa").value;
  const propietario = document.getElementById("propietario").value;

  if (!cedula || !nombre || !torre || !apartamento) {
    alert("Por favor completa los campos obligatorios.");
    return;
  }

  residentes.push({ cedula, nombre, torre, apartamento, tipo, vehiculo, placa, propietario });
  localStorage.setItem("residentes", JSON.stringify(residentes));
  renderTable();
  limpiarFormulario();
}

// Editar residente
function editResidente(index) {
  const r = residentes[index];

  document.getElementById("cedula").value = r.cedula;
  document.getElementById("nombre").value = r.nombre;
  document.getElementById("torre").value = r.torre;
  document.getElementById("apartamento").value = r.apartamento;
  document.getElementById("tipo").value = r.tipo;
  document.getElementById("vehiculo").value = r.vehiculo;
  document.getElementById("placa").value = r.placa;
  document.getElementById("propietario").value = r.propietario;

  deleteResidente(index);
}

// Eliminar residente
function deleteResidente(index) {
  residentes.splice(index, 1);
  localStorage.setItem("residentes", JSON.stringify(residentes));
  renderTable();
}

// Limpiar formulario
function limpiarFormulario() {
  document.getElementById("cedula").value = "";
  document.getElementById("nombre").value = "";
  document.getElementById("torre").value = "";
  document.getElementById("apartamento").value = "";
  document.getElementById("tipo").value = "Propietario";
  document.getElementById("vehiculo").value = "";
  document.getElementById("placa").value = "";
  document.getElementById("propietario").value = "Sí";
}

// ====== Filtros de búsqueda ======
function buscar() {
  const filtro = document.getElementById("filtro").value.toLowerCase();
  const valor = document.getElementById("valor-busqueda").value.toLowerCase();

  const tbody = document.querySelector("#tabla-residentes tbody");
  tbody.innerHTML = "";

  residentes
    .filter(r => r[filtro].toLowerCase().includes(valor))
    .forEach((residente, index) => {
      let row = `
        <tr>
          <td>${residente.cedula}</td>
          <td>${residente.nombre}</td>
          <td>${residente.torre}</td>
          <td>${residente.apartamento}</td>
          <td>${residente.tipo}</td>
          <td>${residente.vehiculo}</td>
          <td>${residente.placa}</td>
          <td>${residente.propietario}</td>
          <td>
            <div class="actions">
              <button class="edit" onclick="editResidente(${index})">✏️</button>
              <button class="delete" onclick="deleteResidente(${index})">🗑️</button>
            </div>
          </td>
        </tr>
      `;
      tbody.innerHTML += row;
    });

  aplicarRol();
}

// ====== Roles ======
function aplicarRol() {
  const rol = localStorage.getItem("rol");

  if (rol === "vigilancia") {
    document.querySelectorAll(".actions button").forEach(btn => {
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    });
    document.getElementById("btn-agregar").disabled = true;
  }
}

// ====== Inicializar ======
document.addEventListener("DOMContentLoaded", () => {
  if (document.getElementById("tabla-residentes")) {
    renderTable();
  }
});
