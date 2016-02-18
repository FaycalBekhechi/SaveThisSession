/**
 * Created by Fayçal Bekhechi on 2016-02-17.
 */
import { createSelector } from 'reselect';

export const localeSelector = (state) => {
	return state.application.locale;
};