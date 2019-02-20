import {Network, Networks} from 'stellar-sdk';

const NETWORK = {
  accounts: {
    base: 'GCNSGJ4GW3C2DF65RIXUGFNN7MNLZKLIHNTTV5SWUUV34CKVA25UWOVW',
    issuing: 'GBI2V63UXNBIJIA4GPCRJYDFJQMQP5EP3UGRCHXSYYART35S42MTIA6S'
  },
  api: {
    base: 'http://localhost:8080/api/v1'
  },
  bridge: {
    base: 'https://horizon-testnet.stellar.org'
  },
  available: {
    main: {
      horizonURL: 'https://horizon-testnet.stellar.org',
      networkPassphrase: Networks.TESTNET
    },
    test: {
      horizonURL: 'https://horizon-testnet.stellar.org',
      networkPassphrase: Networks.TESTNET
    },
    /*public: {
      horizonURL: 'https://horizon.stellar.org',
      networkPassphrase: Networks.PUBLIC
    }*/
  },
  defaultName: 'main',
};
export default NETWORK;
