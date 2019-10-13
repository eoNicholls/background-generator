const body = document.querySelector("body");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const color1Wrapper = document.querySelector("#color1-wrapper");
const color2Wrapper = document.querySelector("#color2-wrapper");
const randomButton = document.querySelector(".random-button");
const angleButtons = document.querySelectorAll(".angle-button");
const css = document.querySelector("h3");
const copyButton = document.querySelector(".copy-button");

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


const selectText = () => {
    let node = css;

    if (document.body.createTextRange) {
        const range = document.body.createTextRange();
        range.moveToElementText(node);
        range.select();
    } else if (window.getSelection) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(node);
        selection.removeAllRanges();
        selection.addRange(range);
    } else {
        console.warn("Could not select text in node: Unsupported browser.");
    }
}

const clearSelection = () => {
	if (window.getSelection) {
		window.getSelection().removeAllRanges();
	} else if (document.selection) {
		document.selection.empty();
	}
}

const copyCSSTextToClipboard = () => {
	selectText();
	document.execCommand("copy");
	clearSelection();
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
copyButton.addEventListener("click", copyCSSTextToClipboard);

