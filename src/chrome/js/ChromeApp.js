/**
 * Created by Fayçal Bekhechi on 2016-02-18.
 */
import Renderer from 'shared/js/service/Renderer';

export default class ChromeApp {

	constructor(element, target) {
		this._element = element;
		this._target = target;

		this._store = new Store();
		this._renderer = new Renderer();
		this._locale = chrome.i18n.getMessage('@@ui_locale');


	}

	run() {
		this._renderer.render(
			(
				<Provider store={this._store}>
					<I18nComponent>
						{this._element}
					</I18nComponent>
				</Provider>
			),
			this._target
		);
	}

	get renderer() {
		return this._renderer;
	}
}