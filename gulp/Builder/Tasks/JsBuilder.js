/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var config = require(__root +'gulp/GulpConfig');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var rename = require('rename');
var envify = require('envify/custom');
var uglify = require('gulp-uglify');
var pathmodify = require('pathmodify');
var errorHandler = require(__root +'gulp/Builder/Helper/ErrorHandler');

function task(sources) {
	return function() {
		sources.forEach(function (entry) {
			browserify({
				entries: entry,
				debug: config.isDebug
			})
				.plugin(pathmodify, {
					mods: [
						pathmodify.mod.dir('app', __root +'src'),
						pathmodify.mod.dir('chrome', __root +'src/chrome'),
						pathmodify.mod.dir('shared', __root +'src/shared')
					]
				})
				.external(config.libs)
				.transform(babelify.configure(config.babelOptions))
				.transform(envify({
					_: 'purge',
					NODE_ENV: config.environment
				}))
				.bundle()
				.on('error', errorHandler)
				.pipe(source(rename(
					entry, {
						dirname: ''
					}
				)))
				.pipe(config.isProd ? streamify(uglify()) : gutil.noop())
				.pipe(gulp.dest('build/' + config.environment + '/' + config.target + '/scripts'));
		});
	};
}

module.exports = task;