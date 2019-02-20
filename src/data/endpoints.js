export function getEndpoint(resource, endpoint) {
  let res = endpointsMap[resource];
  if (!res) { return; }

  return res.endpoints[endpoint];
}

export function getTemplate(...args) {
  let ep = getEndpoint(...args)
  if (!ep) { return; }

  return ep.path;
}

export const endpointsMap = {
  'accounts': {
    'label': 'حساب ها',
    'endpoints': {
      'single': {
        'label': 'حساب تکی',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/accounts-single.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}',
        },
        'fields': [{name: 'balances', fields: ['balance', 'asset_type'], array: true}, 'sequence', 'subentry_count'],
        'setupComponent': require('../components/SetupPanes/SingleAccount'),
      }
    }
  },
  'assets': {
    'label': 'دارایی ها',
    'endpoints': {
      'single': {
        'label': 'همه دارایی ها',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/endpoints/assets-all.html',
        'method': 'GET',
        'path': {
          template: '/assets{?asset_code,asset_issuer,cursor,order,limit}',
        },
        'fields': [{name: 'records', fields: ['amount', 'asset_code', 'asset_type', 'asset_issuer'], array: true}],
        'setupComponent': require('../components/SetupPanes/AllAssets'),
      }
    }
  },
  'effects': {
    'label': 'تاثیرات',
    'endpoints': {
      'all': {
        'label': 'همه تاثیرات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-all.html',
        'method': 'GET',
        'path': {
          template: '/effects{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'for_account': {
        'label': 'تاثیرات حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/effects{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': 'تاثیرات دفترکل',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/effects{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      },
      'for_operation': {
        'label': 'تاثیرات عملیات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-operation.html',
        'method': 'GET',
        'path': {
          template: '/operations/{operation}/effects{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForOperation'),
      },
      'for_transaction': {
        'label': 'تاثیرات تراکنش',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/effects-for-transaction.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}/effects{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForTransaction'),
      }
    }
  },
  'ledgers': {
    'label': 'دفترکل',
    'endpoints': {
      'all': {
        'label': 'همه دفترکل ها',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/ledgers-all.html',
        'method': 'GET',
        'path': {
          template: '/ledgers{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'single': {
        'label': 'دفترکل تکی',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/ledgers-single.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}',
        },
        'setupComponent': require('../components/SetupPanes/SingleLedger'),
      }
    }
  },
  'offers': {
    'label': 'پیشنهادات',
    'endpoints': {
      'for_account': {
        'label': 'پیشنهادات حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/offers-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/offers{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      }
    }
  },
  'operations': {
    'label': 'عملیات',
    'endpoints': {
      'all': {
        'label': 'همه عملیات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-all.html',
        'method': 'GET',
        'path': {
          template: '/operations{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'single': {
        'label': 'عملیات تکی',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-single.html',
        'method': 'GET',
        'path': {
          template: '/operations/{operation}',
        },
        'setupComponent': require('../components/SetupPanes/SingleOperation'),
      },
      'for_account': {
        'label': 'عملیات حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/operations{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': 'عملیات دفترکل',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/operations{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      },
      'for_transaction': {
        'label': 'عملیات تراکنش',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/operations-for-transaction.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}/operations{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForTransaction'),
      }
    }
  },
  'order_book': {
    'label': 'سفارش ها',
    'endpoints': {
      'details': {
        'label': 'جزییات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/orderbook-details.html',
        'method': 'GET',
        'path': {
          template: '/order_book{?selling_asset_type,selling_asset_code,selling_asset_issuer,buying_asset_type,buying_asset_code,buying_asset_issuer}',
          'selling_asset_type': 'selling_asset.type',
          'selling_asset_code': 'selling_asset.code',
          'selling_asset_issuer': 'selling_asset.issuer',
          'buying_asset_type': 'buying_asset.type',
          'buying_asset_code': 'buying_asset.code',
          'buying_asset_issuer': 'buying_asset.issuer',
        },
        'setupComponent': require('../components/SetupPanes/OrderBookDetails'),
      }
    }
  },
  'paths': {
    'label': 'مسیرها',
    'endpoints': {
      'all': {
        'label': 'یافتن مسیر پرداخت',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/path-finding.html',
        'method': 'GET',
        'path': {
          template: '/paths{?source_account,destination_account,destination_asset_type,destination_asset_code,destination_asset_issuer,destination_amount}',
          'destination_asset_type': 'destination_asset.type',
          'destination_asset_code': 'destination_asset.code',
          'destination_asset_issuer': 'destination_asset.issuer',
        },
        'setupComponent': require('../components/SetupPanes/FindPaymentPaths'),
      }
    }
  },
  'payments': {
    'label': 'پرداخت ها',
    'endpoints': {
      'all': {
        'label': 'همه پرداخت ها',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-all.html',
        'method': 'GET',
        'path': {
          template: '/payments{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'for_account': {
        'label': 'پرداخت های حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/payments{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': 'پرداخت های دفترکل',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/payments{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      },
      'for_transaction': {
        'label': 'پرداخت های تراکنش',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/payments-for-transaction.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}/payments{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForTransaction'),
      }
    }
  },
  'trade_aggregations': {
    'label': 'تجمیع معاملات',
    'endpoints': {
      'all': {
        'label': 'تجمیع معاملات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/endpoints/trade_aggregations.html',
        'method': 'GET',
        'path': {
          template: '/trade_aggregations{?base_asset_type,base_asset_code,base_asset_issuer,counter_asset_type,counter_asset_code,counter_asset_issuer,start_time,end_time,resolution,limit,order}',
          'base_asset_type': 'base_asset.type',
          'base_asset_code': 'base_asset.code',
          'base_asset_issuer': 'base_asset.issuer',
          'counter_asset_type': 'counter_asset.type',
          'counter_asset_code': 'counter_asset.code',
          'counter_asset_issuer': 'counter_asset.issuer',
          'start_time': 'start_time',
          'end_time': 'end_time',
          'resolution': 'resolution'
        },
        'setupComponent': require('../components/SetupPanes/TradeAggregations'),
      },
    }
  },
  'trades': {
    'label': 'معاملات',
    'endpoints': {
      'all': {
        'label': 'همه معاملات',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/endpoints/trades.html',
        'method': 'GET',
        'path': {
          template: '/trades{?base_asset_type,base_asset_code,base_asset_issuer,counter_asset_type,counter_asset_code,counter_asset_issuer,offer_id,cursor,limit,order}',
          'base_asset_type': 'base_asset.type',
          'base_asset_code': 'base_asset.code',
          'base_asset_issuer': 'base_asset.issuer',
          'counter_asset_type': 'counter_asset.type',
          'counter_asset_code': 'counter_asset.code',
          'counter_asset_issuer': 'counter_asset.issuer',
          'offer_id': 'offer_id'
        },
        'setupComponent': require('../components/SetupPanes/Trades'),
      },
      'for_account': {
        'label': 'معاملات حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/trades-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/trades{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_offer': {
        'label': 'سفارشهای معامله',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/trades-for-offer.html',
        'method': 'GET',
        'path': {
          template: '/offers/{offer_id}/trades{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForOffer'),
      },
    }
  },
  'transactions': {
    'label': 'تراکنشها',
    'endpoints': {
      'all': {
        'label': 'همه تراکنشها',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-all.html',
        'method': 'GET',
        'path': {
          template: '/transactions{?cursor,limit,order}',
        },
        'fields': [{name: 'records', fields: ['created_at', 'hash', 'source_account', 'fee'], array: true}],
        'setupComponent': require('../components/SetupPanes/All'),
      },
      'single': {
        'label': 'تراکنشهای تکی',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-single.html',
        'method': 'GET',
        'path': {
          template: '/transactions/{transaction}',
        },
        'setupComponent': require('../components/SetupPanes/SingleTransaction'),
      },
      'create': {
        'label': 'تراکشنهای سابق',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-create.html',
        'method': 'POST',
        'disableStreaming': true,
        'path': {
          template: '/transactions',
        },
        'setupComponent': require('../components/SetupPanes/PostTransaction'),
      },
      'for_account': {
        'label': 'تراکنشهای حساب',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-for-account.html',
        'method': 'GET',
        'path': {
          template: '/accounts/{account_id}/transactions{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForAccount'),
      },
      'for_ledger': {
        'label': 'تراکنشهای دفترکل',
        'helpUrl': 'https://www.stellar.org/developers/horizon/reference/transactions-for-ledger.html',
        'method': 'GET',
        'path': {
          template: '/ledgers/{ledger}/transactions{?cursor,limit,order}',
        },
        'setupComponent': require('../components/SetupPanes/ForLedger'),
      }
    }
  }
};
