function Snowflake(x, y, size, transparency) {
	this.x = x;
	this.y = y;
	this.size = size;
	this.transparency = transparency;

	this.drawSnowFlake = function() {
		ctx.fillStyle = "white"
		ctx.globalAlpha = transparency;
		ctx.beginPath();
		ctx.arc(0, 0, this.size, 0, 2*Math.PI, true);
		ctx.fill();	
	}
}

function generateSnowFlake() {
	var randomPosX = Math.random()*800;
	var randomSize = Math.random()*2+3;
	// taper snow transparency near end of spell
	if(g.freezeCounter < 100) {
		g.snowflakes.push(new Snowflake(randomPosX, 0, randomSize, 0));
	} else if(g.freezeCounter <= 150) {
		g.snowflakes.push(new Snowflake(randomPosX, 0, randomSize, g.freezeCounter/150));
	} else {
		g.snowflakes.push(new Snowflake(randomPosX, 0, randomSize, 1));
	}
}

function attemptSnowFlakeGeneration() {
    // generate random number to determine how many squares
    var randomNum = Math.random()*100;
    var numGenerated = 0;
    if(randomNum > 95) {
        numGenerated = 10;
    } else if(randomNum > 80) {
    	numGenerated = 7;
    } else if(randomNum > 50) {
    	numGenerated = 5;
    } else {
    	numGenerated = 3;
    }
    for(var i = 0; i < numGenerated; i++) {
        generateSnowFlake();
    }
}

function drawAllSnowFlakes() {
	g.snowflakes.forEach(function(x){
		ctx.save();
		ctx.translate(x.x, x.y);
		x.drawSnowFlake();
		ctx.restore();
	});
}

function updateAllSnowFlakes(x, y, size) {
	for(var i = 0; i < g.snowflakes.length; i++) {
		if(g.snowflakes[i].y >= 500) {
			g.snowflakes.splice(i,1);
            i--;
		} else {
			var randomOffset = Math.random()*30;
			g.snowflakes[i].x += 15-randomOffset;
			g.snowflakes[i].y += 5;	
		}
	}
}

function clearSnow() {
	g.snowflakes = null;
}