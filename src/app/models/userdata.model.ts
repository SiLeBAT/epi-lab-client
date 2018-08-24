import { IUserData } from './models';

export class UserData implements IUserData {
    _id: string;
    department: string;
    contact: string;
    phone: string;
    email: string;

    constructor(
        department: string,
        contact: string,
        phone: string,
        email: string
    ) {
        this.department = department;
        this.contact = contact;
        this.phone = phone;
        this.email = email;
    }

}
