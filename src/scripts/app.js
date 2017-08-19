"use strict";
/* global jQuery */
jQuery(function($) {
	$("form").on("change keyup", updateTag);
	updateTag();
});

function updateTag() {
		// extract region ID
		let region = 
			Array.prototype.slice.apply(document.querySelectorAll("#region option"))
			.filter((el) => el.selected)[0].value;

		// extract primary features
		let primaryFeatures = 
			Array.prototype.slice.apply(document.querySelectorAll("#primary-features input"))
			.filter((el) => el.checked)
			.map((el) => el.value)
			.join("");

		// trim leading zeroes (or placeholder)
		let address = document.querySelector("input#address").value.replace(/^[0]+/g, "").toUpperCase() || "XXXX";
		
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
			.join("");

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
