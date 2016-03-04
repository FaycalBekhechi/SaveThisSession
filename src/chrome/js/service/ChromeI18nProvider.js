/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 01/03/2016
 * Time: 14:01
 */
import I18nProvider from 'shared/js/service/i18n/I18nProvider';

export default class ChromeI18nProvider extends I18nProvider {

	getBrowserLocale() {
		return new Promise((resolve) => {
			return resolve('en');
			return resolve(chrome.i18n.getMessage('@@ui_locale'));
		});
	}
}