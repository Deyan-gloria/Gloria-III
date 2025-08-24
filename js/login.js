document.addEventListener('DOMContentLoaded', () => {
  const loginBtn = document.getElementById('loginBtn');
  const modal = document.getElementById('loginModal');
  const closeBtn = document.querySelector('.close');
  const accessBtn = document.getElementById('accessBtn');
  const passwordInput = document.getElementById('password');
  const msg = document.getElementById('msg');
  let attempts = 3;

  loginBtn.onclick = () => modal.style.display = 'block';
  closeBtn.onclick = () => modal.style.display = 'none';
  window.onclick = (e) => { if (e.target == modal) modal.style.display = 'none'; };

  accessBtn.onclick = () => {
    const pwd = passwordInput.value;
    if (pwd === 'admin123') {
      sessionStorage.setItem('loggedIn', 'true');
      window.location.href = 'dashboard.html';
    } else {
      attempts--;
      msg.textContent = `Clave incorrecta. Intentos restantes: ${attempts}`;
      if (attempts <= 0) {
        sessionStorage.removeItem('loggedIn');
        location.reload();
      }
    }
  };
});
