/* Functions for bucket positioning and drawing */
function Bucket(bucketX, bucketY) {
	this.bucketX = bucketX;
	this.bucketY = bucketY;
	this.bucketColors = ["white", "yellow", "green"];
	
	this.drawBucket = function() {
		ctx.fillStyle = this.bucketColors[2];
		ctx.fillRect(this.bucketX, this.bucketY, 50, 20);
		ctx.fillStyle = this.bucketColors[1];
		ctx.fillRect(this.bucketX, this.bucketY+20, 50, 20);
		ctx.fillStyle = this.bucketColors[0];
		ctx.fillRect(this.bucketX, this.bucketY+40, 50, 20);
	}
	
}
	
function updateBucketPosition(evt, bucket) {
	var mousePosition = getMousePosition(evt);
	g.bucket.bucketX = mousePosition.x - 25;
	g.bucket.bucketY = mousePosition.y - 30;
}

function getMousePosition(evt) {
	var rect = canvas.getBoundingClientRect();
	return {
		x: evt.clientX - rect.left,
		y: evt.clientY - rect.top
	};
}