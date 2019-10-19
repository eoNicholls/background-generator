const body = document.querySelector("body");
const css = document.querySelector("h3");
const copyButton = document.querySelector(".copy-button");

const cssTextCenter = document.querySelector(".css-text-center");
const cssTextLeft = document.querySelector(".css-text-left");
const cssTextRight = document.querySelector(".css-text-right");
const addGradientButtonLeft = document.querySelector("#add-gradient-left");
const addGradientButtonRight = document.querySelector("#add-gradient-right");



// this class creates objects which have all of the controls necessary for one of the background gradients
// the final background is created by layering all 3 of the backgrounds governed by GradientControls objects
// the left and right controls start off hidden, they are displayed when the user clicks the + button
class GradientControls {
	constructor(identifier, hidden) {
		this.identifier = identifier;
		this.wrapper = document.querySelector(`#gradient-controls-${identifier}`);
		this.color1 = document.querySelector(`#gradient-controls-${identifier} .color1`);
		this.color2 = document.querySelector(`#gradient-controls-${identifier} .color2`);
		this.color1Wrapper = document.querySelector(`#color1-wrapper-${identifier}`);
		this.color2Wrapper = document.querySelector(`#color2-wrapper-${identifier}`);
		this.color1LockButton = document.querySelector(`#color1-lock-button-${identifier}`);
		this.color2LockButton = document.querySelector(`#color2-lock-button-${identifier}`);
		this.randomButton = document.querySelector(`#gradient-controls-${identifier} .random-button`);
		this.angleSlider = document.querySelector(`#angle-slider-${identifier}`);
		this.opacitySlider = document.querySelector(`#opacity-slider-${identifier}`);
		this.angleSliderLabel = document.querySelector(`#angle-slider-label-${identifier} span`);
		this.opacitySliderLabel = document.querySelector(`#opacity-slider-label-${identifier} span`);

		this.hidden = hidden;

		this.gradientAngle = "90";
		this.gradientOpacity = "ff";

		this.color1.addEventListener("input", this.setGradient);
		this.color2.addEventListener("input", this.setGradient);
		this.randomButton.addEventListener("click", this.setRandomBackgroundValues);
		this.randomButton.addEventListener("click", this.setGradient);

		this.angleSlider.oninput = this.angleSliderInteraction;
		this.opacitySlider.oninput = this.opacitySliderInteraction;

		let lockFunc = this.lockInteraction;
		this.color1LockButton.addEventListener("click", function() {
			lockFunc(this)
		});
		this.color2LockButton.addEventListener("click", function() {
			lockFunc(this)
		});

		this.setRandomBackgroundValues();
		this.setGradient();
	}

	angleSliderInteraction = () => {
		this.gradientAngle = this.angleSlider.value;
		this.setGradient();
	}

	opacitySliderInteraction = () => {
		this.gradientOpacity = Number(this.opacitySlider.value).toString(16);
		this.setGradient();
	}

	setRandomBackgroundValues = () => {
		this.gradientAngle = this.getRandomAngle();
		this.angleSlider.value = this.gradientAngle;

		if (this.color1LockButton.locked != true) {
			this.color1.value = this.getRandomColor();
		}
		if (this.color2LockButton.locked != true) {
			this.color2.value = this.getRandomColor();
		}	
	}

	setGradient = () => {
		let c1 = `${this.color1.value}${this.gradientOpacity}`;
		let c2 = `${this.color2.value}${this.gradientOpacity}`;
		this.gradientString = `linear-gradient(${this.gradientAngle}deg, ${c1}, ${c2})`;

		this.color1Wrapper.style.backgroundColor = `${this.color1.value}`;
		this.color2Wrapper.style.backgroundColor = `${this.color2.value}`;
		this.color1LockButton.style.backgroundColor = `${this.color1.value}`;
		this.color2LockButton.style.backgroundColor = `${this.color2.value}`;
		
		this.angleSliderLabel.innerHTML = this.gradientAngle;
		this.opacitySliderLabel.innerHTML = Math.round((parseInt(this.gradientOpacity, 16) / 255) * 100);
	}

	lockInteraction = (lockButton) => {
		if (lockButton.locked === true) {
			lockButton.locked = false;
			lockButton.classList.remove("fa-lock");
			lockButton.classList.add("fa-lock-open");
		} else {
			lockButton.locked = true;
			lockButton.classList.remove("fa-lock-open");
			lockButton.classList.add("fa-lock");
		}
	}

	getRandomColor = () => {
		let color = Math.floor(Math.random() * 16777216).toString(16);
		return "#000000".slice(0, -color.length) + color;
	}

	getRandomAngle = () => {
		let angle = Math.floor(Math.random() * 360);
		return angle;
	}
}


// create the objects
const leftControls = new GradientControls("left", true);
const centerControls = new GradientControls("center", false);
const rightControls = new GradientControls("right", true);


// event listeners to the + buttons
addGradientButtonLeft.addEventListener("click", function() {
	leftControls.wrapper.setAttribute("style", "display: inline;");
	leftControls.wrapper.style.borderRight = "2px solid rgba(219, 219, 219, 0.5)";
	leftControls.hidden = false;
	addGradientButtonLeft.setAttribute("style", "display: none");
})

addGradientButtonRight.addEventListener("click", function() {
	rightControls.wrapper.setAttribute("style", "display: inline;");
	rightControls.wrapper.style.borderLeft = "2px solid rgba(219, 219, 219, 0.5)";
	rightControls.hidden = false;
	addGradientButtonRight.setAttribute("style", "display: none");
})


// this function is used by setBackground() to determine if each gradient should be displayed or not
// ie only display the center gradient and the ones which have been added by the user
const visibilityCheck = (controls) => {
	if (controls.hidden === true) {
		return "";
	} else {
		return controls.gradientString + ', ';
	}
}



// these next three functions are used to select, add to clipboard and subsequently deselect the CSS text which corresponds to the current visible background
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

copyButton.addEventListener("click", copyCSSTextToClipboard);



// this is the main function which updates a few elements on the page at once
const setBackground = () => {
	let left = visibilityCheck(leftControls);
	let center = visibilityCheck(centerControls);
	let right = visibilityCheck(rightControls);

	// these are in the 'wrong' order for layering purposes
	// it makes more sense the way css layers them to have the order like this
	let backgroundString = `${right}${center}${left}`;

	// remove trailing ', '
	backgroundString = backgroundString.slice(0, -2);
	body.style.background = backgroundString;
	
	// formatting for the html to ensure css text display box is displayed correctly
	if (right.length > 0) {right = right + "<br>";}
	if (left.length > 0) {center = center + "<br>";}
	cssString = `background: ${right}${center}${left}`.slice(0, -2) + ";";
	css.innerHTML = cssString;
}



// these two event listeners update the background as the sliders change,  
// as opposed to changing it after the user releases the slider handle
// it's a bit hacky but it works
window.addEventListener("click", setBackground);
window.addEventListener("mousemove", setBackground);



// initialises the page background
setBackground();