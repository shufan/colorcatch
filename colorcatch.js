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
    // levels of difficulty
    levels: {
        // easy: speed range (2-5), generation threshold (97)
        "easy": [2,97],
        // medium: speed range (3-6), generation threshold (95)
        "medium": [3,95],
        // hard: speed range (5-8), generation threshold (90)
        "hard": [5,90]  
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
    explosions: [],
    lightningId: undefined,
	firstplay: true
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
			img.src = "img/colorcatchbg.jpg";
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
		scoreId = setInterval(function() {g.score++}, 1000);
        addEventListeners();
	}

    /* Redraw function on a set interval */
    function redraw() {
		if (g.hp > 0) {
            drawBackground();
            drawAllExplosions();
            drawAllSnowFlakes();
            drawAllSquares();
            drawAllMeteors();
            drawAllLightning();
            g.bucket.drawBucket();
            drawScore();
            drawHPBar();
            update();
		} else {
			clearInterval(intId);
			clearInterval(scoreId);
            ctx.fillStyle = "202020"
            ctx.fillRect(0,480,10,20);			
            calcHighScores();
			showHighScores();
		}        
    }

    /* Update game state at a set interval */
    function update() {
        updateAllSquares();
        updateAllExplosions();
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
