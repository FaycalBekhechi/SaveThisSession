/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 17/02/2016
 * Time: 12:58
 */
var es = require('event-stream');
var flatten = require('flat');
var PluginError = require('gulp-util').PluginError;

function transform(content, indent) {
	content = JSON.parse(content);
	return JSON.stringify(flatten(content), null, indent);
}

module.exports = function(indent) {
	return es.map(function(file, cb) {
		if (file.isNull()) {
			return cb(null, file);
		}

		if (file.isStream()) {
			return cb(new PluginError('i18nTransformer', 'Streaming not supported'));
		}
		
		var contents = file.contents.toString('utf8');
		try {
			contents = transform(contents, indent);
		} catch (e) {
			return cb(new PluginError('i18nTransformer', 'Parsing error'));
		}
		file.contents = new Buffer(contents, 'utf8');
		cb(null, file);
	});
};