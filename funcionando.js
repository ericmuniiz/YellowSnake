//************COMENTÁRIO PRÉVIO*********
//Bem vindo usuário
//abaixo o Códico de JavaScript para fazer funcionar o jogo.;
//Usamos a o .Push para a cobra se deslocar e uma estrutura de repetição para conferir o tamanho do corpo e
// o .shift para que a cobra mantenha o tamanho do corpo.;
//Para crescer a "cobra" usamos uma condicional para verificar a posição da "cabeça da cobra" 
//e da fruta. Caso seja a mesma posição aumenta o score e o corpo da "cobra".;
//A validação do término do jogo é feita por uma condicional que verifica a posição da cabeça em relação ao corpo, e 
//o choque nas extremidades do grid por uma função com condicionais verificando a posição da cobra em relação as extremidades.;
var tela = document.getElementById('canvas'); // Váriavel que seleciona a tela.
var pincel = tela.getContext("2d"); // Váriavel usada para pintar na tela.

//variável score
var score = "SCORE: " + 0;

// constante que define a movimentação.
const vel = 1;

//variáveis de movimentação para cada eixo. 
var vx = vy = 0;

// Váriavel que define a posição do objeto.
var x = 10;
var y = 15;

// Variável que define a posição da fruta
var frutax = 15;
var frutay = 15;

// Variáveis de posição (pelo teclado)
var esquerda = 37;
var cima = 38;
var direita = 39;
var baixo = 40;

// Variável que define o tamanho da peça do jogo
var tamanhop = 20;

// Variável que define a quantidade de peças no tabuleiro
var qntpecas = 20;


// Variáveis para o corpo
var rastro = []; //rastro
corpo = 3;       //tamanho


// função para que a cobra parar quando bate nas margens.
function cobrasenai() {
  x += vx;
  y += vy;
  if (x < 0) {
    x = 0;
    vx = vy = 0;
    corpo = 3;
    score = 0;
  }
  if (x > qntpecas - 1) {
    x = qntpecas - 1;
    vx = vy = 0;
    corpo = 3;
    score = 0;
  }
  if (y < 0) {
    y = 0;
    vx = vy = 0;
    corpo = 3;
    score = 0;
  }
  if (y > qntpecas - 1) {
    y = qntpecas - 1;
    vx = vy = 0;
    corpo = 3;
    score = 0;
  }

  // desenho da tela
  pincel.fillStyle = "black";
  pincel.fillRect(0, 0, tela.width, tela.height);

  // desenho da fruta
  pincel.fillStyle = "red";
  pincel.fillRect(frutax * tamanhop, frutay * tamanhop, tamanhop, tamanhop);

  // desenho da cobra
  pincel.fillStyle = "yellow";


  // estrutura de repetição criada para a cobra poder "crescer" até 3 quando iniciar      
  for (var i = 0; i < rastro.length; i++) {
    pincel.fillRect(rastro[i].x * tamanhop, rastro[i].y * tamanhop, tamanhop - 1, tamanhop - 1);


    // condicional para que caso ele bata em alguma parte de seu rastro ele pare.
    if (rastro[i].x == x && rastro[i].y == y) {

      vx = vy = 0;
      corpo = 3;
      score = 0;

    };

  };


  // método utilizado para dar movimento a cobra, se empurra a "cada passo"
  rastro.push({ x: x, y: y });

  // estrutura de repetição criada para que a cobra se mantenha no tamanho a "cada passo"
  while (rastro.length > corpo) {
    rastro.shift();
  };

  // condicional para que ele possa "comer" a fruta e aumentar seu tamanho quando estiverem no mesmo lugar
  if (frutax == x && frutay == y) {

    //aumento do corpo e a pontuação
    corpo++;
    score+=10;
    document.getElementById('score').innerHTML = "SCORE: " + score;

    //método utilizado para randomizar a posição x da fruts, quando é comida
    frutax = Math.floor(Math.random() * qntpecas);
    //método utilizado para randomizar a posição y da fruta, quando é comida
    frutay = Math.floor(Math.random() * qntpecas);
  };
  for (var i = 0; i < rastro.length; i++) {

    if (rastro[i].x == frutax && rastro[i].y == frutay) {
      //método utilizado para randomizar a posição x da fruts, quando é comida
      frutax = Math.floor(Math.random() * qntpecas);
      //método utilizado para randomizar a posição y da fruta, quando é comida
      frutay = Math.floor(Math.random() * qntpecas);
    };

  };
};

// função para chamar o "cobrasenai" em um intervalo de tempo dado como segundo parâmetro.
setInterval(cobrasenai, 80);

// função que determina pra onde o objeto irá se movimentar.
function leDoTeclado(event) {

  if (event.keyCode == esquerda) { // Esquerda
    vx = -vel;
    vy = 0;

  }
  if (event.keyCode == cima) {     // Cima
    vx = 0;
    vy = -vel;
  }
  if (event.keyCode == direita) {  // Direita
    vx = vel;
    vy = 0;
  }
  if (event.keyCode == baixo) {    // Baixo
    vx = 0;
    vy = vel;
  }
}


document.onkeydown = leDoTeclado;
