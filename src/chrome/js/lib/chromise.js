/**
 * Created with PhpStorm.
 * User: Faycal
 * Date: 11/03/2016
 * Time: 13:13
 */
import create from 'then-chrome/out/api';
import Promise from 'shared/js/Promise';

const promiseApi = Promise; // can switch to BlueBird or Q easily

export default create(promiseApi);