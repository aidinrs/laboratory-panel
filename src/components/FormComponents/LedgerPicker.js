import React from 'react';
import PositiveIntPicker from './PositiveIntPicker';

export default function LedgerPicker(props) {
  return <PositiveIntPicker
    {...props}
    placeholder={props.placeholder || 'مثال: 1714814'}
  />
}
