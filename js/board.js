export default function Board (d) {

    var X = 0;
    this.rows = 9;
    this.columns = 9;
    this.size = WIDTH / this.columns;

    if (d) { this.grid = d; }

    else { this.grid = getGrid(); }

    this.data = [[], [], [], [], [], [], [], [], []];

    for (var r = 0; r < this.rows; r++) {

        for (var c = 0; c < this.columns; c++) {

            this.data[r][c] = new Cell(this.grid[r][c], r, c);

        }

    }

    function pattern (r, c, base, side) { return (base * (r % base) + Math.floor(r / base) + c) % side; }

    function shuffle (s) { return s.sort(function () { return Math.random() - 0.5; }); }

    function getGrid () {

        // var base = 3;
        // var side = base * base;
        // var rows = [], columns = [], numbers = [], b = [], newB = [];

        // for (var x = 0; x < base; x++) {

        //     for (var y = 0; y < base; y++) {

        //         rows.push(X * base + y);
        //         columns.push(x * base + y);

        //     }

        // }

        // rows = shuffle(rows);
        // columns = shuffle(columns);

        // for (var n = 1; n < base * base + 1; n++) { numbers.push(n); }

        // numbers = shuffle(numbers);

        // for (var r = 0; r < rows.length; r++) {

        //     for (var c = 0; c < columns.length; c++) {

        //         b.push(numbers[pattern(rows[r], columns[c], base, side)]);

        //     }

        // }

        // while (b.length) { newB.push(b.splice(0, 9)); }

        // console.log(newB);

        // var squares = side * side;

        // var emptySpots = Math.floor((squares * 3) / 4);

        // for (var cell = 0; cell < squares; cell++) {

        //     if (Math.random() < 0.4) { newB[Math.floor(cell / side)][cell % side] = X; }

        // }

        // console.log(newB)

        // return newB;

        var grid1 = [ [5, 3, 4, X, 7, X, X, X, X],
                      [6, X, X, 1, 9, 5, X, X, X],
                      [X, 9, 8, X, X, X, X, 6, X],
                      [8, X, X, X, 6, X, X, X, 3],
                      [4, X, X, 8, X, 3, X, X, 1],
                      [7, X, X, X, 2, X, X, X, 6],
                      [X, 6, X, X, X, X, 2, 8, X],
                      [X, X, X, 4, 1, 9, X, X, 5],
                      [X, X, X, X, 8, X, X, 7, 9] ];

        var grid2 = [ [X, 5, 2, X, X, 6, X, X, X],
                      [1, 6, X, 9, X, X, X, X, 4],
                      [X, 4, 9, 8, X, 3, 6, 2, X],
                      [4, X, X, X, X, X, 8, X, X],
                      [X, 8, 3, 2, X, 1, 5, 9, X],
                      [X, X, 1, X, X, X, X, X, 2],
                      [X, 9, 7, 3, X, 5, 2, 4, X],
                      [2, X, X, X, X, 9, X, 5, 6],
                      [X, X, X, 1, X, X, 9, 7, X] ];

        var presetGrids = [grid1, grid2];

        // return presetGrids[Math.floor(Math.random() * presetGrids.length)];
        return grid2;

    }

    this.isValid = function (cell, digit) {

        if (digit > 9) { return false; }
    
        for (var r = 0; r < this.rows; r++) {
    
            if (this.data[r][cell.column].value == digit) { return false; }
    
        }
    
        for (var c = 0; c < this.columns; c++) {
    
            if (this.data[cell.row][c].value == digit) { return false; }
    
        }
    
        var rowStart = Math.floor(cell.row / 3) * 3;
        var columnStart = Math.floor(cell.column / 3) * 3;
    
        for (var r = 0; r < 3; r++) {
    
            for (var c = 0; c < 3; c++) {
    
                if (this.data[rowStart + r][columnStart + c].value == digit) { return false; }
    
            }
    
        }
    
        return true;
    
    }
    
    this.findEmptyCell = function () {
    
        for (var r = 0; r < this.rows; r++) {
    
            for (var c = 0; c < this.columns; c++) {
    
                if (this.data[r][c].value == X) { return this.data[r][c]; }
    
            }
    
        }
    
        return false;
    
    }

    this.findLowestEntropy = function () {

        var lowest = this.findEmptyCell();
    
        for (var r = 0; r < this.rows; r++) {
    
            for (var c = 0; c < this.columns; c++) {
    
                if (this.data[r][c].entropy < lowest.entropy) { return this.data[r][c]; }
    
            }
    
        }
    
        return lowest;
    
    }

    this.calculateEntropy = function (cell) {

        cell.entropy = 0;

        if (cell.value !== X) { return 100; }

        for (var n = 1; n <= 9; n++) {

            if (this.isValid(cell, n)) { cell.entropy++; }

        }    
        
        return cell.entropy;

    }

    this.calculateEntropies = function () {

        for (var r = 0; r < this.rows; r++) {

            for (var c = 0; c < this.columns; c++) {
  
                this.data[r][c].entropy = this.calculateEntropy(this.data[r][c]);
  
            }
  
          }

    }

    this.drawBoard  = function (board, p5, defaultFont) {

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

}