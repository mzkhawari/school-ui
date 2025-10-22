import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation_pa: FuseNavigationItem[] = [
    {
        id: 'index.dashboard',
        title: 'د معلوماتو بورډ',
        subtitle: 'صرافی در یک نگاه',
        type: 'basic',
        icon: 'feather:home',
        link: '/index-info',
    },
    {
        id: 'Account',
        title: 'د پیرودونکي حساب',
        subtitle: 'اکانتهای مشتریان',
        type: 'group',
        icon: 'feather:users',
        children: [
            {
                id: 'Account.AccountList',
                title: 'د پیرودونکو لیست (انفرادي)',
                type: 'basic',
                icon: 'feather:list',
                link: 'account/accounts'
            },
            {
                id: 'Account.AccountAdd',
                title: 'د پیرودونکي اصلي حساب اضافه کړئ (انفرادي)',
                type: 'basic',
                icon: 'feather:plus-circle',
                link: 'account/account/add'
            },
            {
                id: 'Account.AccountLegalList',
                title: 'د قانوني (کارپوریټ) حسابونو لیست',
                type: 'basic',
                icon: 'feather:list',
                link: 'account/accounts-legal'
            },
            {
                id: 'Account.AccountAddLegal',
                title: 'د شرکتي پیرودونکي حساب اضافه کړئ',
                type: 'basic',
                icon: 'feather:plus-circle',
                link: 'account/account-legal/add'
            },
            {
                id: 'Account.AccountPartnerList',
                title: 'د شریکو څانګو پیرودونکي',
                type: 'basic',
                icon: 'feather:list',
                link: 'account/account-partners/0'
            },
            {
                id: 'Account.AccountLicense',
                title: 'د قانوني پیرودونکو جوازونو لیست',
                type: 'basic',
                icon: 'feather:list',
                link: 'account/license-list'
            },           
        ]
    },
    {
        id: 'TransferCash',
        title: 'معاملې',
        subtitle: 'معاملات مشتریان',
        type: 'group',
        icon: 'feather:doller-sign',
        children: [
            {
                id: 'TransferCash.TransactionList',
                title: 'د راکړې ورکړې لیست',
                type: 'basic',
                icon: 'feather:list',
                link: 'exchange/transfer-cashs',
            },
            {
                id: 'TransferCash.TransactionAdd',
                title: 'د راکړې ورکړې ثبتول',
                type: 'basic',
                icon: 'feather:plus',
                link: 'exchange/transfer-cash/add',
            },
            {
                id: 'TransferCash.TransactionRecive',
                title: 'معامله ترلاسه کړئ',
                type: 'basic',
                icon: 'feather:upload',
                link: 'exchange/transfer-cash-recive',
            },
            {
                id: 'TransferCash.TransactionReject',
                title: 'رد شوي معاملې',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cashs/reject',
            },
            {
                id: 'TransferCash.TransactionComplete',
                title: 'بشپړې شوې معاملې',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cashs/complete',
            },
            {
                id: 'TransferCash.TransactionComplete',
                title: 'هغه معاملې چې د تصویب په تمه دي',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cashs/pendding',
            },
            {
                id: 'TransferCash.TransactionComplete',
                title: 'تایید شوي معاملې',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cashs/confirm',
            },
            {
                id: 'TransferCash.TransactionSuspiciouslistAll',
                title: 'شکمنې معاملې',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cash-suspicious-list/all',
            },
            {
                id: 'TransferCash.TransactionSuspiciouslistConfirm',
                title: 'د شکمنو معاملو تایید',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cash-suspicious-list/confirm',
            },
            {
                id: 'TransferCash.TransactionSuspiciouslistAuthorize',
                title: 'شکمنې معاملې رامنځته شوې دي.',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cash-suspicious-list/authorize',
            },
            {
                id: 'TransferCash.TransactionSuspicious',
                title: 'شکمنې معاملې دوام لري',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cash-suspicious-follow',
            },

            {
                id: 'TransferCash.TransactionPartnerAdd',
                title: 'د شریکو څانګو څخه ترلاسه شوي معاملو ثبتول',
                type: 'basic',
                icon: 'feather:plus',
                link: 'exchange/transfer-cash-partner/recive',
            },
            {
                id: 'TransferCash.TransactionPartnerRecive',
                title: 'د شریکو څانګو څخه لیږل شوي معاملې ترلاسه کړئ',
                type: 'basic',
                icon: 'feather:upload',
                link: 'exchange/transfer-cash-partner/paid',
            },
            {
                id: 'TransferCash.TransactionPartnerRecives',
                title: 'د شریکې څانګې معاملې',
                type: 'basic',
                icon: 'feather:upload',
                link: 'exchange/transfer-cash-partners',
            },
        ]
    },
    {
        id: 'report',
        title: 'راپورونه',
        subtitle: 'راپورها سیستم',
        type: 'group',
        icon: 'feather:pie-chart',
        children: [
            {
                id: 'report.transfer-cash',
                title: 'د راکړې ورکړې راپور',
                type: 'basic',
                link: 'report/report-transfer-cash',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-info',
                title: 'د راکړې ورکړې جزئیات راپور',
                type: 'basic',
                link: 'report/report-transfer-info',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-risk',
                title: 'د خطرناکو معاملو راپور',
                type: 'basic',
                link: 'report/report-transaction-risk',
                icon: 'feather:report',
            },
            {
                id: 'report.summary-transaction-branch',
                title: 'د څانګې د راکړې ورکړې لنډیز راپور',
                type: 'basic',
                link: 'report/report-summary-transaction-branch',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-cash-personly',
                title: 'د انفرادي راکړې ورکړې راپور',
                type: 'basic',
                link: 'report/report-transfer-cash-personly',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-cash',
                title: 'د اسعارو تبادلې راپور',
                type: 'basic',
                link: 'report/report-exchange',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-cost-benefit',
                title: 'د ګټې او زیان راپور',
                type: 'basic',
                link: 'report/report-cost-benefit',
                icon: 'feather:report',
            },
            {
                id: 'report.report-finance-branch',
                title: 'د مالي لګښت راپور',
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
                title: 'د خزانې راپور',
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
                title: 'د ټولیزې خزانې راپور',
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
                title: 'د اصلي پیرودونکي حساب راپور (انفرادي)',
                type: 'basic',
                link: 'report/report-customer-account',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-customer-account-company',
                title: 'د شرکت د پیرودونکو حساب راپور',
                type: 'basic',
                link: 'report/report-customer-account-company',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-customer-account-check',
                title: 'د پیرودونکي حساب نیمګړی راپور',
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
                title: 'معیاري/غیر معیاري راپور',
                type: 'basic',
                link: 'report/report-above-standard',
                icon: 'feather:report',
            },
            {
                id: 'report.above-standard-person',
                title: 'د لویې معاملې راپور',
                type: 'basic',
                link: 'report/report-above-standard-person',
                icon: 'feather:report',
            },
            {
                id: 'report.above-monitor-transaction',
                title: 'د راکړې ورکړې د څارنې راپور',
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
                title: 'د سوداګرۍ چارټ',
                type: 'basic',
                link: 'report/report-transfer-diagram',
                icon: 'feather:report',
            },
            {
                id: 'report.Profit-diagram',
                title: 'د عاید چارټ',
                type: 'basic',
                link: 'report/report-profit-diagram',
                icon: 'feather:report',
            },
        ]
    },
    {
        id: 'link',
        title: 'لینکونه',
        subtitle: 'لینک های بانک مرکزی',
        type: 'group',
        icon: 'feather:report',
        children: [
            {
                id: 'link.report-fintra',
                title: 'خبریال فینټراکا',
                type: 'basic',
                link: 'basic/user/url-redirect/1',
                icon: 'feather:link',
            },
            {
                id: 'link.tazirat',
                title: ' جزاګانې ',
                type: 'basic',
                link: 'basic/user/url-redirect/2',
                icon: 'feather:link',
            },
            {
                id: 'link.tazirat2',
                title: 'په شهزاد ماڼۍ کې د تبادلې نرخونه',
                type: 'basic',
                link: 'basic/user/url-redirect/3',
                icon: 'feather:link',
            },

        ]
    },
    {
        id: 'accounting',
        title: 'محاسبه',
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
                title: 'د خزانې کټګورۍ او حسابونه',
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
                title: 'د څانګې ورځپاڼه',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-list'
            },
            {
                id: 'accounting.treasury-amount-list-installment',
                title: 'قسطونه او تادیات',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-list-installment'
            },
            {
                id: 'accounting.finance-credit-debit-list',
                title: 'د پورونو او ترلاسه کولو وړ پورونو لیست',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/finance-credit-debit-list'
            },
            {
                id: 'accounting.treasury-amount-list-journal',
                title: 'د ژورنال ننوتنه',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-list-journal'
            },
            {
                id: 'accounting.treasury-amount-list-journal-1',
                title: 'د شتمنیو ثبتول',
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
                title: 'د پانګې ثبتول',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal-fund'
            },
            {
                id: 'accounting.treasury-amount-list-journal-3',
                title: 'د لګښتونو / پورونو ثبتول',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal/13'
            },
            {
                id: 'accounting.treasury-amount-list-journal-4',
                title: 'د څانګو ترمنځ لیږدونه',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal/14'
            },
            {
                id: 'accounting.employee-loan-form',
                title: 'اضافه کول (Receivable)',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/employee-loan-form'
            },
            {
                id: 'accounting.employee-loan-list',
                title: 'لیست (Receivable)',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/employee-loan-list'
            },

            {
                id: 'accounting.shareholder-loan-form',
                title: 'اضافه کول (Payable)',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/shareholder-loan-form'
            },
            {
                id: 'accounting.employee-loan-list',
                title: 'لیست (Payable)',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/shareholder-loan-list'
            },
            {
                id: 'shift.treasuriesviewshift',
                title: 'د شفټ بندول',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'shift/treasury-view-shift'
            },
            {
                id: 'financeyear.exchangecurrency',
                title: 'مالي کال',
                type: 'basic',
                icon: 'feather:edit',
                link: 'exchange/financeyear'
            },
            {
                id: 'shift.shiftinfolist',
                title: 'د څانګو بدلون',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'shift/shiftinfo-list'
            },
        ]
    },
    {
        id: 'reporBank',
        title: 'مالي بیان',
        subtitle: '',
        type: 'group',
        icon: 'feather:report',
        children: [
            {
                id: 'reporBank.reportProfitLoss',
                title: 'د ګټې او زیان راپور',
                type: 'basic',
                link: 'treasury-report/profit-loss',
                icon: 'feather:link',
            },
            {
                id: 'reporBank.reportProfitLoss',
                title: 'د بیلانس شیټ راپور',
                type: 'basic',
                link: 'treasury-report/balance',
                icon: 'feather:link',
            },
            {
                id: 'reporBank.reportProfitLoss',
                title: 'د ورځني بیلانس راپور',
                type: 'basic',
                link: 'treasury-report/end-shift',
                icon: 'feather:link',
            },
        ]
    },
    {
        id: 'exchange',
        title: 'اداري ترتیبات',
        subtitle: 'تنطیمات مدیریتی',
        type: 'group',
        icon: 'feather:dollar-sign',
        children: [
            {
                id: 'currency.exchangecurrency',
                title: 'د اسعارو',
                type: 'basic',
                icon: 'feather:edit',
                link: 'currency/currencies'
            },
            {
                id: 'currency.exchangecurrency.buysell',
                title: 'د اسعارو د پېر او پلور نرخونه',
                type: 'basic',
                icon: 'feather:edit',
                link: 'currency/currency-buy-sell'
            },
            {
                id: 'currency.exchangecurrency.buysell',
                title: 'د اسعارو د تبادلې نرخ',
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
                title: 'څانګې',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'branch/branches'
            },
            {
                id: 'branch.branchpartner',
                title: 'د ملګري څانګه',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'branch/branch-partner'
            },
            {
                id: 'account.worksite',
                title: 'د کار ځای ساحه',
                type: 'basic',
                icon: 'feather:edit',
                link: 'account/work-site'
            },
            {
                id: 'account.accountJob',
                title: 'د دندو ډولونه',
                type: 'basic',
                icon: 'feather:edit',
                link: 'account/account-job'
            },
            {
                id: 'account.worklicense',
                title: 'د جواز ورکولو دفتر',
                type: 'basic',
                icon: 'feather:edit',
                link: 'account/work-license'
            },
            {
                id: 'currency.bankAccount',
                title: 'بانکي حسابونه',
                type: 'basic',
                icon: 'feather:edit',
                link: 'exchange/bank-account'
            },
            {
                id: 'exchange.worklicense',
                title: 'د معلوماتو بدلونونه',
                type: 'basic',
                icon: 'feather:edit',
                link: 'log-record'
            },
        ]
    },
    {
        id: 'common',
        title: 'مدیریت',
        subtitle: 'بخش های ضروری و مدیریت نرم افزار',
        type: 'group',
        icon: 'feather:settings',
        children: [
            {
                id: 'common.UserRole',
                title: 'د کارونکي رولونه',
                type: 'basic',
                link: 'basic/user/user-role',
                icon: 'feather:at-sign',
            },
            {
                id: 'common.User',
                title: 'کاروونکي',
                type: 'basic',
                link: 'basic/user',
                icon: 'feather:users',
            },
            {
                id: 'common.accessKeyUserRole',
                title: 'د کارونکي د لاسرسي کچې',
                type: 'basic',
                link: 'basic/user/access-role-user',
                icon: 'feather:unlock',
            },
            {
                id: 'common.accessKeyUserRole',
                title: 'د څانګې لاسرسی',
                type: 'basic',
                link: 'basic/user/access-branch',
                icon: 'feather:unlock',
            },
            {
                id: 'common.accessKeyProvince',
                title: 'د ولایتي راپور ورکولو کچه',
                type: 'basic',
                link: 'basic/user/access-province',
                icon: 'feather:unlock',
            },
            {
                id: 'common.CountryProviceCity',
                title: 'ولایت او ښار',
                type: 'basic',
                link: 'basic/province-city',
                icon: 'feather:users',
            },
            {
                id: 'common.chart-organ',
                title: 'سازماني چارټ',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'account/chart-organ'
            },
            {
                id: 'common.share-holder',
                title: 'ونډه لرونکي',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'account/share-holder'
            },
        ]
    },

];
export const compactNavigation_pa: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'د معلوماتو بورډ',
        tooltip: 'داشبورد نرم افزار',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/index-info',
    },

    {
        id: 'Account',
        title: 'د پیرودونکي حساب',
        tooltip: 'اکانت مشتری های صرافی',
        type: 'aside',
        icon: 'feather:users',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'TransferCash',
        title: 'مالي معاملې',
        tooltip: 'معاملات مالی شعبه ها',
        type: 'aside',
        icon: 'feather:clipboard',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'report',
        title: 'راپورونه',
        tooltip: 'راپورهای سیستم ',
        type: 'aside',
        icon: 'feather:pie-chart',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'link',
        title: 'لینکونه',
        type: 'aside',
        icon: 'feather:inbox',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'accounting',
        title: 'محاسبه',
        type: 'aside',
        icon: 'feather:inbox',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'reporBank',
        title: 'مالي بیان',
        type: 'aside',
        icon: 'feather:inbox',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'exchange',
        title: 'د ادارې ترتیبات',
        type: 'aside',
        icon: 'feather:inbox',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'common',
        title: 'مدیریت',
        tooltip: 'بخش های مدیریتی نرم افزار',
        type: 'aside',
        icon: 'feather:settings',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation_pa: FuseNavigationItem[] = [
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
export const horizontalNavigation_pa: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'ډیسک',
        type: 'basic',
        icon: 'feather:home',
        link: '/index-info',
        //children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'att',
        title: 'حاضري او غیر حاضري',
        tooltip: 'نرم افزار جامع حضور و غیاب',
        type: 'aside',
        icon: 'feather:calendar',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'leave',
        title: 'د پیسو بیلانس پریږدئ',
        tooltip: 'مدیریت مانده مرخصی',
        type: 'aside',
        icon: 'feather:book-open',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'salary',
        title: 'معاش او معاشونه',
        tooltip: 'مدیریت حقوق و دستمزد',
        type: 'aside',
        icon: 'feather:dollar-sign',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'sms',
        title: 'د ایس ایم ایس لیږلو سیسټم',
        tooltip: 'مدیریت پیامک ها',
        type: 'aside',
        icon: 'feather:dollar-sign',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'report',
        title: 'راپورونه',
        tooltip: 'گزارشات نرم افزار حضور و غیاب',
        type: 'aside',
        icon: 'feather:pie-chart',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },

    {
        id: 'link',
        title: 'لینکونه',
        tooltip: '',
        type: 'aside',
        icon: 'feather:pie-chart',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'common',
        title: 'مدیریت',
        tooltip: 'بخش های مدیریت نرم افزار',
        type: 'aside',
        icon: 'feather:settings',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
