import { BehaviorSubject } from "rxjs";
import { PersonDto } from "./models/person.dto.js";
import { AccessItemDto } from "./models/access-item.dto.js";
import { UserDto } from "./models/web-site/user.dto.js";
import { isDevMode } from "@angular/core";

/**جهت نگهداری متغییرهای عمومی و ثابت */
export default class Globals {

    public static findAccessKey(): AccessItemDto[] {

        let data = localStorage.getItem('currentUser');
        if (data !== undefined && data !== "") {
            let currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(data));
            if (currentUserSubject == undefined || currentUserSubject == null || currentUserSubject.value == null) {
                //window.location.href ='auth/sign-in';      
                return;
            }
            let custInfo = currentUserSubject.value.accessKey;
            return custInfo ?? [];
        }
        return [];
    }

    public static findUserInfo(): any {

        let data = localStorage.getItem('currentUser');
        if (data !== undefined && data !== "") {
            let currentUserSubject = new BehaviorSubject<UserDto>(JSON.parse(data));
            let user = currentUserSubject.value;
            return user;
        }
        return {};
    }

    public static currentUser: PersonDto;
    public static accessToken: string;
    public static softLevel: number;

    //private  ;//  "https://localhost:44375/api/" ;// "http://127.0.0.1/api/";
    private static _apiServer = "/";   // ""http://192.168.255.170:8088/"; //  "http://127.0.0.1/";  25.0.0.3    ; 172.16.2.1


    // static get api(){
    //     return this._apiUrl;
    // }
    static get urlServer() {
        if (isDevMode()) {
            return "https://localhost:7132/";
        } else {
            //return "http://192.168.200.240:7132/"; //  "https://test-ui.azi.af/";// "http://23.111.132.93:2000/";// "https://test-ui.azi.af:1200/" ;//"https://173.249.57.172:7701/";
            return  "http://192.168.200.240:7132/"; //  "http://2.180.24.39:7132/"; //"http://192.168.200.240:7132/"
        }
    }

    static get urlServerNotify() {
        if (isDevMode()) {
            return "https://localhost:7132/";
        } else {
            //return "http://192.168.200.240:7132/"; //  "https://test-ui.azi.af/";// "http://23.111.132.93:2000/";// "https://test-ui.azi.af:1200/" ;//"https://173.249.57.172:7701/";
            return "http://192.168.200.240:7132/" ;// "http://2.180.24.39:7132/"; //"http://192.168.200.240:7132";
        }
    }
    // static get baseApiUrl(){
    //     return this._baseApiUrl;
    // }


    static get UrlVitrin() {
        return "api/vitrin/";
    }

    static get UrlVitrinSetting() {
        return "api/VitrinSetting/";
    }


    static get UrlCountryProvinceCity() {
        return "api/CountryProvinceCity/";
    }

    static get UrlAuth() {
        return "api/auth/";
    }
    static get UrlRefreshtoken() {
        return "api/auth/refreshToken";
    }
    static get UrlDressInfo() {
        return "api/dressInfo/";
    }
    static get UrlDressPic() {
        return "api/dressPic/";
    }


    static get UrlNews() {
        return "api/news/";
    }
    static get UrlCategory() {
        return "api/category/";
    }




    static get UrlAboutUs() {
        return "api/aboutUs/";
    }
    static get UrlBranch() {
        return "api/branch/";
    }
    static get UrlBranchUser() {
        return "api/branchUser/";
    }
    static get UrlCurrency() {
        return "api/currency/";
    }
    static get UrlWorkSite() {
        return "api/WorkSite/";
    }
    static get UrlApplicantJob() {
        return "api/AccountJob/";
    }
    static get UrlWorkLicense() {
        return "api/WorkLicense/";
    }
    static get UrlCurrencyPair() {
        return "api/currencyPair/";
    }
    static get UrlCurrencyBuySell() {
        return "api/currencyBuySell/";
    }
    static get UrlApplicant() {
        return "api/Applicant/";
    }
    static get UrlApplicantPersent() {
        return "api/ApplicantPersent/";
    }

    static get UrlStudent() {
        return "api/Student/";
    }
    static get UrlStudentPersent() {
        return "api/StudentPersent/";
    }
    

    static get UrlApplicantPersentReport() {
        return "api/ApplicantPersentReport/";
    }
    static get UrlAttachmentFile() {
        return "api/attachmentFile/";
    }
    static get UrlCustomer() {
        return "api/Customer/";
    }
    static get UrlLicense() {
        return "api/license/";
    }
    static get UrlTransaction() {
        return "api/transferCash/";
    }
    static get UrlTransactionSuspicious() {
        return "api/transferCashSuspicious/";
    }
    static get UrlTransactionSuspiciousProcess() {
        return "api/transferCashSuspiciousProcess/";
    }
   
    static get UrlTransactionProcess() {
        return "api/transferCashProcess/";
    }
    static get UrlFinanceAmountProcess() {
        return "api/financeAmountProcess/";
    }
    static get UrlExchangeCurrency() {
        return "api/exchangecurrency/";
    }
    static get UrlContactUs() {
        return "api/contactUs/";
    }//ContactUs
    static get UrlSettingWeb() {
        return "api/SettingWeb/";
    }
    static get UrlSlider() {
        return "api/slider/";
    }//slider

    static get UrlWebpageInfo() {
        return "api/WebpageInfo/";
    }

    static get UrlShiftInfo() {
        return "api/shiftInfo/";
    }    
    static get UrlTreasury() {
        return "api/treasury/";
    }
    static get UrlTreasuryAccountBank() {
        return "api/treasuryAccountBank/";
    }
    static get UrlFinanceAmount() {
        return "api/financeAmount/";
    }
    static get UrlFinanceMaster() {
        return "api/financeMaster/";
    }    
    static get UrlFinanceAmountPartialPayment() {
        return "api/financeAmountPartialPayment/";
    }
    static get UrlFinanceAmountPartialPaymentDetail() {
        return "api/financeAmountPartialPaymentDetail/";
    }
    static get UrlFinanceClearingBranch() {
        return "api/financeClearingBranch/";
    }  
    static get UrlApplicantingCode() {
        return "api/accountingCode/";
    }

    static get UrlChartOrgan() {
        return "api/chartOrgan/";
    }

    static get UrlShareHolder() {
        return "api/shareholder/";
    }





    static get UrlAccessKey() {
        return "api/AccessKey/";
    }
    static get UrlAccessKeyProvince() {
        return "api/AccessKeyProvince/";
    }
    static get UrlAccessKeyBranch() {
        return "api/AccessKeyBranch/";
    }
    static get UrlAccessKeyRoleUser() {
        return "api/AccessKeyRoleUser/";
    }
    static get UrlUser() {
        return "api/User/";
    }
    static get UrlUserRole() {
        return "api/UserRole/";
    }
    static get UrlDataRecord() {
        return "api/DataRecord/";
    }
    static get UrlLogRecord() {
        return "api/log/";
    }
    static get UrlUserType() {
        return "api/UserType/";
    }
    static get UrlUserTypeUser() {
        return "api/UserTypeUser/";
    }


    static get UrlFinanceMasterReport() {
        return "api/report/financeMasterReport/";
    }
    static get UrlTransactionSuspiciousReport() {
        return "api/report/transferCashSuspiciousReport/";
    }
    static get UrlBranchReport() {
        return "api/report/branchReport/";
    }
    static get UrlShiftInfoReport() {
        return "api/report/shiftInfoReport/";
    }
    static get UrlTreasuryReport() {
        return "api/report/treasuryReport/";
    }
    static get UrlTransactionReport() {
        return "api/report/transferCashReport/";
    }
    static get UrlApplicantReport() {
        return "api/report/accountReport/";
    }
    static get UrlFinanceYear() {
        return "api/financeyear/";
    }


    constructor() {
    }

    static get UrlPeriod() {
        return "api/Period/";
    }

    static get UrlPeriodDay() {
        return "api/PeriodDay/";
    }

    static get UrlClassInfo() {
        return "api/ClassInfo/";
    }
    static get UrlClassTime() {
        return "api/ClassTime/";
    }

    static get UrlStudentClassInfo() {
        return "api/StudentClassInfo/";
    }



}
