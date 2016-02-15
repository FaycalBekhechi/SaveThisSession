/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var config = require(__root +'gulp/GulpConfig');
var browserify = require('browserify');
var streamify = require('gulp-streamify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

function task(libs) {
	return function() {
		libs.forEach(function(lib) {
			browserify({
				debug: config.isDebug
			})
				.require(lib)
				.bundle()
				.pipe(source(lib +'.js'))
				.pipe(config.isProd ? streamify(uglify()) : gutil.noop())
				.pipe(gulp.dest('build/'+ config.environment +'/'+ config.target +'/scripts/lib'));
		});
	};
}

module.exports = task;
