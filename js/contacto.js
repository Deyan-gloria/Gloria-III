
// contacto.js - PQRS con localStorage
const Q_KEY = 'gloria_pqrs_v1';
function loadQ(){ return JSON.parse(localStorage.getItem(Q_KEY) || '[]'); }
function saveQ(l){ localStorage.setItem(Q_KEY, JSON.stringify(l)); }
function renderQ(){
  const tbody = document.querySelector('#tblPQRS tbody');
  tbody.innerHTML='';
  loadQ().forEach((q,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${q.tipo}</td><td>${q.nombre}</td><td>${q.tel}</td><td>${q.msg}</td><td><button data-i="${i}" class="del">🗑️</button></td>`;
    tbody.appendChild(tr);
  });
}
document.getElementById('pqrsForm').addEventListener('submit', function(e){
  e.preventDefault();
  const tipo = document.getElementById('pqrs_tipo').value;
  const nombre = document.getElementById('pqrs_nombre').value;
  const tel = document.getElementById('pqrs_tel').value;
  const msg = document.getElementById('pqrs_msg').value;
  const list = loadQ();
  list.push({tipo,nombre,tel,msg,fecha:new Date().toISOString()});
  saveQ(list); renderQ();
  this.reset();
});
document.querySelector('#tblPQRS tbody')?.addEventListener('click',(e)=>{
  const i = e.target?.dataset?.i; if(i===undefined) return;
  const list = loadQ();
  if(e.target.classList.contains('del')){ if(confirm('Eliminar?')){ list.splice(i,1); saveQ(list); renderQ(); } }
});
renderQ();
