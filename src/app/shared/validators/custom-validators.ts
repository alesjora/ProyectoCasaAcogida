import { ValidatorFn, FormGroup } from '@angular/forms';

export class CustomValidators {

    static passwordMatcherValidator(passwordKey: string, password2Key: string): ValidatorFn {
        return (group: FormGroup): { [key: string]: boolean } | null => {
            let password = group.controls[passwordKey].value;
            let password2 = group.controls[password2Key].value;
            console.log(group.errors);
            return password !== password2 ? { matchPassword: true } : null;
        };
    }
}
