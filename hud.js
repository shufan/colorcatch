/* Functions for maintaining the HUD */
function drawHPBar() {
	var health = (g.hp/100)*800;
	ctx.fillStyle = "red";
	ctx.fillRect(0, 480, health, 20);
}