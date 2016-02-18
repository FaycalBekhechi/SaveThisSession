/**
 * Created by Fayçal Bekhechi on 2016-02-18.
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createReduxLogger from 'redux-logger';
import Observable from './Observable';

function getMiddleWares() {
	const middlewares = [
		thunk // async dispatch
	];

	if (process.env.NODE_ENV === 'development') {
		const logger = createReduxLogger();
		middlewares.push(logger) // log state change
	}

	return applyMiddleware(...middlewares);
}

function getEnhancers() {
	const enhancers = [];

	if (process.env.NODE_ENV === 'development') {
		enhancers.push(DevTools.instrument());
	}
}

const middlewares = getMiddleWares();
const enhancers = getEnhancers();

const applyMiddlewares = compose(
	middlewares,
	...enhancers
);

export default function(reducers, initialState) {
	return createStore(reducers, initialState, applyMiddlewares);
};