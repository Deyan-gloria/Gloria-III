const loginForm = document.getElementById("loginForm");
if(loginForm){
  loginForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    if(user==="admin" && pass==="1234"){
      sessionStorage.setItem("loggedIn", true);
      window.location.href = "residentes.html";
    } else {
      alert("Credenciales inválidas");
    }
  });
}