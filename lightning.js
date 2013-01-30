function Lightning(x, y) {
	this.x = x;
	this.y = y;

	this.drawLightning = function() {
		var lightningImg = new Image();
		lightningImg.src = "img/lightning.png";
		ctx.save();
		ctx.scale(.5,.5);
		// draw from center of lightning bolt
		ctx.drawImage(lightningImg,-16,-32);
		ctx.restore();
	}
}

function generateLightningBolt() {
	// generate lightning from bucket
	var x = g.bucket.x+25;
	var y = g.bucket.y+30;
	g.lightning.push(new Lightning(x,y)); 
}

function generateLightning() {
	g.lightningId = setInterval(generateLightningBolt, 100);
}

function drawAllLightning() {
	g.lightning.forEach(function(x) {
		ctx.save();
		ctx.translate(x.x,x.y);
		x.drawLightning();
		ctx.restore();
	});
}

function updateAllLightning() {
	for(var i = 0; i < g.lightning.length; i++) {
		if(g.lightning[i].y <= 0) {
			g.lightning.splice(i,1);
			i--;
		} else {
			g.lightning[i].y -= 10;
		}
	}
}