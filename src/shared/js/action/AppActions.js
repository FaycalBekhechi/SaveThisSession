/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 18/02/2016
 * Time: 14:33
 */
import ActionType from 'shared/js/constant/ActionType';

function configure(config) {
	return {
		type: ActionType.App.Configure,
		locale: config.locale
	};
	return ({ i18n, dispatch }) => {
		return dispatch({
			type: ActionType.App.Configure,
			locale: config.locale
		});
	};
}

function asyncFn(locale, timer) {
	return new Promise((resolve) => {
		setTimeout(function() {
			resolve(locale);
		}, timer);
	});
}

function waitThanConfigure(config, timer) {
	return async ({ dispatch }) => {
		var locale = await asyncFn(config.locale, timer);
		return dispatch(configure({ locale, ...config }));
	};
}

export default {
	configure,
	waitThanConfigure
};