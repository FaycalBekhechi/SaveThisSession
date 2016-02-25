/**
 * Created by Fayçal Bekhechi on 2016-02-18.
 */
import React, { Component, PropTypes } from 'react';
import AppActions from 'shared/js/action/AppActions';
import { connect } from 'react-redux';

@connect(
	null,
	(dispatch) => ({
		configure: AppActions.configure
	})
)
export default class ChromeApp extends Component {

	componentWillMount() {
		const locale = chrome.i18n.getMessage('@@ui_locale');
		setTimeout(() => {
		this.props.configure({
			locale: locale
		});

		}, 5000);
	}

	render() {
		return this.props.children;
	}

}