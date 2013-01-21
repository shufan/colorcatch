var colorCatch = function() {
    /* Canvas Global Variables */
    var canvas;
    var ctx;

    /* Game Global Variables */
    var g = {
        bucketX: 400,
        bucketY: 250
    };

    /* Initialize the Game */
    this.init = function() {
		canvas = document.getElementById("myCanvas");
    	ctx = canvas.getContext("2d");
        canvas.style.cursor = "none";
        drawBackground();
        drawBucket(g.bucketX, g.bucketY);
        addEventListeners();
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
        g.bucketX = mousePosition.x;
        g.bucketY = mousePosition.y;
        drawBackground();
        drawBucket(g.bucketX - 25, g.bucketY - 30);
    }

    /* Setup Event Listeners for the Game */
    function addEventListeners() {
        canvas.addEventListener('mousemove', updateBucketPosition);
    }
}

var colorCatchGame = new colorCatch();
colorCatchGame.init();
