/**
 * Created by Fayçal Bekhechi on 2016-02-16.
 */
import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import store from 'chrome/js/store/Store';
import Application from 'shared/js/Application';
import PopupRoot from 'chrome/js/root/PopupRoot';

const app = new Application(store);
const root = <PopupRoot app={app} />;
app.addRoot(root, () => document.getElementById('render-surface'));
