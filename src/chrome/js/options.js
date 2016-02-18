/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */
import 'babel-polyfill';
import React from 'react';

let app;

function init() {
	app = new ChromeApp();
	app.render(
		<Popup />,
		document.getElementById('surface-render')
	);
}

document.addEventListener('DOMContentLoaded', function load() {
	document.removeEventListener('DOMContentLoaded', load, false);
	init();
});

