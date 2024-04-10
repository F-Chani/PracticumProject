import { PositionEmployee } from "./PositionEmployee.model";

export class Employee {

    id!: number;
    identity!: string;
    firstName!: string;
    lastName!: string;
    startOfWorkDate!: Date;
    dateOfBirth!: Date;
    gender!: number;
    positionEmployees!: PositionEmployee[];

}