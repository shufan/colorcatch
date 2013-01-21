function ColorCatch() {

    this.drawBucket = function(x,y) {
        var canvas = document.getElementById("myCanvas");
        var ctx = canvas.getContext("2d");
        ctx.fillRect(x, y, 50, 60);
    }
}

var colorCatchGame = new ColorCatch();
colorCatchGame.drawBucket(200, 50);
