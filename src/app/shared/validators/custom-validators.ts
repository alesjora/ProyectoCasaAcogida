import { ValidatorFn, FormGroup, AbstractControl } from '@angular/forms';

export class CustomValidators {

    static passwordMatcherValidator(passwordKey: string, password2Key: string): ValidatorFn {
        return (group: FormGroup): { [key: string]: boolean } | null => {
            const password = group.controls[passwordKey].value;
            const password2 = group.controls[password2Key].value;
            return password !== password2 ? { matchPassword: true } : null;
        };
    }
    static namePersonSelectedValidator(persons: Array<any>, personalFileKey: string): ValidatorFn {
        return (control: AbstractControl): { [key: string]: boolean } | null => {
            const valueInput = control.value;
            // const password2 = group.controls[password2Key].value;
            const found = persons.find(value => {
                let nombre = value.name + ' ' + value.surname1 + ' ' + value.surname2;
                return value.name + ' ' + value.surname1 + ' ' + value.surname2 === valueInput;
            });
            // return password !== password2 ? { matchPassword: true } : null;
            return found ? null : { namePersonSelectedValidator: true };
        };
    }
}
