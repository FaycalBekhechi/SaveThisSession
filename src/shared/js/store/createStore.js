/**
 * Created by Fayçal Bekhechi on 2016-02-18.
 */
import { createStore, applyMiddleware, compose } from 'redux';

if (process.env.NODE_ENV === 'development') {
	var createStoreDev = require('./createStoreDev');
}

//function isPromise(val) {
//	return val && typeof val.then === 'function';
//}

function getMiddleWares(dependencies) {
	// https://github.com/este/este/blob/a2d497c3e3951b85751807789a7f80ee170ce32b/src/common/configureStore.js#L24
	// redux-thunk, redux-inject
	const inject = (dependencies) => {
		return ({ dispatch, getState }) => next => action => {
			//if (isPromise(action)) {
			//	return action;
			//}
			return next(
				typeof action === 'function'
					? action({...dependencies, dispatch, getState, store: {dispatch, getState}})
					: action
			);
		};
	};

	const middlewares = [
		inject({
			...dependencies
			// add others default dependencies if needed, for example a uid generator ?
		})
	];

	if (process.env.NODE_ENV === 'development') {
		const devMiddleWares = createStoreDev.getMiddleWares();
		middlewares.push(...devMiddleWares);
	}

	return applyMiddleware(...middlewares);
}

function getEnhancers() {
	const enhancers = [];

	if (process.env.NODE_ENV === 'development') {
		const devEnhancers = createStoreDev.getEnhancers();
		enhancers.push(...devEnhancers);
	}

	return enhancers;
}

export default function(reducers, dependencies, initialState) {
	const middlewares = getMiddleWares(dependencies);
	const enhancers = getEnhancers();

	const applyMiddlewares = compose(
		middlewares,
		...enhancers
	);

	return createStore(reducers, initialState, applyMiddlewares);
};