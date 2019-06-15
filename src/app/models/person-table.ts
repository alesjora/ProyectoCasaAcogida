export class PersonTable {
    constructor(key, name, surname1, surname2, avatar) {
        this.key = key;
        this.name = name;
        this.surname1 = surname1;
        this.surname2 = surname2;
        this.avatar = avatar;
        this.nameSearch = name + ' ' + surname1 + ' ' + surname2;

    }
    public key: number;
    public name: string;
    public surname1: string;
    public surname2: string;
    public avatar: string;
    public nameSearch: string;
}