
//Helper functions
const initGame = function() {
  game.play = true;
  game.currentPlayer = game.player1;
};

const checkForWinner = function(player) {
  game.checkRowForWinner();
  game.checkColumnForWinner();
  game.checkLeftDiagonalForWinner();
  game.checkRightDiagonalForWinner();

  //If winningCondition is met, display winning message
  if (
    game.checkRowForWinner() ||
    game.checkColumnForWinner() ||
    game.checkLeftDiagonalForWinner() ||
    game.checkRightDiagonalForWinner()
  ) {
    alert(`Player ${player.marker} is the winner!`);
    player.score++;
    game.play = false;
    return true;
  }

  if (game.checkRowForWinner() === false ||
      game.checkColumnForWinner() === false ||
      game.checkLeftDiagonalForWinner() === false ||
      game.checkRightDiagonalForWinner() === false
  ) {
    if (game.move > 9) {
      alert (`It's a draw game!!`);
    }

  }
  return false;
};

const clearBoard = function() {
  const board = $("#board tr td").get();

  for (let i = 0; i < board.length; i++) {
    board[i].innerHTML = "";
  }
};

//Reset button
$(".reset").on("click", function() {
  game.reset();
  clearBoard();
  window.location.reload(true);
});

////////////

//Page load
$(document).ready(function() {
  initGame();

  //writeGameData();

  $("#scoreX").html(`Score for X: ${game.player1.score}`);
  $("#scoreY").html(`Score for Y: ${game.player2.score}`);

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



  //////////////////Game logics///////////////////////////////////////////////

  //If any of the block is clicked
  $("#board tr td").on("click", function() {
    //If game starts and no marker on the board when the player clicks anywhere on it

    if (game.move <= 9 && game.move % 2 === 1) {
      //Place the "X" on the board, player is player1
      $(this).html(game.currentPlayer.symbol).slideUp(100).fadeIn(400);

      //increment the game move
      game.move++;

      $(".player1").removeClass('active focus');
      $(".player2").addClass('active focus')

      //Update the board array with currentPlayer's marker
      //get current row and block index
      const index = $(this).attr("id");
      const rowIndex = index.slice(0, 1);
      const columnIndex = index.slice(-1);

      //Update the array according to the position player1 placed the "X" on the board
      [game.board[rowIndex - 1][columnIndex - 1]] = game.currentPlayer.marker;

      $(this).off();

      checkForWinner(game.currentPlayer);

      if (checkForWinner(game.currentPlayer) === false) {
        game.currentPlayer = game.player2;
      }
    } else if (game.move <= 9 && game.move % 2 === 0) {
      //Place the "X" on the board, player is player1
      $(this).html(game.currentPlayer.symbol).slideUp(100).fadeIn(400);;

      //increment the game move
      game.move++;

      $(".player2").removeClass('active focus');
      $(".player1").addClass('active focus');
      //Update the board array with currentPlayer's marker
      //get current row and block index
      const index = $(this).attr("id");
      const rowIndex = index.slice(0, 1);
      const columnIndex = index.slice(-1);

      //Update the array according to the position player1 placed the "X" on the board
      [game.board[rowIndex - 1][columnIndex - 1]] = game.currentPlayer.marker;

      $(this).off();

      checkForWinner(game.currentPlayer);

      if (checkForWinner(game.currentPlayer) === false) {
        game.currentPlayer = game.player1;
      }
    }
  });
});
