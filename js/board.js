function Board (d) {

    this.rows = 9;
    this.columns = 9;
    this.size = WIDTH / this.columns;

    if (d) { this.grid = d; }

    else { this.grid = [
        
                        // board 1
                      /* [5, 3, 4, X, 7, X, X, X, X],
                         [6, X, X, 1, 9, 5, X, X, X],
                         [X, 9, 8, X, X, X, X, 6, X],
                         [8, X, X, X, 6, X, X, X, 3],
                         [4, X, X, 8, X, 3, X, X, 1],
                         [7, X, X, X, 2, X, X, X, 6],
                         [X, 6, X, X, X, X, 2, 8, X],
                         [X, X, X, 4, 1, 9, X, X, 5],
                         [X, X, X, X, 8, X, X, 7, 9] */
                        
                         // board 2
                         [X, 5, 2, X, X, 6, X, X, X],
                         [1, 6, X, 9, X, X, X, X, 4],
                         [X, 4, 9, 8, X, 3, 6, 2, X],
                         [4, X, X, X, X, X, 8, X, X],
                         [X, 8, 3, 2, X, 1, 5, 9, X],
                         [X, X, 1, X, X, X, X, X, 2],
                         [X, 9, 7, 3, X, 5, 2, 4, X],
                         [2, X, X, X, X, 9, X, 5, 6],
                         [X, X, X, 1, X, X, 9, 7, X]
                        
                        ]; }

    this.data = [[], [], [], [], [], [], [], [], []];

    for (var r = 0; r < this.rows; r++) {

        for (var c = 0; c < this.columns; c++) {

            this.data[r][c] = new Cell(this.grid[r][c], r, c);

        }

    }

}

Board.prototype.isValid = function (cell, digit) {

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

Board.prototype.findEmptyCell = function () {

    for (var r = 0; r < this.rows; r++) {

        for (var c = 0; c < this.columns; c++) {

            if (this.data[r][c].value == X) { return this.data[r][c]; }

        }

    }

    return false;

}