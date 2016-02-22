/**
 * Created by Fayçal Bekhechi on 2016-02-18.
 */
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import ChromeApp from 'chrome/js/ChromeApp';

export default  class Popup extends Component {

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
			renderer: this._renderer
		};

		return (
			<ServiceProvider services={services}>
				<I18nComponent>
					<div>wow such wow {}</div>
				</I18nComponent>
			</ServiceProvider>
		);
	}
}
