/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var gulp = require('gulp');
var config = require('../../GulpConfig');
var es = require('event-stream');

// exclude empty directories:
// http://stackoverflow.com/questions/23719731/gulp-copying-empty-directories
var onlyDirs = function(es) {
	return es.map(function(file, cb) {
		if (file.stat.isFile()) {
			return cb(null, file);
		} else {
			return cb();
		}
	});
};

function task(sources) {
	return function() {
		gulp.src(sources)
			.pipe(onlyDirs(es))
			.pipe(gulp.dest('build/'+ config.environment +'/'+ config.target ));
	};
}

module.exports = task;