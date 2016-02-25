/**
 * Created by Fayçal Bekhechi on 2016-02-18.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Application from 'shared/js/Application';
import ChromeApp from 'chrome/js/ChromeApp';
import I18n from 'shared/js/service/I18n';
import I18nComponent from 'shared/js/container/I18nComponent';

export default class PopupRoot extends Component {

	static propTypes = {
		app: PropTypes.instanceOf(Application)
	};

	constructor(props, context) {
		super(props, context);
		this.i18n = new I18n();
		this.renderer = props.app.renderer;
	}

	render() {
		const injects = {
			i18n: this.i18n,
			renderer: this.renderer
		};

		return (
			<InjectProvider injects={injects}>
				<ChromeApp>
					<I18nComponent>
							<div>wow such wow {}</div>
					</I18nComponent>
				</ChromeApp>
			</InjectProvider>
		);
	}
}
