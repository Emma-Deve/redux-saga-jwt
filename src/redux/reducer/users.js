/**
 * Created by Yuicon on 2017/6/27.
 */
import Immutable from 'immutable';
import {REGISTER_USER, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE,
  CURRENT_USER, CURRENT_USER_FAILURE, CURRENT_USER_SUCCESS
} from '../action/users';


const initialState = Immutable.fromJS({
  newUser: null,
  error: null,
  saveSuccess: false,
  token: null,
  currentUser: null,
});

export const users = (state = initialState, action = {}) => {
  switch (action.type) {
    case REGISTER_USER:
      return state.merge({
        'newUser': action.data,
        'saveSuccess': false,
        'error': null,
      });
    case REGISTER_USER_SUCCESS:
      return state.set('saveSuccess', action.data);
    case REGISTER_USER_FAILURE:
      return state.set('error', action.data);
    case CURRENT_USER:
      return state.merge({
        'token': action.data,
        'error': null,
      });
    case CURRENT_USER_SUCCESS:
      return state.set('currentUser', action.data);
    case CURRENT_USER_FAILURE:
      return state.set('error', action.data);
    default:
      return state
  }
};
