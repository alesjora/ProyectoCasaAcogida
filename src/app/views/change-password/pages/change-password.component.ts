import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { ChangePasswordService } from '../service/change-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { CheckTokenService } from 'src/app/shared/services/check-token.service';
import { LogoutService } from 'src/app/shared/services/logout.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  hide = true;
  public show: boolean = false;
  private token: string;
  changePasswordForm = this.fb.group({
    password: ['', [Validators.required]],
    confirmPassword: ['', [Validators.required]]
  },
    { validator: CustomValidators.passwordMatcherValidator('password', 'confirmPassword') });

  constructor(private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private changePasswordService: ChangePasswordService,
    private checkTokenService: CheckTokenService,
    private router: Router,
    private snackBarService: SnackBarService,
    private logoutService: LogoutService) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.params.token;
    this.checkTokenService.sendToken({ token: this.token }).subscribe((response) => {
      if (!response) {
        this.logoutService.goToLoginWithMessage('TOKEN_EXPIRED');
      } else {
        this.show = true;
      }
    });
  }

  get password() {
    return this.changePasswordForm.get('password');
  }

  get confirmPassword() {
    return this.changePasswordForm.get('confirmPassword');
  }

  sendPassword() {
    const json = {
      token : this.token,
      password : this.password.value
    };
    this.changePasswordService.sendPassword(json).subscribe(this.sendPasswordSuccess.bind(this),
    this.snackBarService.showSnackbar.bind(this, 'Error al cambiar la contraseña, inténtelo de nuevo', 1000, 'bottom', 'error'));
  }

  sendPasswordSuccess(response) {
    switch (response.status) {
      case 'PASSWORD_CHANGED':
        this.logoutService.goToLoginWithMessage('PASSWORD_CHANGED');
        break;
      case 'PASSWORD_ERROR':
        this.snackBarService.showSnackbar('Error al cambiar la contraseña, inténtelo de nuevo', 1000, 'bottom', 'error');
        break;
      default:
        this.logoutService.goToLoginWithMessage('TOKEN_EXPIRED');
        break;
    }
  }
}
