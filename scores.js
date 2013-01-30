/* Functinos related to scoring and high scores */

function updateScore() {
	ctx.fillStyle = "#FDFD46";
	ctx.font = "bold 30px Calibri";
	ctx.textAlign = "left";
	ctx.fillText("[Score: "+g.score+"]", 25, 50);
}

function calcHighScores() {
	var length = g.highScores.length;
	if (g.score >= g.highScores[length-1].score) {
		var playerName = prompt("New high score! Please enter your name.", "Anonymous");
		for (var i = 0; i < length; i++) {
			if (g.score >= g.highScores[i].score) {
				g.highScores.splice(i, 0, {name: playerName, score: g.score});
				// Shrink highScores length back to original in case it grew
				g.highScores.splice(length);
				break;
			}
		}
	}
}

function showHighScores() {
	var length = g.highScores.length;
	ctx.globalAlpha = 0.7;
	ctx.fillStyle = "white";
	ctx.fillRect(110, 80, 600, 350);
	ctx.fillStyle = "black";
	ctx.fillRect(130, 130, 560, 260);
	
	ctx.textAlign = "center";
	ctx.globalAlpha = 1.0;
	ctx.fillStyle = "#0080FF";
	ctx.font = 'bold 30px Calibri';
	ctx.fillText("High Scores",410, 115);
	ctx.fillStyle = "#FDFD46";
	ctx.font = 'bold 20px Calibri';
	var yCoord = 180;
	for (var j = 0; j < length; j++) {
		ctx.fillText(j+1 + ": " + g.highScores[j].name + " | " + g.highScores[j].score, 410, yCoord);
		yCoord += 45;
	}
	ctx.fillStyle = "#F22A2A";
	ctx.fillText("Click anywhere to play a new game", 410, 417);
	document.addEventListener("click", colorCatchGame.init);
}
