const data = [
  {nombre: "Juan Pérez", cedula: "123456789", celular: "3001112233", email: "juan@mail.com", apto: "101", torre: "1", rol: "Propietario", vehiculo: "Carro - ABC123", novedad: ""},
  {nombre: "María Gómez", cedula: "987654321", celular: "3012223344", email: "maria@mail.com", apto: "102", torre: "1", rol: "Arrendatario", vehiculo: "Moto - XYZ789", novedad: ""},
  {nombre: "Carlos Ruiz", cedula: "112233445", celular: "3023334455", email: "carlos@mail.com", apto: "103", torre: "2", rol: "Propietario", vehiculo: "Carro - JKL456", novedad: "Predio abandonado"},
  {nombre: "Ana Torres", cedula: "556677889", celular: "3034445566", email: "ana@mail.com", apto: "201", torre: "2", rol: "Otro", vehiculo: "Moto - LMN321", novedad: ""},
  {nombre: "Pedro Díaz", cedula: "667788990", celular: "3045556677", email: "pedro@mail.com", apto: "202", torre: "3", rol: "Propietario", vehiculo: "Carro - OPQ987", novedad: ""}
];

const tbody = document.querySelector("#residentTable tbody");

function renderTable(filter="") {
  tbody.innerHTML = "";
  let filtered = data.filter(d => 
    d.nombre.toLowerCase().includes(filter) ||
    d.cedula.includes(filter) ||
    d.vehiculo.toLowerCase().includes(filter)
  );
  filtered.forEach(res => {
    const tr = document.createElement("tr");
    tr.innerHTML = `<td>${res.nombre}</td>
                    <td>${res.cedula}</td>
                    <td>${res.celular}</td>
                    <td>${res.email}</td>
                    <td>${res.apto}</td>
                    <td>${res.torre}</td>
                    <td>${res.rol}</td>
                    <td>${res.vehiculo}</td>
                    <td>${res.novedad}</td>`;
    tbody.appendChild(tr);
  });
}
renderTable();

document.getElementById("searchInput").addEventListener("input", e => {
  renderTable(e.target.value.toLowerCase());
});

document.getElementById("logout-btn").addEventListener("click", () => {
  window.location.href = "index.html";
});
