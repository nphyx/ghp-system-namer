"use strict";
let backgroundCount = 7;
let bgSrc = "assets/background-"+(Math.floor(Math.random()*backgroundCount))+".jpg";
//let atlasSrc = "assets/atlas.png";
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
	document.getElementsByTagName("body")[0].style.backgroundImage = `
		url("${bgSrc}"),
		linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%)
	`;
}

function updateTag() {
		// extract region ID
		let region = 
			Array.prototype.slice.apply(document.querySelectorAll("#region option"))
			.filter((el) => el.selected)[0].value;

		// extract primary features
		let primaryFeatures = 
			Array.prototype.slice.apply(document.querySelectorAll("input.primary"))
			.filter((el) => el.checked)
			.map((el) => el.value)
			.join("");

		// trim leading zeroes (or placeholder)
		let address = document.querySelector("input#index").value.replace(/^[0]+/g, "").toUpperCase() || "XXXX";
		
		// name (or placeholder)
		let name = document.querySelector("input#name").value || "Un-Named System";

		let secondaryFeatures = [];

		// compose selected resources
		let resources = 
			Array.prototype.slice.apply(document.querySelectorAll("#resources input"))
			.filter((el) => el.checked)
			.map((el) => el.value)
			.join("");

		if(resources) secondaryFeatures.push(resources);

		// compose selected attractions
		let attractions = 
			Array.prototype.slice.apply(document.querySelectorAll("#attractions input"))
			.filter((el) => el.checked)
			.map((el) => el.value)
			.join(",");

		if(attractions) secondaryFeatures.push(attractions);

		// compose selected ships
		let ships = 
			Array.prototype.slice.apply(document.querySelectorAll("#ships input"))
			.filter((el) => el.checked)
			.map((el) => el.value)
			.join(",");

		if(ships) secondaryFeatures.push(ships);

		// cleanup
		if(primaryFeatures) primaryFeatures = "-"+primaryFeatures;
		if(address) address = "-"+address;

		let generatedTag = `[HUB${region}${primaryFeatures}${address}] ${name}`;

		// if there are any selected secondary feature tags append them
		if(secondaryFeatures.length) generatedTag += " ("+secondaryFeatures.join(",")+")";

		// generate the new tag
		document.querySelector("#generated-tag").innerHTML = generatedTag;
}
