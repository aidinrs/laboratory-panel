import React from 'react';
import {connect} from 'react-redux';
import {Network} from 'stellar-sdk';
import {PubKeyPicker} from './FormComponents/PubKeyPicker';
import {EasySelect} from './EasySelect';
import Libify from '../utilities/Libify';
import {txSignerLink, xdrViewer} from '../utilities/linkBuilder';
import scrollOnAnchorOpen from '../utilities/scrollOnAnchorOpen';
import clickToSelect from '../utilities/clickToSelect';
import NETWORK from '../constants/network';

export default class TxBuilderResult extends React.Component {
  render() {
    let {attributes, operations} = this.props.state;
    let xdrResult, buildError;
    let validationErrors = [];

    if (attributes.sourceAccount === '') {
      validationErrors.push('مشخصات حساب مبدا اجباری است.');
    }
    if (attributes.sequence === '') {
      validationErrors.push('شماره ترتیب تراکنش اجباری است.');
    }
    let memoIsNone = attributes.memoType === 'MEMO_NONE' || attributes.memoType === '';
    if (!memoIsNone && attributes.memoContent === '') {
      validationErrors.push(' در صورتی که نوع memo انتخاب شده است باید فیلد متناظر با آن حتما پر شود.');
    }

    let finalResult, errorTitleText, successTitleText, signingInstructions, signingLink, xdrLink;
    if (validationErrors.length > 0) {
      errorTitleText = 'خطاهای اعتبارسنجی فرم  ';
      finalResult = formatErrorList(validationErrors);
    } else {
      let transactionBuild = Libify.buildTransaction(attributes, operations, new Network(this.props.networkPassphrase));

      if (transactionBuild.errors.length > 0) {
        errorTitleText = `خطاهای فرم را اصلاح نمایید:`;
        finalResult = formatErrorList(transactionBuild.errors);
      } else {
        successTitleText = `تراکنش با موفقیت انجام شد! بسته XDR تراکنش به صورت زیر میباشد.`;
        finalResult = <div>
          Network Passphrase:<br />
          {this.props.networkPassphrase}<br />
          Hash:<br />
          {transactionBuild.hash}<br />
          XDR:<br />
          {transactionBuild.xdr}
          </div>
        signingInstructions = <p className="TransactionBuilderResult__instructions">
          <a href="#txsigner"></a><a href="#explorer?resource=transactions&endpoint=create"></a>
        </p>;
        signingLink = <a className="s-button"
          href={txSignerLink(transactionBuild.xdr)}
          onClick={scrollOnAnchorOpen}>تراکنش را امضا کنید</a>
        xdrLink = <a className="s-button"
          href={xdrViewer(transactionBuild.xdr, 'TransactionEnvelope')}
          onClick={scrollOnAnchorOpen}>فرمت XDR را نمایش دهید</a>
      }
    }

    let errorTitle = errorTitleText ? <h3 className="TransactionBuilderResult__error">{errorTitleText}</h3> : null
    let successTitle = successTitleText ? <h3 className="TransactionBuilderResult__success">{successTitleText}</h3> : null

    return <div className="TransactionBuilderResult">
      {successTitle}
      {errorTitle}
      <pre className="TransactionXDR so-code so-code__wrap TransactionBuilderResult__code" onClick={clickToSelect}>
        <code>{finalResult}</code>
      </pre>
      {signingInstructions}
      {signingLink} {xdrLink}
    </div>
  }
}

export default connect(chooseState)(TxBuilderResult);

function chooseState(state) {
  return {
    state: state.transactionBuilder,
    networkPassphrase: state.network.current.networkPassphrase,
  }
}

function formatErrorList(errors) {
  return _.reduce(errors, (result, error) => {
    return `${result}- ${error} \n`;
  }, '');
}
