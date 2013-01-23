var colorCatch = function() {
    var canvas;
    var ctx;

	// Constructor for a falling square
	var square = function(x, y, width) {
		this.x = x;
		this.y = y;
		this.width = width;
	}

    this.init = function() {
		canvas = document.getElementById("myCanvas");
    	ctx = canvas.getContext("2d");
        drawBucket(200, 50);
		dropSquare();
	}
	
	function drawSquare() {
		var sq = new square(10, 10, 10);
		var rect = ctx.fillRect(sq.x, sq.y, sq.width, sq.width);
	}
	
	function dropSquare() {
		drawSquare();
		ctx.save();

		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.translate(200, 50);
		drawSquare();
		//setTimeout(dropSquare, 100);
	}

    function drawBucket(x,y) {
        ctx.fillRect(x, y, 50, 60);
    }
}

var colorCatchGame = new colorCatch();
colorCatchGame.init();