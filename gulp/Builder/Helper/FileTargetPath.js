/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 17/02/2016
 * Time: 13:14
 */
var config = require(__root +'gulp/GulpConfig');
var path = require('path');

function getFileTargetPath(filePath, base) {
	// https://github.com/gulpjs/gulp/blob/master/docs/recipes/handling-the-delete-event-on-watch.md
	// Simulating the {base: 'src'} used with gulp.src in the scripts task
	var src = path.resolve(base || ('src/'+ config.target));
	var filePathRelative = path.relative(src, filePath);

	// Concatenating the 'build' absolute path used by gulp.dest in the scripts task
	return path.resolve('build/'+ config.environment +'/'+ config.target, filePathRelative);
}

function getBuildTargetPath() {
	return path.resolve('build/'+ config.environment +'/'+ config.target);
}

module.exports = {
	getFileTargetPath: getFileTargetPath,
	getBuildTargetPath: getBuildTargetPath
};