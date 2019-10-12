const body = document.querySelector("body");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const color1Wrapper = document.querySelector("#color1-wrapper");
const color2Wrapper = document.querySelector("#color2-wrapper");
const randomButton = document.querySelector(".random-button");
const angleButtons = document.querySelectorAll(".angle-button");
const css = document.querySelector("h3");

let gradientAngle = "90deg";


const getRandomColor = () => {
	let color = Math.floor(Math.random() * 16777216).toString(16);
	return "#000000".slice(0, -color.length) + color;
}

const getGradientAngleFromButtonClassList = (button) => {
	return button.classList[0];
}

const getRandomAngle = () => {
	let angle = Math.floor(Math.random() * 360);
	return angle + "deg";
}


const setRandomBackgroundValues = () => {
	gradientAngle = getRandomAngle();
	color1.value = getRandomColor();
	color2.value = getRandomColor();
}

const setBackground = () => {
	body.style.background = 
		"linear-gradient("
		+ gradientAngle
		+ ", "
		+ color1.value 
		+ ", " 
		+ color2.value 
		+")";
	
	color1Wrapper.setAttribute("style", "background-color: " + color1.value + ";");
	color2Wrapper.setAttribute("style", "background-color: " + color2.value + ";");
	css.textContent = body.style.background +";";
}


setRandomBackgroundValues();
setBackground();


const addEventListenerToAngleButton = (button) => {
	button.addEventListener("click", function() {
		let angle = getGradientAngleFromButtonClassList(button);
		gradientAngle = angle;
		setBackground();
	});
}

color1.addEventListener("input", setBackground);
color2.addEventListener("input", setBackground);
angleButtons.forEach(addEventListenerToAngleButton);
randomButton.addEventListener("click", setRandomBackgroundValues);
randomButton.addEventListener("click", setBackground);