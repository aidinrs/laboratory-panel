import React from 'react'
import { connect } from 'react-redux'
import TextPicker from './FormComponents/TextPicker'
import OptionsTablePair from './OptionsTable/Pair'
import axios from 'axios'
import NETWORK from '../constants/network'
import { generateNewKeypair } from '../actions/accountCreator'
import { loginRequest, registerRequest, showLogin, showRegister } from '../actions/introduction'
import { ResultTable } from './SetupPanes/ResultTable'
import { logoutUser, setUser } from '../actions/user'
import classNames from 'classnames'

const ISSUING_ACC = NETWORK.accounts.issuing
const BASE_ACC = NETWORK.accounts.base

class Introduction extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      showTable: false,
      body: [],
      fields: []
    }
    this.user = {
      firstName: null,
      lastName: null,
      mobile: null,
      accountId: null,
      password: null,
      email: null
    }
    this.auth = {
      mobile: null,
      password: null,
    }
  }

  register () {
    let {state, dispatch} = this.props

    dispatch(registerRequest(this.user))
  }

  login () {
    let {state, dispatch} = this.props

    console.log(this.auth)

    dispatch(loginRequest(this.auth))
  }

  logout () {
    let {state, dispatch} = this.props
    dispatch(showLogin())
    dispatch(logoutUser())
    setTimeout(() => {window.location.reload()}, 1000)
  }

  allIssuedAssets () {
    axios.get(`${NETWORK.bridge.base}/assets`, {params: {asset_issuer: ISSUING_ACC, limit: 200}}).then((res) => {
      if (res.data && res.data._embedded && Array.isArray(res.data._embedded.records)) {
        this.setState({
          body: res.data._embedded.records,
          fields: ['amount', 'asset_code', 'asset_issuer', 'asset_type'],
          showTable: true
        })
      }
    })
  }

  allBaseTxs () {
    axios.get(`${NETWORK.bridge.base}/accounts/${BASE_ACC}/transactions`, {params: {limit: 200}}).then((res) => {
      if (res.data && res.data._embedded && Array.isArray(res.data._embedded.records)) {
        this.setState({
          body: res.data._embedded.records,
          fields: ['hash', 'source_account', 'fee_paid', 'created_at'],
          showTable: true
        })
      }
    })
  }

  allBaseEffects () {
    axios.get(`${NETWORK.bridge.base}/accounts/${BASE_ACC}/effects`, {params: {limit: 200}}).then((res) => {
      if (res.data && res.data._embedded && Array.isArray(res.data._embedded.records)) {
        this.setState({
          body: res.data._embedded.records,
          fields: ['account', 'type', 'asset_type', 'asset_code', 'asset_issuer', 'created_at'],
          showTable: true
        })
      }
    })
  }

  allBasePayments () {
    axios.get(`${NETWORK.bridge.base}/accounts/${BASE_ACC}/payments`, {params: {limit: 200}}).then((res) => {
      if (res.data && res.data._embedded && Array.isArray(res.data._embedded.records)) {
        this.setState({
          body: res.data._embedded.records,
          fields: ['transaction_hash', 'type', 'source_account', 'to', 'amount', 'asset_code', 'created_at'],
          showTable: true
        })
      }
    })
  }

  allBaseOffers () {
    axios.get(`${NETWORK.bridge.base}/accounts/${BASE_ACC}/offers`, {params: {limit: 200}}).then((res) => {
      if (res.data && res.data._embedded && Array.isArray(res.data._embedded.records)) {
        this.setState({
          body: res.data._embedded.records,
          fields: ['seller', 'selling', 'buying', 'amount', 'price', 'last_modified'],
          showTable: true
        })
      }
    })
  }

  allAccounts () {
    axios.get(`${NETWORK.api.base}/users/all`, {headers: {Authorization: `Bearer ${this.props.user.access_token}`}})
      .then((res) => {
        if (Array.isArray(res.data)) {
          this.setState({
            body: res.data,
            fields: ['id', 'firstName', 'lastName', 'friendlyId', 'email', 'accountId'],
            showTable: true
          })
        }
      })
  }

  render () {
    const {state, dispatch, user} = this.props
    const isLoggedIn = user && user.access_token && user.accountId

    return <div className="Introduction">
      <div className="so-back">
        <div className="so-chunk">
          <div className="Introduction__container">
            <h2>سامانه پیش فروش سکه</h2>
            {/*<p className="Introduction__lead">The Stellar Laboratory is a set of tools that enables people to try out*/}
              {/*and learn about the Stellar network. The laboratory can <a href="#txbuilder">build transactions</a>, <a*/}
                {/*href="#txsigner">sign them</a>, and <a href="#explorer?resource=transactions&endpoint=create">submit*/}
                {/*them to the network</a>. It can also <a href="#explorer">make requests to any of the Horizon*/}
                {/*endpoints</a>.</p>*/}
            <br />
          </div>
          {isLoggedIn && <div>
            <p>{`${user.firstName} ${user.lastName} خوش آمدید.`}</p>
            <p>برای <a className={'link-payment'} href={'#payment'}>پرداخت</a> کلیک کنید.</p>
            <button className="s-button red btn-warning" onClick={() => {this.logout()}}>خروج</button>
          </div>}
          {!isLoggedIn && <div>
            {state.showKeypair && <div>
              <ResultTable body={state.keypair} keys={state.keypairFields} label="اطلاعات کیف پول شما" />
            </div>}
            <br />
            {!isLoggedIn && <div style={{width: 200, margin: 'auto'}}>
              {state.showRegister &&
              <button className="s-button--min" onClick={() => {dispatch(showRegister())}}>ثبت نام &nbsp;|</button>}
              {state.showLogin && <button className="s-button--min" onClick={() => {dispatch(showLogin())}}>ورود</button>}
            </div>}
            {state.showError && <p>{state.errorMsg}</p>}
            {state.showMsg && <p>{state.msg}</p>}
            {state.mode === 'register' &&
            <div>
              <OptionsTablePair label="نام" key="firstName">
                <TextPicker onUpdate={(v) => {this.user.firstName = v}} placeholder='نام'/>
              </OptionsTablePair>
              <OptionsTablePair label="نام خانوادگی" key="lastName">
                <TextPicker onUpdate={(v) => {this.user.lastName = v}} placeholder='نام خانوادگی'/>
              </OptionsTablePair>
              <OptionsTablePair label="موبایل" key="mobile">
                <TextPicker onUpdate={(v) => {this.user.mobile = v}} placeholder='موبایل'/>
              </OptionsTablePair>
              <OptionsTablePair label="ایمیل" key="email">
                <TextPicker onUpdate={(v) => {this.user.email = v}} placeholder='ایمیل'/>
              </OptionsTablePair>
              <OptionsTablePair label="رمز عبور" key="password">
                <TextPicker onUpdate={(v) => {this.user.password = v}} placeholder='رمز عبور'/>
              </OptionsTablePair>
              <br/>
              <button className="s-button btn-warning" onClick={() => {this.register()}}>ارسال</button>
            </div>}
            {state.mode === 'login' &&
            <div>
              <OptionsTablePair label="موبایل" key="mobile">
                <TextPicker onUpdate={(v) => {this.auth.mobile = v}} placeholder='موبایل'/>
              </OptionsTablePair>
              <OptionsTablePair label="رمز عبور" key="password">
                <TextPicker onUpdate={(v) => {this.auth.password = v}} placeholder='رمز عبور'/>
              </OptionsTablePair>
              <br/>
              <button className="s-button" onClick={() => {this.login()}}>ورود</button>
            </div>}
          </div>}
          <br/>
          <hr/>
          <br/>
          {isLoggedIn && <div>
            <button className="btn btn-success" onClick={() => {this.allIssuedAssets()}}>همه دارای های منتشر شده
            </button>
          </div>}
          <br/>
          {isLoggedIn && <div>
            <button style={{margin: 8}} className="btn btn-primary" onClick={() => {this.allBaseTxs()}}>تراکنش های حساب
              جاری
            </button>
            <button style={{margin: 8}} className="btn btn-primary" onClick={() => {this.allBaseEffects()}}>افکت های
              حساب جاری
            </button>
            <button style={{margin: 8}} className="btn btn-primary" onClick={() => {this.allBasePayments()}}>پرداخت های
              حساب جاری
            </button>
            <button style={{margin: 8}} className="btn btn-primary" onClick={() => {this.allBaseOffers()}}>پیشنهاد های
              حساب جاری
            </button>
          </div>}
          {isLoggedIn && <div>
            <button style={{margin: 8}} className="btn btn-warning" onClick={() => {this.allAccounts()}}>همه حساب ها
            </button>
          </div>}
        </div>
        <br/>
        <br/>
        {isLoggedIn && this.state.showTable && <div className={'operations-table'}>
          <table className="table table-striped">
            <thead>
            <tr>
              {this.state.fields.map((k, i) => {
                return <th key={i}>{k}</th>
              })}
            </tr>
            </thead>
            <tbody>
            {this.state.body.map((record, i) => {
              return <tr key={i}>
                {this.state.fields.map((key, j) => {
                  return <td key={j}>{record[key]}</td>
                })}
              </tr>
            })}
            </tbody>
          </table>
        </div>}
      </div>
    </div>
  }
}

export default connect(chooseState)(Introduction)

function chooseState (reduxState) {
  return {
    state: reduxState.introduction,
    user: reduxState.user
  }
}

