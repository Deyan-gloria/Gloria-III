
// residentes.js - CRUD simple para residentes + vehículos (localStorage)
const RS_KEY = 'gloria_residentes_v1';
function loadRes(){ return JSON.parse(localStorage.getItem(RS_KEY) || '[]'); }
function saveRes(l){ localStorage.setItem(RS_KEY, JSON.stringify(l)); }
function renderRes(){
  const tbody = document.querySelector('#tblResidentes tbody');
  tbody.innerHTML='';
  const q = document.getElementById('search')?.value?.toLowerCase() || '';
  loadRes().filter(r=>{
    return [r.placas?.join(' '), r.apto, r.torre, r.nombre, r.cedula].join(' ').toLowerCase().includes(q);
  }).forEach((r,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `<td>${r.apto||''}</td><td>${r.torre||''}</td><td>${r.nombre||''}</td><td>${(r.placas||[]).join(', ')}</td><td>
      <button data-i="${i}" class="edit">✏️</button>
      <button data-i="${i}" class="del">🗑️</button>
    </td>`;
    tbody.appendChild(tr);
  });
}
document.getElementById('btnCrear').addEventListener('click', ()=>{
  const nombre = prompt('Nombre completo');
  if(!nombre) return;
  const apto = prompt('Apto');
  const torre = prompt('Torre');
  const placas = prompt('Placas (separadas por comas)');
  const cedula = prompt('Cédula');
  const list = loadRes();
  list.push({nombre,apto,torre,placas:placas?placas.split(',').map(s=>s.trim()):[],cedula});
  saveRes(list);
  renderRes();
});
document.querySelector('#tblResidentes tbody')?.addEventListener('click',(e)=>{
  const i = e.target?.dataset?.i; if(i===undefined) return;
  const list = loadRes();
  if(e.target.classList.contains('del')){ if(confirm('Eliminar?')){ list.splice(i,1); saveRes(list); renderRes(); } }
  if(e.target.classList.contains('edit')){
    const r = list[i];
    const nombre = prompt('Nombre', r.nombre);
    if(nombre===null) return;
    r.nombre = nombre;
    saveRes(list); renderRes();
  }
});
document.getElementById('search').addEventListener('input', renderRes);
renderRes();
