const signOut = document.getElementById("closeApp");
const logout = (e) => {
  // dps de fazer o logout, deve-se apagar o token do localStorage
  window.localStorage.removeItem("jwt");
  window.location.href = "index.html";
};

signOut.addEventListener("click", logout);
