//Helper functions
const initGame = function() {
  game.play = true;
  game.currentPlayer = game.player1;
};

const checkForWinner = function(player) {
  const isRowWinner = game.checkRowForWinner();
  const isColWinner = game.checkColumnForWinner();
  const isLDiagWinner = game.checkLeftDiagonalForWinner();
  const isRDiagWinner = game.checkRightDiagonalForWinner();


  if (
    isRowWinner ||
    isColWinner ||
    isLDiagWinner ||
    isRDiagWinner
  ) {
    if (player === game.player1) {
      game.player1.score++;
      $("#scoreX").html(game.player1.score.toString());
    }

    if(player === game.player2) {
      game.player2.score++;
      $("#scoreY").html(game.player2.score.toString())
    }

    //If winningCondition is met, display winning message
    setTimeout(function() {
      alert(`Player ${player.marker} is the winner!`);
    }, 500);

    setTimeout(function() {
      resetGame();
    }, 500);


    game.play = false;
    return true;
  } else if (
    isRowWinner === false ||
    isColWinner === false ||
    isLDiagWinner === false ||
    isRDiagWinner === false
  ) {

    game.play = false;
    if (game.move > 9) {
      setTimeout(function() {
        alert(`It's a draw!!`);
      }, 500);

      setTimeout(function() {
        resetGame();
      }, 500);
    };

  }
  return false;
};

const resetGame = function() {
  game.reset();
  clearBoard();
  location.reload(true);
}

const clearBoard = function() {
  const board = $("#board tr td").get();

  for (let i = 0; i < board.length; i++) {
    board[i].innerHTML = "";
  }
};


//Page load
$(document).ready(function() {
  initGame();

  $("#scoreX").html();
  $("#scoreY").html();

  /////////////Menu button functions//////////////////

  //Save button
  $(".save").on("click", function() {
    localStorage.setItem("savedGame", JSON.stringify(game));
  });

  //Restore button
  $(".restore").on("click", function() {
    const gameState = localStorage.getItem("savedGame");

    if (gameState !== null) {
      const restoredGame = JSON.parse(gameState);

      for (let i = 0; i < restoredGame.board.length; i++) {
        for (let j = 0; j < restoredGame.board[i].length; j++) {
          if (restoredGame.board[i][j] === "X") {
            $(`#${i + 1}-${j + 1}`).html(
              `<i class="fas fa-times fa-3x" style="color: purple"></i>`
            );
          } else if (restoredGame.board[i][j] === "O") {
            $(`#${i + 1}-${j + 1}`).html(
              `<i class="far fa-circle fa-3x" style="color: blue"></i>`
            );
          }
        }
      }
    } else {
      alert(`No data!`);
    }
  });

  //Reset button
  $(".reset").on("click", function() {
    resetGame();
  });

  //////////////////Game logics///////////////////////////////////////////////

  //If any of the block is clicked
  $("#board tr td").on("click", function() {

    //If number of moves is odd numbers, it means it's player1 with marker "X"
    if (game.move <= 9 && game.move % 2 === 1) {

      //Place the marker with animation
      $(this)
        .html(game.currentPlayer.symbol)
        .slideUp(100)
        .fadeIn(400);

      //increment the game move
      game.move++;

      //Display which player is the next turn
      $(".player1").removeClass("active focus");
      $(".player2").addClass("active focus");

      //Update the board array with currentPlayer's marker
      //get current row and block index
      const index = $(this).attr("id");
      const rowIndex = index.slice(0, 1);
      const columnIndex = index.slice(-1);

      //Update the array according to the position player1 placed the "X" on the board
      [game.board[rowIndex - 1][columnIndex - 1]] = game.currentPlayer.marker;

      //Disable the click on this cell
      $(this).off();

      //Check for winner
      const isWinning = checkForWinner(game.currentPlayer);

      if (isWinning === false) {
        //update the currentPlayer to Player2
        game.currentPlayer = game.player2;
      }
    } else if (game.move <= 9 && game.move % 2 === 0) { //For player 2


      $(this)
        .html(game.currentPlayer.symbol)
        .slideUp(100)
        .fadeIn(600);

      //increment the game move
      game.move++;

      $(".player2").removeClass("active focus");
      $(".player1").addClass("active focus");

      //Update the board array with currentPlayer's marker
      //get current row and block index
      const index = $(this).attr("id");
      const rowIndex = index.slice(0, 1);
      const columnIndex = index.slice(-1);

      //Update the array according to the position player1 placed the "X" on the board
      [game.board[rowIndex - 1][columnIndex - 1]] = game.currentPlayer.marker;

      $(this).off();

      const isWinning = checkForWinner(game.currentPlayer);

      if (isWinning === false) {
        game.currentPlayer = game.player1;
      }
    }
  });
});
