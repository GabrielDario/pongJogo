// Criando componente Canvas para dsenhos em 2D
let canvas = document.querySelector("#idCanvas");
var pincel = canvas.getContext("2d");

//ValorES da bolinha x e y
let bolinhaX = 250;
let bolinhaY = 250;

let diferenca; //diferenca dos angulos quando rebate
let bolinhaParaFrente = true; //se vai decrementando ou diminuindo Eixo X
let bolinhaParaCima = true; //se vai decrementando ou diminuindo Eixo Y

//ValorES da raquete 1 - Altura e largura
let larguraRaquete1 = 10;
let alturaRaquete1 = 150;
let xRaquete = 15;
let yRaquete = 200;

//raquete 2
let xRaquete2 = 475;
let yRaquete2 = 200;

let taxa = 25; //nao sei o que faz

// códigos dos teclado para interação
var cima = 38;
var baixo = 40;
var w = 87;
var s = 83;

// Sons
let rebater = new Audio('sons/rebater.wav');
let gol = new Audio('sons/gol.mp3');
// função que desenha o grid.
function limpaTela() {
  var descer = 0;
  while (descer <= 500) {
    for (var imp = 0; imp <= 500; imp = imp + 25) {
      pincel.fillStyle = "black";
      //pincel.strokeStyle = "blue";
      pincel.beginPath();
      pincel.rect(imp, descer, 25, 25);
      pincel.closePath();
      pincel.fill();
    //  pincel.stroke();
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
function desenhaCirculo(raio) {
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
    bolinhaX = bolinhaX + 5;
    // Se não for verdadeiro,ele vai decrementando - EIXO X
  } else {
    bolinhaX = bolinhaX - 5;
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
    bolinhaY = bolinhaY + 10;
    // Se não for verdadeiro,ele vai decrementando - EIXO Y
  } else {
    bolinhaY = bolinhaY - 10;
  }

  //pinta a bolinha
  pincel.arc(bolinhaX, bolinhaY, raio, 0, 2 * Math.PI);
  pincel.fill();
}
// função a raquete esqueda
function desenhaRaquete1(larguraRaquete1, alturaRaquete1, xRaquete, yRaquete) {

  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.rect(xRaquete, yRaquete, larguraRaquete1, alturaRaquete1);
  pincel.fill();
}
// função a raquete direita
function desenhaRaquete2(larguraRaquete1, alturaRaquete1, xRaquete2, yRaquete2) {

  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.rect(xRaquete2, yRaquete2, larguraRaquete1, alturaRaquete1);
  pincel.fill();
}
function verificaColisaoRaquete1() {
  if (bolinhaX == 35) { //bolinha na raquete 1
    diferenca = bolinhaY - yRaquete;
    if (bolinhaY >= yRaquete && diferenca >= 0 && diferenca <= 150) {
      rebater.play();
      verificarAngulo1();
    }
  }

}


function verificaColisaoRaquete2() {
  if (bolinhaX == 465) { //bolinha na raquete 1
    console.log("raquete2: " + yRaquete2);
    console.log("bolinha: " + bolinhaY);
    diferenca = bolinhaY - yRaquete2;
    if (bolinhaY >= yRaquete2 && diferenca >= 0 && diferenca <= 150) {
      rebater.play();
      verificarAngulo2();
    }
  }

}

//se pegar mais pra cima da raquete,bola vai para cima (primeiros 75 pixels)
//se pegar mais pra cima da raquete,bola vai para cima (dos 76 pixels até o 150 px)
function verificarAngulo1() {
  if (diferenca >= 0 && diferenca <= 75) {
    bolinhaParaFrente = true;
    bolinhaParaCima = false;
  } else if (diferenca > 75 && diferenca <= 150) {
    bolinhaParaFrente = true;
    bolinhaParaCima = true;
  }
}

function verificarAngulo2() {
  if (diferenca >= 0 && diferenca <= 75) {
    bolinhaParaFrente = false;
    bolinhaParaCima = false;
  } else if (diferenca > 75 && diferenca <= 150) {
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
  }
}

function verificarGol() {
  console.log(bolinhaX)
  if(bolinhaX == 0 || bolinhaX == 495) {
    gol.play();
  }
}

function atualizaTela() {
  
  limpaTela();
  desenharCampo();
  desenhaCirculo(10);
  desenhaRaquete1(larguraRaquete1, alturaRaquete1, xRaquete, yRaquete);
  desenhaRaquete2(larguraRaquete1, alturaRaquete1, xRaquete2, yRaquete2);
  verificaColisaoRaquete1();
  verificaColisaoRaquete2();
   verificarGol();
}

function leDoTeclado(evento) {

  if (evento.keyCode == cima && yRaquete2 - taxa >= 0) {
    yRaquete2 = yRaquete2 - taxa;

  } else if (evento.keyCode == baixo && yRaquete2 + taxa <= 350) {
    yRaquete2 = yRaquete2 + taxa;

  }
  if (evento.keyCode == w && yRaquete - taxa >= 0) {
    yRaquete = yRaquete - taxa;

  } else if (evento.keyCode == s && yRaquete + taxa <= 350) {
    yRaquete = yRaquete + taxa;

  }
}


document.onkeydown = leDoTeclado;

setInterval(atualizaTela, 50);



