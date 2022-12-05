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
let larguraRaquete2 = 10;
let alturaRaquete2 = 100;
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
let nomeBonus = "Último Bônus - "

let bolinhafalsaX;
let bolinhafalsaY;
let bolinhaFalsa = false;
let hadoken = false;

let xHadoken = 0;
let yHadoken = 0;
let larguraHadoken = 0;
let alturaHadoken = 0;

// Sons
let rebater = new Audio('sons/rebater.wav');
let gol = new Audio('sons/goal.wav');
let game = new Audio('sons/game.mp3'); let aFlat = new Audio('sons/a-flat.mp3');
let a = new Audio('sons/a.mp3');
let bFlat = new Audio('sons/b-flat.mp3');
let c = new Audio('sons/c.mp3');
let dFlat = new Audio('sons/d-flat.mp3');
let d = new Audio('sons/d.mp3');
let eFlat = new Audio('sons/d-flat.mp3');
let bonusSom = new Audio('sons/bonus.wav');


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
function desenharRaquete1() {

  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.rect(xRaquete, yRaquete, larguraRaquete1, alturaRaquete1);
  pincel.fill();

  pincel.beginPath();
  pincel.fillStyle = 'red';
  pincel.rect(xRaquete, yRaquete, 10, 10);
  pincel.rect(xRaquete, yRaquete + (alturaRaquete1 - 10), 10, 10);
  pincel.fill();

  pincel.beginPath();
  pincel.fillStyle = 'blue';
  pincel.rect(xRaquete, yRaquete + (alturaRaquete1 / 2), 10, 10);
  pincel.fill();
}
// função a raquete direita
function desenharRaquete2() {

  pincel.fillStyle = 'white';
  pincel.beginPath();
  pincel.rect(xRaquete2, yRaquete2, larguraRaquete2, alturaRaquete2);
  pincel.fill();

  pincel.beginPath();
  pincel.fillStyle = 'red';
  pincel.rect(xRaquete2, yRaquete2, 10, 10);
  pincel.rect(xRaquete2, yRaquete2 + (alturaRaquete2 - 10), 10, 10);
  pincel.fill();

  pincel.beginPath();
  pincel.fillStyle = 'blue';
  pincel.rect(xRaquete2, yRaquete2 + (alturaRaquete2 / 2), 10, 10);
  pincel.fill();
}
function verificarColisaoRaquete1() {

  if (bolinhaX >= 30 && bolinhaX <= 40) { //bolinha na raquete 1
    diferenca = bolinhaY - yRaquete;

    if (bolinhaY + alturaRaquete1 >= yRaquete && diferenca >= -15 && diferenca <= alturaRaquete1 + 15) {
      rebater.play();

      verificarAngulo1();
    }
  }


}
function verificarColisaoRaquete2() {
  if (bolinhaX >= canvasWidth - 40 && bolinhaX <= canvasWidth - 20) { //bolinha na raquete 1 entrre 560 e 580
    diferenca = bolinhaY - yRaquete2;
    if (bolinhaY + alturaRaquete2 + 5 >= yRaquete2 && diferenca >= -15 && diferenca <= alturaRaquete2 + 15) {
      rebater.play();
      verificarAngulo2();
    }
  }

}

//se pegar mais pra cima da raquete,bola vai para cima (primeiros 75 pixels)
//se pegar mais pra cima da raquete,bola vai para cima (dos 76 pixels até o 150 px)
function verificarAngulo1() {

  console.log("esquerda: " + diferenca);
  if (diferenca >= -15 && diferenca <= (alturaRaquete1 * 0.11)) {  // aumenta velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = false;
    bolinhaReto = false;

    multiplicadorTela = multiplicadorTela + 1;
    verificarSomVelocidade();
    multiplicador = multiplicador + 0.2;

  } else if (diferenca > (alturaRaquete1 * 0.11) && diferenca <= (alturaRaquete1 * 0.37)) { // regula velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = false;
    velocidadeBolinha = 5;
    bolinhaReto = false;
    multiplicadorTela = 1;
    multiplicador = 1.25;

  } else if (diferenca > (alturaRaquete1 * 0.37) && diferenca <= (alturaRaquete1 * 0.63)) { // aumenta velocidade e vai mais reto
    bolinhaParaFrente = true;
    bolinhaParaCima = true;
    bolinhaReto = true;
    console.log("Retoo!!");
    multiplicadorTela = multiplicadorTela + 1;
    multiplicador = multiplicador + 0.2;
    verificarSomVelocidade();
  } else if (diferenca > (alturaRaquete1 * 0.63) && diferenca <= (alturaRaquete1 * 0.89)) {// regula velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = true;
    velocidadeBolinha = 5;
    bolinhaReto = false;
    multiplicadorTela = 1;
    multiplicador = 1.25;
  } else if (diferenca > (alturaRaquete1 * 0.89) && diferenca <= alturaRaquete1 + 15) {// aumenta velocidade
    bolinhaParaFrente = true;
    bolinhaParaCima = true;
    bolinhaReto = false;

    multiplicadorTela = multiplicadorTela + 1;
    verificarSomVelocidade();
    multiplicador = multiplicador + 0.2;


  }
  console.log(`VELOCIDADE ${multiplicadorTela} =  ` + velocidadeBolinha);
}

