function Meteor(x, y) {
	var maxAngle = Math.atan2(500-y,800);
	this.meteorType = Math.floor(Math.random()*3+1);
	this.x = x;
	this.y = y;
	this.angle = Math.random()*maxAngle;
	this.speed = Math.random()*15+10;

	this.drawMeteor = function() {
		var meteorImg = new Image();
		meteorImg.src = "img/meteor" + this.meteorType + ".png";
		ctx.save();
		// move context to center of round portion of meteor
		ctx.translate(31,4.5);
		// rotate meteor parallel to ground around that 
		ctx.rotate(-Math.PI/12);
		ctx.drawImage(meteorImg, -78, -27);
		ctx.restore();
	}
}

function generateMeteor() {
	// generate random vertical position for meteor above mid-canvas
	var randomPosY = Math.random()*250;
	g.meteors.push(new Meteor(0, randomPosY));
}

function generateMeteorShower() {
	// generate a shower of multiple meteors
	for(var i = 0; i < 10; i ++) {
		generateMeteor();
	}
}

function drawAllMeteors() {
	g.meteors.forEach(function(x) {
		ctx.save();
		ctx.translate(x.x, x.y);
		ctx.rotate(x.angle);
		x.drawMeteor();
		ctx.restore();
	});
}

function updateAllMeteors() {
	for(var i = 0; i < g.meteors.length; i++) {
		if(g.meteors[i].x >= 850 || g.meteors[i].y >= 500) {
			g.meteors.splice(i,1);
			i--;
		} else {
			g.meteors[i].x += g.meteors[i].speed;
			g.meteors[i].y += g.meteors[i].speed*Math.abs(Math.tan(g.meteors[i].angle));
		}
	}
}