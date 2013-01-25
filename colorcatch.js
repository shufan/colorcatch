/* Canvas Global Variables */
var canvas;
var ctx;
var intId;

/* Game Global Variables */
var g = {
	bucket: {},
	hp: 100,
    squares: [],
	intId: 0,
};

var colorCatch = function() {

    /* Initialize the game */
    this.init = function() {
		canvas = document.getElementById("myCanvas");
    	ctx = canvas.getContext("2d");
        canvas.style.cursor = "none";
        g.bucket = new Bucket(400, 250);
        // initial redraw
        redraw();
        intId = setInterval(redraw, 20);
        addEventListeners();
    }

    /* Redraw function on a set interval */
    function redraw() {
		if (g.hp > 0) {
			drawBackground();
			g.bucket.drawBucket();
			drawAllSquares();
			drawHPBar();
			update();
		}
		else {
			clearInterval(intId);
			drawBackground();
		}
    }

    /* Update game state at a set interval */
    function update() {
        // code to update position of all boxes/generate
        // new boxes will be run here
        updateAllSquares();
        attemptSquareGeneration();
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
