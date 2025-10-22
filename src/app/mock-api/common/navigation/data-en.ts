import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation_en: FuseNavigationItem[] = [
    {
        id: 'index.dashboard',
        title: 'information-board',
        subtitle: 'صرافی در یک نگاه',
        type: 'basic',
        icon: 'feather:home',
        link: '/index-info',
    },
    {
        id: 'Account',
        title: 'Customer Account',
        subtitle: 'اکانتهای مشتریان',
        type: 'group',
        icon: 'feather:users',
        children: [
            {
                id: 'Account.AccountList',
                title: 'Customer List(Individual)',
                type: 'basic',
                icon: 'feather:list',
                link: 'account/accounts'
            },
            {
                id: 'Account.AccountAdd',
                title: 'Add a Real Customer Account(Individual)',
                type: 'basic',
                icon: 'feather:plus-circle',
                link: 'account/account/add'
            },
            {
                id: 'Account.AccountLegalList',
                title: 'List of Legal(Corporate) Accounts',
                type: 'basic',
                icon: 'feather:list',
                link: 'account/accounts-legal'
            },
            {
                id: 'Account.AccountAddLegal',
                title: 'Add a Corporate Customer Account',
                type: 'basic',
                icon: 'feather:plus-circle',
                link: 'account/account-legal/add'
            },
            {
                id: 'Account.AccountPartnerList',
                title: 'Customers of Partner Branches',
                type: 'basic',
                icon: 'feather:list',
                link: 'account/account-partners/0'
            },
            {
                id: 'Account.AccountLicense',
                title: 'List of Legal Customer Licenses',
                type: 'basic',
                icon: 'feather:list',
                link: 'account/license-list'
            },           
        ]
    },
    {
        id: 'TransferCash',
        title: 'Transactions',
        subtitle: 'معاملات مشتریان',
        type: 'group',
        icon: 'feather:doller-sign',
        children: [
            {
                id: 'TransferCash.TransactionList',
                title: 'Transaction List',
                type: 'basic',
                icon: 'feather:list',
                link: 'exchange/transfer-cashs',
            },
            {
                id: 'TransferCash.TransactionAdd',
                title: 'Transaction Registration',
                type: 'basic',
                icon: 'feather:plus',
                link: 'exchange/transfer-cash/add',
            },
            {
                id: 'TransferCash.TransactionRecive',
                title: 'Receive a Deal',
                type: 'basic',
                icon: 'feather:upload',
                link: 'exchange/transfer-cash-recive',
            },
            {
                id: 'TransferCash.TransactionReject',
                title: 'Rejected Transactions',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cashs/reject',
            },
            {
                id: 'TransferCash.TransactionComplete',
                title: 'Completed Transactions',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cashs/complete',
            },
            {
                id: 'TransferCash.TransactionComplete',
                title: 'Transactions awaiting approval',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cashs/pendding',
            },
            {
                id: 'TransferCash.TransactionComplete',
                title: 'Confirmed transactions',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cashs/confirm',
            },
            {
                id: 'TransferCash.TransactionSuspiciouslistAll',
                title: 'Suspicious Transactions',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cash-suspicious-list/all',
            },
            {
                id: 'TransferCash.TransactionSuspiciouslistConfirm',
                title: 'Confirmed Suspicious Transactions',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cash-suspicious-list/confirm',
            },
            {
                id: 'TransferCash.TransactionSuspiciouslistAuthorize',
                title: 'Suspicious Problems Have Arisen',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cash-suspicious-list/authorize',
            },
            {
                id: 'TransferCash.TransactionSuspicious',
                title: 'Suspicious Transactions Continue',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cash-suspicious-follow',
            },

            {
                id: 'TransferCash.TransactionPartnerAdd',
                title: 'Recording Transactions Received from Partner Branches',
                type: 'basic',
                icon: 'feather:plus',
                link: 'exchange/transfer-cash-partner/recive',
            },
            {
                id: 'TransferCash.TransactionPartnerRecive',
                title: 'Registering Transactions Sent from a Partner Branch',
                type: 'basic',
                icon: 'feather:upload',
                link: 'exchange/transfer-cash-partner/paid',
            },
            {
                id: 'TransferCash.TransactionPartnerRecives',
                title: 'Partner Branch Transactions',
                type: 'basic',
                icon: 'feather:upload',
                link: 'exchange/transfer-cash-partners',
            },
        ]
    },
    {
        id: 'report',
        title: 'Reports',
        subtitle: 'راپورها سیستم',
        type: 'group',
        icon: 'feather:pie-chart',
        children: [
            {
                id: 'report.transfer-cash',
                title: 'Transaction Report',
                type: 'basic',
                link: 'report/report-transfer-cash',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-info',
                title: 'Transaction details report',
                type: 'basic',
                link: 'report/report-transfer-info',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-risk',
                title: 'Risky Transactions Report',
                type: 'basic',
                link: 'report/report-transaction-risk',
                icon: 'feather:report',
            },
            {
                id: 'report.summary-transaction-branch',
                title: 'Branch Transaction Summary Report',
                type: 'basic',
                link: 'report/report-summary-transaction-branch',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-cash-personly',
                title: 'Individual Transaction Report',
                type: 'basic',
                link: 'report/report-transfer-cash-personly',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-cash',
                title: 'Currency Exchange Report',
                type: 'basic',
                link: 'report/report-exchange',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-cost-benefit',
                title: 'Profit and Loss Report',
                type: 'basic',
                link: 'report/report-cost-benefit',
                icon: 'feather:report',
            },
            {
                id: 'report.report-finance-branch',
                title: 'Expense Finance Report',
                type: 'basic',
                link: 'report/report-finance-branch',
                icon: 'feather:report',
            },
            // {
            //     id: 'report.transaction-suspicious',
            //     title: ' راپور مشکوک ',
            //     type: 'basic',   
            //     link: 'report/report-suspicious',
            //     icon: 'feather:report',
            // },            
            {
                id: 'report.transaction-treasury-amounts',
                title: 'Treasury Report',
                type: 'basic',
                link: 'report/report-treasury-amounts',
                icon: 'feather:report',
            },
            // {
            //     id: 'report.transaction-treasury-amount',
            //     title: ' راپور خزانه تفکیک شده ',
            //     type: 'basic',
            //     link: 'report/report-treasury-amount',
            //     icon: 'feather:report',
           // },
            {
                id: 'report.transaction-treasury-amount-total',
                title: 'Collective Treasury Report',
                type: 'basic',
                link: 'report/report-treasury-amount-total',
                icon: 'feather:report',
            },
            // {
            //     id: 'report.transaction-treasury-amount-balance',
            //     title: ' راپور ترنزکشن های خزانه  ',
            //     type: 'basic',
            //     link: 'report/report-treasury-amount-balance',
            //     icon: 'feather:report',
            // },
            {
                id: 'report.transaction-customer-account',
                title: 'Real Customer Account Report(Individual)',
                type: 'basic',
                link: 'report/report-customer-account',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-customer-account-company',
                title: 'Corporate Customer Account Report',
                type: 'basic',
                link: 'report/report-customer-account-company',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-customer-account-check',
                title: 'Incomplete Customer Account Report',
                type: 'basic',
                link: 'report/report-customer-account-check',
                icon: 'feather:report',
            },
            // {
            //     id: 'report.treasury-cat',
            //     title: ' راپور لجر کلی  ',
            //     type: 'basic',
            //     link: 'report/treasury-accounting-balance',
            //     icon: 'feather:report',
            // },
            {
                id: 'report.above-standard',
                title: 'Criterion/Under-Criteria Report',
                type: 'basic',
                link: 'report/report-above-standard',
                icon: 'feather:report',
            },
            {
                id: 'report.above-standard-person',
                title: 'Big Transactio Report ',
                type: 'basic',
                link: 'report/report-above-standard-person',
                icon: 'feather:report',
            },
            {
                id: 'report.above-monitor-transaction',
                title: 'Transaction Monitor Report',
                type: 'basic',
                link: 'report/report-monitor-transaction',
                icon: 'feather:report',
            },
            // {
            //     id: 'report.cash-flow',
            //     title: ' راپور کش فالو ',
            //     type: 'basic',
            //     link: 'report/report-cash-flow',
            //     icon: 'feather:report',
            // },

            {
                id: 'report.transfer-diagram',
                title: 'Trading Chart',
                type: 'basic',
                link: 'report/report-transfer-diagram',
                icon: 'feather:report',
            },
            {
                id: 'report.Profit-diagram',
                title: 'Income Chart',
                type: 'basic',
                link: 'report/report-profit-diagram',
                icon: 'feather:report',
            },
        ]
    },
    {
        id: 'link',
        title: 'Links',
        subtitle: 'لینک های بانک مرکزی',
        type: 'group',
        icon: 'feather:report',
        children: [
            {
                id: 'link.report-fintra',
                title: 'Fintraca Report',
                type: 'basic',
                link: 'basic/user/url-redirect/1',
                icon: 'feather:link',
            },
            {
                id: 'link.tazirat',
                title: 'Penalties',
                type: 'basic',
                link: 'basic/user/url-redirect/2',
                icon: 'feather:link',
            },
            {
                id: 'link.tazirat2',
                title: 'Exchange Rates at the Shahzad Palace',
                type: 'basic',
                link: 'basic/user/url-redirect/3',
                icon: 'feather:link',
            },

        ]
    },
    {
        id: 'accounting',
        title: 'Accounting',
        subtitle: '',
        type: 'group',
        icon: 'feather:report',
        children: [
            // {
            //     id: 'accounting.treasuriesview',
            //     title: 'اطلاعات خزانه  ',
            //     type: 'basic',
            //     icon: 'heroicons_outline:shopping-cart',
            //     link: 'exchange/treasury-view'
            // }, 
            {
                id: 'accounting.treasury-amount-category',
                title: 'Treasury Categories and Accounts',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-category'
            },
            // {
            //     id: 'accounting.treasury-amount-treasury-journal',
            //     title: 'انتقالات بین خزانه شعبات',
            //     type: 'basic',
            //     icon: 'heroicons_outline:shopping-cart',
            //     link: 'exchange/treasury-amount-treasury-journal'
            // },            
            {
                id: 'accounting.treasury-amount-list',
                title: 'Branch Newspaper',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-list'
            },
            {
                id: 'accounting.treasury-amount-list-installment',
                title: 'Installments and Payments',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-list-installment'
            },
            {
                id: 'accounting.finance-credit-debit-list',
                title: 'List of Debts and Receivables',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/finance-credit-debit-list'
            },
            {
                id: 'accounting.treasury-amount-list-journal',
                title: 'Journal Entry',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-list-journal'
            },
            {
                id: 'accounting.treasury-amount-list-journal-1',
                title: 'Asset Registration',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal/11'
            },
            // {
            //     id: 'accounting.treasury-amount-list-journal-2',
            //     title: 'ثبت سرمایه',
            //     type: 'basic',
            //     icon: 'heroicons_outline:shopping-cart',
            //     link: 'exchange/treasury-amount-journal/12'
            // },
            {
                id: 'accounting.treasury-amount-list-journal-2',
                title: 'Capital Registration',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal-fund'
            },
            {
                id: 'accounting.treasury-amount-list-journal-3',
                title: 'Recording Expenses/Debts',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal/13'
            },
            {
                id: 'accounting.treasury-amount-list-journal-4',
                title: 'Transfers Between Branches',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal/14'
            },
            {
                id: 'accounting.employee-loan-form',
                title: 'Add (Receivable)',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/employee-loan-form'
            },
            {
                id: 'accounting.employee-loan-list',
                title: 'List (Receivable)',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/employee-loan-list'
            },

            {
                id: 'accounting.shareholder-loan-form',
                title: 'Add (Payable)',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/shareholder-loan-form'
            },
            {
                id: 'accounting.employee-loan-list',
                title: 'List (Payable)',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/shareholder-loan-list'
            },
            {
                id: 'shift.treasuriesviewshift',
                title: 'Closing the Shift',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'shift/treasury-view-shift'
            },
            {
                id: 'financeyear.exchangecurrency',
                title: 'Fiscal year',
                type: 'basic',
                icon: 'feather:edit',
                link: 'exchange/financeyear'
            },
            {
                id: 'shift.shiftinfolist',
                title: 'Branch Shifts',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'shift/shiftinfo-list'
            },
        ]
    },
    {
        id: 'reporBank',
        title: 'Financial statement',
        subtitle: '',
        type: 'group',
        icon: 'feather:report',
        children: [
            {
                id: 'reporBank.reportProfitLoss',
                title: 'Profit and Loss Report',
                type: 'basic',
                link: 'treasury-report/profit-loss',
                icon: 'feather:link',
            },
            {
                id: 'reporBank.reportProfitLoss',
                title: 'Balance Sheet Report',
                type: 'basic',
                link: 'treasury-report/balance',
                icon: 'feather:link',
            },
            {
                id: 'reporBank.reportProfitLoss',
                title: 'Daily Balance Report',
                type: 'basic',
                link: 'treasury-report/end-shift',
                icon: 'feather:link',
            },
        ]
    },
    {
        id: 'exchange',
        title: 'Administrative settings',
        subtitle: 'تنطیمات مدیریتی',
        type: 'group',
        icon: 'feather:dollar-sign',
        children: [
            {
                id: 'currency.exchangecurrency',
                title: 'Currency',
                type: 'basic',
                icon: 'feather:edit',
                link: 'currency/currencies'
            },
            {
                id: 'currency.exchangecurrency.buysell',
                title: 'Currency Buying/Selling Rates',
                type: 'basic',
                icon: 'feather:edit',
                link: 'currency/currency-buy-sell'
            },
            {
                id: 'currency.exchangecurrency.buysell',
                title: 'Currency Exchange Rate',
                type: 'basic',
                icon: 'feather:edit',
                link: 'currency/currency-pair'
            },
            // {
            //     id: 'exchange.userbranches',
            //     title: 'کاربران شعبه ',
            //     type: 'basic',
            //     icon: 'heroicons_outline:shopping-cart',
            //     link: 'basic/user'
            // }, 
            {
                id: 'branch.branches',
                title: 'Branches',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'branch/branches'
            },
            {
                id: 'branch.branchpartner',
                title: 'Partner Branch',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'branch/branch-partner'
            },
            {
                id: 'account.worksite',
                title: 'Workplace Area',
                type: 'basic',
                icon: 'feather:edit',
                link: 'account/work-site'
            },
            {
                id: 'account.accountJob',
                title: 'Types of Jobs',
                type: 'basic',
                icon: 'feather:edit',
                link: 'account/account-job'
            },
            {
                id: 'account.worklicense',
                title: 'Licensing Office',
                type: 'basic',
                icon: 'feather:edit',
                link: 'account/work-license'
            },
            {
                id: 'currency.bankAccount',
                title: 'Bank Accounts',
                type: 'basic',
                icon: 'feather:edit',
                link: 'exchange/bank-account'
            },
            {
                id: 'exchange.worklicense',
                title: 'Data Changes',
                type: 'basic',
                icon: 'feather:edit',
                link: 'log-record'
            },
        ]
    },
    {
        id: 'common',
        title: 'Management',
        subtitle: 'بخش های ضروری و مدیریت نرم افزار',
        type: 'group',
        icon: 'feather:settings',
        children: [
            {
                id: 'common.UserRole',
                title: 'User Roles',
                type: 'basic',
                link: 'basic/user/user-role',
                icon: 'feather:at-sign',
            },
            {
                id: 'common.User',
                title: 'Users',
                type: 'basic',
                link: 'basic/user',
                icon: 'feather:users',
            },
            {
                id: 'common.accessKeyUserRole',
                title: 'User Access Levels',
                type: 'basic',
                link: 'basic/user/access-role-user',
                icon: 'feather:unlock',
            },
            {
                id: 'common.accessKeyUserRole',
                title: 'Branch Access',
                type: 'basic',
                link: 'basic/user/access-branch',
                icon: 'feather:unlock',
            },
            {
                id: 'common.accessKeyProvince',
                title: 'Provincial Report Levels',
                type: 'basic',
                link: 'basic/user/access-province',
                icon: 'feather:unlock',
            },
            {
                id: 'common.CountryProviceCity',
                title: 'Province and City',
                type: 'basic',
                link: 'basic/province-city',
                icon: 'feather:users',
            },
            {
                id: 'common.chart-organ',
                title: 'Organizational Chart',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'account/chart-organ'
            },
            {
                id: 'common.share-holder',
                title: 'shareholders2',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'account/share-holder'
            },
        ]
    },

];
export const compactNavigation_en: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Information Board',
        tooltip: 'داشبورد نرم افزار',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/index-info',
    },

    {
        id: 'Account',
        title: 'Customer Account',
        tooltip: 'اکانت مشتری های صرافی',
        type: 'aside',
        icon: 'feather:users',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'TransferCash',
        title: 'Financial Transactions',
        tooltip: 'معاملات مالی شعبه ها',
        type: 'aside',
        icon: 'feather:clipboard',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'report',
        title: 'Reports',
        tooltip: 'راپورهای سیستم ',
        type: 'aside',
        icon: 'feather:pie-chart',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'link',
        title: 'Links',
        type: 'aside',
        icon: 'feather:inbox',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'accounting',
        title: 'Accounting',
        type: 'aside',
        icon: 'feather:inbox',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'reporBank',
        title: 'Financial Statement',
        type: 'aside',
        icon: 'feather:inbox',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'exchange',
        title: 'Admin Settings',
        type: 'aside',
        icon: 'feather:inbox',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'common',
        title: 'Management',
        tooltip: 'بخش های مدیریتی نرم افزار',
        type: 'aside',
        icon: 'feather:settings',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation_en: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'DASHBOARDS',
        type: 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'apps',
        title: 'APPS',
        type: 'group',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'others',
        title: 'OTHERS',
        type: 'group'
    },
    {
        id: 'pages',
        title: 'Pages',
        type: 'aside',
        icon: 'heroicons_outline:document-duplicate',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'user-interface',
        title: 'User Interface',
        type: 'aside',
        icon: 'heroicons_outline:collection',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'navigation-features',
        title: 'Navigation Features',
        type: 'aside',
        icon: 'heroicons_outline:menu',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    }
];
export const horizontalNavigation_en: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Desk',
        type: 'basic',
        icon: 'feather:home',
        link: '/index-info',
        //children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'att',
        title: 'Presence and Absence',
        tooltip: 'نرم افزار جامع حضور و غیاب',
        type: 'aside',
        icon: 'feather:calendar',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'leave',
        title: 'Leave Balance',
        tooltip: 'مدیریت مانده مرخصی',
        type: 'aside',
        icon: 'feather:book-open',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'salary',
        title: 'Salary and Wages',
        tooltip: 'مدیریت حقوق و دستمزد',
        type: 'aside',
        icon: 'feather:dollar-sign',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'sms',
        title: 'SMS Sending System',
        tooltip: 'مدیریت پیامک ها',
        type: 'aside',
        icon: 'feather:dollar-sign',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'report',
        title: 'Reports',
        tooltip: 'گزارشات نرم افزار حضور و غیاب',
        type: 'aside',
        icon: 'feather:pie-chart',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },

    {
        id: 'link',
        title: 'Links',
        tooltip: '',
        type: 'aside',
        icon: 'feather:pie-chart',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'common',
        title: 'Management',
        tooltip: 'بخش های مدیریت نرم افزار',
        type: 'aside',
        icon: 'feather:settings',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
