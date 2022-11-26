let canvas = document.querySelector("#idCanvas");
var pincel = canvas.getContext("2d");

//ValorES da bolinha x e y
let bolinhaX = 250; 
let bolinhaY = 250; 

//ValorES da raquete 1 - Altura e largura
let larguraRaquete1 = 10;
let alturaRaquete1 = 150;
let xRaquete = 15;
let yRaquete = 200;

//raquete 2
let xRaquete2 = 475;
let yRaquete2 = 200;

let taxa = 25;

// códigos do teclado
var cima = 38;
var baixo = 40;

var w = 87;
var s = 83;


// função que desenha o grid.
function limpaTela() {
  var descer = 0;
  while (descer <= 500) {
      for (var imp = 0; imp <= 500; imp = imp + 25) {
          pincel.fillStyle = "black";
          pincel.strokeStyle = "blue";
          pincel.beginPath();
          pincel.rect(imp, descer, 25, 25);
          pincel.closePath();
          pincel.fill();
          pincel.stroke();
      }
      descer = descer + 25;
  }
}


// função que cria a bolinha
function desenhaCirculo(x, y, raio) {

  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.arc(bolinhaX, bolinhaY, raio, 0, 2 * Math.PI);
  pincel.fill();
}
// função a raquete esqueda
function desenhaRaquete1(larguraRaquete1, alturaRaquete1,xRaquete,yRaquete) {

  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.rect(xRaquete,yRaquete, larguraRaquete1, alturaRaquete1);
  pincel.fill();
}

function desenhaRaquete2(larguraRaquete1, alturaRaquete1,xRaquete2,yRaquete2) {

  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.rect(xRaquete2,yRaquete2, larguraRaquete1, alturaRaquete1);
  pincel.fill();
}


function atualizaTela() {
  limpaTela();
  desenhaCirculo(bolinhaX, bolinhaY, 10);
  desenhaRaquete1(larguraRaquete1, alturaRaquete1, xRaquete,yRaquete);
  desenhaRaquete2(larguraRaquete1, alturaRaquete1, xRaquete2,yRaquete2);
}

function leDoTeclado(evento) {

  if (evento.keyCode == cima && yRaquete - taxa >= 0) {
    yRaquete= yRaquete - taxa;

  } else if (evento.keyCode == baixo && yRaquete + taxa <= 350) {
    yRaquete = yRaquete + taxa;

  } 
  if (evento.keyCode == w && yRaquete2 - taxa >= 0) {
    yRaquete2= yRaquete2 - taxa;

  } else if (evento.keyCode == s && yRaquete2 + taxa <= 350) {
    yRaquete2 = yRaquete2 + taxa;

  } 
}


document.onkeydown = leDoTeclado;

setInterval(atualizaTela, 50);



