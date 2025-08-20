// contacto.js - PQRS con localStorage
const Q_KEY = 'gloria_pqrs_v2';
function loadQ(){ return JSON.parse(localStorage.getItem(Q_KEY) || '[]'); }
function saveQ(l){ localStorage.setItem(Q_KEY, JSON.stringify(l)); }
function renderQ(){
  const tbody = document.querySelector('#tblPQRS tbody'); if(!tbody) return;
  tbody.innerHTML='';
  loadQ().forEach((q,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>'+q.tipo+'</td><td>'+q.nombre+'</td><td>'+q.tel+'</td><td>'+q.msg+'</td><td><button data-i="'+i+'" class="action-btn del">🗑️</button></td>';
    tbody.appendChild(tr);
  });
}
document.getElementById('pqrsForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  const tipo = document.getElementById('pqrs_tipo').value;
  const nombre = document.getElementById('pqrs_nombre').value.trim();
  const tel = document.getElementById('pqrs_tel').value.trim();
  const msg = document.getElementById('pqrs_msg').value.trim();
  if(!nombre || !msg){ alert('Nombre y mensaje son obligatorios'); return; }
  const list = loadQ();
  list.push({tipo,nombre,tel,msg,fecha:new Date().toISOString()});
  saveQ(list); renderQ(); this.reset();
});
document.querySelector('#tblPQRS tbody')?.addEventListener('click',(e)=>{
  const i = e.target?.dataset?.i; if(i===undefined) return;
  const list = loadQ();
  if(e.target.classList.contains('del')){ if(confirm('Eliminar?')){ list.splice(i,1); saveQ(list); renderQ(); } }
});
renderQ();