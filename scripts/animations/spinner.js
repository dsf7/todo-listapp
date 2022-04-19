function spinnerOn() {

    let spinner = document.querySelector('div');
    spinner.classList.add("loader");

    let body = document.querySelector("body");
    body.appendChild(spinner);

}

function spinnerOff() {
    let body = document.querySelector("body");
    
    let spinner = document.querySelector(".loader");

    body.removeChild(spinner);



}