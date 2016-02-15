/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var browserify = require('browserify');
var babelify = require('babelify');
var config = require('../../GulpConfig');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var rename = require('rename');
var envify = require('envify/custom');
var uglify = require('gulp-uglify');

function handleError(err) {
	gutil.log(err);
	this.emit('end');
}

function task(sources) {
	return function() {
		sources.forEach(function (entry) {
			browserify({
				entries: entry,
				debug: config.isDebug
			})
				.external(config.libs)
				.transform(babelify.configure(config.babelOptions))
				.transform(envify({
					_: 'purge',
					NODE_ENV: config.env
				}))
				.bundle()
				.on('error', handleError)
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