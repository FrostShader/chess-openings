const idBoard = "chessBoard";
const h1 = document.querySelector("h1");
const backButton = document.querySelector("button.back");
const nextButton = document.querySelector("button.next");
const spanMoves = document.querySelector(".moves");

const start = (id) => {
  const game = games[id];
  if (!game) {
    alert("mauvais id");
    return;
  }

  const { name, fen, initialTurnWhite, moves } = game;
  h1.innerText = name;
  let turnWhite = initialTurnWhite;
  const board = Chessboard2(idBoard, fen);

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
};

const paramsString = window.location.search;
const searchParams = new URLSearchParams(paramsString);
if (searchParams.has("id")) {
  start(searchParams.get("id"));
} else {
  alert("paramètre id manquant");
}
