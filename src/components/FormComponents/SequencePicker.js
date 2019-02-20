import React from 'react';
import PositiveIntPicker from './PositiveIntPicker';

export default function SequencePicker(props) {
  let {value, onUpdate} = props;

  return <PositiveIntPicker
    value={value}
    placeholder='مثال: 55834579143'
    onUpdate={(value) => onUpdate(value)}
    />
}
