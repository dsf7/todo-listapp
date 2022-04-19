let mailRegex =
  /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

function validMail(mail) {
  mail.toLowerCase();
  if (mailRegex.test(mailInput.value)) {
    mailVerify.innerText = "";
    mailInput.style.border = "none";
    return true;
  } else {
    mailVerify.innerText = "E-mail inválido";
    mailInput.style.border = "1px solid #FF0000";
    return false;
  }
}

function lowerCaseValue(value) {
  return value.toLowerCase();
}

function validInput(smallElement, input) {
  if (input.value !== "") {
    smallElement.innerText = "";
    input.style.border = "none";
    return true;
  } else {
    smallElement.innerText = "Campo obrigatório.";
    input.style.border = "1px solid #FF0000";
    return false;
  }
}

function validationSpacePasswd(evt) {
  if (evt.code === "Space") {
    evt.preventDefault();
    passVerify.innerText = "Espaços não são permitidos.";
  } else {
    passVerify.innerText = "";
  }
}

function equalPasswords(value1, value2) {
  if (value1 !== value2) {
    equalVerify.innerText = "A senhas não coincidem, verifique.";
    passwdInput.style.border = "1px solid #FF0000";
    repeatPass.style.border = "1px solid #FF0000";
    return false;
  } else {
    equalVerify.innerText = "";
    passwdInput.style.border = "none";
    passRepeat.style.border = "none";
    return true;
  }
}

function sendApiResponse(text, smallElement) {
  smallElement.innerText = text;
}

