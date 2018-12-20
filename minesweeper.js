document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var board = {
  cells: []
  // cells: [
  //   {row:0, col:0, isMine:true, hidden:true}, 
  //   {row:0, col:1, isMine:false, hidden:true}, 
  //   {row:1, col:0, isMine:false, hidden:true}, 
  //   {row:1, col:1, isMine:false, hidden:true}
  // ]
};


function boardSetup() {
  // boardSize cannot be greater than 6
  // if this is their first time opening the page this session defaults to 2x2
  if (!sessionStorage.hasOwnProperty("storedBoardSize")) {
    sessionStorage.setItem("storedBoardSize", "2");
  }
  console.log(sessionStorage.getItem("storedBoardSize"));
  var boardSize = sessionStorage.getItem("storedBoardSize");
  // var boardSize = 6;
  for (var i = 0; i < boardSize; i++) {
    for (var j = 0; j < boardSize; j++) {
      board.cells.push({row: i, col: j, isMine: false, hidden: true});
    }
  }

  var numMines = boardSize;
  var placedMines = 0;
  while (placedMines < numMines) {
    var randomNum = Math.floor(Math.random()* board.cells.length)
    if (board.cells[randomNum].isMine == false) {
      board.cells[randomNum].isMine = true;
      placedMines++;
    }
  }
}

function startGame () {
  boardSetup();
  // spent ages with ("click", checkForWin()); and was confused as to why it ran the function immediately
  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);

  for (var i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);
  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  var mineCount = 0;
  // used to hold num of mines that are currently flagged
  var markedMineCount = 0;
  var nonMineHiddenCount = 0;
  // console.log("Testing");
  for (var j = 0; j < board.cells.length; j++) {
    // console.log(board.cells[j]);
    if (board.cells[j].isMine == true && board.cells[j].isMarked == true) {
      mineCount++;
      markedMineCount++;
    } else if (board.cells[j].isMine){
      mineCount++;
    } else if (board.cells[j].hidden == true) {
      nonMineHiddenCount++;
    }
  }
  if (mineCount == markedMineCount && nonMineHiddenCount == 0) {
    lib.displayMessage("You Win!")
  }

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  // debugger
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col);
  var surroundingCount = 0;
  for (var j = 0; j < surroundingCells.length; j++){
    // console.log(surroundingCells[j]);
    if (surroundingCells[j].isMine) {
      surroundingCount++;
    }
  }
  return surroundingCount;
}
