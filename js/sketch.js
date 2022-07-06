var X = 0;
var board = new Board();
var currentCell, guess = 1, attemptStack = [];

function preload() { defaultFont = loadFont("assets/fonts/default.ttf"); }

function setup () {

  createCanvas(WIDTH, HEIGHT);
  canvas = document.getElementById("defaultCanvas0").getContext("2d");

  frameRate(999);

  currentCell = board.findEmptyCell();

}

function draw () {

  background(ACCENT_1);
  drawBoard();

  if (!currentCell || currentCell == NaN) { noLoop(); console.log("finished!"); return; }

  if (currentCell.value == X) {

    if (board.isValid(currentCell, guess)) {

      currentCell.value = guess;
      attemptStack.push(currentCell);
      guess = 0;
      currentCell = board.findEmptyCell();
  
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

function drawBoard () {

  for (var row = 0; row < board.rows; row++) {

    for (var column = 0; column < board.columns; column++) {

      fill(ACCENT_2);
      noStroke();
      rect(column * board.size + 5, row * board.size + 5, board.size - 10, board.size - 10, 12);

      var message = "";

      if (board.data[row][column].value != X) { fill(BACKGROUND_COLOR); message = board.data[row][column].value; }
      textFont(defaultFont);
      textSize(board.size / 2);
      textAlign(CENTER, CENTER);
      text(message, column * board.size + 2.5, row * board.size + board.size / 2 - 2.5, board.size);

    }

  }

  stroke(BACKGROUND_COLOR);
  strokeWeight(2.5);
  line(board.size * 3, 10, board.size * 3, HEIGHT - 10);
  line(board.size * 6, 10, board.size * 6, HEIGHT - 10);
  line(10, board.size * 3, WIDTH - 10, board.size * 3);
  line(10, board.size * 6, WIDTH - 10, board.size * 6);

}