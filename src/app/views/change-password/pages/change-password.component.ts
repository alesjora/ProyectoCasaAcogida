import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { ChangePasswordService } from '../service/change-password.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

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
    private router: Router,
    private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.params.token;
    this.changePasswordService.sendToken({ token: this.token }).subscribe((response) => {
      if (!response) {
        this.goToLogin('TOKEN_EXPIRED');
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

  goToLogin(accion) {
    this.router.navigate(['/']);
    sessionStorage.setItem('action', accion);
  }

  sendPassword() {
    const json = {
      token : this.token,
      password : this.password.value
    };
    this.changePasswordService.sendPassword(json).subscribe(this.sendPasswordSuccess.bind(this),
    this.snackBarService.showSnackbar.bind(this, 'Error al cambiar la contraseña, inténtelo de nuevo', 1000, 'bottom', 'error'));
  }

  sendPasswordSuccess(success) {
    if (!success) {
      this.snackBarService.showSnackbar('Error al cambiar la contraseña, inténtelo de nuevo', 1000, 'bottom', 'error');
      return;
    }
    this.goToLogin('PASSWORD_CHANGED');
  }
}
