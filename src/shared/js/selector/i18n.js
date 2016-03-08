/**
 * Created by Fayçal Bekhechi on 2016-02-17.
 */
import { createSelector } from 'reselect';

const applicationSelector = state => state.application;

export const localeSelector = createSelector(
	applicationSelector,
	(application) => application && application.locale
);