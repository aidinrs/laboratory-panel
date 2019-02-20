import React from 'react';
import OptionsTablePair from '../OptionsTable/Pair';
import TransactionPicker from '../FormComponents/TransactionPicker.js';

export default function SingleTransaction(props) {
  return <div>
    <OptionsTablePair label="چکیده تراکنش">
      <TransactionPicker
        value={props.values['transaction']}
        onUpdate={(value) => {props.onUpdate('transaction', value)}}
        />
    </OptionsTablePair>
  </div>
}
