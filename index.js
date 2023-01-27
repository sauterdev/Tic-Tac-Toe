class Gameboard {
  gameGrid = [];
  player1 = new Player(`1`, `X`);
  player2 = new Player(`2`, `O`);
  currentPlayer;
  turnCounter = 0; //used to alert for no win outcome

  //clears board each time and resets with 9 divs with click events. Sets first turn to player1 and builds gameGrid array to track for a winner
  buildBoard = () => {
    const board = document.querySelector(`.board`);
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
      const newSquare = document.createElement(`div`);
      newSquare.id = `${i}`;
      newSquare.className = `gameSquare`;
      newSquare.addEventListener(`click`, this.placeMarker);
      board.appendChild(newSquare);
      this.gameGrid = [0, 1, 2, 3, 4, 5, 6, 7, 8];
      this.currentPlayer = this.player1;
      this.turnCounter = 0;
    }
  };

  //based on player turn, changes the textContent of a clicked div to that symbol. Removes the event listener to prevent reclick
  placeMarker = () => {
    event.target.textContent = this.currentPlayer.marker;
    this.turnCounter++;
    //replaces numbers on gameGrid with X/O symbols to check victory patterns
    this.gameGrid[event.target.id] = this.currentPlayer.marker;
    //checks for 3 in a row after each marker placed
    this.checkVictory(this.gameGrid);
    if (this.currentPlayer == this.player1) {
      //changes players for next turn
      this.currentPlayer = this.player2;
    } else {
      this.currentPlayer = this.player1;
    }
    event.target.removeEventListener(`click`, this.placeMarker);
  };

  checkVictory = (gameGrid) => {
    const win = [
      //all possible winning combinations
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    //builds strings from gameGrid that correspond with winning trio combinations. If pattern comes back all one character, winner is identified. Winner is identified but placeMarker function before currentPlayer changes
    for (let i = 0; i < win.length; i++) {
      let winningCombo = "";
      for (let y = 0; y < 3; y++) {
        winningCombo += gameGrid[win[i][y]];
      }
      if (winningCombo == "XXX" || winningCombo == "OOO") {
        return this.gameOver(true);
      }
      else if (this.turnCounter === 9) { //checks for no win
        return this.gameOver(false);
      }
    }
  };

  gameOver = (gameCondition) => {
    if (gameCondition) {
    alert(`Player ${this.currentPlayer.name} Wins!`);
    } else if (!gameCondition){
      alert(`Draw`)
    }
    setTimeout(() => {
      newGame.buildBoard();
    }, 3000);
  };
}

class Player {
  constructor(name, marker) {
    this.name = name;
    this.marker = marker;
  }
}

let newGame = new Gameboard();
newGame.buildBoard();
