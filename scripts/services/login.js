let mailInput = document.querySelector("#inputEmail");
let passwdInput = document.querySelector("#inputPassword");
let acessBtn = document.querySelector("#buttonAcess");
let mailVerify = document.querySelector("#mailVerify");
let passVerify = document.querySelector("#passVerify");
let isMailvalid = false;
let isPassValid = false;

isValid();

acessBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (isValid()) {
    authenticate(mailInput.value, passwdInput.value);
  } else {
  }
});

mailInput.addEventListener("input", (evt) => {
  isMailvalid = validMail(mailInput.value);
  isValid();
});

passwdInput.addEventListener("keypress", (evt) => {
  validationSpacePasswd(evt);
});

passwdInput.addEventListener("input", (evt) => {
  isPassValid = validInput(passVerify, passwdInput);
  isValid();
});

function isValid() {
  if (isMailvalid && isPassValid) {
    acessBtn.removeAttribute("disabled");
    acessBtn.innerText = "Acessar";
    return true;
  } else {
    acessBtn.setAttribute("disabled", true);
    acessBtn.innerText = "Bloqueado";
    return false;
  }
}
