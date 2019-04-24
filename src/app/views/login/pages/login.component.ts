import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  constructor(private fb: FormBuilder, private snackBarService: SnackBarService) { }

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
}
