/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 17/02/2016
 * Time: 11:30
 */
var gutil = require('gulp-util');

module.exports = function(err) {
	gutil.log(err);
	this.emit('end');
};