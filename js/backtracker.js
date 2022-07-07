import Board from "./board.js";

export default class Backtracker {

  constructor (WIDTH, HEIGHT, div) {

    function drawBoard (board, p5, defaultFont) {

      var X = 0;

      for (var row = 0; row < board.rows; row++) {
    
        for (var column = 0; column < board.columns; column++) {
    
          p5.color(ACCENT_2);
          p5.noStroke();
          p5.rect(column * board.size + 5, row * board.size + 5, board.size - 10, board.size - 10, 12);
    
          var message = "";
    
          if (board.data[row][column].value != X) { p5.color(BACKGROUND_COLOR); message = board.data[row][column].value; }
          p5.textFont(defaultFont);
          p5.textSize(board.size / 2);
          p5.textAlign(p5.CENTER, p5.CENTER);
          p5.text(message, column * board.size + 2.5, row * board.size + board.size / 2 - 2.5, board.size);
    
        }
    
      }
    
      p5.stroke(BACKGROUND_COLOR);
      p5.strokeWeight(2.5);
      p5.line(board.size * 3, 10, board.size * 3, HEIGHT - 10);
      p5.line(board.size * 6, 10, board.size * 6, HEIGHT - 10);
      p5.line(10, board.size * 3, WIDTH - 10, board.size * 3);
      p5.line(10, board.size * 6, WIDTH - 10, board.size * 6);
    
    }

    new p5 (function (p5) {

      var X = 0
      var board = new Board();
      var currentCell, firstCell, guess = 1, attemptStack = [];
      var defaultFont = p5.loadFont("assets/fonts/default.ttf");
      
      p5.preload = function () { defaultFont = p5.loadFont("assets/fonts/default.ttf"); }
      
      p5.setup = function () {

        p5.createCanvas(WIDTH, HEIGHT);
        p5.frameRate(999);

        currentCell = board.findEmptyCell();
        firstCell = currentCell;
        attemptStack.push(currentCell);

      }


      p5.draw = function () {

        p5.background(ACCENT_1);
        drawBoard(board, p5, defaultFont);

        if (!currentCell || currentCell == NaN) { p5.noLoop(); console.log("finished!"); return; }

        if (currentCell.value == X) {

          if (board.isValid(currentCell, guess)) {

            currentCell.value = guess;
            attemptStack.push(currentCell);
            guess = 0;
            currentCell = board.findEmptyCell();
  
          }
  
          else {
  
            if (guess > 8 && currentCell && currentCell != firstCell) {
        
              currentCell.value = X;
              currentCell = attemptStack.pop();
              guess = currentCell.value;
              currentCell.value = X;
      
            }
  
          }

        }

        else {

          currentCell = board.data[currentCell.row][currentCell.column + 1];
          guess = 0;

        }

        guess++;

      }
      
    }, div);

  }

}


// var X = 0;
// var board = new Board();
// var currentCell, guess = 1, attemptStack = [];

// function preload() { defaultFont = loadFont("assets/fonts/default.ttf"); }

// function setup () {

//   createCanvas(WIDTH, HEIGHT);

//   currentCell = board.findEmptyCell();

// }

// function draw () {

//   background(ACCENT_1);
//   drawBoard();

//   if (!currentCell || currentCell == NaN) { noLoop(); console.log("finished!"); return; }

//   if (currentCell.value == X) {

//     if (board.isValid(currentCell, guess)) {

//       currentCell.value = guess;
//       attemptStack.push(currentCell);
//       guess = 0;
//       currentCell = board.findEmptyCell();
  
//     }
  
//     else {
  
//       if (guess > 8 && currentCell) { 
        
//         currentCell.value = X;
//         currentCell = attemptStack.pop();
//         guess = currentCell.value;
//         currentCell.value = X;
      
//       }
  
//     }

//   }

//   else {

//     currentCell = board.data[currentCell.row][currentCell.column + 1];
//     guess = 0;

//   }

//   guess++;

// }

// function drawBoard () {

//   for (var row = 0; row < board.rows; row++) {

//     for (var column = 0; column < board.columns; column++) {

//       fill(ACCENT_2);
//       noStroke();
//       rect(column * board.size + 5, row * board.size + 5, board.size - 10, board.size - 10, 12);

//       var message = "";

//       if (board.data[row][column].value != X) { fill(BACKGROUND_COLOR); message = board.data[row][column].value; }
//       textFont(defaultFont);
//       textSize(board.size / 2);
//       textAlign(CENTER, CENTER);
//       text(message, column * board.size + 2.5, row * board.size + board.size / 2 - 2.5, board.size);

//     }

//   }

//   stroke(BACKGROUND_COLOR);
//   strokeWeight(2.5);
//   line(board.size * 3, 10, board.size * 3, HEIGHT - 10);
//   line(board.size * 6, 10, board.size * 6, HEIGHT - 10);
//   line(10, board.size * 3, WIDTH - 10, board.size * 3);
//   line(10, board.size * 6, WIDTH - 10, board.size * 6);

// }