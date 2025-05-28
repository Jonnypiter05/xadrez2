const board = document.getElementById('tabuleiro');
const initialPosition = [ //Tabuleiro completo
    ["♜","♞","♝","♛","♚","♝","♞","♜"],
    ["♟","♟","♟","♟","♟","♟","♟","♟"],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["","","","","","","",""],
    ["♙","♙","♙","♙","♙","♙","♙","♙"],
    ["♖","♘","♗","♕","♔","♗","♘","♖"]
];

//este comando é usado para guardar a posição da peça, que o jogador selecionou para mover

let selectedSquare = null;//essa linha cria um variavel (selected square), e atribuindo a ela o valor null no inicio do jogo

//somente let selectedSquare, declara uma variavel que pode mudar de valor depois, diferente da variavel const que tem um valor fixo
//null, isso diz que, inicialmente nenhuma peça está selecionada, ou seja, está vazio.

function createBoard() {
    board.innerHTML = ''; //limpa o tabuleiro antes de desenhar, evita que as peças fiquem duplicadas toda vez que a função é chamada
    for (let row = 0; row < 8; row++) {//inicia um loop para cada linha do tabuleiro
        for (let col = 0; col < 8; col++) {//inicia um loop dentro do anterior, para cada coluna
            const square = document.createElement('div');//cria um elemento div novo no html que será uma casa do tabuleiro
            square.classList.add('square');//adiciona a classe square para aplicar o estilo via css
            square.classList.add((row + col) % 2 === 0 ? 'white' : 'black');//alterna entre casas brancas e pretas co base na posição
            square.dataset.row = row;//armazena a posição da casa nos atributos, data - row e data - colum
            square.dataset.col = col;//rmazena a posição da casa nos atributos, data - row e data - colum
            square.textContent = initialPosition[row][col];//pega a peça da posição linha e coluna da variavel initial position e coloca na casa obs: se não tiver peça ficará vazia.


            square.addEventListener('click', () => handleSquareClick(row, col));//adiciona um evento de click nessa casa, processa um movimento.


            board.appendChild(square);// adiciona a casa div ao tabuleiro do html
        }
    }
}

//Essa função é chamada quando o jogador clica em uma casa do tabuleiro, ela serve para: 1 selecionar uma peça 2 mover a peça quando clicar em uma casa diferente. ou seja, é responssavel pela linha e coluna
function handleSquareClick(row, col) {  
    const piece = initialPosition[row][col]; // movimento das peças

    // verifica se tem uma peça seleecionada, ou seja, se o jogador clicou em uma peça antes, e agora está escolhendo o destino.
    if (selectedSquare) {
        //mover peça
        initialPosition[row][col] = initialPosition[selectedSquare.row][selectedSquare.col];  //move a peça para nova a posição
        initialPosition[selectedSquare.row][selectedSquare.col] = ""; // apaga a peça da posição antiga.
        selectedSquare = null;//limpa seleção(nenhuma peça selecionada)
        createBoard(); // redesenha o tabuleiro com as novas posições.
    }   else if (piece !== "") {  //verifica se o jogador clicou num casa que tem peça, não faz sentido selecionar uma casa vazia
        //Seleciona a peça
        selectedSquare = { row, col }; //salva a posição da peça para o proximo redesenho
    }
}


createBoard(); // redesenha o tabuleiro após reiniciar a pagina

//observações que não foram colocadas

//regras reais de movimentos(por enquanto posso me mover para qualquer lugar)

//indicação visual de qual peça tocada

//alternancia de turno(brancos e pretos)

//impedir que se mova para a mesma casa

//captura de peças inimigas