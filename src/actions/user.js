import axios from 'axios'
import dispatchInNewStack from '../utilities/dispatchInNewStack'
import { Keypair } from 'stellar-sdk'
import NETWORK from '../constants/network'
import { generateNewKeypair } from './accountCreator'


export const SET_USER = 'SET_USER';
export function setUser(user) {
  return {
    type: SET_USER,
    user: user
  }
}

