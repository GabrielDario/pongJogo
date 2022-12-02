// Criando componente Canvas para dsenhos em 2D
let canvas = document.querySelector("#idCanvas");
var pincel = canvas.getContext("2d");
let canvasWidth = 600
canvas.width = canvasWidth;
let canvasHeight = 400;
canvas.height = canvasHeight;

//Valores da bolinha x e y
let bolinhaX = canvasWidth / 2;
let bolinhaY = canvasHeight / 2;
let raioBola = 5;
let velocidadeBolinha = 5;
let bolinhaReto = false;

// Placar
let pontoA = 0;
let pontoB = 0;

//Multiplicador
let multiplicadorTela = 1;
let multiplicador = 1.1;

let diferenca; //diferenca dos angulos quando rebate
let bolinhaParaFrente = true; //se vai decrementando ou diminuindo Eixo X
let bolinhaParaCima = true; //se vai decrementando ou diminuindo Eixo Y


//ValorES da raquete 1 - Altura e largura
let larguraRaquete1 = 10;
let alturaRaquete1 = 100;
let xRaquete = 15; //CORDENADAS DA RAQUETE
let yRaquete = (canvasHeight / 2) - 50;

//raquete 2
let xRaquete2 = canvasWidth - 25;
let yRaquete2 = (canvasHeight / 2) - 50;

let taxa = 10; //valocidade da raquete

// códigos dos teclado para interação
var cima = 38;
var baixo = 40;
var w = 87;
var s = 83;

//bonus
let bonusX;
let bonusY;
let bonusAltura = 25;
let bonusLargura = 25;


// Sons
let rebater = new Audio('sons/rebater.wav');
let gol = new Audio('sons/goal.wav');
let game = new Audio('sons/game.wav');
// função que desenha o grid.

