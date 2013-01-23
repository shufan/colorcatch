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
    }

    /* Redraw function on a set interval */
    function redraw() {
        drawBackground();
        drawBucket(g.bucketX, g.bucketY);
        drawAllSquares();
    }

    /* Update game state at a set interval */
    function update() {
        // code to update position of all boxes/generate
        // new boxes will be run here
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