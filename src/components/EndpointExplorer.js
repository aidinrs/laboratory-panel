import React from 'react'
import _ from 'lodash'
import { chooseEndpoint, submitRequest, updateValue } from '../actions/endpointExplorer'
import { connect } from 'react-redux'
import { EndpointPicker } from './EndpointPicker'
import { EndpointSetup } from './EndpointSetup'
import { EndpointResult } from './EndpointResult'
import { ResultTable } from './SetupPanes/ResultTable'
import { getEndpoint } from '../data/endpoints'
import NETWORK from '../constants/network'
import UriTemplates from 'uri-templates'
import querystring from 'querystring'

class EndpointExplorer extends React.Component {
  render () {
    let {dispatch} = this.props
    let {
      currentResource,
      currentEndpoint,
      results,
      pendingRequest,
    } = this.props.state
    let {user} = this.props

    // pendingRequest.values.account_id = this.props.user.accountId

    let endpoint = getEndpoint(currentResource, currentEndpoint)
    let request = buildRequest(this.props.baseURL, endpoint, pendingRequest, user)

    let endpointSetup
    if (currentEndpoint !== '') {
      endpointSetup = <EndpointSetup
        request={request}
        values={pendingRequest.values}
        endpoint={endpoint}
        onSubmit={() => dispatch(submitRequest(request))}
        onUpdate={(param, value) => dispatch(updateValue(param, value))}
      />
    }

    return <div className="so-back">
      <div className="so-chunk">
        <div className="pageIntro">
          <p>
            This tool can be used to run queries against the <a href="https://www.stellar.org/developers/reference/"
                                                                target="_blank">REST API endpoints</a> on the
            Horizon server. Horizon is the client facing library for the Stellar ecosystem.</p>
        </div>
        <div className="EndpointExplorer">
          <div className="EndpointExplorer__picker">
            <EndpointPicker
              currentResource={currentResource}
              currentEndpoint={currentEndpoint}
              onChange={(r, e) => dispatch(chooseEndpoint(r, e))}
            />
          </div>

          <div className="EndpointExplorer__setup">
            {endpointSetup}
          </div>
          <div className="EndpointExplorer__setup">
            <ResultTable body={results.body && results.body[0] ? JSON.parse(results.body[0]) :{}} keys={(endpoint && endpoint.fields) ? endpoint.fields : []}/>
          </div>
          {currentResource === 'accounts' && currentEndpoint === 'all' && results.body && results.body[0] &&
          <div>
            <table className="table table-striped">
              <thead>
              <tr>
                <th>شناسه</th>
                <th>نام</th>
                <th>فامیل</th>
                <th>friendly id</th>
                <th>ایمیل</th>
                <th>آدرس حساب</th>
              </tr>
              </thead>
              <tbody>
              {JSON.parse(results.body[0]).map((user) => {
                return <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.firstName}</td>
                  <td>{user.lastName}</td>
                  <td>{user.friendlyId}</td>
                  <td>{user.email}</td>
                  <td>{user.accountId}</td>
                </tr>
              })}
              </tbody>
            </table>
          </div>}
          <div className="EndpointExplorer__result">
            {/*<EndpointResult {...results} />*/}
          </div>
        </div>
      </div>
    </div>
  }
}

export default connect(chooseState)(EndpointExplorer)

function chooseState (state) {
  return {
    state: state.endpointExplorer,
    baseURL: state.network.current.horizonURL,
    user: state.user
  }
}

function buildRequest (baseUrl, endpoint, pendingRequest, user) {
  let request = {
    url: buildRequestUrl(baseUrl, endpoint, pendingRequest.values),
    formData: '',
  }

  if (typeof endpoint !== 'undefined') {
    request.method = endpoint.method
  }

  if(endpoint && endpoint.internal === true){
    request.headers = {Authorization: `Bearer ${user.access_token}`}
  }

  // Currently, this only supports simple string values
  if (request.method === 'POST') {
    let postData = {}
    _.each(pendingRequest.values, (value, id) => {
      postData[id] = _.trim(value)
    })

    request.formData = querystring.stringify(postData)
  }

  if (pendingRequest.values.streaming) {
    request.streaming = true
  }

  return request
}

function buildRequestUrl (baseUrl, endpoint, values) {
  if (typeof endpoint === 'undefined') {
    return ''
  }
  let uriTemplate = (endpoint.internal === true ? NETWORK.api.base : baseUrl) + endpoint.path.template
  let template = new UriTemplates(uriTemplate)

  // uriParams contains what we want to fill the url with
  let uriParams = {}
  _.each(template.varNames, (varName) => {

    // With the appropriate getter, extract/transform the relevant value from values
    // 1. Simple value:
    //      - no getter string in `endpoint.path`
    // 2. String resolver: value is inside object in `values`
    //      - getter string in `endpoint.path`
    // 3. Function resolver:
    //      - getter function in `endpoint.path`
    //
    // getter can only either be: `undefined`, `String`, or `Function`

    let getterPresent = varName in endpoint.path
    let getter = endpoint.path[varName]
    let getterIsFunc = _.isFunction(getter)
    let value

    if (getterPresent && getterIsFunc) { // case 3
      value = getter(values)
    } else if (getterPresent && !getterIsFunc) { // case 2
      value = _.get(values, getter)
    } else { // case 1
      value = values[varName]
    }

    if (!_.isUndefined(value) && value !== '') {
      if (!_.isString(value)) {
        throw new Error('Endpoint explorer value must be a string')
      }
      uriParams[varName] = _.trim(value)
    }
  })

  // Fill in unfilled parameters with placeholders (like {source_account})
  // Also create a map to unescape these placeholders
  let unescapeMap = []
  _.each(template.fromUri(uriTemplate), (placeholder, param) => {
    if (!(param in uriParams)) {
      uriParams[param] = placeholder
      unescapeMap.push({
        oldStr: encodeURIComponent(placeholder),
        newStr: placeholder
      })
    }
  })

  let builtUrl = _.reduce(unescapeMap, (url, replacement) => {
    return url.replace(replacement.oldStr, replacement.newStr)
  }, template.fill(uriParams))

  return builtUrl
}