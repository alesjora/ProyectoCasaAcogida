import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { LoginService } from '../service/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private snackBarService: SnackBarService, private loginService: LoginService) { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    setTimeout(this.checkPreviousAction.bind(this), 1);
  }

  checkPreviousAction() {
    const action = sessionStorage.getItem('action');
    sessionStorage.removeItem('action');
    switch (action) {
      case 'TOKEN_EXPIRED':
        this.snackBarService.showSnackbar('El enlace ha expirado, solicite uno nuevo.', 2000, 'bottom', 'error');
        break;
      case 'PASSWORD_CHANGED':
        this.snackBarService.showSnackbar('Contraseña cambiada con éxito.', 2000, 'bottom', 'success');
        break;
    }
  }

  login() {
    if (this.loginForm.status === 'INVALID') {
      return;
    }
    const email = this.email.value;
    const password = this.password.value;
    const json = {
      email : email,
      password : password
    };
    this.loginService.login(json).subscribe(this.loginSuccess.bind(this),
    this.snackBarService.showSnackbar.bind(this, 'Error al conectar con el servidor', 1000, 'bottom', 'error'));
  }

  loginSuccess(response) {
    if (!response) {
      this.snackBarService.showSnackbar('Email o contraseña incorrectos', 1500, 'bottom', 'error');
    } else {
      console.log(response);
    }
  }
}
