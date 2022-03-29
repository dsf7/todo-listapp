const signInForm = document.getElementById("signInForm");
const mail = document.querySelector("#inputEmail");
const pswd = document.querySelector("#inputPassword");
const acessBtn = document.querySelector("#acessButton");

const login = (e) => {
  e.preventDefault();
  // const validatedMail = trimText(mail.value);
  // const validatedPsswd = trimText(pswd.value);

  //   faça as validações e passe os valores corretos nos parametros
  //   email / password
  authenticate(e.target.email.value, e.target.password.value);
};

signInForm.addEventListener("submit", login);
