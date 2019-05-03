import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;
  show: boolean = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private snackBarService: SnackBarService, private loginService: LoginService, private router: Router) { }

  get email() {
    return this.loginForm.get('email');
  }

  get password() {
    return this.loginForm.get('password');
  }

  ngOnInit() {
    if(sessionStorage.getItem('token')) {
      this.router.navigate(['dashboard']);
      return;
    }
    this.show = true;
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
      case 'SESSION_EXPIRED':
        this.snackBarService.showSnackbar('La sesión ha expirado. Por favor, inicie de nuevo sesión', 2000, 'bottom', 'error');
        break;
    }
  }

  login() {
    const data = {
      email : this.email.value,
      password : this.password.value
    };
    this.loginService.login(data).subscribe(this.loginSuccess.bind(this),
    this.snackBarService.showSnackbar.bind(this, 'Error al conectar con el servidor', 1000, 'bottom', 'error'));
  }

  loginSuccess(response) {
    if (!response) {
      this.snackBarService.showSnackbar('Email o contraseña incorrectos', 1500, 'bottom', 'error');
    } else {
      sessionStorage.setItem('token', response);
      this.goToDashboard();
    }
  }

  goToDashboard(){
    this.router.navigate(['dashboard']);
  }
}
