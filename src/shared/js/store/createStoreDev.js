/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 08/03/2016
 * Time: 11:50
 */
import createReduxLogger from 'redux-logger';
import DevTools from 'shared/js/container/dev/DevTools';
import { persistState } from 'redux-devtools';

function getMiddleWares() {
	const logger = createReduxLogger();
	return [logger]; // log state change
}

function getEnhancers() {
	return [
		window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
		persistState(window.location.href.match(/[?&]debug_session=([^&]+)\b/))
	];
}

module.exports = {
	getMiddleWares,
	getEnhancers
};