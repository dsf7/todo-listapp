const passValidation = document.getElementById("passValidation");

const authenticate = async (email, pass) => {
  passValidation.innerHTML = "";

  const result = {
    email: email,
    password: pass,
  };
  await fetch("https://ctd-todo-api.herokuapp.com/v1/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(result),
  })
    .then((res) => {
      if (!res.ok) {
        throw Error("Error");
      }
      return res.json();
    })
    .then((res) => {
      if (res.jwt) {
        window.localStorage.setItem("jwt", res.jwt);
        document.cookie = `token=Bearer ${res.jwt}; path=/`;
        window.location.href = "tarefas.html";
      } else {
        passValidation.innerHTML =
          "Algo deu errado, verifique seu e-mail/senha.";
      }
    })
    .catch((err) => console.log(err));
};
