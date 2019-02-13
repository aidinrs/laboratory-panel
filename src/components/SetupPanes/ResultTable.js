import React from 'react'
import OptionsTablePair from '../OptionsTable/Pair'
import _ from 'lodash'

export class ResultTable extends React.Component {
  render () {
    let {body, keys, label} = this.props
    let data = body
    console.log({data, keys})

    return <div>
      {data && <h3>{label ? label : 'نتیجه'}:</h3>}
      {data && Array.isArray(keys) && keys.map((k) => {
        if (typeof k === 'object' && k.fields) {
          return k.fields.map((kf, i) => {
            let v = _.get(data, `${k.name}.[${i}].${kf}`)
            return v && <OptionsTablePair label={kf} key={kf}>{v}</OptionsTablePair>
          })
        } else {
          let v = _.get(data, k)
          return v && <OptionsTablePair label={k} key={k}>{v}</OptionsTablePair>
        }
      })}
    </div>
  }
}
