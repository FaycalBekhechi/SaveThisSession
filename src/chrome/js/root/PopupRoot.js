/**
 * Created by Fayçal Bekhechi on 2016-02-18.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Application from 'shared/js/Application';
import ChromeApp from 'chrome/js/ChromeApp';
import I18n from 'shared/js/service/i18n/I18n';
import I18nProvider from 'chrome/js/service/ChromeI18nProvider';
import I18nComponent from 'shared/js/container/I18nComponent';
import DependencyProvider from 'shared/js/inject-dependency/DependencyProvider';

export default class PopupRoot extends Component {

	static propTypes = {
		app: PropTypes.instanceOf(Application)
	};

	constructor(props, context) {
		super(props, context);
		this.i18n = new I18n();
		this.i18nProvider = new I18nProvider();
	}

	render() {
		const injects = {
			i18n: this.i18n,
			i18nProvider: this.i18nProvider
		};

		return (
			<DependencyProvider dependencies={injects}>
				<ChromeApp>
					<I18nComponent>
						<div>wow such wow {}</div>
					</I18nComponent>
				</ChromeApp>
			</DependencyProvider>
		);
	}
}
