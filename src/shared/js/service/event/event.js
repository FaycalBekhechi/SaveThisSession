/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 18/03/2016
 * Time: 13:51
 */

export default function event(name, emitter) {
	return {
		on: (cb) =>	{
			emitter.on(name, cb);
		},
		emit: (...args) => {
			emitter.emit(name, ...args);
		}
	};
}