import React from 'react';
import PositiveIntPicker from './PositiveIntPicker';

export default function SequencePicker(props) {
  let {value, onUpdate} = props;

  return <PositiveIntPicker
    value={value}
    placeholder='مقدار در واحد استروپ(۱لومن = ۱۰۰۰۰۰۰۰استروپ)'
    onUpdate={(value) => onUpdate(value)}
    />
}
