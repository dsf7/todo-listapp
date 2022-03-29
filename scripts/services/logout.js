const signOut = document.getElementById("closeApp");
const logout = (e) => {
  // dps de fazer o logout, deve-se apagar o token do localStorage
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  window.location.href = "/";
};

signOut.addEventListener("click", logout);
