/**
 * Created by Fayçal Bekhechi on 2016-02-17.
 */
import { addLocaleData } from 'react-intl';

import en from 'shared/locale/en.json';
import enData from 'react-intl/lib/locale-data/en';

addLocaleData(enData);

export default class I18n {

	_mapping;

	constructor() {
		this._load();
	}

	getReactIntlMapping(locale) {
		return this._mapping[locale]['reactIntl'];
	}

	_load() {
		this._mapping = {
			'en': {
				reactIntl: {
					locale: 'en',
					messages: en
				}
			}
		};
	}

}

