var colorCatch = function() {
    /* Canvas Global Variables */
    var canvas;
    var ctx;
    var intId;

    /* Game Global Variables */
    var g = {
        bucketX: 400,
        bucketY: 250
    };

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
    }

    /* Update game state at a set interval */
    function update() {
        // code to update position of all boxes/generate
        // new boxes will be run here
    }

    function drawBucket(x, y) {
        ctx.fillStyle = "white";
        ctx.fillRect(x, y, 50, 60);
    }

    function drawBackground() {
        ctx.fillStyle = "black";
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }

    function getMousePosition(evt) {
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function updateBucketPosition(evt) {
        var mousePosition = getMousePosition(evt);
        g.bucketX = mousePosition.x - 25;
        g.bucketY = mousePosition.y - 30;
    }

    /* Setup event listeners for the game */
    function addEventListeners() {
        canvas.addEventListener('mousemove', updateBucketPosition);
    }
}

var colorCatchGame = new colorCatch();
colorCatchGame.init();
