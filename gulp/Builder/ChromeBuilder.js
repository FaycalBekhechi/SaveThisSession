/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var JsBuilder = require('./Tasks/JsBuilder');
var Watcher = require('./Tasks/Watcher');
var StaticBuilder = require('./Tasks/StaticBuilder');
var StaticWatcher = require('./Tasks/StaticWatcher');
var MultipleTaskInvoker = require('./Tasks/MultipleTaskInvoker');

var jsSources = [ 'src/chrome/js/background.js', 'src/chrome/js/options.js' ];
var jsWatchSources = 'src/chrome/**/*.js';

var staticSources = [
	'src/shared/**/*',
	'!src/shared/**/*.js',
	'!src/shared/**/*.twig',

	'src/chrome/**/*',
	'!src/chrome/**/*.js',
	'!src/chrome/**/*.twig'
];

var ChromeBuilder = {
	tasks: {
		'_private:js:watch': Watcher('js:build', jsWatchSources),
		'_private:statics:watch': StaticWatcher(staticSources),

		'js:build': JsBuilder(jsSources),
		'js:watch': MultipleTaskInvoker(['js:build', '_private:js:watch']),
		'statics:build': StaticBuilder(staticSources),
		'statics:watch': MultipleTaskInvoker(['statics:build', '_private:statics:watch']),
		'all:build': MultipleTaskInvoker(['js:build', 'statics:build']),
		'all:watch': MultipleTaskInvoker(['js:watch', 'statics:watch'])
	},

	runTask: function(taskName, args) {
		this.tasks[taskName].apply(null, [this.runTask.bind(this)].concat(args) );
	}
};

module.exports = ChromeBuilder;