function verificarAngulo2() {
  console.log("direita: " + diferenca);
  if (diferenca >= -15 && diferenca <= (alturaRaquete2 * 0.11)) {  // aumenta velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = false;

    multiplicadorTela = multiplicadorTela + 1;
    verificarSomVelocidade();
    multiplicador = multiplicador + 0.2;

    velocidadeBolinha = velocidadeBolinha * multiplicador;

    bolinhaReto = false;
  } else if ((alturaRaquete2 * 0.11) && diferenca <= (alturaRaquete2 * 0.37)) { // regula velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = false;
    velocidadeBolinha = 5;
    bolinhaReto = false;

    multiplicadorTela = 1;
    multiplicador = 1.25;
  } else if (diferenca > (alturaRaquete2 * 0.37) && diferenca <= (alturaRaquete2 * 0.63)) { // aumenta velocidade e vai mais reto
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
    bolinhaReto = true;
    multiplicadorTela = multiplicadorTela + 1;
    verificarSomVelocidade();
    multiplicador = multiplicador + 0.2;


  } else if ((alturaRaquete2 * 0.63) && diferenca <= (alturaRaquete2 * 0.89)) {// regula velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
    velocidadeBolinha = 5;
    bolinhaReto = false;

    multiplicadorTela = 1;
    multiplicador = 1.25;
  } else if (diferenca > (alturaRaquete2 * 0.89) && diferenca <= alturaRaquete2 + 15) {// aumenta velocidade
    bolinhaParaFrente = false;
    bolinhaParaCima = true;
    bolinhaReto = false;
    velocidadeBolinha = velocidadeBolinha * multiplicador;
    multiplicadorTela = multiplicadorTela + 1;
    verificarSomVelocidade();
    multiplicador = multiplicador + 0.2;

  }

}

