import React from 'react'
import { connect } from 'react-redux'
import TextPicker from './FormComponents/TextPicker'
import OptionsTablePair from './OptionsTable/Pair'
import axios from 'axios'
import NETWORK from '../constants/network'
import { generateNewKeypair } from '../actions/accountCreator'
import { loginRequest, registerRequest, showLogin, showRegister } from '../actions/introduction'

class Introduction extends React.Component {

  constructor (props) {
    super(props)
    // this.state = {
    //   mode: 'login',
    //   showError: false,
    //   errorMsg: null,
    //   showMsg: false,
    //   msg: null,
    //   showRegister: true,
    //   showLogin: true
    // }
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

    // let {state, dispatch} = this.props

    // let keyPair = generateNewKeypair()
    // dispatch(keyPair)
    //
    // this.user.accountId = keyPair.pubKey
    // console.log(this.user)
    //
    // axios.post(`${NETWORK.api.base}/users`, this.user).then(r => {
    //   console.log(r)
    //   this.setState({showMsg: true, showError: false, msg: 'ثبت شد.', mode: 'login', showRegister: false})
    // }).catch(e => {
    //   this.setState({showError: true, errorMsg: 'Error'})
    // })
  }

  login () {
    let {state, dispatch} = this.props

    console.log(this.auth)

    dispatch(loginRequest(this.auth))

    // let keyPair = generateNewKeypair()

    // this.user.accountId = keyPair.pubKey

    // const params = new URLSearchParams()
    // params.append('username', this.auth.mobile)
    // params.append('password', this.auth.password)
    // params.append('grant_type', 'password')
    //
    // const options = {
    //   method: 'POST',
    //   headers: {'Authorization': `Basic aW9zOnZNeUs2dGVnWTU=`},
    //   data: params,
    //   url: `${NETWORK.api.base}/auth`
    // }
    // axios(options).then(r => {
    //   console.log(r)
    //   this.setState({
    //     showMsg: true,
    //     showError: false,
    //     msg: 'وارد شدید.',
    //     mode: null,
    //     showRegister: false,
    //     showLogin: false
    //   })
    // }).catch(e => {
    //   this.setState({showError: true, errorMsg: 'Error'})
    // })
  }

  render () {
    const {state, dispatch} = this.props

    return <div className="Introduction">
      <div className="so-back">
        <div className="so-chunk">
          <div className="Introduction__container">
            <h2>Stellar Laboratory</h2>
            <p className="Introduction__lead">The Stellar Laboratory is a set of tools that enables people to try out
              and learn about the Stellar network. The laboratory can <a href="#txbuilder">build transactions</a>, <a
                href="#txsigner">sign them</a>, and <a href="#explorer?resource=transactions&endpoint=create">submit
                them to the network</a>. It can also <a href="#explorer">make requests to any of the Horizon
                endpoints</a>.</p>

            <p>For Stellar docs, take a look at the <a href="https://www.stellar.org/developers/">Stellar developers
              site</a>.</p>
            <div style={{width: 200, margin: 'auto'}}>
              {state.showRegister &&
              <button className="s-button" onClick={() => {dispatch(showRegister())}}>ثبت نام</button>}
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {state.showLogin &&
              <button className="s-button" onClick={() => {dispatch(showLogin())}}>ورود</button>}
            </div>
          </div>
          <div>
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
              <button className="s-button" onClick={() => {this.register()}}>ارسال</button>
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
          </div>
        </div>
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

