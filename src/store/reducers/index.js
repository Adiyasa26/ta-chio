import { combineReducers } from 'redux';

import userReducer from './user.reducer';

const reducers = combineReducers({
  userData: userReducer,
});

export default reducers;
