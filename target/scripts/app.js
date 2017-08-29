"use strict";

var backgroundCount = 7;
var bgSrc = "assets/background-" + Math.floor(Math.random() * backgroundCount) + ".jpg";
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

	window.addEventListener("scroll", pinTag);
});

function pinTag() {
	var tag = document.getElementById("generated-tag");
	var box = document.getElementById("tag-container");
	var bounds = box.getBoundingClientRect();
	if (bounds.top < 0) tag.classList.add("sticky");else tag.classList.remove("sticky");
}

function setBackground() {
	var bgImage = "url(\"" + bgSrc + "\"), linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%)";
	document.querySelector("body").style.backgroundImage = bgImage;
}

function getPrimarySystemFeatures() {
	// extract primary features
	return Array.prototype.slice.apply(document.querySelectorAll("input.primary")).filter(function (el) {
		return el.checked;
	}).map(function (el) {
		return el.value;
	}).join("");
}

function getSolarIndex() {
	// trim leading zeroes (or placeholder)
	return document.querySelector("input#index").value.replace(/^[0]+/g, "").toUpperCase() || "XXXX";
}

function getRegion() {
	return Array.prototype.slice.apply(document.querySelectorAll("#region option")).filter(function (el) {
		return el.selected;
	})[0].value;
}

function getSectionCheckboxes(id) {
	return Array.prototype.slice.apply(document.querySelectorAll("#" + id + " input")).filter(function (el) {
		return el.checked;
	}).map(function (el) {
		return el.value;
	});
}

function getHostileSentinels() {
	var el = document.getElementById("hostile-sentinels");
	return el.checked ? el.value : "";
}

function updateTag() {
	var mode = document.querySelector("body.system") ? "System" : document.querySelector("body.planet") ? "Planet" : "";

	var name = document.querySelector("input#name").value || "Un-Named " + mode;
	var primary = "",
	    secondary = "";

	switch (mode) {
		case "System":
			var primaryFeatures = getPrimarySystemFeatures();
			var address = getSolarIndex();
			// extract region ID
			var region = getRegion();
			if (primaryFeatures) primaryFeatures = "-" + primaryFeatures;
			if (address) address = "-" + address;
			primary = "[HUB" + region + primaryFeatures + address + "] " + name;
			break;
		case "Planet":
			var sentinels = getHostileSentinels();
			primary = sentinels ? sentinels + " " + name : name;
			break;
	}

	// compose selected resources
	var secondaryFeatures = [getSectionCheckboxes("hazards").join(""), getSectionCheckboxes("resources").join(""), getSectionCheckboxes("attractions").join(","), getSectionCheckboxes("ships").join(","), getSectionCheckboxes("features").join(","), getSectionCheckboxes("zoology").join(",")].filter(function (a) {
		return a !== "";
	});

	// if there are any selected secondary feature tags append them
	if (secondaryFeatures.length) secondary = " (" + secondaryFeatures.join(",") + ")";

	var generatedTag = primary + secondary;

	// generate the new tag
	document.querySelector("#generated-tag").innerHTML = generatedTag;
}