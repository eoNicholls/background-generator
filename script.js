var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var randomButton = document.querySelector(".random-button");
var body = document.querySelector("body");
var gradientAngle = "90deg";
var angleButtons = document.querySelectorAll(".angle-button");

function setGradient() {
	body.style.background = 
		"linear-gradient("
		+ gradientAngle
		+ ", "
		+ color1.value 
		+ ", " 
		+ color2.value 
		+")";

	css.textContent = body.style.background +";";
}

function setRandomGradient() {
	color1.value = getRandomColor();
	color2.value = getRandomColor();
	let angle = getGradientAngleFromButtonClassList(
		angleButtons[Math.floor(Math.random() * angleButtons.length)]);
	setGradientAngle(angle);
	setGradient();
}

function getRandomColor() {
	let color = Math.floor(Math.random() * 16777216).toString(16);
	return "#000000".slice(0, -color.length) + color;
}

function setGradientAngle(angle) {
	gradientAngle = angle;
}

function getGradientAngleFromButtonClassList(button) {
	return button.classList[0];
}

function addEventListenerToGradientAngleButton(button) {
	button.addEventListener("click", function() {
		let angle = getGradientAngleFromButtonClassList(button);
		setGradientAngle(angle);
		setGradient();
	});
}

setRandomGradient();

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
randomButton.addEventListener("click", setRandomGradient);
angleButtons.forEach(addEventListenerToGradientAngleButton);