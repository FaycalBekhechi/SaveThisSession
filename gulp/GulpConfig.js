/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */

var package = require(__root +'package.json');
var argv = require('yargs')
	.usage('Usage: gulp <options>')
	.options({
		'target': {
			describe: 'Choose a platform target',
			choices: ['chrome'],
			demand: true
		},
		'env': {
			describe: 'Choose an environment build',
			choices: ['development', 'production'],
			default: 'development'
		},
		'watch': {
			describe: 'Watch files to automate build on change',
			boolean: true
		}
	})
	.argv;

var environment = argv.env;
var isDebug = environment === 'development';
var isProd = environment === 'production';
var libs = Object.keys(package.dependencies);
var watch = argv.watch;
var babelOptions = {
	presets: ['es2015', 'react', 'stage-0'],
	plugins: ['external-helpers', 'transform-runtime', 'transform-decorators-legacy']
};
var target = argv.target;

module.exports = {
	libs: libs,
	environment: environment,
	isDebug: isDebug,
	isProd: isProd,
	babelOptions: babelOptions,
	target: target,
	watch: watch
};