/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 18/02/2016
 * Time: 13:38
 */
import ActionType from 'shared/js/constant/ActionType';
import Immutable from 'seamless-immutable';

const defaultState = Immutable({
	application: {
		configured: false,
		locale: ''
	}
});

export default function(state = defaultState, action) {
	if (action.type == ActionType.App.Configure) {
		state.application = {
			configured: true,
			locale: action.locale
		};
	}
	return state;
};