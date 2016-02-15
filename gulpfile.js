/**
 * Created by Fayçal Bekhechi on 2016-02-12.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var BuilderProvider = require('./gulp/BuilderProvider');
var config = require('./gulp/GulpConfig');

gutil.log(config);

gulp.task('all:build', function() {
	var builder = BuilderProvider.getTargetBuilder(config.target);
	if (config.watch) {
		builder.runTask('all:watch');
	} else {
		builder.runTask('all:build');
	}
});

gulp.task('js:build', function () {
	var builder = BuilderProvider.getTargetBuilder(config.target);
	if (config.watch) {
		builder.runTask('js:watch');
	} else {
		builder.runTask('js:build');
	}
});

gulp.task('statics:build', function() {
	var builder = BuilderProvider.getTargetBuilder(config.target);
	if (config.watch) {
		builder.runTask('statics:watch');
	} else {
		builder.runTask('statics:build');
	}
});

gulp.task('libs:build', function() {
	var builder = BuilderProvider.getTargetBuilder('libs');
	builder.runTask('libs:build');
});
