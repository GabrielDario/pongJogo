// Criando componente Canvas para dsenhos em 2D
let canvas = document.querySelector("#idCanvas");
var pincel = canvas.getContext("2d");

//ValorES da bolinha x e y
let bolinhaX = 250;
let bolinhaY = 250;
let raioBola = 5;
let velocidadeBolinha = 1;
let bolinhaReto = false;

// placar
let pontoA = 0;
let pontoB = 0;

let diferenca; //diferenca dos angulos quando rebate
let bolinhaParaFrente = true; //se vai decrementando ou diminuindo Eixo X
let bolinhaParaCima = true; //se vai decrementando ou diminuindo Eixo Y


//ValorES da raquete 1 - Altura e largura
let larguraRaquete1 = 10;
let alturaRaquete1 = 100;
let xRaquete = 15; //CORDENADAS DA RAQUETE
let yRaquete = 200;

//raquete 2
let xRaquete2 = 475;
let yRaquete2 = 300;

let taxa = 10; //valocidade da raquete

// códigos dos teclado para interação
var cima = 38;
var baixo = 40;
var w = 87;
var s = 83;

// Sons
let rebater = new Audio('sons/rebater.wav');
let gol = new Audio('sons/goal.wav');
let game = new Audio('sons/game.wav');
// função que desenha o grid.

