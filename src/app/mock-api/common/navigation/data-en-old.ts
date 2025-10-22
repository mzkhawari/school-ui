/* eslint-disable */
import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation_en_old: FuseNavigationItem[] = [
    {
        id: 'index.dashboard',
        title: 'Information',
        subtitle: 'Exchange Status Total',
        type: 'basic',
        icon: 'feather:home',
        link: '/index-info',
    },
    {
        id: 'Account',
        title: 'اکانت مشتری',
        subtitle: 'اکانتهای مشتریان',
        type: 'group',
        icon: 'feather:users',
        children: [
            {
                id: 'Account.AccountList',
                title: 'Account List (Individual)',
                type: 'basic',
                icon: 'feather:list',
                link: 'exchange/accounts'
            },
            {
                id: 'Account.AccountAdd',
                title: 'Add Account (Individual)',
                type: 'basic',
                icon: 'feather:plus-circle',
                link: 'exchange/account/add'
            },
            {
                id: 'Account.AccountLegalList',
                title: 'Account List (Corporate)',
                type: 'basic',
                icon: 'feather:list',
                link: 'exchange/accounts-legal'
            },
            {
                id: 'Account.AccountAddLegal',
                title: 'Add Account (Corporate)',
                type: 'basic',
                icon: 'feather:plus-circle',
                link: 'exchange/account-legal/add'
            },
            {
                id: 'Account.AccountPartnerList',
                title: 'Account List (Partner)',
                type: 'basic',
                icon: 'feather:list',
                link: 'exchange/account-partner'
            },
            {
                id: 'Account.AccountAddPartner',
                title: 'Add Account (Partner)',
                type: 'basic',
                icon: 'feather:plus-circle',
                link: 'exchange/account-partner/add'
            },
        ]
    },
    {
        id: 'TransferCash',
        title: 'معاملات',
        subtitle: 'معاملات مشتریان',
        type: 'group',
        icon: 'feather:doller-sign',
        children: [
            {
                id: 'TransferCash.TransactionList',
                title: 'TransferCash List',
                type: 'basic',
                icon: 'feather:list',
                link: 'exchange/transfer-cashs',
            },            
            {
                id: 'TransferCash.TransactionAdd',
                title: 'Add TransferCash',
                type: 'basic',
                icon: 'feather:plus',
                link: 'exchange/transfer-cash/add',
            },
            {
                id: 'TransferCash.TransactionRecive',
                title: 'Recieve TransferCash',
                type: 'basic',
                icon: 'feather:upload',
                link: 'exchange/transaction-recive',
            },
            {
                id: 'TransferCash.TransactionReject',
                title: 'Rejected TransferCash',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cashs/reject',
            },
            {
                id: 'TransferCash.TransactionComplete',
                title: 'Complated TransferCash',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transfer-cashs/complete',
            },
            {
                id: 'TransferCash.TransactionSuspicious',
                title: 'Susicious TransferCash',
                type: 'basic',
                icon: 'feather:skip-back',
                link: 'exchange/transaction-suspicious',
            },
        ]
    },
    {
        id: 'report',
        title: 'راپورها',
        subtitle: 'راپورها سیستم',
        type: 'group',
        icon: 'feather:pie-chart',
        children: [
            {
                id: 'report.transfer-cash',
                title: 'TransferCash Report',
                type: 'basic',
                link: 'report/report-transfer-cash',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-info',
                title: 'TransferCash Info Report',
                type: 'basic',
                link: 'report/report-transfer-info',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-cash-personly',
                title: 'TransferCash Report Personly ',
                type: 'basic',
                link: 'report/report-transfer-cash-personly',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-cash',
                title: ' Exchange Report',
                type: 'basic',
                link: 'report/report-exchange',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-cost-benefit',
                title: ' Cost & Benefit TransferCash Report',
                type: 'basic',
                link: 'report/report-cost-benefit',
                icon: 'feather:report',
            },

            {
                id: 'report.report-finance-branch',
                title: ' Report Finance Report',
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
            // {
            //     id: 'report.transaction-treasury-amount',
            //     title: ' راپور خزانه تفکیک شده ',
            //     type: 'basic',
            //     link: 'report/report-treasury-amount',
            //     icon: 'feather:report',
            // },
            {
                id: 'report.transaction-treasury-amount-total',
                title: ' راپور خزانه جمعی  ',
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
                title: ' راپور اکانت مشتریان حقیقی(انفرادی)   ',
                type: 'basic',
                link: 'report/report-customer-account',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-customer-account-company',
                title: ' راپور اکانت مشتری حکمی(شرکتی)  ',
                type: 'basic',
                link: 'report/report-customer-account-company',
                icon: 'feather:report',
            },
            {
                id: 'report.transaction-customer-account-check',
                title: ' راپور اکانت مشتریان ناقص   ',
                type: 'basic',
                link: 'report/report-customer-account-check',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-diagram',
                title: 'Transaction Diagram',
                type: 'basic',
                link: 'report/report-transfer-diagram',
                icon: 'feather:report',
            },
            {
                id: 'report.Profit-diagram',
                title: 'Profit Diagram',
                type: 'basic',
                link: 'report/report-profit-diagram',
                icon: 'feather:report',
            },
        ]
    },
    {
        id: 'link',
        title: 'لینک ها',
        subtitle: 'لینک های بانک مرکزی',
        type: 'group',
        icon: 'feather:report',
        children: [
            {
                id: 'link.report-fintra',
                title: ' راپور فینتراکا ',
                type: 'basic',
                link: 'basic/user/url-redirect/1',
                icon: 'feather:link',
            },
            {
                id: 'link.tazirat',
                title: ' تعزیرات ',
                type: 'basic',
                link: 'basic/user/url-redirect/2',
                icon: 'feather:link',
            },

        ]
    },
    {
        id: 'accounting',
        title: 'حسابداری',
        subtitle: '',
        type: 'group',
        icon: 'feather:report',
        children: [
            {
                id: 'accounting.treasuriesview',
                title: 'Treasure Information',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-view'
            },
            {
                id: 'accounting.treasury-amount-category',
                title: 'Treasure Category',
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
                title: 'لیست دفتر روزنامه',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-list'
            },
            {
                id: 'accounting.treasury-amount-list-journal',
                title: 'ثبت جورنال',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal/0'
            },
            {
                id: 'accounting.treasury-amount-list-journal-1',
                title: 'ثبت دارایی',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal/11'
            },
            {
                id: 'accounting.treasury-amount-list-journal-2',
                title: 'ثبت سرمایه',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal/12'
            },
            {
                id: 'accounting.treasury-amount-list-journal-3',
                title: 'ثبت مصارف/بدهی',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-amount-journal/13'
            },
            {
                id: 'accounting.treasuriesviewshift',
                title: 'بستن شیفت',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/treasury-view-shift'
            },
            {
                id: 'accounting.shiftinfolist',
                title: 'شیفت های شعبه',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/shiftinfo-list'
            },
        ]
    },
    {
        id: 'reporBank',
        title: 'صورت حساب مالی',
        subtitle: '',
        type: 'group',
        icon: 'feather:report',
        children: [
            {
                id: 'reporBank.reportProfitLoss',
                title: ' راپور سود و زیان ',
                type: 'basic',
                link: 'exchange/treasury-report/profit-loss',
                icon: 'feather:link',
            },
            {
                id: 'reporBank.reportProfitLoss',
                title: ' راپور بیلانس شیت ',
                type: 'basic',
                link: 'exchange/treasury-report/balance',
                icon: 'feather:link',
            },
            {
                id: 'reporBank.reportProfitLoss',
                title: ' راپور بیلانس روزانه ',
                type: 'basic',
                link: 'exchange/treasury-report/end-shift',
                icon: 'feather:link',
            },
        ]
    },
    {
        id: 'exchange',
        title: 'تنطیمات مدیریتی',
        subtitle: 'تنطیمات مدیریتی',
        type: 'group',
        icon: 'feather:dollar-sign',
        children: [
            {
                id: 'exchange.exchangecurrency',
                title: 'Currency',
                type: 'basic',
                icon: 'feather:edit',
                link: 'exchange/currencies'
            },
            {
                id: 'exchange.exchangecurrency.buysell',
                title: 'Currency Exchange Rate',
                type: 'basic',
                icon: 'feather:edit',
                link: 'exchange/currency-buy-sell'
            },
            // {
            //     id: 'exchange.userbranches',
            //     title: 'کاربران شعبه ',
            //     type: 'basic',
            //     icon: 'heroicons_outline:shopping-cart',
            //     link: 'basic/user'
            // }, 
            {
                id: 'exchange.branches',
                title: 'Branch List',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/branches'
            },
            {
                id: 'exchange.worksite',
                title: 'Work Site',
                type: 'basic',
                icon: 'feather:edit',
                link: 'exchange/work-site'
            },
            {
                id: 'exchange.accountJob',
                title: 'Account Job',
                type: 'basic',
                icon: 'feather:edit',
                link: 'exchange/account-job'
            },
            {
                id: 'exchange.worklicense',
                title: 'اداره صدور جواز',
                type: 'basic',
                icon: 'feather:edit',
                link: 'exchange/work-license'
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
                title: ' User Role ',
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
                title: 'User Access Role',
                type: 'basic',
                link: 'basic/user/access-role-user',
                icon: 'feather:unlock',
            },
            {
                id: 'common.CountryProviceCity',
                title: 'Province & District',
                type: 'basic',
                link: 'basic/province-city',
                icon: 'feather:users',
            },
            {
                id: 'common.chart-organ',
                title: 'Organization Chart',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/chart-organ'
            },
            {
                id: 'common.share-holder',
                title: 'Share Holder',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'exchange/share-holder'
            },
        ]
    },

];
export const compactNavigation_en_old: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'Dashboard',
        tooltip: 'Dashboard Exchange',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/index-info',
    },

    {
        id: 'Account',
        title: 'Customer Details',
        tooltip: 'All Customer Account',
        type: 'aside',
        icon: 'feather:users',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'TransferCash',
        title: 'Financial transfer-cash',
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
        title: 'Financial Statements',
        type: 'aside',
        icon: 'feather:inbox',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'exchange',
        title: 'Admin Setting',
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
export const futuristicNavigation_en_old: FuseNavigationItem[] = [
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
export const horizontalNavigation_en_old: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'میزکار',
        type: 'basic',
        icon: 'feather:home',
        link: '/index-info',
        //children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'att',
        title: 'حضور و غیاب',
        tooltip: 'نرم افزار جامع حضور و غیاب',
        type: 'aside',
        icon: 'feather:calendar',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'leave',
        title: 'مانده مرخصی',
        tooltip: 'مدیریت مانده مرخصی',
        type: 'aside',
        icon: 'feather:book-open',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'salary',
        title: 'حقوق و دستمزد',
        tooltip: 'مدیریت حقوق و دستمزد',
        type: 'aside',
        icon: 'feather:dollar-sign',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'sms',
        title: 'سامانه ارسال پیامک',
        tooltip: 'مدیریت پیامک ها',
        type: 'aside',
        icon: 'feather:dollar-sign',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'report',
        title: 'گزارشات',
        tooltip: 'گزارشات نرم افزار حضور و غیاب',
        type: 'aside',
        icon: 'feather:pie-chart',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },

    {
        id: 'link',
        title: 'لینک ها',
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
