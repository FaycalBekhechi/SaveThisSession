/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var del = require('del');
var path = require('path');
var config = require(__root +'gulp/GulpConfig');

function task(sources) {
	return function() {
		gutil.log('Watching ... ', sources);
		gulp.watch(sources, function(event) {
			gutil.log('File ' + event.path + ' was ' + event.type);
			// https://github.com/gulpjs/gulp/blob/master/docs/recipes/handling-the-delete-event-on-watch.md
			// Simulating the {base: 'src'} used with gulp.src in the scripts task
			var filePathRelative = path.relative(path.resolve('src/'+ config.target), event.path);

			// Concatenating the 'build' absolute path used by gulp.dest in the scripts task
			var destFilePath = path.resolve('build/'+ config.environment +'/'+ config.target, filePathRelative);

			if (event.type == 'deleted') {
				del.sync(destFilePath);
			} else {
				gulp.src(event.path)
					.pipe(gulp.dest(path.dirname(destFilePath)));
			}
		});
	};
}

module.exports = task;