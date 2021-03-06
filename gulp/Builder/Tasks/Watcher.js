/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');

function task(cbTask, sources) {
	return function(run) {
		gutil.log('Watching ... ', sources);
		sources.forEach(function(source) {
			gulp.watch(source.globs, function(event) {
				gutil.log('File ' + event.path + ' was ' + event.type);
				run(cbTask, [event, source.opts || {}]);
			});
		});
	};
}

module.exports = task;