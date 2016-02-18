/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 18/02/2016
 * Time: 14:33
 */
import ActionType from 'shared/js/constant/ActionType';

function configure(config) {
	return {
		locale: config.locale,
		browserLocale: config.locale, // just to be explicit
		reactIntlLocale: I18n.getReactIntlLocale(config.locale)
	};
}

export default {

};