let bonus = false; //Para ativar um bonus
function limparTela() {
  var descer = 0;
  while (descer <= canvasHeight) {
    for (var imp = 0; imp <= canvasWidth; imp = imp + 25) {
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
  pincel.rect((canvasWidth / 2) - 5, 0, 10, canvasWidth);
  pincel.fill();

  //Meio campo bola
  pincel.fillStyle = 'green';
  pincel.beginPath();
  pincel.arc(canvasWidth / 2, canvasHeight / 2, 40, 0, 2 * Math.PI);
  pincel.fill();

  //Meio campo bola2
  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.arc(canvasWidth / 2, canvasHeight / 2, 10, 0, 2 * Math.PI);
  pincel.fill();



}

// função que cria a bolinha
function desenharCirculo() {
  pincel.fillStyle = 'white';
  pincel.beginPath();// começa a pintar

  // EIXO X
  //Verifica colisão no eixo X - entre 0 e 500

  if (bolinhaX >= canvasWidth) {
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
    console.log("RETO COM com direita");
    bolinhaX = bolinhaX - (velocidadeBolinha * multiplicador)

  }
  if (bolinhaReto == true && bolinhaParaFrente == true) {
    console.log("RETO da esquerda")
    bolinhaX = bolinhaX + (velocidadeBolinha * multiplicador)
  }
  // EIXO Y
  //Verifica colisão no eixo Y - entre 0 e 500
  if (bolinhaY >= canvasHeight) {
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

  pincel.beginPath();
  pincel.fillStyle = 'red';
  pincel.rect(xRaquete, yRaquete, 10, 10);
  pincel.rect(xRaquete, yRaquete + 90, 10, 10);
  pincel.fill();

  pincel.beginPath();
  pincel.fillStyle = 'blue';
  pincel.rect(xRaquete, yRaquete + 50, 10, 10);
  pincel.fill();
}
// função a raquete direita
function desenharRaquete2(larguraRaquete1, alturaRaquete1, xRaquete2, yRaquete2) {

  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.rect(xRaquete2, yRaquete2, larguraRaquete1, alturaRaquete1);
  pincel.fill();

  pincel.beginPath();
  pincel.fillStyle = 'red';
  pincel.rect(xRaquete2, yRaquete2, 10, 10);
  pincel.rect(xRaquete2, yRaquete2 + 90, 10, 10);
  pincel.fill();

  pincel.beginPath();
  pincel.fillStyle = 'blue';
  pincel.rect(xRaquete2, yRaquete2 + 50, 10, 10);
  pincel.fill();
}
function verificarColisaoRaquete1() {

  if (bolinhaX >= 30 && bolinhaX <= 40) { //bolinha na raquete 1
    diferenca = bolinhaY - yRaquete;

    if (bolinhaY + 105 >= yRaquete && diferenca >= -15 && diferenca <= alturaRaquete1 + 15) {
      rebater.play();

      verificarAngulo1();
    }
  }

}
function verificarColisaoRaquete2() {
  if (bolinhaX >= canvasWidth - 40 && bolinhaX <= canvasWidth - 30) { //bolinha na raquete 1
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

    multiplicadorTela = multiplicadorTela + 1;

    multiplicador = multiplicador + 0.2;

  } else if (diferenca > 11 && diferenca <= 37) { // regula velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = false;
    velocidadeBolinha = 5;
    bolinhaReto = false;
    multiplicadorTela = 1;
    multiplicador = 1.25;

  } else if (diferenca > 37 && diferenca <= 63) { // retoo
    bolinhaParaFrente = true;
    bolinhaParaCima = true;
    bolinhaReto = true;
    console.log("Retoo!!");
    multiplicadorTela = multiplicadorTela + 1;
    multiplicador = multiplicador + 0.2;
  } else if (diferenca > 63 && diferenca <= 89) {// regula velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = true;
    velocidadeBolinha = 5;
    bolinhaReto = false;
    multiplicadorTela = 1;
    multiplicador = 1.25;
  } else if (diferenca > 89 && diferenca <= alturaRaquete1 + 15) {// aumenta velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = true;
    bolinhaReto = false;

    multiplicadorTela = multiplicadorTela + 1;

    multiplicador = multiplicador + 0.2;


  }
  console.log(`VELOCIDADE ${multiplicadorTela} =  ` + velocidadeBolinha);
}

function verificarAngulo2() {
  console.log("direita: " + diferenca);
  if (diferenca >= -15 && diferenca <= 11) {  // aumenta velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = false;
    console.log("x2");

    multiplicadorTela = multiplicadorTela + 1;

    multiplicador = multiplicador + 0.2;

    velocidadeBolinha = velocidadeBolinha * multiplicador;

    bolinhaReto = false;
  } else if (diferenca > 11 && diferenca <= 37) { // regula velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = false;
    velocidadeBolinha = 5;
    bolinhaReto = false;

    multiplicadorTela = 1;
    multiplicador = 1.25;
  } else if (diferenca > 37 && diferenca <= 63) { // retoo
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
    bolinhaReto = true;
    multiplicadorTela = multiplicadorTela + 1;
    multiplicador = multiplicador + 0.2;
    console.log("Retoo!!");

  } else if (diferenca > 63 && diferenca <= 89) {// regula velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
    velocidadeBolinha = 5;
    bolinhaReto = false;

    multiplicadorTela = 1;
    multiplicador = 1.25;
  } else if (diferenca > 89 && diferenca <= alturaRaquete1 + 15) {// aumenta velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
    bolinhaReto = false;
    velocidadeBolinha = velocidadeBolinha * multiplicador;

    multiplicadorTela = multiplicadorTela + 1;

    multiplicador = multiplicador + 0.2;

  }

}

function verificarGol() {
  if (bolinhaX <= 0) {
    gol.play();
    velocidadeBolinha = 5;
    bolinhaReto = false;
    multiplicadorTela = 1;
    multiplicador = 1.25;
    pontoB = pontoB + 1;
  }
  if (bolinhaX >= canvasWidth) {
    gol.play();
    velocidadeBolinha = 5;
    multiplicadorTela = 1;
    multiplicador = 1.25;
    bolinhaReto = false;
    pontoA = pontoA + 1;
  }
}
function criarPlacar() {
  pincel.font = '48px serif';
  pincel.fillStyle = "red";
  pincel.fillText(pontoA, (canvasWidth / 2) + 25, 50);
  pincel.fillText(pontoB, (canvasWidth / 2) - 50, 50);
  pincel.fill();
}

function atualizadHoras() {
  pincel.font = '30px serif';
  pincel.fontColor = "blue";
  let agora = new Date();
  let hora = agora.getHours().toString().padStart(2, '0');
  let minutos = agora.getUTCMinutes().toString().padStart(2, '0');
  let segundos = agora.getUTCSeconds().toString().padStart(2, '0');


  pincel.fillText(hora + ":", canvasWidth - 120, 25);
  pincel.fillText(minutos + ":", canvasWidth - 80, 25);
  pincel.fillText(segundos + "", canvasWidth - 40, 25);
  pincel.fill();
}

function verificarMultiplicador() {
  pincel.beginPath();

  pincel.font = '50px serif';
  pincel.fillStyle = 'yellow';
  pincel.fillText(`${multiplicadorTela} x`, canvasWidth - 75, 75);
  pincel.fill();
}


function criandoBonus() {
  console.log("Convertendo bonus para true");
  bonus = true;

  bonusX = (canvasWidth / 5);
  bonusX = Math.floor(Math.random() * bonusX);
  bonusX = bonusX * 5;


  bonusY = (canvasHeight / 5);
  bonusY = Math.floor(Math.random() * bonusY);
  bonusY = bonusY * 5;
}

function verificarBonus() {
  if (bonus == true) {
    pincel.beginPath();
    pincel.fillStyle = 'red';
    pincel.rect(bonusX, bonusY, bonusAltura, bonusLargura);
    pincel.fill();
  }
}
function bonusCrescendo() {
  console.log("Cresceu");
  bonusAltura = bonusAltura + velocidadeBolinha;
  bonusLargura = bonusLargura + velocidadeBolinha ;
}
function verificarColisaoBonus() {
  console.log(`Bonus - ${bolinhaX} e ${bonusY}`)
  if (bolinhaX >= bonusX && bolinhaX <= bonusX + bonusLargura) { // indo para direita

    if(bolinhaY >= bonusY && bolinhaY <= bonusY + bonusLargura) {
      alert("Colidiu X E Y");
  
    }
  }
}

function leDoTeclado(evento) {
  //game.play();
  if (evento.keyCode == cima && yRaquete2 - taxa >= 0) {
    yRaquete2 = yRaquete2 - taxa;

  } else if (evento.keyCode == baixo && canvasHeight <= 400 && yRaquete2 <= 290) {
    yRaquete2 = yRaquete2 + taxa;

  }
  if (evento.keyCode == w && yRaquete - taxa >= 0) {
    yRaquete = yRaquete - taxa;

  } else if (evento.keyCode == s && canvasHeight <= 400 && yRaquete <= 290) {

    yRaquete = yRaquete + taxa;

  }
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
  verificarMultiplicador();
  verificarBonus();
  verificarColisaoBonus();
}

document.onkeydown = leDoTeclado;

setInterval(atualizarTelar, 50);
setInterval(criandoBonus, 3000);
setInterval(bonusCrescendo, 6000); // bonus a cada 10 segundos
// BONUS = FALSE PARA TIRAR




