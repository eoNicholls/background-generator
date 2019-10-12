const body = document.querySelector("body");
const css = document.querySelector("h3");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const color1Wrapper = document.querySelector("#color1-wrapper");
const color2Wrapper = document.querySelector("#color2-wrapper");
const randomButton = document.querySelector(".random-button");
const angleButtons = document.querySelectorAll(".angle-button");

let gradientAngle = "90deg";


const setGradient = () => {
	body.style.background = 
		"linear-gradient("
		+ gradientAngle
		+ ", "
		+ color1.value 
		+ ", " 
		+ color2.value 
		+")";
	
	setColorWrapperBackgrounds();
	css.textContent = body.style.background +";";
}

const setRandomGradient = () => {
	color1.value = getRandomColor();
	color2.value = getRandomColor();
}

const getRandomColor = () => {
	let color = Math.floor(Math.random() * 16777216).toString(16);
	return "#000000".slice(0, -color.length) + color;
}

const setGradientAngle = (angle) => {
	gradientAngle = angle;
}

const getGradientAngleFromButtonClassList = (button) => {
	return button.classList[0];
}

const addEventListenerToGradientAngleButton = (button) => {
	button.addEventListener("click", function() {
		let angle = getGradientAngleFromButtonClassList(button);
		setGradientAngle(angle);
		setGradient();
	});
}

const setRandomAngle = () => {
	let angle = Math.floor(Math.random() * 360);
	gradientAngle = angle + "deg";
}

const setRandomAngleAndGradient = () => {
	setRandomAngle();
	setRandomGradient();
	setGradient();
}

const setColorWrapperBackgrounds = () => {
	color1Wrapper.setAttribute("style", "background-color: " + color1.value + ";");
	color2Wrapper.setAttribute("style", "background-color: " + color2.value + ";");
}

setRandomAngleAndGradient();

color1.addEventListener("input", setGradient);
color2.addEventListener("input", setGradient);
angleButtons.forEach(addEventListenerToGradientAngleButton);
randomButton.addEventListener("click", setRandomAngleAndGradient);