import { combineReducers } from 'redux';

import userReducer from './user.reducer';
import diagnoseReducer from './diagnose.reducer';

const reducers = combineReducers({
  userData: userReducer,
  diagnoseData: diagnoseReducer,
});

export default reducers;
