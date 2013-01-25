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
        ctx.strokeStyle = "white";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x, this.y+60);
        ctx.lineTo(this.x+50, this.y+60);
        ctx.lineTo(this.x+50, this.y);
        ctx.stroke();

        // draw bucket colors
        for(var i = 0; i < this.bucketColors.length; i ++) {
            ctx.fillStyle = this.bucketColors[i];
            ctx.fillRect(this.x, this.y+60-20*(i+1), 50, 20);
        }
	}	
}
	
function updateBucketPosition(evt, bucket) {
	var mousePosition = getMousePosition(evt);
	g.bucket.x = mousePosition.x - 25;
	g.bucket.y = mousePosition.y - 30;
}

function getMousePosition(evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}