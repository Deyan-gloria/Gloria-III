function login() {
  const user = document.getElementById('username').value;
  const pass = document.getElementById('password').value;
  if(user === 'admin' && pass === '1234') {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    localStorage.setItem('loggedIn', 'true');
    showPage('residentes');
  } else {
    alert('Usuario o contraseña incorrectos');
  }
}
function logout() {
  localStorage.removeItem('loggedIn');
  document.getElementById('dashboard').style.display = 'none';
  document.getElementById('loginPage').style.display = 'flex';
}
function showPage(page) {
  document.getElementById('residentes').style.display = 'none';
  document.getElementById('obligaciones').style.display = 'none';
  document.getElementById(page).style.display = 'block';
}
function filterTable(tableId, query) {
  const table = document.getElementById(tableId);
  const tr = table.getElementsByTagName('tr');
  query = query.toLowerCase();
  for (let i = 1; i < tr.length; i++) {
    let rowText = tr[i].innerText.toLowerCase();
    tr[i].style.display = rowText.includes(query) ? '' : 'none';
  }
}
window.onload = () => {
  if(localStorage.getItem('loggedIn') === 'true') {
    document.getElementById('loginPage').style.display = 'none';
    document.getElementById('dashboard').style.display = 'block';
    showPage('residentes');
  }
}