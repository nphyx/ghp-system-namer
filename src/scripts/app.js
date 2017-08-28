"use strict";
let backgroundCount = 7;
let bgSrc = "assets/background-"+(Math.floor(Math.random()*backgroundCount))+".jpg";
let loaded = 1;
window.addEventListener("load", function() {
	let form = document.getElementsByTagName("form")[0];
	form.addEventListener("change", updateTag);
	form.addEventListener("keyup", updateTag);
	updateTag();
	pinTag();

	let imgLoadCb = () => {
		loaded--;
		if(loaded === 0) setBackground();
	}
	let bgImg = document.createElement("img");
	bgImg.src = bgSrc;
	bgImg.addEventListener("load", imgLoadCb);

	window.addEventListener("scroll", pinTag);
});

function pinTag() {
	let tag = document.getElementById("generated-tag");
	let box = document.getElementById("tag-container");
	let bounds = box.getBoundingClientRect();
	if(bounds.top < 0) tag.classList.add("sticky");
	else tag.classList.remove("sticky");
}

function setBackground() {
	let bgImage = "url(\""+bgSrc+"\"), linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%)";
	document.querySelector("body").style.backgroundImage = bgImage;
}

function getPrimarySystemFeatures() {
	// extract primary features
	return (
		Array.prototype.slice.apply(document.querySelectorAll("input.primary"))
		.filter((el) => el.checked)
		.map((el) => el.value)
		.join(""));
}

function getSolarIndex() {
	// trim leading zeroes (or placeholder)
	return document.querySelector("input#index").value.replace(/^[0]+/g, "").toUpperCase() || "XXXX";
}

function getRegion() {
	return	(
		Array.prototype.slice.apply(document.querySelectorAll("#region option"))
		.filter((el) => el.selected)[0].value);
}

function getSectionCheckboxes(id) {
	return (
		Array.prototype.slice.apply(document.querySelectorAll("#"+id+" input"))
		.filter((el) => el.checked)
		.map((el) => el.value));
}

function updateTag() {
	let mode = document.querySelector("body.system")?"System":
		document.querySelector("body.planet")?"Planet":"";

	let name = document.querySelector("input#name").value || "Un-Named "+ mode;
	let primary = "", secondary = "";

	if(mode === "System") {
		let primaryFeatures = getPrimarySystemFeatures();
		let address = getSolarIndex();
		// extract region ID
		let region = getRegion();
		if(primaryFeatures) primaryFeatures = "-"+primaryFeatures;
		if(address) address = "-"+address;
		primary = `[HUB${region}${primaryFeatures}${address}] ${name}`;
	}

	// compose selected resources
	let secondaryFeatures = [
		getSectionCheckboxes("resources").join(""),
		getSectionCheckboxes("attractions").join(","),
		getSectionCheckboxes("ships").join(","),
	].filter((a) => a !== "");

	// if there are any selected secondary feature tags append them
	if(secondaryFeatures.length) secondary = " ("+secondaryFeatures.join(",")+")";

	let generatedTag = primary+secondary;

	// generate the new tag
	document.querySelector("#generated-tag").innerHTML = generatedTag;
}
