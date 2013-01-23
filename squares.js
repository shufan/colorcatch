/* Functions for generating and drawing squares here */
function Square(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
}

function drawSquare(square) {
    ctx.fillStyle = square.color;
    ctx.fillRect(square.x-10, square.y-10, 20, 20);
}

function generateSquare() {
    // generate random horizontal position for square
    var randomPos = Math.random()*780+10;
    // change 0 to -10 when ready
    g.squares.push(new Square(randomPos, 0, "yellow"));
}

function attemptSquareGeneration() {
    // generate random number to determine how many squares
    var randomNum = Math.random()*100;
    var numGenerated = 0;
    if(randomNum > 97) {
        numGenerated = 5;
    } else if(randomNum > 95) {
        numGenerated = 4;
    } else if(randomNum > 90) {
        numGenerated = 3;
    } else if(randomNum > 75) {
        numGenerated = 2;
    } else if(randomNum > 50) {
        numGenerated = 1;
    }
    for(var i = 0; i < numGenerated; i++) {
        generateSquare();
    }
} 

function drawAllSquares() {
    g.squares.forEach(function(x){drawSquare(x)});
}

function updateAllSquares() {
    for (var i = 0; i < g.squares.length; i++) {
        g.squares[i].y += 5;
        if(g.squares[i].y >= 495) {
            g.squares.splice(i,1);
            i--;
            g.hp--;
        }
    }
}