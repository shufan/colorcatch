/* Canvas Global Variables */
var canvas;
var ctx;
var intId;

/* Game Global Variables */
var g = {
    pauseCounter: 0,
    catching: false,
	bucket: {},
	hp: 100,
    squares: [],
    // possible colors for squares
    squareColors: ["blue", "red", "yellow"],
    keyCodes: {
        "17": "catch"
    },
    // possible spell combinations
    spells: {
        // freeze blocks for 5 seconds
        "blue,blue,blue": freeze = function() {
            g.pauseCounter = 250;
        }
    },
	score : 0,
	highScores: [{name: "N/A", score: 0}, {name: "N/A", score: 0}, 
					{name: "N/A", score: 0}, {name: "N/A", score: 0}, {name: "N/A", score: 0}],
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
		intId2 = setInterval(function() {g.score++}, 1000);
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
			showHighScores();
		}
    }

	function showHighScores() {
		drawBackground();
		var length = g.highScores.length;
		var playerName = prompt("Please enter your name.", "Anonymous");
		for (var i = 0; i < length; i++) {
			if (g.score >= g.highScores[i].score) {
				g.highScores.splice(i, 0, {name: playerName, score: g.score});
				// Shrink highScores length back to original in case it grew
				g.highScores.splice(length);
				break;
			}
		}
		ctx.fillStyle = "Yellow";
		ctx.font = 'bold 30px sans-serif underline';
		ctx.fillText("High Scores", 25, 30);
		ctx.fillStyle = "green";
		ctx.font = 'bold 20px sans-serif';
		var yCoord = 100;
		for (var j = 1; j <= g.highScores.length; j++) {
			ctx.fillText(j + ": " + g.highScores[j-1].name + " | " + g.score, 25, yCoord);
			yCoord += 70;
		}
	}

    /* Update game state at a set interval */
    function update() {
        updateAllSquares();
        attemptSquareGeneration();
		updateScore();
    }

	function updateScore() {
		ctx.fillStyle = "green";
		ctx.font = 'italic bold 30px sans-serif';
		ctx.fillText('[Score: '+g.score+']', 25, 50);
	}

    function drawBackground() {
        ctx.fillStyle = "black";
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
canvas = document.getElementById("myCanvas");
document.addEventListener('click', colorCatchGame.init());
//colorCatchGame.init();
