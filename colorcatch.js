var colorCatch = function() {
	var g = {};
	init = function() {
		g.canvas = document.getElementById("myCanvas");
    	g.ctx = g.canvas.getContext("2d");
	}

	g.drawSquare = function(x,y) {
		
	}

    g.drawBucket = function(x,y) {
        g.ctx.fillRect(x, y, 50, 60);
    }
}

var colorCatchGame = new colorCatch();
colorCatchGame.init();