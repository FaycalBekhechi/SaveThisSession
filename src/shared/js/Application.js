/**
 * Created by Fayçal Bekhechi on 2016-02-24.
 */
import Renderer from 'shared/js/service/Renderer';
import { Provider } from 'react-redux';

export default class Application {

	_initialized = false;
	scheduledAddRoot = [];

	constructor(store) {
		this._renderer = new Renderer();
		this.store = store;

		this.init();
	}

	init() {
		if (this._initialized) {
			return;
		}

		document.addEventListener('DOMContentLoaded', () => {
			this._initialized = true;
			document.removeEventListener('DOMContentLoaded', load, false);
			this.processScheduledAddRoot();
		});

	}

	processScheduledAddRoot() {
		for (let scheduled of this.scheduledAddRoot) {
			this.addRoot(scheduled.component, scheduled.target);
		}
		this.scheduledAddRoot = [];
	}

	addRoot(component, target) {
		if (typeof target === 'function') {
			if (this._initialized) {
				target = target();
			} else {
				this._scheduleAddRoot(component, target);
				return;
			}
		}

		this._addRoot(component, target);
	}

	_addRoot(component, target) {
		if (!target) {
			throw new Error('Target is invalid');
		}

		const RootComponent = component; // just for sexier code

		return this._renderer.render(
			(
				<Provider store={this._store}>
					<RootComponent app={this} />
				</Provider>
			),
			this.target
		);
	}

	removeRoot(target) {
		return this._renderer.destroyTarget(target);
	}

	_scheduleAddRoot(component, target) {
		this.scheduledAddRoot.push({
			component,
			target
		});
	}

	get renderer() {
		return this._renderer;
	}

}