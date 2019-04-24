import { ValidatorFn, FormGroup } from '@angular/forms';

export class CustomValidators {

    static passwordMatcherValidator(passwordKey: string, password2Key: string): ValidatorFn {
        return (group: FormGroup): { [key: string]: boolean } | null => {
            const password = group.controls[passwordKey].value;
            const password2 = group.controls[password2Key].value;
            return password !== password2 ? { matchPassword: true } : null;
        };
    }
}
