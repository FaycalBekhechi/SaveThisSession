/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var gulp = require('gulp');
var onlyFiles = require(__root +'gulp/Builder/PipeTransformer/GulpOnlyFiles');
var filePathHelper = require(__root +'gulp/Builder/Helper/FileTargetPath');
var path = require('path');

function task(sources) {
	return function() {
		sources.forEach(function(source) {
			gulp.src(source.globs, source.opts)
				.pipe(onlyFiles())
				.pipe(gulp.dest(filePathHelper.getBuildTargetPath()));
		});
	};
}

module.exports = task;
