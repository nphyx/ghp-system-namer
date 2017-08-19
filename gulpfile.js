"use strict";
var gulp = require("gulp");
var babel = require("gulp-babel");
var pug = require("gulp-pug");
var sass = require("gulp-sass");
var webpack = require("webpack");
var del = require("del");
var path = require("path");
/*
var babelRegister = require("babel-core/register");
var exec = require("child_process").exec;
var mocha = require("gulp-mocha");
var istanbul = require("gulp-babel-istanbul");
*/

const webpackConfig = {
	entry:path.resolve(__dirname, "target/scripts/app.js"),
	//devtool:"source-map",
	output:{
		filename:"app.js",
		path:path.resolve(__dirname, "dist/scripts")
	},
	plugins:[
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin()
  ]
}

gulp.task("clean:scripts", function() {
	return del(["target/scripts/*", "dist/scripts/*"]);
});

gulp.task("clean:styles", function() {
	return del(["dist/styles/*"]);
});

gulp.task("clean:markup", function() {
	return del(["dist/*.html"]);
});

gulp.task("scripts", ["clean:scripts"], function() {
	return gulp.src(["src/scripts/*js"])
	.pipe(babel())
	.pipe(gulp.dest("target/scripts/"));
});

gulp.task("markup", ["clean:markup"], function() {
	return gulp.src(["src/markup/*pug"])
	.pipe(pug())
	.pipe(gulp.dest("dist"))
});

gulp.task("styles", ["clean:styles"], function() {
	return gulp.src(["src/styles/*scss"])
	.pipe(sass().on("error", sass.logError))
	.pipe(gulp.dest("dist/styles/"))
});

/* jshint unused:false */
gulp.task("webpack", ["scripts", "markup", "styles"], function(callback) {
	webpack(webpackConfig, function(err, stats) {
		if(err) console.log(err);
		callback();
	});
});

gulp.task("default", ["webpack", "styles", "markup"]);
