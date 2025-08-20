// residentes.js - CRUD residentes + vehículos
const RS_KEY = 'gloria_residentes_v2';
function loadRes(){ return JSON.parse(localStorage.getItem(RS_KEY) || '[]'); }
function saveRes(l){ localStorage.setItem(RS_KEY, JSON.stringify(l)); }
function renderRes(){
  const tbody = document.querySelector('#tblResidentes tbody'); if(!tbody) return;
  tbody.innerHTML='';
  const q = document.getElementById('search')?.value?.toLowerCase() || '';
  loadRes().filter(r=>{
    const hay = [(r.placas||[]).join(' '), r.apto, r.torre, r.nombre, r.apellido, r.cedula].join(' ').toLowerCase();
    return hay.includes(q);
  }).forEach((r,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>'+ (r.apto||'') +'</td><td>'+(r.torre||'')+'</td><td>'+(r.nombre||'')+' '+(r.apellido||'')+'</td><td>'+(r.tipo_persona||'')+'</td><td>'+((r.placas||[]).join(', '))+'</td><td>' +
      '<button data-i="'+i+'" class="action-btn edit">✏️</button><button data-i="'+i+'" class="action-btn del">🗑️</button></td>';
    tbody.appendChild(tr);
  });
}
document.getElementById('btnCrear')?.addEventListener('click', ()=>{
  const nombre = prompt('Nombre'); if(!nombre) return;
  const apellido = prompt('Apellido') || '';
  const apto = prompt('Apto') || '';
  const torre = prompt('Torre') || '';
  const tipo_persona = prompt('Tipo persona (propietario/arrendatario/visitante)','propietario') || 'propietario';
  const placas = prompt('Placas (separadas por comas)') || '';
  const cedula = prompt('Cédula') || '';
  const tipo_vehiculo = prompt('Tipo de vehículo (auto/moto/etc)') || '';
  const list = loadRes();
  list.push({nombre,apellido,apto,torre,tipo_persona,placas:placas?placas.split(',').map(s=>s.trim()):[],cedula,tipo_vehiculo});
  saveRes(list); renderRes();
});
document.querySelector('#tblResidentes tbody')?.addEventListener('click',(e)=>{
  const i = e.target?.dataset?.i; if(i===undefined) return;
  const list = loadRes();
  if(e.target.classList.contains('del')){ if(confirm('Eliminar?')){ list.splice(i,1); saveRes(list); renderRes(); } }
  if(e.target.classList.contains('edit')){
    const r = list[i];
    const nombre = prompt('Nombre', r.nombre); if(nombre===null) return; r.nombre = nombre;
    saveRes(list); renderRes();
  }
});
document.getElementById('search')?.addEventListener('input', renderRes);
renderRes();