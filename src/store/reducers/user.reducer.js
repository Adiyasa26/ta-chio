import { ACTION_TYPES } from '../type';

const INITIAL_STATE = {
  currentUser: null,
  userRole: 'user',
  allUser: []
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload,
      };
    case ACTION_TYPES.SET_USER_ROLE:
      return {
        ...state,
        userRole: payload,
      };
    case ACTION_TYPES.SET_ALL_USER:
      return {
        ...state,
        allUser: payload,
      };
    default:
      return state;
  }
};

export default userReducer;
