/* Functions for bucket positioning and drawing */

function Bucket(x, y) {
	this.x = x;
	this.y = y;
	this.bucketColors = [];
	
    this.captureColor = function(square) {
        // add to top, if full, remove bottom
        if(this.bucketColors.length < 3) {
            this.bucketColors.push(square.color);
        } else {
            this.bucketColors.shift();
            this.bucketColors.push(square.color);
        }
    }

	this.drawBucket = function() {
        // draw bucket
        ctx.strokeStyle = "FFFFFF";
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(this.x,this.y);
        ctx.lineTo(this.x,this.y+60-5);
        ctx.quadraticCurveTo(this.x,this.y+60,this.x+5,this.y+60);
        ctx.lineTo(this.x+50-5,this.y+60);
        ctx.quadraticCurveTo(this.x+50,this.y+60,this.x+50,this.y+60-5);
        ctx.lineTo(this.x+50,this.y);
        ctx.stroke();
        // draw bucket colors
        for(var i = 0; i < this.bucketColors.length; i++) {
            ctx.fillStyle = this.bucketColors[i];
            if(i == 0) {
                ctx.fillRect(this.x+1.5, this.y+60-20*(i+1), 47, 18.5);
            } else {
                ctx.fillRect(this.x+1.5, this.y+60-20*(i+1), 47, 20);
            }
        }
	}
}
	
function updateBucketPosition(evt) {
	var mousePosition = getMousePosition(evt);
	g.bucket.x = mousePosition.x - 25;
	g.bucket.y = mousePosition.y - 30;
}

function castSpell(evt) {
    var mousePosition = getMousePosition(evt);
    var spell = g.spells[g.bucket.bucketColors.join()];
    if(spell !== undefined) {
        for(var i = 0; i < 3; i++) {
            g.bucket.bucketColors.pop();
        }
        spell();
    }
    
}