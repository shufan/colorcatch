function Explosion(x, y, color) {
	this.x = x;
	this.y = y;
	this.color = color;
	this.size = 12;
	this.transparency = 1;

	this.drawExplosion = function() {
		for(var i = 0; i < 360; i+=30) {
            ctx.save();
            ctx.rotate(i*Math.PI/180);
            ctx.globalAlpha = this.transparency;
            ctx.beginPath();
            ctx.moveTo(this.size,0);
            ctx.lineTo(this.size + 5,0);
            ctx.strokeStyle = this.color;
            ctx.lineWidth = 5;
            ctx.stroke();
			ctx.globalAlpha = 1;
            ctx.restore();
        }
	}
}

function drawAllExplosions() {
	g.explosions.forEach(function(x) {
		ctx.save();
		ctx.translate(x.x,x.y);
		x.drawExplosion();
		ctx.restore();
	});
}

function updateAllExplosions() {
	for(var i = 0; i < g.explosions.length; i++) {
		if(g.explosions[i].size > 50) {
			g.explosions.splice(i,1);
			i--;
		} else {
			g.explosions[i].size += 1;
			g.explosions[i].transparency -= .02;
		}
	}
}