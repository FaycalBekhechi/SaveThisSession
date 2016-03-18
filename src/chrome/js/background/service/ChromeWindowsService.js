/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 18/03/2016
 * Time: 14:07
 */
import chromise from 'chrome/js/lib/chromise';
import isArray from 'lodash/isArray';
import InvalidWindowTypeException from 'shared/js/exception/InvalidWindowTypeException';

export default class ChromeWindowsService {
	supportedWindowTypes = ['normal'];

	defaultGetInfos = {
		populate: true,
		windowTypes: this.supportedWindowTypes
	};

	async getAll(getInfos) {
		var windows = await chromise.windows.getAll({...this.defaultGetInfos, ...getInfos});
		return this._filterSupportedTypes(windows);
	}

	async getCurrent(getInfos) {
		var window = await chromise.windows.getCurrent({...this.defaultGetInfos, ...getInfos});
		window = this._filterSupportedTypes(window);
		if (window === null) {
			throw new InvalidWindowTypeException('The current window is not supported for synchronization');
		}
		return window;
	}

	onRemoved(cb) {
		return chrome.windows.onRemoved.addListener((windowId) => {
			cb(windowId);
		});
	}

	// chrome < v46 does not support filter during request, so we do it also manually
	_filterSupportedTypes(windows) {
		if (!isArray(windows)) {
			return this.supportedWindowTypes.indexOf(windows.type) != -1 ? windows : null;
		}

		return windows.filter(entry => this.supportedWindowTypes.indexOf(entry.type) != -1);
	}
}