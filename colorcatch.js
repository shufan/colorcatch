/* Canvas Global Variables */
var canvas;
var ctx;
var intId;

/* Game Global Variables */
var g = {
    bucketX: 400,
    bucketY: 250,
    squares: []
};

var colorCatch = function() {

    /* Initialize the game */
    this.init = function() {
		canvas = document.getElementById("myCanvas");
    	ctx = canvas.getContext("2d");
        canvas.style.cursor = "none";
        // initial redraw
        redraw();
        intId = setInterval(redraw, 20);
        addEventListeners();
		for (var i = 0; i < 10; i++) {
			generateSquare();
		}
		console.log(g.squares[0]);
    }

    /* Redraw function on a set interval */
    function redraw() {
        drawBackground();
        drawBucket(g.bucketX, g.bucketY);
        drawAllSquares();
		update();
    }

    /* Update game state at a set interval */
    function update() {
        // code to update position of all boxes/generate
        // new boxes will be run here
		for (var i = 0; i < g.squares.length; i++) {
			g.squares[i].y += 5;
			console.log(g.squares[i].x);
		}
    }

    function drawBackground() {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    /* Setup event listeners for the game */
    function addEventListeners() {
        canvas.addEventListener('mousemove', updateBucketPosition);
    }
}

var colorCatchGame = new colorCatch();
colorCatchGame.init();