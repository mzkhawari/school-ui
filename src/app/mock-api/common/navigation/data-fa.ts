import { FuseNavigationItem } from '@fuse/components/navigation';

export const defaultNavigation: FuseNavigationItem[] = [
    {
        id: 'index.dashboard',
        title: 'لوحه معلومات',
        subtitle: 'صرافی در یک نگاه',
        type: 'basic',
        icon: 'feather:home',
        link: '/index-info',
    },
    {
        id: 'student',
        title: 'لیست دانش آموزان ها',
        subtitle: 'لیست دانش آموزان ها',
        type: 'group',
        icon: 'feather:users',
        children: [
            {
                id: 'student.studentList',
                title: 'لیست دانش آموزان',
                type: 'basic',
                icon: 'feather:list',
                link: 'student/students'
            },
            {
                id: 'student.studentAdd',
                title: 'حضور دانش آموز',
                type: 'basic',
                icon: 'feather:plus-circle',
                link: 'student/student/add'
            },
                                   
        ]
    },
    {
        id: 'classinfo',
        title: 'مدیریت کلاس ها',
        subtitle: 'مدیرت کلاس ها',
        type: 'group',
        icon: 'feather:pie-chart',
        children: [
            {
                id: 'report.transfer-cash',
                title: ' دوره های زمانی ',
                type: 'basic',
                link: 'class/period-list',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-info',
                title: 'کلاس ها ',
                type: 'basic',
                link: 'class/class-info',
                icon: 'feather:report',
            },
   
        ]
    },
    {
        id: 'report',
        title: 'گزارش ها',
        subtitle: 'گزارش ها سیستم',
        type: 'group',
        icon: 'feather:pie-chart',
        children: [
            {
                id: 'report.transfer-cash',
                title: ' گزارش دانش آموز ها ',
                type: 'basic',
                link: 'report/report-transfer-cash',
                icon: 'feather:report',
            },
            {
                id: 'report.transfer-info',
                title: ' گزارش حضور دانش آموز ',
                type: 'basic',
                link: 'report/report-transfer-info',
                icon: 'feather:report',
            },

            {
                id: 'report.presence-absence',
                title: ' گزارش حضور و غیاب ',
                type: 'basic',
                link: 'report/presence-absence',
                icon: 'feather:report',
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
                title: ' نقش کاربران ',
                type: 'basic',
                link: 'basic/user/user-role',
                icon: 'feather:at-sign',
            },
            {
                id: 'common.User',
                title: 'کاربران',
                type: 'basic',
                link: 'basic/user',
                icon: 'feather:users',
            },
            {
                id: 'branch.branches',
                title: 'شعبه ها',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'branch/branches'
            },
            {
                id: 'common.accessKeyUserRole',
                title: 'سطوح دسترسی کاربر',
                type: 'basic',
                link: 'basic/user/access-role-user',
                icon: 'feather:unlock',
            },
            {
                id: 'common.accessKeyUserRole',
                title: 'دسترسی شعبه ها',
                type: 'basic',
                link: 'basic/user/access-branch',
                icon: 'feather:unlock',
            },
            // {
            //     id: 'common.accessKeyProvince',
            //     title: 'سطوح راپور ولایات',
            //     type: 'basic',
            //     link: 'basic/user/access-province',
            //     icon: 'feather:unlock',
            // },
            // {
            //     id: 'common.CountryProviceCity',
            //     title: 'ولایت و شهر',
            //     type: 'basic',
            //     link: 'basic/province-city',
            //     icon: 'feather:users',
            // },
            {
                id: 'common.chart-organ',
                title: 'چارت سازمانی',
                type: 'basic',
                icon: 'heroicons_outline:shopping-cart',
                link: 'account/chart-organ'
            },            
        ]
    },

];
export const compactNavigation: FuseNavigationItem[] = [
    {
        id: 'dashboards',
        title: 'صفحه داشبورد',
        tooltip: 'داشبورد نرم افزار',
        type: 'basic',
        icon: 'heroicons_outline:home',
        link: '/index-info',
    },

    {
        id: 'student',
        title: 'دانش آموزان ها',
        tooltip: 'لیست دانش آموزان ها',
        type: 'aside',
        icon: 'feather:users',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'report',
        title: 'گزارش ها',
        tooltip: 'گزارشهای سیستم ',
        type: 'aside',
        icon: 'feather:pie-chart',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    {
        id: 'classinfo',
        title: 'مدیریت کلاس ها',
        type: 'aside',
        icon: 'feather:inbox',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
    // {
    //     id: 'exchange',
    //     title: 'تنظیمات ادمین',
    //     type: 'aside',
    //     icon: 'feather:inbox',
    //     children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    // },
    {
        id: 'common',
        title: 'مدیریت',
        tooltip: 'بخش های مدیریتی نرم افزار',
        type: 'aside',
        icon: 'feather:settings',
        children: [] // This will be filled from defaultNavigation so we don't have to manage multiple sets of the same navigation
    },
];
export const futuristicNavigation: FuseNavigationItem[] = [
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
export const horizontalNavigation: FuseNavigationItem[] = [
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
