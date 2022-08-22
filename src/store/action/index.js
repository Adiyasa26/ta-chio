import { createAction } from '../../utils/reducer/reducer.utils';
import { ACTION_TYPES } from '../type';

export const setCurrentUser = payload =>
  createAction(ACTION_TYPES.SET_CURRENT_USER, payload);

export const setUserRole = payload =>
  createAction(ACTION_TYPES.SET_USER_ROLE, payload);

export const setAllUser = payload =>
  createAction(ACTION_TYPES.SET_ALL_USER, payload);
