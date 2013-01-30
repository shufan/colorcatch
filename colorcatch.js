/* Canvas Global Variables */
var canvas;
var ctx;
var intId;

/* Game Global Variables */
var g = {
    freezeCounter: -1,
    lightningCounter: -1,
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
        },
        // shoots meteors across the screen
        "FF9999,FF9999,FF9999": meteorshower = function() {
            generateMeteorShower();
        },
        // shoots lightning bolts upwards from bucket
        "FFFF99,FFFF99,FFFF99": lightning = function() {
            g.lightningCounter = 250;
            generateLightning();
        }
    },
	score : 0,
	highScores: [{name: "N/A", score: 0}, {name: "N/A", score: 0}, 
					{name: "N/A", score: 0}, {name: "N/A", score: 0}, {name: "N/A", score: 0}],
    snowflakes: [],
	meteors: [],
    lightning: [],
    lightningId: undefined,
	firstplay: true,
};

var colorCatch = function() {

    /* Initialize the game */
    this.init = function() {
		canvas = document.getElementById("myCanvas");
    	ctx = canvas.getContext("2d");
        canvas.style.cursor = "none";
        canvas.setAttribute('tabindex','0');
        canvas.focus();
		if (g.firstplay) {
			var img = new Image();
			img.src = "colorcatchbg.jpg";
			img.onload = function() {
				ctx.drawImage(img, 0, 0);
			}
			g.firstplay = false;
		}
		else {
			document.removeEventListener("click", colorCatchGame.init);
			colorCatchGame.resetGlobals();
			colorCatchGame.begin();
		}
        g.bucket = new Bucket(400, 250);
    }
	
	this.resetGlobals = function() {
		g.freezeCounter = 0;
		g.catching = false;
		g.hp = 100;
		g.squares = [];
		// possible spell combinations
		g.spells = {
			// freeze blocks for 5 seconds
			"99CCFF,99CCFF,99CCFF": freeze = function() {
				g.freezeCounter = 250;
			}
		},
		g.score = 0;
		g.snowflakes = [];
	}
	
	this.begin = function() {
		document.removeEventListener("click", colorCatchGame.begin);
		// initial redraw
        redraw();
        intId = setInterval(redraw, 20);
		intId2 = setInterval(function() {g.score++}, 1000);
        addEventListeners();
	}

	function drawSpellIcon() {
		var img = new Image();
		var bucketColors = g.bucket.bucketColors.join();
		if (bucketColors === "FFFF99,FFFF99,FFFF99") {
			img.src = "img/lightning.png";
			img.onload = function() {
				ctx.drawImage(img, 732, 25);
			}
		}
		else if (bucketColors === "99CCFF,99CCFF,99CCFF") {
			img.src = "img/snowicon.png";
			img.onload = function() {
				ctx.drawImage(img, 705, 25);
			}
		}
		else if (bucketColors === "FF9999,FF9999,FF9999") {
			img.src = "img/meteor1.png";
			img.onload = function() {
				ctx.drawImage(img, 680, 20);
			}
		}
	}

    /* Redraw function on a set interval */
    function redraw() {
		if (g.hp > 0) {
			drawBackground();
			drawAllSnowFlakes();
			drawAllSquares();
        	drawAllMeteors();
       		drawAllLightning();
			drawSpellIcon();
			g.bucket.drawBucket();
			drawHPBar();
			update();
		}
		else {
			clearInterval(intId);
			clearInterval(intId2);
			calcHighScores();
			showHighScores();
		}
    }

    /* Update game state at a set interval */
    function update() {
        updateAllSquares();
		updateScore();
        updateAllSnowFlakes();
        updateAllMeteors();
        updateAllLightning();
        attemptSquareGeneration();
        if(g.freezeCounter >= 0) {
            attemptSnowFlakeGeneration();
            g.freezeCounter--;
        } 
        if(g.lightningCounter >= 0) {
            g.lightningCounter--;
        }
        if(g.lightningCounter == 0) {
            clearInterval(g.lightningId);
        }
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
canvas = document.getElementById("myCanvas");
colorCatchGame.init();
document.addEventListener('click', colorCatchGame.begin);
