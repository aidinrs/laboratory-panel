import {combineReducers} from 'redux';
import accountCreator from './accountCreator';
import endpointExplorer from './endpointExplorer';
import transactionBuilder from './transactionBuilder';
import transactionSigner from './transactionSigner';
import xdrViewer from './xdrViewer';
import network from './network';
import routing from './routing';
import introduction from './introduction';
import payment from './payment';
import manageOffer from './manageOffer';
import changeTrust from './changeTrust';
import user from './user';

const rootReducer = combineReducers({
  accountCreator: accountCreator,
  endpointExplorer,
  transactionBuilder,
  transactionSigner,
  xdrViewer,
  network,
  routing,
  introduction,
  payment,
  changeTrust,
  manageOffer,
  user
});

export default rootReducer;
