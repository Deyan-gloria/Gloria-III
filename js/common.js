// common.js - helpers
(function(){
  const publicPages = ['index.html'];
  const path = location.pathname.split('/').pop();
  if(!localStorage.getItem('gloria_user') && !publicPages.includes(path)){
    // permitimos abrir por ahora para pruebas; puedes descomentar para forzar login
    // location.href = 'index.html';
  }
  window._gloria = { formatDate: function(d){ try{ const dt = new Date(d); return dt.toLocaleDateString(); }catch(e){ return d; } } };
})();