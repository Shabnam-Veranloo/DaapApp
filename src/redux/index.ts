import {all} from 'redux-saga/effects';
import GlobalSaga from './global/GlobalSagas';
import {GlobalRedux} from './global/GlobalRedux';
import ReduxUtil from '../helper/redux/ReduxUtil';
import HomeSagas from './Home/HomeSagas';
import { HomeRedux } from './Home/HomeRedux';
import { UserRedux } from './User/UserRedux';
import UserSaga from './User/UserSaga';


/**
 * all saga should be define here
 */
export function* rootSaga() {
    yield all([
        ...GlobalSaga,
        ...HomeSagas,
        ...UserSaga
    ]);
}

/**
 * extract and combine all redux init state to make root state
 */
export const initialState = ReduxUtil.extractInitState(
    GlobalRedux,
    HomeRedux,
    UserRedux
);


/**
 * extract all redux reducer and create a reducer map
 */
export const reducers = ReduxUtil.extractReducers(
    GlobalRedux,
    HomeRedux,
    UserRedux
);

