export class PersonTable {
    constructor(key, name, surname, avatar, documentation) {
        this.key = key;
        this.name = name;
        this.surname = surname;
        this.avatar = avatar;
        this.documentation = documentation;
        this.nameSearch = name + ' ' + surname + ' ' + documentation;

    }
    public key: number;
    public name: string;
    public surname: string;
    public avatar: string;
    public documentation: string;
    public nameSearch: string;
}