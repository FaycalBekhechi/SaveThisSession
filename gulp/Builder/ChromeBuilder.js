/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
var JsBuilder = require('./Tasks/JsBuilder');
var I18nBuilder = require('./Tasks/I18nBuilder');
var Watcher = require('./Tasks/Watcher');
var StaticBuilder = require('./Tasks/StaticBuilder');
var StaticWatcherBuilder = require('./Tasks/StaticWatcherBuilder');
var MultipleTaskInvoker = require('./Tasks/MultipleTaskInvoker');

var jsEntries = [ 'src/chrome/js/background.js', 'src/chrome/js/options.js' ];
var jsWatchSources = [
	{
		globs: 'src/chrome/js/**/*.js'
	}
];

var staticSources = [
	{
		globs: 'src/shared/assets/**/*',
		opts: { base: 'src/shared' }
	},
	{
		globs: ['src/chrome/assets/**/*', 'src/chrome/*'],
		opts: { base: 'src/chrome' }
	}
];

var i18nSources = [
	{
		globs: 'src/shared/locale/**/*',
		opts: { base: 'src/shared' }
	}
];

var ChromeBuilder = {
	tasks: {
		// JS
		'_private:js:watch': Watcher('js:build', jsWatchSources),
		'js:build': JsBuilder(jsEntries),
		'js:build-than-watch': MultipleTaskInvoker(['js:build', '_private:js:watch']),

		// static files
		'_private:statics:watch': Watcher('_private:statics:watch:build', staticSources),
		'_private:statics:watch:build': StaticWatcherBuilder(),
		'statics:build': StaticBuilder(staticSources),
		'statics:build-than-watch': MultipleTaskInvoker(['statics:build', '_private:statics:watch']),

		// i18n
		'_private:i18n:watch': Watcher('i18n:build', i18nSources),
		'i18n:build': I18nBuilder(i18nSources), // it handle also the watch
		'i18n:build-than-watch': MultipleTaskInvoker(['i18n:build', '_private:i18n:watch']),

		// all
		'all:build': MultipleTaskInvoker(['js:build', 'statics:build', 'i18n:build']),
		'all:build-than-watch': MultipleTaskInvoker(['js:build-than-watch', 'statics:build-than-watch', 'i18n:build-than-watch'])
	},

	runTask: function(taskName, args) {
		if (this.tasks.hasOwnProperty(taskName)) {
			this.tasks[taskName].apply(null, [this.runTask.bind(this)].concat(args));
		} else {
			throw new Error('task "'+ taskName +'" does not exists');
		}
	}
};

module.exports = ChromeBuilder;