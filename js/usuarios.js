
// usuarios.js - CRUD básico en localStorage
const US_KEY = 'gloria_usuarios_v1';

function loadUsuarios(){
  return JSON.parse(localStorage.getItem(US_KEY) || '[]');
}
function saveUsuarios(list){ localStorage.setItem(US_KEY, JSON.stringify(list)); }
function renderUsuarios(){
  const tbody = document.querySelector('#tblUsuarios tbody');
  tbody.innerHTML='';
  const list = loadUsuarios();
  list.forEach((u, i) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${u.user}</td><td>${u.role}</td><td>
      <button data-i="${i}" class="edit">✏️</button>
      <button data-i="${i}" class="del">🗑️</button>
      <button data-i="${i}" class="toggle">${u.status==='activo'?'🔓':'🔒'}</button>
    </td>`;
    tbody.appendChild(tr);
  });
}
function openModal(){
  document.getElementById('modal').style.display='flex';
}
function closeModal(){
  document.getElementById('modal').style.display='none';
  document.getElementById('m_user').value='';
}
document.getElementById('openCreate').addEventListener('click', ()=>{
  document.getElementById('modalTitle').innerText='Crear usuario';
  openModal();
});
document.getElementById('closeModal').addEventListener('click', closeModal);
document.getElementById('saveUser').addEventListener('click', ()=>{
  const user = document.getElementById('m_user').value.trim();
  const role = document.getElementById('m_role').value;
  const status = document.getElementById('m_status').value;
  if(!user){ alert('Ingrese usuario'); return; }
  const list = loadUsuarios();
  list.push({user,role,status});
  saveUsuarios(list);
  renderUsuarios();
  closeModal();
});
document.querySelector('#tblUsuarios tbody')?.addEventListener('click', (e)=>{
  const i = e.target?.dataset?.i;
  if(!i) return;
  const list = loadUsuarios();
  if(e.target.classList.contains('del')){
    if(confirm('Eliminar usuario?')){ list.splice(i,1); saveUsuarios(list); renderUsuarios(); }
  } else if(e.target.classList.contains('toggle')){
    list[i].status = list[i].status==='activo'?'bloqueado':'activo'; saveUsuarios(list); renderUsuarios();
  } else if(e.target.classList.contains('edit')){
    const u = list[i];
    document.getElementById('m_user').value = u.user;
    document.getElementById('m_role').value = u.role;
    document.getElementById('m_status').value = u.status;
    openModal();
    // remove old and will be re-added on save (simple behavior)
    list.splice(i,1); saveUsuarios(list);
  }
});
renderUsuarios();
