
// TODO: Refactor
export class DefaultInstitution {
    _id: string;
    stateShort: string;
    name1: string;
    name2: string;
    location: string;
    address1: {
        street: string,
        city: string
    };
    address2: {
        street: string,
        city: string
    };
    phone: string;
    fax: string;
    email: Array<string>;

    constructor(entry: any) {
        this._id = entry._id;
        this.stateShort = entry.stateShort || '';
        this.name1 = entry.name1;
        this.name2 = entry.name2;
        this.location = entry.location;
        this.address1 = entry.address1;
        this.address2 = entry.address2;
        this.phone = entry.phone;
        this.fax = entry.fax;
        this.email = entry.email;
    }

    toString = (): string => {
        let name = this.name1;
        if (this.name2) {
            name = name + ', ' + this.name2;
        }
        name = name + ', ' + this.location;

        return name;
    }

}
