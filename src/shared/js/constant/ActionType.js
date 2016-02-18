/**
 * Created by Fayçal Bekhechi on 2016-02-17.
 */
import isPlainObject from 'lodash/isPlainObject';

const types = {
	App: {
		Configure: ''
	}
};

function build(types, path = []) {
	let result;
	if (isPlainObject(types)) {
		result = {};
		for (let [key, value] of Object.entries(types)) {
			result[key] = build(value, path.concat(key));
		}
	} else {
		result = path.join('.');
	}
	return result;
}

export default build(types, ['Action']);