/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var gulp = require('gulp');
var del = require('del');
var path = require('path');
var filePathHelper = require(__root +'gulp/Builder/Helper/FileTargetPath');

function task() {
	return function(run, event, opts) {
		var targetFilePath = filePathHelper.getFileTargetPath(event.path, opts.base);

		if (event.type == 'deleted') {
			del.sync(targetFilePath);
		} else {
			gulp.src(event.path)
				.pipe(gulp.dest(path.dirname(targetFilePath)));
		}
	};
}

module.exports = task;