var colorCatch = function() {
    
    var canvas;
    var ctx;

    this.init = function() {
		canvas = document.getElementById("myCanvas");
    	ctx = canvas.getContext("2d");
        drawBucket(200, 50);
	}

    function drawBucket(x,y) {
        ctx.fillRect(x, y, 50, 60);
    }
}

var colorCatchGame = new colorCatch();
colorCatchGame.init();
