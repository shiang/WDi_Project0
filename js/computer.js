
//3 x 3
//0, 1, 2     0, 1, 2
//3, 4, 5     0, 1, 2
//6, 7, 8     0, 1, 2

//5 x 5
// 0   1,  2,  3,  4       0,  1,  2,  3,  4
// 5,  6,  7,  8,  9       0,  1,  2,  3,  4
//10, 11, 12, 13, 14       0,  1,  2,  3,  4
//15, 16, 17, 18, 19       0,  1,  2,  3,  4
//20, 21, 22, 23, 24       0,  1,  2,  3,  4

//7 x 7
// 0,  1,  2,  3,  4,  5,  6       0,  1,  2,  3,  4,  5,  6
// 7,  8,  9, 10, 11, 12, 13       0,  1,  2,  3,  4,  5,  6
//14, 15, 16, 17, 18, 19, 20       0,  1,  2,  3,  4,  5,  6
//21, 22, 23, 24, 25, 26, 27       0,  1,  2,  3,  4,  5,  6
//28, 29, 30, 31, 32, 33, 34       0,  1,  2,  3,  4,  5,  6
//35, 36, 37, 38, 39, 40, 41       0,  1,  2,  3,  4,  5,  6
//42, 43, 44, 45, 46, 47, 48       0,  1,  2,  3,  4,  5,  6

const generateRandom = function(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num === (min || max) ? generateRandom(min, max) : num;
};

const checkBestMove = function() {

  //If there's move can be made
  if(game.move < 9) {


    //If the computer is the first to move
    if (game.move % 2 === 1) {

      if ($(this).html() === "" && game.play) {//If no move has been made

        //Place the marker on the center position
        const centerXY = parseInt(game.board.length / 2) + 1;
        $(`#${centerXY}-${centerXY}`).html(`<i class="fas fa-times fa-3x" style="color: purple"></i>`);

        //and increment the move
        game.move++;
      } else {//If it's not the first move (maybe 3rd, 5th..etc)

        do {
          const max = game.board.length;

          const randNum1 = generateRandom(1, max);
          const randNum2 = generateRandom(1, max);

          $(`#${randNum1}-${randNum2}`).html(`<i class="fas fa-times fa-3x" style="color: purple"></i>`);

          //And increment the move
          game.move++;
        } while ($(`#${randNum1}-${randNum2}`).html() === "");

        }
        // else {
        //
        // }
      }

    } else { //If the computer is the second to move

    }
  }












//   //If the computer is the currentPlayer and it's the second to move
//   if (game.currentPlayer.isComputer && game.move === 2) {
//
//     const centerXY = parseInt(game.board.length / 2) + 1;
//
//     //If the center spot is empty, insert marker on that spot
//     if ($(`#${centerXY}-${centerXY}`).html() === "") {
//       $(`#${centerXY}-${centerXY}`).html(`<i class="fas fa-times fa-3x" style="color: purple"></i>`);
//       game.move++;
//     }
//
//     //If the center is taken, randomly place the marker in one of the corner spot
//
//     const max = game.board.length;
//
//     const randNum1 = generateRandom(1, max);
//     const randNum2 = generateRandom(1, max);
//
//     if($(`#${randNum1}-${randNum2}`).html.() === "") {
//       $(`#${randNum1}-${randNum2}`).html(`<i class="fas fa-times fa-3x" style="color: purple"></i>`);
//       game.move++;
//     }
//
//
//
//   }
//
//   if (game.currentPlayer.isComputer && game.move === 3) {
//     //Meaning opponent made his/her first move (2 markers on the board)
//     for (let i = 0; i < game.status.length; i++) {
//       for (let j = 0; j < game.status[i].length; j++) {
//         if (game.status[i][j] === "O") {
//           switch (i) {
//             case 0:
//               if (j === 0) {
//                 //(0, 0)
//                 const randNum = Math.floor(Math.random() * 2) + 1;
//
//                 if (randNum === 1) {
//                   $(`#2-${randNum.toString()}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 }
//
//                 if (randNum === 2) {
//                   $(`#1-${randNum.toString()}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 }
//
//                 game.move++;
//               }
//
//               if (j === 1) {
//                 //(0, 1)
//
//                 //make a move on (0, 0) or (0, 2)
//                 const randNum = Math.floor(Math.random() * 2) + 1;
//                 if (randNum === 1) {
//                   $(`#1-${randNum.toString()}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 }
//
//                 if (randNum === 2) {
//                   $(`#1-${(randNum + 1).toString()}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 }
//
//                 game.move++;
//               }
//
//               if (j === 2) {
//                 //(0, 2)
//
//                 //make a move on (0, 1) or (1, 2)
//                 const randNum = Math.floor(Math.random() * 2) + 1;
//                 if (randNum === 1) {
//                   $(`#1-${(randNum + 1).toString()}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 }
//
//                 if (randNum === 2) {
//                   $(`#${randNum}-${(randNum + 1).toString()}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 }
//
//                 game.move++;
//               }
//               break;
//
//             case 1: //(1, x)
//               //make a move on #1-1, 1-2, 1-3, 3-1, 3-2, 3-3
//
//               const randNum = generateRandom(1, 3, 2);
//               $(`#${randNum}-${randNum.toString()}`).html(
//                 `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//               );
//
//               break;
//
//             case 2: //(2, x)
//               if (j === 0) {
//                 //(2, 0)
//                 //Make a move on #2-1, or #3-2
//                 const randNum1 = generateRandom(1, 3, 1);
//                 const randNum2 = Math.floor(Math.random() * 2) + 1;
//                 console.log(randNum1, randNum2);
//                 if (randNum1 === 3 && randNum2 === 1) {
//                   $(`#${randNum1}-${randNum2 + 1}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 } else if (randNum1 === 2 && randNum2 === 2) {
//                   const randNum = Math.floor(Math.random() * 2) + 1;
//                   if (randNum === 1) {
//                     $(`#${randNum + 1}-${randNum}`).html(
//                       `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                     );
//                   }
//
//                   if (randNum === 2) {
//                     $(`#${randNum + 1}-${randNum2}`).html(
//                       `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                     );
//                   }
//                 } else {
//                   $(`#${randNum1}-${randNum2}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 }
//               }
//
//               if (j === 1) {
//                 //(2, 1)
//                 //Move on to #3-1, or #3-3
//                 const randNum = generateRandom(1, 3, 2);
//
//                 console.log(randNum);
//                 $(`#3-${randNum}`).html(
//                   `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                 );
//               }
//
//               if (j === 2) {
//                 //(2, 2)
//                 //move on to #3-2, or #2-3
//                 const randNum1 = generateRandom(1, 3, 1);
//                 const randNum2 = generateRandom(1, 3, 1);
//
//                 if (randNum1 === 2 && randNum2 === 2) {
//                   $(`#${randNum1}-${randNum2 + 1}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 } else if (randNum1 === 3 && randNum2 === 3) {
//                   $(`#${randNum1}-${randNum2 - 1}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 } else {
//                   $(`#${randNum1}-${randNum2}`).html(
//                     `<i class="fas fa-times fa-3x" style="color: purple"></i>`
//                   );
//                 }
//               }
//
//               break;
//             default:
//               return;
//           }
//         }
//       }
//     }
//   }
// };
