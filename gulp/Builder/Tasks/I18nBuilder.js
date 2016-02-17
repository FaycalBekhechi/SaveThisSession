/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 17/02/2016
 * Time: 10:40
 */
var gulp = require('gulp');
var del = require('del');
var path = require('path');
var i18nTransformer = require(__root +'gulp/Builder/PipeTransformer/I18nTransformer');
var onlyFiles = require(__root +'gulp/Builder/PipeTransformer/GulpOnlyFiles');
var filePathHelper = require(__root +'gulp/Builder/Helper/FileTargetPath');
var config = require(__root +'gulp/GulpConfig');
var errorHandler = require(__root +'gulp/Builder/Helper/ErrorHandler');

function task(sources) {
	return function(run, event, opts) {
		var indent = config.isDebug ? "\t" : null;

		// event is set if watcher send the watch event here
		if (event) {
			var targetPath = filePathHelper.getFileTargetPath(event.path, opts.base);

			if (event.type == 'deleted') {
				del.sync(targetPath);
			} else {
				gulp.src(event.path)
					.pipe(i18nTransformer(indent))
					.on('error', errorHandler)
					.pipe(gulp.dest(path.dirname(targetPath)));
			}
		} else {
			sources.forEach(function(source) {
				gulp.src(source.globs, source.opts)
					.pipe(onlyFiles())
					.pipe(i18nTransformer(indent))
					.on('error', errorHandler)
					.pipe(gulp.dest(filePathHelper.getBuildTargetPath()));
			});
		}
	};
}

module.exports = task;