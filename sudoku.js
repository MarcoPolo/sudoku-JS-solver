columns = 9;
rows = 9;
squareSideLength = 3;


sudoku = []; //sudoku array is a 2d array of the sudoku game
emptyCells = []; //a list of empty cells


checkHorizontal = function(row, value){
    for (var i=0; i < columns; i++){
        if ( sudoku[i][row] == value ){
            return false;
        }
    }
    return true;
}

checkVertical = function(colm, value){
    for (var i=0; i < rows; i++){
        if ( sudoku[colm][i] == value ){
            return false;
        }
    }
    return true;
}

checkSquare = function (squareX,squareY, value){ //squareX and sqaureY are the start coordinates of the square
    for (var i=0; i < squareSideLength; i++){
        for (var j=0; j < squareSideLength; j++){
            if ( sudoku[i+3*squareX][j+3*squareY] == value ){
                return false;
            }
        }
    }
    return true;
}

checkAll = function (x,y, value){
    var squareX = parseInt(x/3);
    var squareY = parseInt(y/3);
    return ( checkSquare(squareX, squareY,value)  && checkVertical(x, value) && checkHorizontal(y, value) );
}


buildSudokuArray = function(){ //this function is somewhat dependent on the site that you are using. however it builds the sudoku array and returns the list of empty cells. this version was built for show.websudoku.com
    for (var i=0; i < columns; i++) {
        sudoku[i] = []
        for (var j=0; j < rows; j++) {
            sudoku[i][j] = $('f'+i+j).value;
            if (sudoku[i][j] == ""){
                emptyCells.push([i,j]);
            }
        }
    }
    return emptyCells;
}

writeSudokuArray = function() {
    for (var i=0; i < columns; i++) {
        for (var j=0; j < rows; j++) {
            $('f'+i+j).value=sudoku[i][j];
        }
    }
}

start = function(emptyCellIndex) { //function to start the thing
    if (emptyCellIndex >= emptyCells.length){
        console.log('done');
        writeSudokuArray()
        return true;
    }
    var x = emptyCells[emptyCellIndex][0];
    var y = emptyCells[emptyCellIndex][1];
    var i = emptyCellIndex;

    for ( var num = 0; num < 10; num++ ){
        if ( checkAll(x,y,num) ) {
            sudoku[x][y] = num+'';
            
            future = start(i+1);
            if ( future ) {
                return future;
            } else {
                sudoku[x][y] = '';
            }
        }
    }
    return false;
}

letsDoThis = function(){
    buildSudokuArray();
    start(0);
}
