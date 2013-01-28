/* Functions for bucket positioning and drawing */

function Bucket(x, y) {
	this.x = x;
	this.y = y;
	this.bucketColors = ["white", "white", "white"];
	
	this.drawBucket = function() {
		ctx.fillStyle = this.bucketColors[2];
		ctx.fillRect(this.x, this.y, 50, 20);
		ctx.fillStyle = this.bucketColors[1];
		ctx.fillRect(this.x, this.y+20, 50, 20);
		ctx.fillStyle = this.bucketColors[0];
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