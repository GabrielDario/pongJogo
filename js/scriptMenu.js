let iconeSom = document.querySelector("#iconeSom");
let menuSom = new Audio('sons/menu.wav');
let somLigado = false;

function ligarSom() {
    if (somLigado == false) {
        menuSom.play();
        somLigado = true;
    } else {
        menuSom.pause();
        somLigado = false;
    }
}

