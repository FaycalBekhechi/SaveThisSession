/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 18/02/2016
 * Time: 15:06
 */
import { createSelector } from 'reselect';

export const configuredSelector = (state) => {
	return state.application.configured;
};