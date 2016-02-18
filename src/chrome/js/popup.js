/**
 * Created by Fayçal Bekhechi on 2016-02-16.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ChromeApp from 'chrome/js/ChromeApp';

class Popup extends Component {

	static propTypes = {
		app: PropTypes.instanceOf(ChromeApp).isRequired
	};

	constructor(props, context) {
		super(props, context);
		this._i18n = new I18n();
		this._renderer = props.app.renderer;
	}

	render() {
		const services = {
			i18n: this._i18n
		};

		return (
			<ServiceProvider services={services}>
				<I18nComponent>
					{this._element}
				</I18nComponent>
			</ServiceProvider>
		);
	}
}
