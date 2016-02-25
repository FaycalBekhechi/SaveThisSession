/**
 * Created by Fayçal Bekhechi on 2016-02-24.
 */
import reducers from 'chrome/js/reducer/reducers';
import createStore from 'shared/js/store/createStore';

const initialState = Immutable({});

const store = createStore(reducers, initialState);

export default store;