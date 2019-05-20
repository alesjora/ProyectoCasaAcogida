import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ForgotPasswordService } from '../service/forgot-password.service';
import { MatSnackBar } from '@angular/material';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private forgotPasswordService: ForgotPasswordService, private snackBarService: SnackBarService ) { }

  get email() {
    return this.forgotForm.get('email');
  }

  ngOnInit() {
  }

  sendEmail() {
    this.forgotPasswordService.sendEmail({ email: this.email.value }).subscribe(this.sendEmailSuccess.bind(this)
      );
  }

  sendEmailSuccess(success) {
    if (success) {
      this.snackBarService.showSnackbar('Correo enviado satisfactoriamente.' , 1000, 'bottom', 'success');
    } else {
      this.snackBarService.showSnackbar('El correo proporcionado no existe.', 1000, 'bottom', 'error');
    }
  }
}
