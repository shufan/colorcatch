/* Functions for bucket positioning and drawing */
function Bucket(bucketX, bucketY) {
	this.bucketX = bucketX;
	this.bucketY = bucketY;
	this.bucketColors = ["white", "white", "white"];
	
	this.drawBucket = function() {
		ctx.fillStyle = this.bucketColors[0];
		ctx.fillRect(this.bucketX, this.bucketY, 50, 60);
		/*ctx.fillStyle = "white";
		ctx.fillRect(x, y, 50, 60);
		ctx.fillStyle = "white";
		ctx.fillRect(x, y, 50, 60);*/
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