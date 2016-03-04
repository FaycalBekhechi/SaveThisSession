/**
 * Created by Fayçal Bekhechi on 2016-02-17.
 */
import { addLocaleData } from 'react-intl';

import en from 'shared/locale/en.json';
import enData from 'react-intl/lib/locale-data/en';

addLocaleData(enData);

export default class I18n {

	mapping;

	constructor(provider) {
		this.provider = provider;
		this.load();
	}

	load() {
		this.mapping = {
			'en': {
				reactIntl: {
					locale: 'en',
					messages: en
				}
			}
		};
	}

	getLocaleConfig(locale) {
		return this.mapping[locale];
	}

}

