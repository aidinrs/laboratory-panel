import axios from 'axios'
import dispatchInNewStack from '../utilities/dispatchInNewStack'
import { Keypair } from 'stellar-sdk'
import NETWORK from '../constants/network'
import { generateNewKeypair } from './accountCreator'
import { setUser } from './user'

// export const GENERATE_NEW_KEYPAIR = 'GENERATE_NEW_KEYPAIR';
// export function generateNewKeypair() {
//   let keypair = Keypair.random();
//   return {
//     type: GENERATE_NEW_KEYPAIR,
//     pubKey: keypair.publicKey(),
//     secretKey: keypair.secret(),
//   }
// }

export const SHOW_REGISTER = 'SHOW_REGISTER';
export function showRegister() {
  return {
    type: SHOW_REGISTER
  }

}
export const SHOW_LOGIN = 'SHOW_LOGIN';
export function showLogin() {
  return {
    type: SHOW_LOGIN
  }
}

export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_ERR = 'REGISTER_ERR'
export function registerRequest (user) {
  return dispatch => {
    // dispatch({
    //   type: START_FRIENDBOT_REQUEST,
    //   message: 'Loading...',
    //   status: 'loading',
    // });

    let keyPair = generateNewKeypair()
    dispatch(keyPair)

    user.accountId = keyPair.pubKey
    console.log(user)

    axios.post(`${NETWORK.api.base}/users`, user).then(r => {
      console.log(r)
      dispatchInNewStack(dispatch, {
        type: REGISTER_SUCCESS,
        showMsg: true,
        showError: false,
        msg: 'ثبت شد.',
        mode: 'login',
        showRegister: false,
        showLogin: true
      })
      this.setState({})
    }).catch(e => {
      dispatchInNewStack(dispatch, {
        type: REGISTER_ERR,
        showError: true,
        errorMsg: 'Error'
      })
    })
  }
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_ERR = 'LOGIN_ERR'
export function loginRequest (auth) {
  return dispatch => {
    // dispatch({
    //   type: START_FRIENDBOT_REQUEST,
    //   message: 'Loading...',
    //   status: 'loading',
    // });

    const params = new URLSearchParams()
    params.append('username', auth.mobile)
    params.append('password', auth.password)
    params.append('grant_type', 'password')

    const options = {
      method: 'POST',
      headers: {'Authorization': `Basic aW9zOnZNeUs2dGVnWTU=`},
      data: params,
      url: `${NETWORK.api.base}/auth`
    }
    axios(options).then(response => {
      console.log(response)
      dispatchInNewStack(dispatch, {
        type: LOGIN_SUCCESS,
        showMsg: true,
        showError: false,
        msg: 'وارد شدید.',
        mode: null,
        showRegister: false,
        showLogin: false
      })
      dispatchInNewStack(dispatch, setUser(response.data))

    }).catch(e => {
      dispatchInNewStack(dispatch, {
        type: LOGIN_ERR,
        showError: true,
        errorMsg: 'Error'
      })
    })
  }
}
