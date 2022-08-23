import { ACTION_TYPES } from '../type';

const INITIAL_STATE = [];

const diagnoseReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_ALL_DIAGNOSE:
      return payload;
    default:
      return state;
  }
};

export default diagnoseReducer;
