const game = {
  move: 1,
  play: false,
  type: 3,
  board: [["", "", ""], ["", "", ""], ["", "", ""]],
  currentPlayer: {},
  player1: {
    marker: "X",
    symbol: `<i class="fas fa-times fa-3x" style="color: purple"></i>`,
    name: "",
    score: 0,
    isComputer: false
  },
  player2: {
    marker: "O",
    symbol: `<i class="far fa-circle fa-3x" style="color: blue"></i>`,
    name: "",
    score: 0,
    isComputer: false
  },
  reset: function() {
    localStorage.clear();
    this.move = 1;
    this.play = true;
    this.type = null;
    this.playAgainstComp = false;
    this.board = null;
    this.currentPlayer = {};
    this.player1 = {
      marker: "X",
      symbol: null,
      name: "",
      score: 0,
      isComputer: false
    };
    this.player2 = {
      marker: "O",
      symbol: null,
      name: "",
      score: 0,
      isComputer: false
    };
  },
  checkRowForWinner: function() {
    const winningCondition = this.currentPlayer.marker.repeat(this.type);

    //Iterate over this.board.length (ex. 3)
    for (let i = 0; i < this.board.length; i++) {
      //Row evaluation
      if (this.board[i].join("") === winningCondition) {
        return true;
      }
    }

    return false;
  },
  checkColumnForWinner: function() {
    const winningCondition = this.currentPlayer.marker.repeat(this.type);

    let columnArr = [];

    for (let i = 0; i < this.board.length; i++) {
      //0, 1, 2
      const newArr = this.board.map(singleArr => {
        return singleArr[i];
      });

      columnArr.push(newArr);

      if (columnArr[i].join("") === winningCondition) {
        return true;
      }
    }

    return false;
  },
  checkLeftDiagonalForWinner: function() {
    const winningCondition = this.currentPlayer.marker.repeat(this.type);

    let diagArr = [];

    for (let i = 0; i < this.board.length; i++) {
      diagArr.push(this.board[i][i]);
    }

    if (diagArr.join("") === winningCondition) {
      return true;
    }

    return false;
  },
  checkRightDiagonalForWinner: function() {
    const winningCondition = this.currentPlayer.marker.repeat(this.type);
    let diagArr = [];

    for (let i = 0; i < this.board.length; i++) {
      diagArr.push(this.board[i][this.type - i - 1]);
    }

    if (diagArr.join("") === winningCondition) {
      return true;
    }

    return false;
  },
};
