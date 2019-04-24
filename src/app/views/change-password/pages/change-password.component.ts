import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { ChangePasswordService } from '../service/change-password.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router: Router) { }

  ngOnInit() {
    this.token = this.activatedRoute.snapshot.params.token;
    this.changePasswordService.sendToken({ token: this.token }).subscribe((response) => {
      if (!response) {
        this.router.navigate(['/']);
        sessionStorage.setItem('caducado', 'true');
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
}
