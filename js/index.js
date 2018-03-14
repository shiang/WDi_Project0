// const initGame = function(type) {
//   game.board = Array(type).fill([
//     Array(type)
//       .join(".")
//       .split(".")
//   ]);
//
//   if (type === 3) {
//     game.type = 3;
//     $("#board").html("");
//
//     $("#board").append(`
//         <tr>
//     			<td id="1-1"></td>
//     			<td id="1-2"></td>
//     			<td id="1-3"></td>
//     		</tr>
//     		<tr>
//     			<td id="2-1"></td>
//     			<td id="2-2"></td>
//     			<td id="2-3"></td>
//     		</tr>
//     		<tr>
//     			<td id="3-1"></td>
//     			<td id="3-2"></td>
//     			<td id="3-3"></td>
//     		</tr>
//     `);
//   }
//
//   if (type === 5) {
//     game.type = 5;
//     $("#board").html("");
//
//     $("#board").append(`
//         <tr>
//     			<td id="1-1"></td>
//     			<td id="1-2"></td>
//     			<td id="1-3"></td>
//           <td id="1-4"></td>
//     			<td id="1-5"></td>
//     		</tr>
//     		<tr>
//     			<td id="2-1"></td>
//     			<td id="2-2"></td>
//     			<td id="2-3"></td>
//           <td id="2-4"></td>
//     			<td id="2-5"></td>
//     		</tr>
//     		<tr>
//     			<td id="3-1"></td>
//     			<td id="3-2"></td>
//     			<td id="3-3"></td>
//           <td id="3-4"></td>
//     			<td id="3-5"></td>
//     		</tr>
//         <tr>
//     			<td id="4-1"></td>
//     			<td id="4-2"></td>
//     			<td id="4-3"></td>
//           <td id="4-4"></td>
//     			<td id="4-5"></td>
//     		</tr>
//         <tr>
//     			<td id="5-1"></td>
//     			<td id="5-2"></td>
//     			<td id="5-3"></td>
//           <td id="5-4"></td>
//     			<td id="5-5"></td>
//     		</tr>
//     `);
//   }
// };


//Helper functions
const initGameCompMode = function() {
  game.currentPlayer = game.player1;
  game.currentPlayer.isComputer = true;
  game.play = true;
}

const initGame2Player = function() {
  game.currentPlayer = game.player1;
  game.currentPlayer.isComputer = false;
  game.play = true;
}

const generateRandom = function(min, max, exclude) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num === exclude ? generateRandom(min, max, exclude) : num;
};


//Page load
$(document).ready(function() {

  initGameCompMode(); //Set currentPlayer as player1
  const isNoMoveMade = _.flatten(game.board).join('') === "" ? true : false;

  $('.computer').on('click', function() {

    initGameCompMode();
  });

  $('.2players').on('click', function() {
    initGame2Player()
  })

  $('.player2').on('click', function() {
    if(game.currentPlayer.isComputer) {
      checkBestMove();
    } else {
      return;
    }
  })


  if (game.move <= 9 && isNoMoveMade) {
    //If user choose to play with the computer when the game starts

  } else if(game.move <= 9 && game.play && game.currentPlayer.isComputer){
    checkBestMove();
  } else {// If user selects to play with computer in the middle of the game, show warning and do nothing
    console.log(`You are in the middle of the game!`);
    return;
  }




  const checkBestMove = function() {
    //If there's move can be made
    if (game.move <= 9) {
      //If the computer is the first to move
      if (game.move % 2 === 1) {


        if (isNoMoveMade && game.play) {
          //If no move has been made

          //Place the marker on the center position
          const centerXY = parseInt(game.board.length / 2) + 1;
          $(`#${centerXY}-${centerXY}`).html(game.player1.symbol);

          //and increment the move
          game.move++;
        } else if (flattenArr.join("") !== "" && game.play) {
          //Computer's turn but not first move

          const max = game.board.length;

          const randNum1 = generateRandom(1, max, 2);
          const randNum2 = generateRandom(1, max, 2);

          if ($(`#${randNum1}-${randNum2}`).html() === "") {
            $(`#${randNum1}-${randNum2}`).html(game.player1.symbol);
            game.move++;
          } else {
            checkBestMove();
          }
        }
      }
    } else {
      //If the computer is the second to move
    }
  };

  if (game.currentPlayer.isComputer) {
    checkBestMove();
  }

  $(".3").on("click", function() {
    initGame(3);
  });

  $(".5").on("click", function() {
    initGame(5);
  });

  $(".save").on("click", function() {
    localStorage.setItem("savedGame", JSON.stringify(game));
  });

  $(".restore").on("click", function() {
    const gameState = localStorage.getItem("savedGame");

    game = JSON.parse(gameState);
  });

  $(".reset").on("click", function() {
    game.reset();
  });

  //If any of the block is clicked
  $("#board tr td").on("click", function() {
    if (game.move <= 9) {
      //If the block that's clicked is empty, meaning the game can be in play mode
      if ($(this).html() === "" && game.play) {
        //If the remainder number from the number of move divided by 2 is 1, meaning this player is the first to make the move
        if (game.move % 2 === 1) {
          //Insert the icon onto the block for this player, first one (player1) is always the "X"
          $(this).html(game.player1.symbol);

          //Increment game move by 1
          game.move++;

          //get current row and block index
          const index = $(this).attr("id");
          const rowIndex = index.slice(0, 1);
          const columnIndex = index.slice(-1);

          [game.board[rowIndex - 1][columnIndex - 1]] = game.player1.marker;

          //update the currentPlayer object
          game.currentPlayer = game.player1;

          game.checkRowForWinner();
          game.checkColumnForWinner();
          game.checkDiagonalForWinner();
          game.checkDiagonal2ForWinner();

          if (
            game.checkRowForWinner() ||
            game.checkColumnForWinner() ||
            game.checkDiagonalForWinner() ||
            game.checkDiagonal2ForWinner()
          ) {
            console.log(`Player ${game.player1.marker} is the winner!`);
          }

          if (game.playAgainstComp) {
            game.currentPlayer = game.player2;
            game.currentPlayer.isComputer = true;
            checkBestMove();
          }
        } else {
          $(this).html(game.player2.symbol);
          game.move++;

          const index = $(this).attr("id");
          const rowIndex = index.slice(0, 1);
          const columnIndex = index.slice(-1);

          [game.board[rowIndex - 1][columnIndex - 1]] = game.player2.marker;

          game.currentPlayer = game.player2;

          game.checkRowForWinner();
          game.checkColumnForWinner();
          game.checkDiagonalForWinner();
          game.checkDiagonal2ForWinner();

          if (
            game.checkRowForWinner() ||
            game.checkColumnForWinner() ||
            game.checkDiagonalForWinner() ||
            game.checkDiagonal2ForWinner()
          ) {
            console.log(`Player ${game.player2.marker} is the winner!`);
          }

          if (game.playAgainstComp) {
            game.currentPlayer = game.player1;
            game.currentPlayer.isComputer = true;
            checkBestMove();
          }
        }
      }
    } else {
      if (
        !game.checkRowForWinner() ||
        !game.checkColumnForWinner() ||
        !game.checkDiagonalForWinner() ||
        !game.checkDiagonal2ForWinner()
      ) {
        console.log(`Draw!`);
      }
    }
  });
});
