!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(){var e=document.getElementById("generated-tag");document.getElementById("tag-container").getBoundingClientRect().top<0?e.classList.add("sticky"):e.classList.remove("sticky")}function o(){var e='url("'+f+'"), linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%)';document.querySelector("body").style.backgroundImage=e}function u(){return Array.prototype.slice.apply(document.querySelectorAll("input.primary")).filter(function(e){return e.checked}).map(function(e){return e.value}).join("")}function a(){return document.querySelector("input#index").value.replace(/^[0]+/g,"").toUpperCase()||"XXXX"}function c(){return Array.prototype.slice.apply(document.querySelectorAll("#region option")).filter(function(e){return e.selected})[0].value}function i(e){return Array.prototype.slice.apply(document.querySelectorAll("#"+e+" input")).filter(function(e){return e.checked}).map(function(e){return e.value})}function l(){var e=document.getElementById("hostile-sentinels");return e.checked?e.value:""}function d(){var e=document.querySelector("input#name").value||"Un-Named "+p,t="",n="";switch(p){case"System":var r=u(),o=a(),d=c();r&&(r="-"+r),o&&(o="-"+o),t="[HUB"+d+r+o+"] "+e;break;case"Planet":var s=l();t=s?s+" "+e:e}var y=[i("hazards").join(""),i("resources").join(""),i("attractions").join(","),i("ships").join(","),i("features").join(","),i("zoology").join(",")].filter(function(e){return""!==e});y.length&&(n=" ("+y.join(",")+")");var f=t+n;document.querySelector("#generated-tag").innerHTML=f}var s=1,p=void 0,y=void 0,f=void 0;window.addEventListener("load",function(){var e=document.getElementsByTagName("form")[0];e.addEventListener("change",d),e.addEventListener("keyup",d),p=document.querySelector("body.system")?"System":document.querySelector("body.planet")?"Planet":"",y=10,f="assets/bg-"+p.toLowerCase()+"-"+Math.floor(Math.random()*y)+".jpg",d(),r();var t=function(){0===--s&&o()},n=document.createElement("img");n.src=f,n.addEventListener("load",t),window.addEventListener("scroll",r)})}]);