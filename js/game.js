const game = {
  move: 1,
  play: true,
  playAgainstComp: true,
  status: [["", "", ""], ["", "", ""], ["", "", ""]],
  currentPlayer: {
    marker: "X",
    symbol: null,
    name: "",
    numberOfWins: 0,
    isComputer: true
  },
  player1: {
    marker: "X",
    symbol: null,
    name: "",
    numberOfWins: 0,
    isComputer: true
  },
  player2: {
    marker: "O",
    symbol: null,
    name: "",
    numberOfWins: 0,
    isComputer: false
  },
  checkingWinningConditions: function() {
    const winningCondition = `${this.currentPlayer.marker}${
      this.currentPlayer.marker
    }${this.currentPlayer.marker}`;

    for (let i = 0; i < this.status.length; i++) {
      if (this.status[i].join("") === winningCondition) {
        console.log(`Player ${this.currentPlayer.marker} is the winner!`);
        if (this.currentPlayer.marker === "X") {
          this.player1.numberOfWins++;
        } else {
          this.player2.numberOfWins++;
        }
        game.play = false;
      }
    }

    const vertical1 = this.status.map(arr => {
      return arr[0];
    });

    if (vertical1.join("") === winningCondition) {
      console.log(`Player ${this.currentPlayer.marker} is the winner!`);
      game.play = false;
    }

    const vertical2 = this.status.map(arr => {
      return arr[1];
    });

    if (vertical2.join("") === winningCondition) {
      console.log(`Player ${this.currentPlayer.marker} is the winner!`);
      game.play = false;
    }

    const vertical3 = this.status.map(arr => {
      return arr[2];
    });

    if (vertical3.join("") === winningCondition) {
      console.log(`Player ${this.currentPlayer.marker} is the winner!`);
      game.play = false;
    }

    if (
      vertical1[0] === this.currentPlayer.marker &&
      vertical2[1] === this.currentPlayer.marker &&
      vertical3[2] === this.currentPlayer.marker
    ) {
      console.log(`Player ${this.currentPlayer.marker} is the winner!`);
      game.play = false;
    }

    if (
      vertical1[2] === this.currentPlayer.marker &&
      vertical2[1] === this.currentPlayer.marker &&
      vertical3[0] === this.currentPlayer.marker
    ) {
      console.log(`Player ${this.currentPlayer.marker} is the winner!`);
      game.play = false;
    }
  },

};
