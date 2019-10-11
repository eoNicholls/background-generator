var css = document.querySelector("h3");
var color1 = document.querySelector(".color1");
var color2 = document.querySelector(".color2");
var randomButton = document.querySelector(".random-button");
var body = document.querySelector("body");

function setGradient() {
	body.style.background = 
		"linear-gradient(to right, " 
		+ color1.value 
		+ ", " 
		+ color2.value 
		+")";

	css.textContent = body.style.background +";";
}

function setRandomGradient() {
	color1.value = getRandomColor();
	color2.value = getRandomColor();
	setGradient();
}

function getRandomColor() {
	let color = Math.floor(Math.random() * 16777216).toString(16);
	return "#000000".slice(0, -color.length) + color;
}

setRandomGradient();

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
randomButton.addEventListener("click", setRandomGradient);