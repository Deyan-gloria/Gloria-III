// Guard redirects and simple auth mock
document.addEventListener('DOMContentLoaded', () => {
  // Simple mobile nav
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav .links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.gap = '8px';
    });
  }

  // Guard pages
  const required = document.body?.dataset?.guard;
  if (required === 'admin') {
    const rol = localStorage.getItem('gloria3_rol');
    if (rol !== 'admin') {
      alert('Acceso restringido. Se requiere rol Administrador.');
      window.location.href = 'login.html';
      return;
    }
  }

  // Login simulation
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rol = document.getElementById('rol').value;
      localStorage.setItem('gloria3_rol', rol);
      if (rol === 'admin') {
        window.location.href = 'dashboard.html';
      } else {
        window.location.href = 'residentes.html';
      }
    });
  }

  // Live search on residents
  const buscador = document.getElementById('buscador');
  const tabla = document.getElementById('tablaResidentes');
  if (buscador && tabla) {
    const tbody = tabla.getElementsByTagName('tbody')[0];
    buscador.addEventListener('keyup', () => {
      const filtro = buscador.value.toLowerCase().trim();
      const filas = tbody.getElementsByTagName('tr');
      for (let i = 0; i < filas.length; i++) {
        const texto = filas[i].innerText.toLowerCase();
        filas[i].style.display = texto.includes(filtro) ? '' : 'none';
      }
    });
  }
});
