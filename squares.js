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

function drawAllSquares() {
    g.squares.forEach(function(x){drawSquare(x)});
}
