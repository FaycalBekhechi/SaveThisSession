/**
 * Created by Fayçal Bekhechi on 2016-02-12.
 */
global.__root = __dirname + '/';

var gulp = require('gulp');
var gutil = require('gulp-util');
var BuilderProvider = require(__root  +'gulp/BuilderProvider');
var config = require(__root  +'gulp/GulpConfig');

gutil.log(config);

gulp.task('all:build', function() {
	var builder = BuilderProvider.getTargetBuilder(config.target);
	if (config.watch) {
		builder.runTask('all:build-than-watch');
	} else {
		builder.runTask('all:build');
	}
});

gulp.task('js:build', function () {
	var builder = BuilderProvider.getTargetBuilder(config.target);
	if (config.watch) {
		builder.runTask('js:build-than-watch');
	} else {
		builder.runTask('js:build');
	}
});

gulp.task('statics:build', function() {
	var builder = BuilderProvider.getTargetBuilder(config.target);
	if (config.watch) {
		builder.runTask('statics:build-than-watch');
	} else {
		builder.runTask('statics:build');
	}
});

gulp.task('i18n:build', function() {
	var builder = BuilderProvider.getTargetBuilder(config.target);
	if (config.watch) {
		builder.runTask('i18n:build-than-watch');
	} else {
		builder.runTask('i18n:build');
	}
});

gulp.task('libs:build', function() {
	var builder = BuilderProvider.getTargetBuilder('libs');
	builder.runTask('libs:build');
});
