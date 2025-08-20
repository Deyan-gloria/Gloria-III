// pagos.js - CRUD pagos con filtros
const P_KEY = 'gloria_pagos_v2';
function loadP(){ return JSON.parse(localStorage.getItem(P_KEY) || '[]'); }
function saveP(l){ localStorage.setItem(P_KEY, JSON.stringify(l)); }
function renderP(){
  const tbody = document.querySelector('#tblPagos tbody'); if(!tbody) return;
  tbody.innerHTML='';
  const fC = document.getElementById('f_concepto')?.value || '';
  const fE = document.getElementById('f_estado')?.value || '';
  loadP().filter(p=>{
    if(fC && p.concepto!==fC) return false;
    if(fE && p.estado!==fE) return false;
    return true;
  }).forEach((p,i)=>{
    const tr = document.createElement('tr');
    tr.innerHTML = '<td>'+ (p.apto||'') +'</td><td>'+ (p.torre||'') +'</td><td>'+ (p.concepto||'') +'</td><td>'+ (p.monto||'') +'</td><td>'+ (p.fecha||'') +'</td><td>'+ (p.estado||'') +'</td><td>' +
      '<button data-i="'+i+'" class="action-btn edit">✏️</button><button data-i="'+i+'" class="action-btn del">🗑️</button></td>';
    tbody.appendChild(tr);
  });
}
document.getElementById('nuevoPago')?.addEventListener('click', ()=>{
  const apto = prompt('Apto')||'';
  const torre = prompt('Torre')||'';
  const concepto = prompt('Concepto (admin/arriendo/parqueo/otro)','admin')||'admin';
  const monto = prompt('Monto')||'0';
  const fecha = prompt('Fecha (YYYY-MM-DD)', new Date().toISOString().slice(0,10))||new Date().toISOString().slice(0,10);
  const estado = prompt('Estado (al-dia/en-mora)','al-dia')||'al-dia';
  const list = loadP();
  list.push({apto,torre,concepto,monto,fecha,estado});
  saveP(list); renderP();
});
document.querySelector('#tblPagos tbody')?.addEventListener('click',(e)=>{
  const i = e.target?.dataset?.i; if(i===undefined) return;
  const list = loadP();
  if(e.target.classList.contains('del')){ if(confirm('Eliminar?')){ list.splice(i,1); saveP(list); renderP(); } }
  if(e.target.classList.contains('edit')){
    const p = list[i];
    p.monto = prompt('Monto', p.monto) || p.monto;
    saveP(list); renderP();
  }
});
document.getElementById('f_concepto')?.addEventListener('change', renderP);
document.getElementById('f_estado')?.addEventListener('change', renderP);
renderP();