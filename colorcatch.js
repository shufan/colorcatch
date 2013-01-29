/* Canvas Global Variables */
var canvas;
var ctx;
var intId;

/* Game Global Variables */
var g = {
    freezeCounter: 0,
    catching: false,
	bucket: {},
	hp: 100,
    squares: [],
    // possible colors for squares
    squareColors: ["99CCFF", "FF9999", "FFFF99"],
    squareStrokes: {
        "99CCFF": "0080FF",
        "FF9999": "F22A2A",
        "FFFF99": "FDFD46"
    },
    keyCodes: {
        "17": "catch"
    },
    // possible spell combinations
    spells: {
        // freeze blocks for 5 seconds
        "99CCFF,99CCFF,99CCFF": freeze = function() {
            g.freezeCounter = 250;
        }
    },
    snowflakes: []
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
        if(g.freezeCounter > 0) {
            // snow during freeze spell
            generateSnowFlake();
            drawAllSnowFlakes();
        } else if(g.freezeCounter == 1) {
            clearSnow();
        }
		g.bucket.drawBucket();
        drawAllSquares();
        drawHPBar();
		update();
    }

    /* Update game state at a set interval */
    function update() {
        updateAllSquares();
        updateAllSnowFlakes();
        attemptSnowFlakeGeneration();
        attemptSquareGeneration(); 
    }

    function drawBackground() {
        ctx.fillStyle = "202020";
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    /* Setup event listeners for the game */
    function addEventListeners() {
        canvas.addEventListener('mousemove', updateBucketPosition);
        canvas.addEventListener('click', castSpell);
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