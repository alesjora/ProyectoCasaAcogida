import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { ForgotPasswordService } from '../service/forgot-password.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  forgotForm = this.fb.group({
    email: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private forgotPasswordService: ForgotPasswordService, private snackBar: MatSnackBar) { }

  get email() {
    return this.forgotForm.get('email');
  }

  ngOnInit() {
  }

  sendEmail() {
    this.forgotPasswordService.sendEmail({ email: this.email.value }).subscribe(
      (succes) => {console.log(succes); this.showSnackbar.bind(this, 'Correo enviado satisfactoriamente.' , 1000, 'bottom', 'success')},
      this.showSnackbar.bind(this, 'Error al enviar el correo.', 1000, 'bottom', 'error')
      );
  }

  showSnackbar(mensaje, duracion, posicion, clase) {
    this.snackBar.open(mensaje, '',
      {
        duration: duracion,
        verticalPosition: posicion,
        panelClass: clase
      }
    );
  }

}
