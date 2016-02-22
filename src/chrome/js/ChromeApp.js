/**
 * Created by Fayçal Bekhechi on 2016-02-18.
 */
import Renderer from 'shared/js/service/Renderer';

import createStore from 'shared/js/store/createStore';
import observeStore from 'shared/js/store/observeStore';
import reducers from 'chrome/js/reducer/reducers';
import Immutable from 'seamless-immutable';

import { configuredSelector } from 'shared/js/selector/app';

const initialState = Immutable({});

export default class ChromeApp {

	_initialized = false;
	_element = null; // rendered element

	constructor(component, target) {
		//if (global.ChromeApp) {
		//	throw new Error('A ChromeApp already exists');
		//}
		//
		//global.ChromeApp = this;

		this._component = component;
		this._target = target;

		this._renderer = new Renderer();

		this._store = createStore(reducers, initialState);
		this._locale = chrome.i18n.getMessage('@@ui_locale');

		this.init();
	}

	init() {
		if (this._initialized) {
			return;
		}
		this._initialized = true;

		this.configure(() => {
			this.render();
		});
	}

	configure(cb) {
		this._store.dispatch(
			AppActions.configure({
				locale: this._locale
			})
		);

		observeStore(this._store, configuredSelector, (state, unSubscribe) => {
			if (state === true) {
				unSubscribe();
				cb();
			}
		});
	}

	render() {
		const ChildComponent = this._component;

		this._element = this._renderer.render(
			(
				<Provider store={this._store}>
					<ChildComponent app={this} />
				</Provider>
			),
			this._target
		);

		return this._element;
	}

	get renderer() {
		return this._renderer;
	}
}