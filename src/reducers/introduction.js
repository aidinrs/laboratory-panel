import {combineReducers} from 'redux';
import {
  LOGIN_SUCCESS,
  LOGIN_ERR,
  REGISTER_ERR,
  REGISTER_SUCCESS,
  SHOW_REGISTER,
  SHOW_LOGIN
} from '../actions/introduction';
import _ from 'lodash';

// function keypairGeneratorResult(state=null, action) {
//   if (action.type === GENERATE_NEW_KEYPAIR) {
//     return {
//       pubKey: action.pubKey,
//       secretKey: action.secretKey,
//     };
//   }
//   return state;
// }

// function msgStatus(state='', action) {
//   if (action.type === GENERATE_NEW_KEYPAIR) {
//     return action.pubKey;
//   }
//   return state;
// }
//
// function errorStatus(state='', action) {
//   if (action.type === UPDATE_FRIENDBOT_TARGET) {
//     return action.target;
//   }
//   return state;
// }

const defaultRequestState = {
  mode: 'login',
  showError: false,
  errorMsg: null,
  showMsg: false,
  msg: null,
  showRegister: true,
  showLogin: true
}
function reducer(state = defaultRequestState, action) {
  if (action.type === SHOW_LOGIN) {
    return _.assign({}, state, {
      mode: 'login'
    });
  }
  if (action.type === SHOW_REGISTER) {
    return _.assign({}, state, {
      mode: 'register'
    });
  }
  if (action.type === LOGIN_ERR) {
    return _.assign({}, state, {
      showError: action.showError,
      errorMsg: action.errorMsg
    });
  }
  if (action.type === LOGIN_SUCCESS) {
    return _.assign({}, state, {
      showMsg: action.showMsg,
      showError: action.showError,
      msg: action.msg,
      mode: action.mode,
      showRegister: action.showRegister,
      showLogin: action.showLogin
    });
  }
  if (action.type === REGISTER_ERR) {
    return _.assign({}, state, {
      showError: action.showError,
      errorMsg: action.errorMsg
    });
  }
  if (action.type === REGISTER_SUCCESS) {
    return _.assign({}, state, {
      showMsg: action.showMsg,
      showError: action.showError,
      msg: action.msg,
      mode: action.mode,
      showRegister: action.showRegister,
      showLogin: action.showLogin
    });
  }
  return state;
}

// const introduction = combineReducers({
//   loginStatus,
// })
const introduction = reducer
export default introduction
