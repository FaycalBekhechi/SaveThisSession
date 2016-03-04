/**
 * Created by Fayçal Bekhechi on 2016-02-17.
 */
import React, { Component, PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { localeSelector } from 'shared/js/selector/i18n';
import injects from 'shared/js/inject-dependency/injects';

@connect(
	(state) => {
		return {
			locale: localeSelector(state)
		};
	}
)
@injects({
	i18n: true
})
export default class I18nComponent extends Component {
	render() {
		const { i18n } = this.props;
		const { locale } = this.props;
		const config = i18n.getLocaleConfig(locale).reactIntl;

		if (locale) {
			return (
				<IntlProvider locale={config.locale} messages={config.messages}>
					{this.props.children}
				</IntlProvider>
			);
		}
		return null;
	}
}