import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidatorFn } from '@angular/forms';

@Directive({
  selector: '[appPasswordMatcher]',
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordMatcherDirective,
    multi: true
  }]
})
export class PasswordMatcherDirective {
  passwordMatcherValidator(password: string, password2: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      return password !== password2 ? { value: control.value } : null;
    };
  }
}
