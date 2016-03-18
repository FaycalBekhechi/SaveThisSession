/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 18/03/2016
 * Time: 14:12
 */
import ChromeWindowsService from 'chrome/js/background/service/ChromeWindowsService';
import eventEmitter from 'event-emitter';
import event from 'shared/js/service/event/event';

export default class BackgroundProcessService {

	syncedWindowsIds = [];
	syncedWindows = {};
	emitter = eventEmitter();

	constructor() {
		this.windowsService = new ChromeWindowsService();

		// events
		this.onWindowSynced = event('onWindowSynced', this.emitter);

		this.init();
	}

	init() {
		//this.windowsService.onRemoved(::this.onWindowRemoved);
		this.tabsService.onCreated(::this.onTabCreated);
	}

	async syncCurrentWindow() {
		const currentWindow = this.windowsService.getCurrent();
		this.syncWindow(currentWindow, replaceId);
	}

	async syncWindow(window) {
		// check if it' s already synced
		if (this.isSynced(window.id)) return;

		this.syncedWindowsIds.push(window.id);

		const newWindow = {
			id: generateId(),
			isSynced: true,
			window: window,
			tabs: window.tabs
		};

		this.syncedWindows.push(newWindow);
		this.onWindowSynced.emit(newWindow);
	}

	async unsyncWindow() {

	}

	isSynced(windowId) {
		return this.syncedWindows.indexOf(windowId) !== -1;
	}


	// Events handle
	onTabCreated(tab) {

	}

	onWindowRemoved(windowId) {
		//this.unsyncWindow();
	}
}