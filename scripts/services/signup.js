const nameInput = document.querySelector("#nameInput");
const nameVerify = document.querySelector("#nameVerify");
const lastNameInput = document.querySelector("#lastNameInput");
const lastNameVerify = document.querySelector("#lastNameVerify");
const mailInput = document.querySelector("#mailInput");
const mailVerify = document.querySelector("#mailVerify");
const passwdInput = document.querySelector("#inputPassword");
const passVerify = document.querySelector("#passVerify");
const passRepeat = document.querySelector("#repeatPass");
const submitBtn = document.querySelector("#submitBtn");
const form = document.querySelector("form");

let isNameValid = false;
let isLastNameValid = false;
let isMailValid = false;
let isPassMatch = false;

disableBtn();

form.addEventListener("change", (evt) => {
  isValid(); 
});

nameInput.addEventListener("input", (evt) => {
  isNameValid = validInput(nameVerify, nameInput);
  isValid();
});

lastNameInput.addEventListener("input", (evt) => {
  isLastNameValid = validInput(lastNameVerify, lastNameInput);
});

mailInput.addEventListener("input", (evt) => {
  if (mailInput.value === "") {
    validInput(mailVerify, mailInput);
  } else {
    isMailValid = validMail(mailInput.value);
  }
});

submitBtn.addEventListener("click", (evt) => {
  evt.preventDefault();
  if (isValid) {
    addUser(
      nameInput.value,
      lastNameInput.value,
      mailInput.value,
      passwdInput.value
    );
  }
});

passwdInput.addEventListener("keypress", (evt) => {
  validationSpacePasswd(evt);
});
passRepeat.addEventListener("input", (evt) => {
  isPassMatch = equalPasswords(passwdInput.value, passRepeat.value);
  isValid();
});

function isValid() {
  if (isNameValid && isLastNameValid && isMailValid && isPassMatch) {
    submitBtn.removeAttribute("disabled");
    submitBtn.innerText = "Cadastrar";
    return true;
  } else {
    submitBtn.setAttribute("disabled", true);
    submitBtn.innerText = "Preencha o Formulário";
    return false;
  }
}

function disableBtn() {
  submitBtn.setAttribute("disabled", true);
  submitBtn.innerText = "Preencha o Formulário";
}
