import Board from "./board.js";

export default class WFC {

  constructor (WIDTH, HEIGHT, div) {

    new p5 (function (p5) {

      window.addEventListener("resize", function (ignored) {

        label.style.top = (canv.offsetTop - 60) + "px";
        label.style.left = (canv.offsetLeft) + "px";

      }, true);

      var X = 0;
      var board = new Board(), canv, label;
      var defaultFont = p5.loadFont("assets/fonts/default.ttf");
      var currentCell, guess = 1, attemptStack = [];
      var startTime = Date.now(), interval, elapsedTime;
      
      p5.preload = function () { defaultFont = p5.loadFont("assets/fonts/default.ttf"); }
      
      p5.setup = function () {

        canv = p5.createCanvas(WIDTH, HEIGHT);
        canv = canv.elt
        p5.frameRate(999);

        board.calculateEntropies();
        currentCell = board.findLowestEntropy();

        label = document.createElement("p");
        label.innerHTML = "entropy-based selection algorithm";
        label.style.position = "absolute";
        label.style.top = (canv.offsetTop - 60) + "px";
        label.style.left = (canv.offsetLeft) + "px";

        document.body.appendChild(label);

        interval = setInterval(function() {

          elapsedTime = Date.now() - startTime;
          label.innerHTML = "entropy-based selection algorithm [" + (elapsedTime / 1000).toFixed(3) + " sec]";

        }, 100);

      }


      p5.draw = function () {

        p5.background(ACCENT_1);
        board.drawBoard(board, p5, defaultFont);

        if (!currentCell || currentCell == NaN) { p5.noLoop(); console.log("finished!"); clearInterval(interval); return; }

        if (currentCell.value == X) {

          if (board.isValid(currentCell, guess)) {

            currentCell.value = guess;
            currentCell.entropy = 100;
            attemptStack.push(currentCell);
            guess = 0;
            currentCell = board.findLowestEntropy();
  
          }
  
          else {
  
            if (guess > 8 && currentCell) {
        
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