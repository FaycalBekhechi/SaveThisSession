/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 17/02/2016
 * Time: 11:21
 */
var es = require('event-stream');

// exclude empty directories:
// http://stackoverflow.com/questions/23719731/gulp-copying-empty-directories
module.exports = function() {
	return es.map(function(file, cb) {
		if (file.stat.isFile()) {
			return cb(null, file);
		} else {
			return cb();
		}
	});
};