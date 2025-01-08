import { Staff } from "./StaffDTO";

export interface Schedule{
    _id:string;
    staff:Staff;
    shift:number;
    date:string;
}