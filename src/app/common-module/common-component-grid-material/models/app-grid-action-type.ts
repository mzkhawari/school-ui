import { ActionTypeGrid } from "./action-type";


export class ActionTypes  {

    constructor(
        public isAdd?: ActionTypeGrid,
        public isEdit?: ActionTypeGrid,
        public isDelete?: ActionTypeGrid,
        public isDetail?: ActionTypeGrid,
        public isDetail2?: ActionTypeGrid,
        public isPrint?: ActionTypeGrid,
        public isDetail3?: ActionTypeGrid,        
    ) { 
    }
}
