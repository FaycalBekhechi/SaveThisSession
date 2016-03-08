/**
 * Created by Fayçal Bekhechi on 2016-02-18.
 */
import React, { Component, PropTypes } from 'react';
import AppActions from 'shared/js/action/AppActions';
import { connect } from 'react-redux';
import injects from 'shared/js/inject-dependency/injects';

@connect(
	null,
	{
		configure: AppActions.configure
	}
)
@injects({
	i18nProvider: true
})
export default class ChromeApp extends Component {

	componentWillMount() {
		this.props.i18nProvider.getBrowserLocale()
			.then((locale) => {
				this.props.configure({
					locale: locale
				});
			});
	}

	render() {
		return this.props.children;
	}

}