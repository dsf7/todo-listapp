const signInForm = document.getElementById("signInForm");
const mail = document.querySelector("#inputEmail");
const pswd = document.querySelector("#inputPassword");
const acessBtn = document.querySelector("#acessButton");
const respose = document.querySelector("#response")
const login = (e) => {
  e.preventDefault();
  const validatedMail = trimText(mail.value);
  const validatedPsswd = trimText(pswd.value);

  //   faça as validações e passe os valores corretos nos parametros
  //   email / password
  authenticate(validatedMail, validatedPsswd);
};

signInForm.addEventListener("submit", login);
