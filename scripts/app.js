!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.i=function(e){return e},t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=0)}([function(e,t,n){"use strict";function r(){var e=document.getElementById("generated-tag");document.getElementById("tag-container").getBoundingClientRect().top<0?e.classList.add("sticky"):e.classList.remove("sticky")}function o(){var e='url("'+d+'"), linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 30%)';document.querySelector("body").style.backgroundImage=e}function u(){return Array.prototype.slice.apply(document.querySelectorAll("input.primary")).filter(function(e){return e.checked}).map(function(e){return e.value}).join("")}function c(){return document.querySelector("input#index").value.replace(/^[0]+/g,"").toUpperCase()||"XXXX"}function a(){return Array.prototype.slice.apply(document.querySelectorAll("#region option")).filter(function(e){return e.selected})[0].value}function i(e){return Array.prototype.slice.apply(document.querySelectorAll("#"+e+" input")).filter(function(e){return e.checked}).map(function(e){return e.value})}function l(){var e=document.querySelector("body.system")?"System":document.querySelector("body.planet")?"Planet":"",t=document.querySelector("input#name").value||"Un-Named "+e,n="",r="";if("System"===e){var o=u(),l=c(),d=a();o&&(o="-"+o),l&&(l="-"+l),n="[HUB"+d+o+l+"] "+t}var s=[i("resources").join(""),i("attractions").join(","),i("ships").join(",")].filter(function(e){return""!==e});s.length&&(r=" ("+s.join(",")+")");var p=n+r;document.querySelector("#generated-tag").innerHTML=p}var d="assets/background-"+Math.floor(7*Math.random())+".jpg",s=1;window.addEventListener("load",function(){var e=document.getElementsByTagName("form")[0];e.addEventListener("change",l),e.addEventListener("keyup",l),l(),r();var t=function(){0===--s&&o()},n=document.createElement("img");n.src=d,n.addEventListener("load",t),window.addEventListener("scroll",r)})}]);