/* Functions for maintaining the HUD */
function drawHPBar() {
	var health = (g.hp/100)*800;
	ctx.fillStyle = "FF3333";
	ctx.fillRect(0, 480, health, 20);
    ctx.strokeStyle = "FF0000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0,480);
    ctx.lineTo(health,480);
    ctx.stroke();
}