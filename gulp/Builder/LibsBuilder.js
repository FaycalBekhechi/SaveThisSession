/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var config = require(__root +'gulp/GulpConfig');
var LibrariesBuilder = require('./Tasks/LibrariesBuilder');

var libs = config.libs;

var LibsBuilder = {
	tasks: {
		'libs:build': LibrariesBuilder(libs)
	},

	runTask: function(taskName) {
		this.tasks[taskName](this.runTask.bind(this));
	}
};

module.exports = LibsBuilder;