const mailValidation = document.getElementById("mailValidation");
const passValidation = document.getElementById("passValidation");

const authenticate = async (email, pass) => {
  mailValidation.innerHTML = "";
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
    .then((res) => res.json())
    .then((res) => {
      if (res.error) {
        let responseError = Object.values(res.error).join("");
        if (responseError.toLowerCase().includes("user")) {
          mailValidation.innerHTML = responseError;
          mail.style.border = "1px solid #FF0000";
        } else {
          mail.style.border = "";
          pswd.style.border = "";
        }
        if (responseError.includes("password")) {
          passValidation.innerHTML = responseError;
          pswd.style.border = "1px solid #FF0000";
        } else {
          pswd.style.border = "";
        }
        return;
      }

      if (res.jwt) {
        document.cookie = `token=Bearer ${res.jwt}; path=/`;
        window.location.href = "/tarefas.html";
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
};
