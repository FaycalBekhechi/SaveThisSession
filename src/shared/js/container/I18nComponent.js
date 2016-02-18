/**
 * Created by Fayçal Bekhechi on 2016-02-17.
 */
import React, { Component, PropTypes } from 'react';
import { IntlProvider } from 'react-intl';
import { connect } from 'react-redux';
import { localeSelector } from 'shared/js/selector/i18n';

@connect(
	(state, props) => {
		return {
			locale: localeSelector(state)
		};
	}
)
@services({
	i18n: true
})
export default class I18nComponent extends Component {
	render() {
		const { i18n } = this.props;
		const { browserLocale } = this.props;
		const config = i18n.getReactIntlMapping(browserLocale);

		return (
			<IntlProvider locale={config.locale} messages={config.messages}>
				{this.props.children}
			</IntlProvider>
		);
	}
}