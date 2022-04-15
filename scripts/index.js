onload = () => {
  if (localStorage.getItem("jwt")) {
    window.location.href = "../pages/tarefas.html";
  } else {
    console.log("não tem token");
  }
};
