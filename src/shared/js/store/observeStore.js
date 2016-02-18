/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 18/02/2016
 * Time: 14:40
 */

// https://github.com/reactjs/redux/issues/303#issuecomment-125184409

export default function(store, select, cb) {
	let currentState;
	let unSubscribe = store.subscribe(handleChange);

	function handleChange() {
		let nextState = querySelect();
		if (nextState !== currentState) {
			currentState = nextState;
			cb(currentState, unSubscribe);
		}
	}

	function querySelect() {
		return select ? select(store.getState()) : store.getState();
	}

	handleChange();
	return unSubscribe;
};