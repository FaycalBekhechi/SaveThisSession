/**
 * Created by Fayçal Bekhechi on 2016-02-17.
 */
import ReactDOM from 'react-dom';

export default class Renderer {

	targets = [];

	render(element, target, cb = undefined) {
		this.useTarget(target);
		return ReactDOM.render(
			element,
			target,
			cb
		);
	}

	useTarget(target) {
		if (this.targets.indexOf(target) > -1) {
			ReactDOM.unmountComponentAtNode(target);
		} else {
			this.targets.push(target);
		}
	}

	destroyTarget(target) {
		const index = this.targets.indexOf(target);
		if (index > -1) {
			ReactDOM.unmountComponentAtNode(target);
			this.targets.splice(index, 1);
			return true;
		}
		return false;
	}

	destroy() {
		this.targets.forEach((target) => {
			ReactDOM.unmountComponentAtNode(target);
		});
		this.targets = [];
	}
}