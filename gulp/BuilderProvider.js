/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var ChromeBuilder = require('./Builder/ChromeBuilder');
var LibsBuilder = require('./Builder/LibsBuilder');

var mapping = {
	chrome: ChromeBuilder,

	libs: LibsBuilder
};

function getTargetBuilder(target) {
	if (mapping.hasOwnProperty(target)) {
		return mapping[target];
	}
	throw new Error('Target "'+ target +'" is invalid.')
}

module.exports = {
	getTargetBuilder: getTargetBuilder
};