import { AccessItemDto } from './access-item.dto';
import { BaseModelDto } from './base-model.dto';
import { CustomerInfoDto } from './Base/customer-info.dto';
import { TokenDto } from './web-site/token.dto';
export class PersonDto extends BaseModelDto  {

    constructor(
        public Id? : number,
        public FirstName?: string,
        public LastName?: string,
        public PersonCode?: number,
        public CardTypeId?:number,
        public FatherName?:string,
        public IdCard?:string,

        public BirthDay?:Date,
        public MarridDate?:Date,
        public PlaceIssue?:string,
        public Religion?:string,
        public Religion2?:string,
        public NumberDependent?:string,
        public HasInsurance?:boolean,
        public InsuranceYear?:number,        
        public InsuranceTypeId?:number,
        public InsuranceNumber?:string,

        public IsActive?:boolean,
        public Description?:string,
        public Address?:string,
        public DeviceCodeId?:number,
        public IsIrani?:boolean,
        public JobStatusId?:number,
        public OperationTypeId?:number,
        public MaritalStatusId?:number,
        public MilitaryServiceStatusId?:number,
        public NationalCountry?:string,
        public PhysicalConditionId?:number,
        public PostalCode?:string,
        public ChildernCount?:number,
        public LocalTable?:string,
        public LocalTablePart?:string,
        public PlaceBirth?:string,



        public Email?: string,
        public CellPhone?: string,
        public Phone?: string,
        public IsSuperAdmin?: boolean,
        public IsClientUser?: boolean,
        public UserName?: string,
        public Password?: string,
        public BrithDay?: Date,
        public NationalCode?: string,
        public AvatarPerson?:string,
        public Sex?:string,
        public rememberMe?:boolean,
        public confirmPassword?:boolean,
        public FullName?:string,
        public LeaveJob?:Date,
        public StartJob?:Date,
        public IsLeaveJob?:boolean,
        
        public Token?:TokenDto,
        public AccessKey?:AccessItemDto[],
        public SoftLevel?:number,
        public CustomerInfo?:CustomerInfoDto,
        public LastEducationDegreeId?:number,
        public OrganChartId?:number,
        public ContractTypeId?:number,

        
        public CityId?:number,
        //public City?:CountryProvinceCityDto,

        public ProvinceId?:number,
        //public Province?:CountryProvinceCityDto,    

        public CountryId?:number,
       // public Country?:CountryProvinceCityDto,

        public BirthDayFa?:Date,
        public MarridDateFa?:Date,
        
    ) { 
        super();
    }
    
    
    
}