function limparTela() {
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

function desenharCampo() {
  //Meio do campo
  pincel.fillStyle = 'green';
  pincel.beginPath();
  pincel.rect(245, 0, 10, 500);
  pincel.fill();

  //Meio campo bola
  pincel.fillStyle = 'green';
  pincel.beginPath();
  pincel.arc(250, 250, 40, 0, 2 * Math.PI);
  pincel.fill();

  //Meio campo bola2
  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.arc(250, 250, 10, 0, 2 * Math.PI);
  pincel.fill();



}

// função que cria a bolinha
function desenharCirculo() {
  pincel.fillStyle = 'white';
  pincel.beginPath();// começa a pintar

  // EIXO X
  //Verifica colisão no eixo X - entre 0 e 500

  if (bolinhaX >= 500) {
    bolinhaParaFrente = false;
  }
  if (bolinhaX <= 0) {
    bolinhaParaFrente = true;
  }
  // Se for verdadeiro,ele vai somando - EIXO X
  if (bolinhaParaFrente == true) {
    bolinhaX = bolinhaX + velocidadeBolinha;

    // Se não for verdadeiro,ele vai decrementando - EIXO X
  } else {
    bolinhaX = bolinhaX - velocidadeBolinha;
  }
  if (bolinhaReto == true && bolinhaParaFrente == false) {
    console.log("RETO COM com direita")
    bolinhaX = bolinhaX - velocidadeBolinha;
    bolinhaY = bolinhaY + 0;
  }
  if (bolinhaReto == true && bolinhaParaFrente == true) {
    console.log("RETO da esquerda")
    bolinhaX = bolinhaX + velocidadeBolinha;
    bolinhaY = 0;
  }
  // EIXO Y
  //Verifica colisão no eixo Y - entre 0 e 500
  if (bolinhaY >= 500) {
    bolinhaParaCima = false;
  }
  if (bolinhaY <= 0) {
    bolinhaParaCima = true;
  }
  // Se for verdadeiro,ele vai somando - EIXO Y
  if (bolinhaParaCima == true) {

    bolinhaY = bolinhaY + velocidadeBolinha;

    // Se não for verdadeiro,ele vai decrementando - EIXO Y
  } else {
    bolinhaY = bolinhaY - velocidadeBolinha;
  }


  //pinta a bolinha
  pincel.arc(bolinhaX, bolinhaY, raioBola, 0, 2 * Math.PI);
  pincel.fill();
}
// função a raquete esqueda
function desenharRaquete1(larguraRaquete1, alturaRaquete1, xRaquete, yRaquete) {

  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.rect(xRaquete, yRaquete, larguraRaquete1, alturaRaquete1);
  pincel.fill();
}
// função a raquete direita
function desenharRaquete2(larguraRaquete1, alturaRaquete1, xRaquete2, yRaquete2) {

  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.rect(xRaquete2, yRaquete2, larguraRaquete1, alturaRaquete1);
  pincel.fill();
}
function verificarColisaoRaquete1() {

  if (bolinhaX >= 34 && bolinhaX <= 36) { //bolinha na raquete 1
    diferenca = bolinhaY - yRaquete;
    console.log(diferenca)
    if (bolinhaY + 105 >= yRaquete && diferenca >= -15 && diferenca <= alturaRaquete1 + 15) {
      rebater.play();

      verificarAngulo1();
    }
  }

}
function verificarColisaoRaquete2() {
  if (bolinhaX >= 464 && bolinhaX <= 466) { //bolinha na raquete 1
    diferenca = bolinhaY - yRaquete2;

    if (bolinhaY + 105 >= yRaquete2 && diferenca >= -15 && diferenca <= alturaRaquete1 + 15) {
      rebater.play();

      verificarAngulo2();
    }
  }

}

//se pegar mais pra cima da raquete,bola vai para cima (primeiros 75 pixels)
//se pegar mais pra cima da raquete,bola vai para cima (dos 76 pixels até o 150 px)
function verificarAngulo1() {
 
  console.log("esquerda: " + diferenca);
  if (diferenca >= -15 && diferenca <= 11) {  // aumenta velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = false;
    bolinhaReto = false;
    velocidadeBolinha = velocidadeBolinha * 2;
    console.log("x2");
    bolinhaReto = false;
  } else if (diferenca > 11 && diferenca <= 37) { // regula velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = false;
    velocidadeBolinha = 5;
    bolinhaReto = false;
  } else if (diferenca > 37 && diferenca <= 63) { // retoo
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
    bolinhaReto = true;
    console.log("Retoo!!");

  } else if (diferenca > 63 && diferenca <= 89) {// regula velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = true;
    velocidadeBolinha = 5;
    bolinhaReto = false;
  } else if (diferenca > 89 && diferenca <= alturaRaquete1 + 15) {// aumenta velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = true;
    velocidadeBolinha = velocidadeBolinha * 2;
    console.log("x2");
    bolinhaReto = false;
  }
}

function verificarAngulo2() {
  console.log("direita: " + diferenca);
  if (diferenca >= -15 && diferenca <= 11) {  // aumenta velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = false;
    velocidadeBolinha = velocidadeBolinha * 2;
    console.log("x2");
    bolinhaReto = false;
  } else if (diferenca > 11 && diferenca <= 37) { // regula velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = false;
    velocidadeBolinha = 5;
    bolinhaReto = false;
  } else if (diferenca > 37 && diferenca <= 63) { // retoo
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
    bolinhaReto = true;
    console.log("Retoo!!");

  } else if (diferenca > 63 && diferenca <= 89) {// regula velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
    velocidadeBolinha = 5;
    bolinhaReto = false;
  } else if (diferenca > 89 && diferenca <= alturaRaquete1 + 15) {// aumenta velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
    bolinhaReto = false;
    velocidadeBolinha = velocidadeBolinha * 2;
    console.log("x2");
  }
}

function verificarGol() {


  if (bolinhaX <= 0) {
    gol.play();
    velocidadeBolinha = 5;
    bolinhaReto = false;
    pontoB = pontoB + 1;
  }
  if (bolinhaX >= 500) {
    gol.play();
    velocidadeBolinha = 5;
    bolinhaReto = false;
    pontoA = pontoA + 1;
  }
}
function criarPlacar() {
  pincel.font = '48px serif';
  pincel.fillText(pontoA, 200, 50);
  pincel.fillText(pontoB, 275, 50);
  pincel.fill();
}
function atualizarTelar() {

  limparTela();
  desenharCampo();
  desenharCirculo();
  desenharRaquete1(larguraRaquete1, alturaRaquete1, xRaquete, yRaquete);
  desenharRaquete2(larguraRaquete1, alturaRaquete1, xRaquete2, yRaquete2);

  verificarColisaoRaquete1();
  verificarColisaoRaquete2();
  criarPlacar();
  verificarGol();
  atualizadHoras();
}

function atualizadHoras() {
  pincel.font = '30px serif';
  pincel.fontColor = "blue";
  let agora = new Date();
  let hora = agora.getHours();
  let minutos = agora.getUTCMinutes();
  let segundos = agora.getUTCSeconds();


  pincel.fillText(hora + ":", 380, 50);
  pincel.fillText(minutos + ":", 420, 50);
  pincel.fillText(segundos + "", 460, 50);
  pincel.fill();
}
function leDoTeclado(evento) {
  game.play();
  if (evento.keyCode == cima && yRaquete2 - taxa >= 0) {
    yRaquete2 = yRaquete2 - taxa;

  } else if (evento.keyCode == baixo && yRaquete2 + taxa <= 400) {
    yRaquete2 = yRaquete2 + taxa;

  }
  if (evento.keyCode == w && yRaquete - taxa >= 0) {
    yRaquete = yRaquete - taxa;

  } else if (evento.keyCode == s && yRaquete + taxa <= 400) {
    yRaquete = yRaquete + taxa;

  }
}
function teste() {
  //console.log("BONUS");


}

document.onkeydown = leDoTeclado;

setInterval(atualizarTelar, 50);;
setInterval(teste, 10000); // bonus a cada 10 segundos



