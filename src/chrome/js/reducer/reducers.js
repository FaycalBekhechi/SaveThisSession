/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 18/02/2016
 * Time: 13:38
 */
import { combineReducers } from 'redux';
import ActionType from 'shared/js/constant/ActionType';
import Immutable from 'seamless-immutable';

const defaultState = Immutable({
	configured: false,
	locale: null
});

function reducer(state = defaultState, action) {
	if (action.type == ActionType.App.Configure) {
		state = state.merge({
			configured: true,
			locale: action.locale
		});
	}
	return state;
}

export default combineReducers({
	application: reducer
});