document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem('loggedIn') !== 'true') {
    window.location.href = 'index.html';
  }

  const tableBody = document.getElementById('tableBody');
  const logoutBtn = document.getElementById('logoutBtn');
  const addResidentBtn = document.getElementById('addResidentBtn');
  const downloadPDFBtn = document.getElementById('downloadPDF');

  let residents = JSON.parse(localStorage.getItem('residents')) || [
    {nombre: 'Carlos Pérez', cedula: '12345678', celular: '3001112222', correo: 'carlos@mail.com', apto: '101', torre: '1', ocupacion: 'Propietario', vehiculo: 'Carro - ABC123 - Rojo - Mazda', novedades: 'Ninguna', obligaciones: 'Administración - Al día - 2025-05-15'},
    {nombre: 'Ana Gómez', cedula: '87654321', celular: '3012223333', correo: 'ana@mail.com', apto: '202', torre: '2', ocupacion: 'Arrendatario', vehiculo: 'Moto - XYZ987 - Negro - Yamaha', novedades: 'Pago pendiente', obligaciones: 'Arriendo - En mora - 2025-04-10'},
    {nombre: 'Luis Torres', cedula: '11223344', celular: '3023334444', correo: 'luis@mail.com', apto: '303', torre: '3', ocupacion: 'Propietario', vehiculo: 'Carro - LMN456 - Gris - Toyota', novedades: 'Ninguna', obligaciones: 'Parqueo - Al día - 2025-05-20'},
    {nombre: 'Marta Díaz', cedula: '44332211', celular: '3044445555', correo: 'marta@mail.com', apto: '404', torre: '4', ocupacion: 'Otro', vehiculo: 'Carro - QWE789 - Azul - Renault', novedades: 'Solicitó reparación', obligaciones: 'Otros - En mora - 2025-03-05'},
    {nombre: 'Jorge Sáez', cedula: '99887766', celular: '3055556666', correo: 'jorge@mail.com', apto: '505', torre: '5', ocupacion: 'Propietario', vehiculo: 'Carro - ZXC321 - Blanco - Chevrolet', novedades: 'Ninguna', obligaciones: 'Administración - Al día - 2025-06-01'}
  ];

  function renderTable() {
    tableBody.innerHTML = '';
    residents.forEach((r, i) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${r.nombre}</td>
        <td>${r.cedula}</td>
        <td>${r.celular}</td>
        <td>${r.correo}</td>
        <td>${r.apto}</td>
        <td>${r.torre}</td>
        <td>${r.ocupacion}</td>
        <td>${r.vehiculo}</td>
        <td>${r.novedades}</td>
        <td>${r.obligaciones}</td>
        <td>
          <button onclick="editResident(${i})" class="btn">Editar</button>
          <button onclick="deleteResident(${i})" class="btn">Eliminar</button>
        </td>
      `;
      tableBody.appendChild(row);
    });
  }

  window.editResident = (index) => {
    const r = residents[index];
    const nuevoNombre = prompt('Editar nombre:', r.nombre);
    if (nuevoNombre !== null) {
      residents[index].nombre = nuevoNombre;
      localStorage.setItem('residents', JSON.stringify(residents));
      renderTable();
    }
  };

  window.deleteResident = (index) => {
    if (confirm('¿Eliminar este residente?')) {
      residents.splice(index, 1);
      localStorage.setItem('residents', JSON.stringify(residents));
      renderTable();
    }
  };

  addResidentBtn.onclick = () => {
    const nombre = prompt('Nombre completo:');
    const cedula = prompt('Cédula:');
    const celular = prompt('Celular:');
    const correo = prompt('Correo:');
    const apto = prompt('Apartamento:');
    const torre = prompt('Torre:');
    const ocupacion = prompt('Ocupación:');
    const vehiculo = prompt('Vehículo (tipo - placa - color - marca):');
    const novedades = prompt('Novedades:');
    const obligaciones = prompt('Obligaciones:');
    residents.push({nombre, cedula, celular, correo, apto, torre, ocupacion, vehiculo, novedades, obligaciones});
    localStorage.setItem('residents', JSON.stringify(residents));
    renderTable();
  };

  downloadPDFBtn.onclick = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text('Residentes - Gloria III', 10, 10);
    residents.forEach((r, i) => {
      doc.text(`${i+1}. ${r.nombre} - Apto ${r.apto}, Torre ${r.torre}`, 10, 20 + (i * 10));
    });
    doc.save('residentes.pdf');
  };

  logoutBtn.onclick = () => {
    sessionStorage.removeItem('loggedIn');
    window.location.href = 'index.html';
  };

  renderTable();
});
