import WFBoard from "../wfc/wfboard.js";

export default class WFC {

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

      var X = 0;
      var board = new WFBoard();
      var defaultFont = p5.loadFont("assets/fonts/default.ttf");
      var currentCell, guess = 1, attemptStack = [];
      
      p5.preload = function () { defaultFont = p5.loadFont("assets/fonts/default.ttf"); }
      
      p5.setup = function () {

        p5.createCanvas(WIDTH, HEIGHT);
        p5.frameRate(20);

        for (var r = 0; r < board.rows; r++) {

          for (var c = 0; c < board.columns; c++) {

            board.data[r][c].entropy = board.calculateEntropy(board.data[r][c]);

          }

        }

        console.log(board.data)

      }


      p5.draw = function () {

        // p5.noLoop();

        p5.background(ACCENT_1);
        drawBoard(board, p5, defaultFont);

        // wfc stuff here...

        currentCell = board.findLowestEntropy();

        console.log("guess " + guess + " for " + currentCell.row + ", " + currentCell.column)

        if (board.isValid(currentCell, guess)) {

          currentCell.value = guess;
          currentCell.entropy = 100;
          guess = 1;
          currentCell = board.findLowestEntropy();

        }

        else { 

          guess++;

        }

        if (guess > 9) { guess = 1; }

      }
      
    }, div);

  }

}