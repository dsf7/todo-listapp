let mail = document.querySelector("#inputEmail");
let pswd = document.querySelector("#inputPassword");
let acessBtn = document.querySelector("#acessButton");


acessBtn.addEventListener("click",(evento) => {
    validatedMail = trimText(mail.value);
    validatedPsswd = trimText(pswd.value);
})