"use strict";

var bgSrc = "assets/background-" + (~~(Math.random() * 4) + 1) + ".jpg";
//let atlasSrc = "assets/atlas.png";
var loaded = 1;
window.addEventListener("load", function () {
	var form = document.getElementsByTagName("form")[0];
	form.addEventListener("change", updateTag);
	form.addEventListener("keyup", updateTag);
	updateTag();
	pinTag();

	var imgLoadCb = function imgLoadCb() {
		loaded--;
		if (loaded === 0) setBackground();
	};
	var bgImg = document.createElement("img");
	bgImg.src = bgSrc;
	bgImg.addEventListener("load", imgLoadCb);
	/*
 let atlasImg = document.createElement("img");
 atlasImg.src = atlasSrc;
 atlasImg.addEventListener("load", imgLoadCb);
 */

	window.addEventListener("scroll", pinTag);
});

function pinTag() {
	var tag = document.getElementById("generated-tag");
	var box = document.getElementById("tag-container");
	var bounds = box.getBoundingClientRect();
	if (bounds.top < 0) tag.classList.add("sticky");else tag.classList.remove("sticky");
}

function setBackground() {
	document.getElementsByTagName("body")[0].style.backgroundImage = "\n\t\turl(\"" + bgSrc + "\"),\n\t\tlinear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%)\n\t";
}

function updateTag() {
	// extract region ID
	var region = Array.prototype.slice.apply(document.querySelectorAll("#region option")).filter(function (el) {
		return el.selected;
	})[0].value;

	// extract primary features
	var primaryFeatures = Array.prototype.slice.apply(document.querySelectorAll("input.primary")).filter(function (el) {
		return el.checked;
	}).map(function (el) {
		return el.value;
	}).join("");

	// trim leading zeroes (or placeholder)
	var address = document.querySelector("input#index").value.replace(/^[0]+/g, "").toUpperCase() || "XXXX";

	// name (or placeholder)
	var name = document.querySelector("input#name").value || "Un-Named System";

	var secondaryFeatures = [];

	// compose selected resources
	var resources = Array.prototype.slice.apply(document.querySelectorAll("#resources input")).filter(function (el) {
		return el.checked;
	}).map(function (el) {
		return el.value;
	}).join("");

	if (resources) secondaryFeatures.push(resources);

	// compose selected attractions
	var attractions = Array.prototype.slice.apply(document.querySelectorAll("#attractions input")).filter(function (el) {
		return el.checked;
	}).map(function (el) {
		return el.value;
	}).join("");

	if (attractions) secondaryFeatures.push(attractions);

	// compose selected ships
	var ships = Array.prototype.slice.apply(document.querySelectorAll("#ships input")).filter(function (el) {
		return el.checked;
	}).map(function (el) {
		return el.value;
	}).join(",");

	if (ships) secondaryFeatures.push(ships);

	// cleanup
	if (primaryFeatures) primaryFeatures = "-" + primaryFeatures;
	if (address) address = "-" + address;

	var generatedTag = "[HUB" + region + primaryFeatures + address + "] " + name;

	// if there are any selected secondary feature tags append them
	if (secondaryFeatures.length) generatedTag += " (" + secondaryFeatures.join(",") + ")";

	// generate the new tag
	document.querySelector("#generated-tag").innerHTML = generatedTag;
}