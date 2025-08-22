function logout(){
  sessionStorage.removeItem("loggedIn");
  window.location.href = "index.html";
}
window.onload = ()=>{
  if(!sessionStorage.getItem("loggedIn")){
    if(!window.location.href.includes("index.html")){
      window.location.href = "index.html";
    }
  }
};
