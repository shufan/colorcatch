var colorCatch = function() {
	var g = {};
	g.init = function() {
		g.canvas = document.getElementById("myCanvas");
    	g.ctx = g.canvas.getContext("2d");
	}

    g.drawBucket = function(x,y) {
        g.ctx.fillRect(x, y, 50, 60);
    }

	g.init();
	g.drawBucket(200, 50);
}

colorCatch();