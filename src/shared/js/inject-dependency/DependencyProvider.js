/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 22/02/2016
 * Time: 10:35
 */
import React, { Component, PropTypes } from 'react';

// inspired by react-tunnel module from npm but is more simple


export default class DependencyProvider extends Component {

	static propTypes = {
		dependencies: PropTypes.object.isRequired
	};

	static childContextTypes = {
		dependencies: PropTypes.object.isRequired
	};

	getChildContext() {
		return {
			dependencies: this.props.dependencies
		}
	}

	render() {
		return this.props.children;
	}
}
