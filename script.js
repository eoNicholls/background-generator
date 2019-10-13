const body = document.querySelector("body");
const color1 = document.querySelector(".color1");
const color2 = document.querySelector(".color2");
const color1Wrapper = document.querySelector("#color1-wrapper");
const color2Wrapper = document.querySelector("#color2-wrapper");
const randomButton = document.querySelector(".random-button");
const angleButtons = document.querySelectorAll(".angle-button");
const css = document.querySelector("h3");
const copyButton = document.querySelector(".copy-button");
const angleSlider = document.querySelector("#angle-slider");
const opacitySlider = document.querySelector("#opacity-slider");

let gradientAngle = "90deg";
let gradientOpacity = "ff";


const getRandomColor = () => {
	let color = Math.floor(Math.random() * 16777216).toString(16);
	return "#000000".slice(0, -color.length) + color;
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
	let c1 = `${color1.value}${gradientOpacity}`;
	let c2 = `${color2.value}${gradientOpacity}`;
	body.setAttribute("style", `background: linear-gradient(${gradientAngle}, ${c1}, ${c2});`)
	color1Wrapper.setAttribute("style", "background-color: " + color1.value + ";");
	color2Wrapper.setAttribute("style", "background-color: " + color2.value + ";");
	css.textContent = body.style.background +";";
}


setRandomBackgroundValues();
setBackground();


color1.addEventListener("input", setBackground);
color2.addEventListener("input", setBackground);
randomButton.addEventListener("click", setRandomBackgroundValues);
randomButton.addEventListener("click", setBackground);
copyButton.addEventListener("click", copyCSSTextToClipboard);

angleSlider.oninput = function() {
	gradientAngle = `${this.value}deg`;
	setBackground();
}

opacitySlider.oninput = function() {
	gradientOpacity = Number(this.value).toString(16);
	console.log(this.value, gradientOpacity);
	setBackground();
}