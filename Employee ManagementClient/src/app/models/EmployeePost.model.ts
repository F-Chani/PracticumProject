import { PositionEmployee } from "./PositionEmployee.model";

export class EmployeePost{
    identity!:string
    firstName!:string;
    lastName!: string;
    startOfWorkDate!:Date;
    dateOfBirth!:Date;
    gender!:string;
    positionEmployees!:PositionEmployee[];
}