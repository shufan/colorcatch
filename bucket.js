/* Functions for bucket positioning and drawing */
function getMousePosition(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function updateBucketPosition(evt) {
    var mousePosition = getMousePosition(evt);
    g.bucketX = mousePosition.x - 25;
    g.bucketY = mousePosition.y - 30;
}

function drawBucket(x, y) {
    ctx.fillStyle = "white";
    ctx.fillRect(x, y, 50, 60);
}
