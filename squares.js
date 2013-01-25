/* Functions for generating and drawing squares here */
function Square(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.catchable = true;
    
    this.drawSquare = function() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x-10, this.y-10, 20, 20);
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
    var randomPos = Math.random()*780+10;
    var randomColor = Math.floor(Math.random()*(g.squareColors.length));
    // change 0 to -10 when ready
    g.squares.push(new Square(randomPos, 0, g.squareColors[randomColor]));
}

function attemptSquareGeneration() {
    // generate random number to determine how many squares
    var randomNum = Math.random()*100;
    var numGenerated = 0;
    if(randomNum > 95) {
        numGenerated = 1;
    }
    for(var i = 0; i < numGenerated; i++) {
        generateSquare();
    }
} 

function drawAllSquares() {
    g.squares.forEach(function(x){x.drawSquare()});
}

function updateAllSquares() {
    for (var i = 0; i < g.squares.length; i++) {
        g.squares[i].y += 5;
        // if square uncatchable, see if it is now catchable
        if(!g.squares[i].catchable) {
            if(g.squares[i].isolated() === true) {
                g.squares[i].catchable = true;
            }
        } else {
            // square is catchable, see if it is caught
            if(g.squares[i].caught()) {
                // update bucket colors
                g.bucket.captureColor(g.squares[i]);
                g.squares.splice(i,1);
                i--;
                continue;
            }
            // see if square hit side and should be marked uncatchable
            if(g.squares[i].hitSideOfBucket()) {
                g.squares[i].catchable = false;
            }
        }
        if(g.squares[i].y >= 495) {
            g.squares.splice(i,1);
            i--;
            g.hp--;
        }
    }
}