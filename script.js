const idBoard = "chessBoard";
const backButton = document.querySelector("button.back");
const nextButton = document.querySelector("button.next");
const spanMoves = document.querySelector(".moves");

const fen = "bnR1QQqk/p2Pp2p/1p1p1Ppr/1p4Q1/3p1Pn1/1B2BpRp/bP1PR3/4BRBK";
const initialTurnWhite = false;
let turnWhite = false;
const board = Chessboard(idBoard, fen);

const moves = ["f3-f2", "b3-d5", "a2-d5"];
const fenMoves = [fen];
let index = 0;

const displayMoves = () => {
  if (index === 0) {
    spanMoves.innerText = "aucun coup";
    return;
  }
  let str = "";
  let i = 0;
  const modulo = initialTurnWhite ? 1 : 0;
  while (i < index) {
    const m = moves[i].substring(3, 5);
    const prefix = i % 2 === modulo ? ".." : "";
    str = `${str} ${i + 1}. ${prefix}${m}`;
    i++;
  }
  spanMoves.innerText = str;
};

const goNext = () => {
  if (index < moves.length) {
    board.move(moves[index]);
    index++;
    displayMoves();
    turnWhite = !turnWhite;
    fenMoves[index] = board.fen();
    backButton.disabled = false;
    nextButton.disabled = index === moves.length;
  }
};

const goBack = () => {
  if (index > 0) {
    index--;
    board.position(fenMoves[index], false);
    displayMoves();
    turnWhite = !turnWhite;

    backButton.disabled = index === 0;
    nextButton.disabled = false;
  }
};

nextButton.addEventListener("click", goNext, false);
backButton.addEventListener("click", goBack, false);

displayMoves();
