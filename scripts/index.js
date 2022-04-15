onload = () => {
  if (localStorage.getItem("jwt")) {
    window.location.href = "tarefas.html";
  } else {
    console.log("não tem token");
  }
};
