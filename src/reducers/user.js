import {combineReducers} from 'redux';
import {
  SET_USER, LOG_OUT
} from '../actions/user';
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
  accountId: '',
}
function reducer(state = defaultRequestState, action) {
  if (action.type === SET_USER) {
    return _.assign({}, defaultRequestState, action.user);
  }
  if (action.type === LOG_OUT) {
    return _.assign({}, null);
  }

  return state;
}

// const introduction = combineReducers({
//   loginStatus,
// })
const user = reducer
export default user
