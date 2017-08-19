"use strict";
/* global jQuery */

jQuery(function ($) {
	$("form").on("change keyup", updateTag);
	updateTag();
});

function updateTag() {
	// extract region ID
	var region = Array.prototype.slice.apply(document.querySelectorAll("#region option")).filter(function (el) {
		return el.selected;
	})[0].value;

	// extract primary features
	var primaryFeatures = Array.prototype.slice.apply(document.querySelectorAll("#primary-features input")).filter(function (el) {
		return el.checked;
	}).map(function (el) {
		return el.value;
	}).join("");

	// trim leading zeroes (or placeholder)
	var address = document.querySelector("input#address").value.replace(/^[0]+/g, "").toUpperCase() || "XXXX";

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

	// compose selected ships
	var ships = Array.prototype.slice.apply(document.querySelectorAll("#ships input")).filter(function (el) {
		return el.checked;
	}).map(function (el) {
		return el.value;
	}).join(",");

	if (ships) secondaryFeatures.push(ships);

	// compose selected attractions
	var attractions = Array.prototype.slice.apply(document.querySelectorAll("#attractions input")).filter(function (el) {
		return el.checked;
	}).map(function (el) {
		return el.value;
	}).join("");

	if (attractions) secondaryFeatures.push(attractions);

	// cleanup
	if (primaryFeatures) primaryFeatures = "-" + primaryFeatures;
	if (address) address = "-" + address;

	var generatedTag = "[HUB" + region + primaryFeatures + address + "] " + name;

	// if there are any selected secondary feature tags append them
	if (secondaryFeatures.length) generatedTag += " (" + secondaryFeatures.join(",") + ")";

	// generate the new tag
	document.querySelector("#generated-tag").innerHTML = generatedTag;
}