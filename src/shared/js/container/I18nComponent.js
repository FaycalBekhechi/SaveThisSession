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
export default class I18nComponent extends Component {
	render() {
		const { locale, messages } = this.props;
		const messages = {
			'test': 'test message.'
		};

		<IntlProvider locale={locale} messages={messages}>
			{this.props.children}
		</IntlProvider>
	}
}