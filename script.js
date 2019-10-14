const body = document.querySelector("body");
const css = document.querySelector("h3");
const copyButton = document.querySelector(".copy-button");

class GradientControls {
	constructor(identifier) {
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

		this.gradientAngle = "90";
		this.gradientOpacity = "ff";

		this.color1.addEventListener("input", this.setBackground);
		this.color2.addEventListener("input", this.setBackground);
		this.randomButton.addEventListener("click", this.setRandomBackgroundValues);
		this.randomButton.addEventListener("click", this.setBackground);

		this.angleSlider.oninput = function() {
			gradientAngle = this.value;
			setBackground();
		}
		this.opacitySlider.oninput = function() {
			gradientOpacity = Number(this.value).toString(16);
			setBackground();
		}

		let func = this.lockInteraction;
		this.color1LockButton.addEventListener("click", function() {
			func(this)
		});
		this.color2LockButton.addEventListener("click", function() {
			func(this)
		});
	}

	setRandomBackgroundValues = () => {
		this.gradientAngle = getRandomAngle();
		this.angleSlider.value = this.gradientAngle;

		if (this.color1LockButton.locked != true) {
			this.color1.value = getRandomColor();
		}
		if (this.color2LockButton.locked != true) {
			this.color2.value = getRandomColor();
		}	
	}

	setBackground = () => {
		let c1 = `${this.color1.value}${this.gradientOpacity}`;
		let c2 = `${this.color2.value}${this.gradientOpacity}`;
		body.setAttribute("style", `background: linear-gradient(${this.gradientAngle}deg, ${c1}, ${c2});`);
		this.color1Wrapper.setAttribute("style", "background-color: " + this. color1.value + ";");
		this.color2Wrapper.setAttribute("style", "background-color: " + this. color2.value + ";");
		this.color1LockButton.setAttribute("style", "background-color: " + this.color1.value + ";");
		this.color2LockButton.setAttribute("style", "background-color: " + this.color2.value + ";");
		css.textContent = body.style.background +";";
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
}


const getRandomColor = () => {
	let color = Math.floor(Math.random() * 16777216).toString(16);
	return "#000000".slice(0, -color.length) + color;
}

const getRandomAngle = () => {
	let angle = Math.floor(Math.random() * 360);
	return angle;
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




const leftControls = new GradientControls("left");
const centerControls = new GradientControls("center");
const rightControls = new GradientControls("right");
centerControls.setRandomBackgroundValues();
centerControls.setBackground();

copyButton.addEventListener("click", copyCSSTextToClipboard);


const addGradientButtonLeft = document.querySelector("#add-gradient-left");
const addGradientButtonRight = document.querySelector("#add-gradient-right");

addGradientButtonLeft.addEventListener("click", function() {
	leftControls.wrapper.setAttribute("style", "display: inline;");
	leftControls.wrapper.style.borderRight = "2px solid rgba(219, 219, 219, 0.5)";
	addGradientButtonLeft.setAttribute("style", "display: none");
})

addGradientButtonRight.addEventListener("click", function() {
	rightControls.wrapper.setAttribute("style", "display: inline;");
	rightControls.wrapper.style.borderLeft = "2px solid rgba(219, 219, 219, 0.5)";
	addGradientButtonRight.setAttribute("style", "display: none");
})