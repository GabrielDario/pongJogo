let canvas = document.querySelector("#idCanvas");
var pincel = canvas.getContext("2d");

let x = 12.5;
let y = 12.5;
let taxa = 25;

// códigos do teclado
var esquerda = 37
var cima = 38
var direita = 39
var baixo = 40


// função que desenha o grid.
function limpaTela() {
  var descer = 0;
  while (descer <= 500) {
      for (var imp = 0; imp <= 500; imp = imp + 25) {
          pincel.fillStyle = "green";
          pincel.strokeStyle = "black";
          pincel.beginPath();
          pincel.rect(imp, descer, 25, 25);
          pincel.closePath();
          pincel.fill();
          pincel.stroke();
      }
      descer = descer + 25;
  }
}


// função que cria o objeto.
function desenhaCirculo(x, y, raio) {

  pincel.fillStyle = 'black';
  pincel.beginPath();
  pincel.arc(x, y, raio, 0, 2 * Math.PI);
  pincel.fill();
}


function atualizaTela() {

  limpaTela();

  desenhaCirculo(x, y, 10);

}

function leDoTeclado(evento) {

  if (evento.keyCode == cima && y - taxa > 0) {
      y = y - taxa;

  } else if (evento.keyCode == baixo && y + taxa < 500) {
      y = y + taxa;

  } else if (evento.keyCode == esquerda && x - taxa > 0) {
      x = x - taxa;

  } else if (evento.keyCode == direita && x + taxa < 500) {
      x = x + taxa;
  }
}


document.onkeydown = leDoTeclado;

setInterval(atualizaTela, 50);



