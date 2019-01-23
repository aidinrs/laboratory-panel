import {Network, Networks} from 'stellar-sdk';

const NETWORK = {
  api: {
    base: 'http://localhost:8080/api/v1'
  },
  bridge: {
    base: 'http://localhost:8006'
  },
  available: {
    test: {
      horizonURL: 'https://horizon-testnet.stellar.org',
      networkPassphrase: Networks.TESTNET
    },
    public: {
      horizonURL: 'https://horizon.stellar.org',
      networkPassphrase: Networks.PUBLIC
    }
  },
  defaultName: 'test',
};
export default NETWORK;
