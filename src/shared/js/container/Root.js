/**
 * Created by Fayçal Bekhechi on 2016-02-17.
 */
import React, { Component, PropTypes } from 'react';

export default class Root extends Component {
	static propTypes = {

	};

	render() {
		return (
			<div>
				{this.props.children}
			</div>
		);
	}
}