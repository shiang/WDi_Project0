
// var testObject = { 'one': 1, 'two': 2, 'three': 3 };
//
// // Put the object into storage
// localStorage.setItem('testObject', JSON.stringify(testObject));
//
// // Retrieve the object from storage
// var retrievedObject = localStorage.getItem('testObject');
//
// console.log('retrievedObject: ', JSON.parse(retrievedObject));

function generateRandom(min, max, exclude) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num === exclude ? generateRandom(min, max, exclude) : num;
}

const checkBestMove = function() {
  //If the computer is the currentPlayer and it's the first to move
  if (game.currentPlayer.isComputer && game.move === 1) {
    $("#2-2").html(`<i class="fas fa-times fa-3x" style="color: purple"></i>`);
    game.move++;
  }

  if (game.currentPlayer.isComputer && game.move === 3) {
    //Meaning opponent made his/her first move (2 markers on the board)
    for (let i = 0; i < game.status.length; i++) {
      for (let j = 0; j < game.status[i].length; j++) {
        if (game.status[i][j] === "O") {
          switch (i) {
            case 0:
              if (j === 0) {
                //(0, 0)
                const randNum = Math.floor(Math.random() * 2) + 1;

                if (randNum === 1) {
                  $(`#2-${randNum.toString()}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                }

                if (randNum === 2) {
                  $(`#1-${randNum.toString()}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                }

                game.move++;
              }

              if (j === 1) {
                //(0, 1)

                //make a move on (0, 0) or (0, 2)
                const randNum = Math.floor(Math.random() * 2) + 1;
                if (randNum === 1) {
                  $(`#1-${randNum.toString()}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                }

                if (randNum === 2) {
                  $(`#1-${(randNum + 1).toString()}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                }

                game.move++;
              }

              if (j === 2) {
                //(0, 2)

                //make a move on (0, 1) or (1, 2)
                const randNum = Math.floor(Math.random() * 2) + 1;
                if (randNum === 1) {
                  $(`#1-${(randNum + 1).toString()}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                }

                if (randNum === 2) {
                  $(`#${randNum}-${(randNum + 1).toString()}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                }

                game.move++;
              }
              break;

            case 1: //(1, x)
              //make a move on #1-1, 1-2, 1-3, 3-1, 3-2, 3-3

              const randNum = generateRandom(1, 3, 2);
              $(`#${randNum}-${randNum.toString()}`).html(
                `<i class="fas fa-times fa-3x" style="color: purple"></i>`
              );

              break;

            case 2: //(2, x)
              if (j === 0) {
                //(2, 0)
                //Make a move on #2-1, or #3-2
                const randNum1 = generateRandom(1, 3, 1);
                const randNum2 = Math.floor(Math.random() * 2) + 1;
                console.log(randNum1, randNum2);
                if (randNum1 === 3 && randNum2 === 1) {
                  $(`#${randNum1}-${randNum2 + 1}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                } else if (randNum1 === 2 && randNum2 === 2) {
                  const randNum = Math.floor(Math.random() * 2) + 1;
                  if (randNum === 1) {
                    $(`#${randNum + 1}-${randNum}`).html(
                      `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                    );
                  }

                  if (randNum === 2) {
                    $(`#${randNum + 1}-${randNum2}`).html(
                      `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                    );
                  }
                } else {
                  $(`#${randNum1}-${randNum2}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                }
              }

              if (j === 1) {
                //(2, 1)
                //Move on to #3-1, or #3-3
                const randNum = generateRandom(1, 3, 2);

                console.log(randNum);
                $(`#3-${randNum}`).html(
                  `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                );
              }

              if (j === 2) {
                //(2, 2)
                //move on to #3-2, or #2-3
                const randNum1 = generateRandom(1, 3, 1);
                const randNum2 = generateRandom(1, 3, 1);

                if (randNum1 === 2 && randNum2 === 2) {
                  $(`#${randNum1}-${randNum2 + 1}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                } else if (randNum1 === 3 && randNum2 === 3) {
                  $(`#${randNum1}-${randNum2 - 1}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                } else {
                  $(`#${randNum1}-${randNum2}`).html(
                    `<i class="fas fa-times fa-3x" style="color: purple"></i>`
                  );
                }
              }

              break;
            default:
              return;
          }
        }
      }
    }
  }
};

$(document).ready(function() {
  checkBestMove();

  //If any of the block is clicked
  $("#board tr td").on("click", function() {
    if (game.move < 9) {
      //If the block that's clicked is empty, meaning the game can be in play mode
      if ($(this).html() === "" && game.play) {
        //If the remainder number from the number of move divided by 2 is 1, meaning this player is the first to make the move
        if (game.move % 2 === 1) {
          //Insert the icon onto the block for this player, first one (player1) is always the "X"
          $(this).html(
            `<i class="fas fa-times fa-3x" style="color: purple"></i>`
          );

          //Increment game move by 1
          game.move++;

          //get current row and block index
          const index = $(this).attr("id");
          const rowIndex = index.slice(0, 1);
          const blockIndex = index.slice(-1);

          [game.status[rowIndex - 1][blockIndex - 1]] = game.player1.marker;

          //update the currentPlayer object
          game.currentPlayer = game.player1;

          game.checkingWinningConditions();

          if (game.playAgainstComp) {
            game.currentPlayer = game.player2;
            game.currentPlayer.isComputer = true;
            checkBestMove();
          }
        } else {
          $(this).html(
            `<i class="far fa-circle fa-3x" style="color: blue"></i>`
          );
          game.move++;

          const index = $(this).attr("id");
          const rowIndex = index.slice(0, 1);
          const blockIndex = index.slice(-1);

          [game.status[rowIndex - 1][blockIndex - 1]] = game.player2.marker;

          game.currentPlayer = game.player2;

          game.checkingWinningConditions();

          if (game.playAgainstComp) {
            game.currentPlayer = game.player1;
            game.currentPlayer.isComputer = true;
            checkBestMove();
          }
        }
      }
    } else {
      console.log(`Draw!!`);
    }
  });
});
