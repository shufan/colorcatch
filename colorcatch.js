/* Canvas Global Variables */
var canvas;
var ctx;
var intId;

/* Game Global Variables */
var g = {
    catching: false,
	bucket: {},
	hp: 100,
    squares: [],
    // possible colors for squres
    squareColors: ["blue", "red", "white", "green"],
    keyCodes: {
        "17": "catch"
    }
};

var colorCatch = function() {

    /* Initialize the game */
    this.init = function() {
		canvas = document.getElementById("myCanvas");
    	ctx = canvas.getContext("2d");
        canvas.style.cursor = "none";
        canvas.setAttribute('tabindex','0');
        canvas.focus();
        g.bucket = new Bucket(400, 250);
        // initial redraw
        redraw();
        intId = setInterval(redraw, 20);
        addEventListeners();
    }

    /* Redraw function on a set interval */
    function redraw() {
        drawBackground();
		g.bucket.drawBucket();
        drawAllSquares();
        drawHPBar();
		update();
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
        canvas.addEventListener('keydown', onKeyDown, false);
        canvas.addEventListener('keyup', onKeyUp, false);
    }

}

function onKeyDown(evt) {
    var button = g.keyCodes[evt.keyCode];
    if(button === "catch") {
        g.catching = true;
    }
}

function onKeyUp(evt) {
    var button = g.keyCodes[evt.keyCode];
    if(button === 'catch') {
        g.catching = false;
    }
}

function getMousePosition(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

var colorCatchGame = new colorCatch();
colorCatchGame.init();