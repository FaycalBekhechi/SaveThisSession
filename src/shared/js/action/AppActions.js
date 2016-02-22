/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 18/02/2016
 * Time: 14:33
 */
import ActionType from 'shared/js/constant/ActionType';

function configure(config) {
	return ({ i18n }) => {
		return {
			locale: config.locale,
			browserLocale: config.locale, // just to be explicit
			reactIntlLocale: i18n.getLocaleConfig(config.locale).reactIntl.locale
		};
	};
}

export default {
	configure
};