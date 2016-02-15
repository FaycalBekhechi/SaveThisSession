/**
 * Created by Fayçal Bekhechi on 2016-02-14.
 */

function task(tasks) {
	return function(run) {
		tasks.forEach(function (taskName) {
			run(taskName);
		});
	};
}

module.exports = task;