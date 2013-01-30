/* Functions for generating and drawing squares here */
function Square(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.catchable = true;
    
    this.drawSquare = function() {
        ctx.fillStyle = this.color;
        ctx.lineWidth = 1;
        ctx.strokeStyle = g.squareStrokes[this.color];
        ctx.fillRect(-10, -10, 20, 20);
        ctx.strokeRect(-10, -10, 20, 20);
    }

    this.hitMeteor = function() {
        for(var i = 0; i < g.meteors.length; i++) {
            if(distance(this.x, this.y, g.meteors[i].x, g.meteors[i].y) < 15+12) {
                return true;
            }
        }
        return false;
    }

    this.hitLightning = function() {
        var squareLeft = this.x-10, squareRight = this.x+10, squareBottom = this.y+10, squareTop = this.y-10;
        for(var i = 0; i < g.lightning.length; i++) {
            var lightningLeft = g.lightning[i].x-8, lightningRight = g.lightning[i].x+8, lightningBottom = g.lightning[i].y+16, lightningTop = g.lightning[i].y-16;
            // if not right or left of square, in line with square
            if(!(lightningRight < squareLeft || lightningLeft > squareRight)) {
                // if bottom of square is below top of lightning and top of square isn't then collision
                if((squareBottom > lightningTop) && (squareTop < lightningTop)) {
                    g.lightning.splice(i,1);
                    return true;
                }
            }
        }
        return false;
    }

    this.hitSideOfBucket = function() {
        var right = this.x+10, left = this.x-10, bottom = this.y+10, top = this.y-10;
        var bucketRight = g.bucket.x+50, bucketLeft = g.bucket.x, bucketBottom = g.bucket.y+60, bucketTop = g.bucket.y;
        // lower bucket rim for collision detection for leniency
        if(bottom >= bucketTop+20 && bottom <= bucketBottom) {
            // collide left?
            if(left < bucketLeft && right > bucketLeft) {
                return true;
            }
            // collide right?
            if(right > bucketRight && left < bucketRight) {
                return true;
            }
        }
        // collide bottom?
        if(left >= bucketLeft && right <= bucketRight) {
            if(top < bucketBottom && bottom > bucketBottom) {
                return true;
            }
        }
    }

    this.caught = function() {
        var right = this.x+10, left = this.x-10, bottom = this.y+10, top = this.y-10;
        var bucketRight = g.bucket.x+50, bucketLeft = g.bucket.x, bucketBottom = g.bucket.y+60, bucketTop = g.bucket.y;
        if(this.catchable) {
            if(bottom >= bucketTop && bottom <= bucketBottom) {
                // added catching leniency on right and left of bucket
                if(left >= bucketLeft-5 && right <= bucketRight+5) {
                    return true;
                }
            } 
        }
        return false;
    }

    this.isolated = function() {
        var right = this.x+10, left = this.x-10, bottom = this.y+10, top = this.y-10;
        var bucketRight = g.bucket.x + 50, bucketLeft = g.bucket.x, bucketBottom = g.bucket.y + 60, bucketTop = g.bucket.y;
        if(left > bucketRight || right < bucketLeft || top > bucketBottom || bottom < bucketTop) {
            return true;
        }
    }
}

function generateSquare() {
    // generate random horizontal position and color for square
    var randomPosX = Math.random()*780+10;
    var randomColor = Math.floor(Math.random()*(g.squareColors.length));
    // change 0 to -10 when ready
    g.squares.push(new Square(randomPosX, 0, g.squareColors[randomColor]));
}

function attemptSquareGeneration() {
    // generate random number to determine how many squares
    var randomNum = Math.random()*100;
    var numGenerated = 0;
    if(g.freezeCounter > 0) {
        return;
    }
    if(randomNum > 30) {
        numGenerated = 1;
    }
    for(var i = 0; i < numGenerated; i++) {
        generateSquare();
    }
} 

function drawAllSquares() {
    g.squares.forEach(function(x){
        ctx.save();
        ctx.translate(x.x, x.y);
        x.drawSquare();
        ctx.restore();
    });
}

function updateAllSquares() {
    for (var i = 0; i < g.squares.length; i++) {
        if(g.squares[i].y >= 495) {
            g.squares.splice(i,1);
            i--;
            g.hp--;
        } else {
            if(g.freezeCounter == -1) {
                g.squares[i].y += 5;
            }
            // if square hit by meteor, it is destroyed
            if(g.squares[i].hitMeteor()) {
                g.squares.splice(i,1);
                i--;
                continue;
            }
            // if square hit by lightning, it is destroyed
            if(g.squares[i].hitLightning()) {
                g.squares.splice(i,1);
                i--;
                continue;
            }
            // if square uncatchable, see if it is now catchable
            if(!g.squares[i].catchable) {
                if(g.squares[i].isolated()) {
                    g.squares[i].catchable = true;
                }
            } else {
                // square is catchable, see if it is caught
                if(g.squares[i].caught()) {
                    // update bucket colors
                    if(g.catching) {
                        g.bucket.captureColor(g.squares[i]);
                    }
                    g.squares.splice(i,1);
                    i--;
                    continue;
                }
                // see if square hit side and should be marked uncatchable
                if(g.squares[i].hitSideOfBucket()) {
                    g.squares[i].catchable = false;
                }
            }
        }
    }
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2-x1,2) + Math.pow(y2-y1,2));
}