function verificarSomVelocidade() {
  if (multiplicadorTela == 1) {
    aFlat.play();
  } else if (multiplicadorTela == 2) {
    a.play();
  } else if (multiplicadorTela == 3) {
    bFlat.play();
  } else if (multiplicadorTela == 4) {
    c.play();
  } else if (multiplicadorTela == 5) {
    dFlat.play();
  } else if (multiplicadorTela == 6) {
    d.play();
  } else if (multiplicadorTela >= 7) {
    eFlat.play();
  }
}
function verificarGol() {
  if (bolinhaX <= 0) {
    bolinhaX = 0;
    gol.play();
    velocidadeBolinha = 5;
    bolinhaReto = false;
    multiplicadorTela = 1;
    multiplicador = 1.25;
    pontoB = pontoB + 1;
  }
  if (bolinhaX >= canvasWidth) {
    gol.play();
    bolinhaX = canvasWidth;
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
  pincel.fillText(pontoB, (canvasWidth / 2) + 25, 50);
  pincel.fillText(pontoA, (canvasWidth / 2) - 50, 50);
  pincel.fill();

  if (pontoA == 10) {
    window.location.href = "index.html"
    alert("Jogador 1 GANHOU!");
    pontoA = 0;
  }
  if (pontoB == 10) {
    window.location.href = "index.html"
    alert("Jogador 2 GANHOU!");
    pontoB = 0;
  }
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

//MULTIPLICADOR CRIANDO - 1X 2X 3X ...
function verificarMultiplicador() {
  pincel.beginPath();

  pincel.font = '50px serif';
  pincel.fillStyle = 'yellow';
  pincel.fillText(`${multiplicadorTela} x`, canvasWidth - 75, 75);
  pincel.fill();


}

//CRIANDO O QUADRADO DO BONUS ALEATORIAMENTE - ATIVANDO BONUS
function criandoBonus() {
  bonus = true;

  bonusX = (canvasWidth / 5);
  bonusX = Math.floor(Math.random() * bonusX);
  bonusX = bonusX * 5;


  bonusY = (canvasHeight / 5);
  bonusY = Math.floor(Math.random() * bonusY);
  bonusY = bonusY * 5;
}

//SE ATIVAR,FAZER O QUADRADO
function verificarBonus() {
  if (bonus == true) { //TIRAR
    pincel.beginPath();
    pincel.fillStyle = 'red';
    pincel.rect(bonusX, bonusY, bonusAltura, bonusLargura);
    pincel.fill();
  }
}
//CRESCENDO CADA VEZ QUE NÃO PEGAR
function bonusCrescendo() {
  console.log("Cresceu");
  bonusAltura = bonusAltura + velocidadeBolinha;
  bonusLargura = bonusLargura + velocidadeBolinha;
}
//VE SE A BOLINHA PEGAR NO BONUS
function verificarColisaoBonus() {

  if (bolinhaX >= bonusX && bolinhaX <= bonusX + bonusLargura) { // indo para direita

    if (bolinhaY >= bonusY && bolinhaY <= bonusY + bonusLargura) {
      bonusSom.play();
      bonusAltura = 25;
      bonusLargura = 25;
      sorterioDoBonus();
    }
  }
}


//Sortear qual 'Bonus' vai pegar'
function sorterioDoBonus() {
  let sorteioBonus = Math.floor(Math.random() * 7);

  if (sorteioBonus == 0) { // Para inverter lado
    nomeBonus = "Último Bônus[1]: Inverter!";
    bolinhaParaFrente = !bolinhaParaFrente;
    bolinhaParaCima = !bolinhaParaCima;
  } else if (sorteioBonus == 1) {
    nomeBonus = "Último Bônus[2]: Velocidade";
    if (bolinhaParaFrente == true) { //se a bola esta indo para frente,ela pula o quadrado para frente
      bolinhaX = bolinhaX + bonusLargura;
    } else {
      bolinhaX = bolinhaX - bonusLargura; //caso ao contrario,pula pra tras
    }
    velocidadeBolinha = velocidadeBolinha * multiplicador;
    multiplicadorTela = multiplicadorTela + 2;
    verificarSomVelocidade();
    multiplicador = multiplicador + 0.4;
  } else if (sorteioBonus == 2) {
    nomeBonus = "Último Bônus[3]: Raquete +";
    if (bolinhaParaFrente == true) {
      bolinhaX = bolinhaX + bonusLargura;
      alturaRaquete1 = alturaRaquete1 + 25;
    } else {
      bolinhaX = bolinhaX - bonusLargura;
      alturaRaquete2 = alturaRaquete2 + 25;
    }
  } else if (sorteioBonus == 3) {
    nomeBonus = "Último Bônus[4]: Raquete -";
    if (bolinhaParaFrente == true) {
      bolinhaX = bolinhaX + bonusLargura;
      alturaRaquete1 = alturaRaquete1 - 25;
    } else {
      bolinhaX = bolinhaX - bonusLargura;
      alturaRaquete2 = alturaRaquete2 - 25;
    }
  } else if (sorteioBonus == 5) {
    nomeBonus = "Último Bônus[5]: Bolinha Falsa";
    bolinhaFalsa = true;
  } else if (sorteioBonus == 6) {
    nomeBonus = "Último Bônus[6]: Poder!";
    hadoken = true;
  }
}

function verificarBonusBolinhaEpoder() {
  if (bolinhaFalsa == true) {
    pincel.fillStyle = 'white';
    pincel.beginPath();

    if (bolinhaParaFrente == true) {
      bolinhafalsaX = bolinhaX;
      bolinhafalsaX = bolinhafalsaX + (velocidadeBolinha * 1.5);

      // Se não for verdadeiro,ele vai decrementando - EIXO X
    } else {
      bolinhafalsaX = bolinhafalsaX - (velocidadeBolinha * 1.5);
    }

    if (bolinhaParaCima == true) {
      bolinhafalsaY = bolinhaY;
      bolinhafalsaY = bolinhafalsaY + (velocidadeBolinha * 3);
    } else {
      bolinhafalsaY = bolinhafalsaY - velocidadeBolinha;
    }


    pincel.arc(bolinhafalsaX, bolinhafalsaY, raioBola, 0, 2 * Math.PI);
    pincel.fill();
  }

  if (bolinhafalsaX > canvasWidth || bolinhafalsaX < 0) {
    bolinhaFalsa = false;
  }

  //Verificar o pode hadoken
  if (hadoken == true) {
    pincel.beginPath();
    pincel.fillStyle = 'blue';

    if (bolinhaParaFrente == true) { // Se estiver indo pro lado direito

      larguraHadoken = larguraHadoken + velocidadeBolinha; // vai aumentando...(velocidadeBolinha * 3)
      alturaHadoken = alturaHadoken + velocidadeBolinha;
      if (alturaHadoken >= 100) {
        alturaHadoken = 100;
      }
      if (larguraHadoken >= canvasWidth) {// até a largura maxima
        larguraHadoken = canvasWidth;
      }

    } else {

      larguraHadoken = larguraHadoken - velocidadeBolinha;
      alturaHadoken = alturaHadoken + velocidadeBolinha;

      if (larguraHadoken <= 0 - (canvasWidth / 2)) {
        larguraHadoken = 0 - (canvasWidth / 2);
      }

      if (alturaHadoken >= 100) {
        alturaHadoken = 100;
      }


    }

    pincel.rect(canvasWidth / 2, canvasHeight * 0.375, larguraHadoken, alturaHadoken);
    pincel.fill();
    verificandoColisaoHadoken();
    //Verificar colisão
  }

}

function verificandoColisaoHadoken() {

  if (larguraHadoken >= 280) { // Hadoken quando escostar na reta da régua

    if (yRaquete2 + alturaRaquete2 > canvasHeight * 0.375 && yRaquete2 < (canvasHeight * 0.375) + 100) {
      hadoken = false;
      larguraHadoken = 0;
      alturaHadoken = 0;
      velocidadeBolinha = 5;
      multiplicadorTela = 1;
      multiplicador = 1.25;
      bolinhaReto = false;
      pontoA = pontoA + 1;
      gol.play();
    }
  }
  if (larguraHadoken <= - 280) {

    if (yRaquete + alturaRaquete1 > canvasHeight * 0.375 && yRaquete < (canvasHeight * 0.375) + 100) {
      gol.play();
      hadoken = false;
      larguraHadoken = 0;
      alturaHadoken = 0;
      velocidadeBolinha = 5;
      multiplicadorTela = 1;
      multiplicador = 1.25;
      bolinhaReto = false;
      pontoB = pontoB + 1;
      gol.play();
    }
  }
}
function atualizarBonus() {

  pincel.beginPath();
  pincel.font = '20px serif';
  pincel.fillStyle = 'yellow';
  pincel.fillText(`${nomeBonus}`, canvasWidth - 250, 100);
  pincel.fill();
}
function leDoTeclado(evento) {
  game.play();
  if (evento.keyCode == cima && yRaquete2 - taxa >= - 150) {
    yRaquete2 = yRaquete2 - taxa;

  } else if (evento.keyCode == baixo && canvasHeight <= 400 && yRaquete2 <= 350) {
    yRaquete2 = yRaquete2 + taxa;

  }
  if (evento.keyCode == w && yRaquete - taxa >= - 150) {
    yRaquete = yRaquete - taxa;

  } else if (evento.keyCode == s && canvasHeight <= 400 && yRaquete <= 350) {

    yRaquete = yRaquete + taxa;

  }
}

function atualizarTelar() {

  limparTela();
  desenharCampo();
  desenharCirculo();
  desenharRaquete1();
  desenharRaquete2();

  verificarColisaoRaquete1();
  verificarColisaoRaquete2();
  criarPlacar();
  verificarGol();
  atualizadHoras();
  verificarMultiplicador();
  verificarBonus();
  verificarColisaoBonus();
  atualizarBonus();
  verificarBonusBolinhaEpoder();
}

document.onkeydown = leDoTeclado;

setInterval(atualizarTelar, 50);
setInterval(criandoBonus, 3000);
setInterval(bonusCrescendo, 6000); // bonus a cada 10 segundos
// BONUS = FALSE PARA TIRAR




