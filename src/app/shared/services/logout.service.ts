import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LogoutService {

  constructor(private router: Router) { }

  public goToLogin() {
    this.router.navigate(['/']);
  }
  public goToLoginWithMessage(action) {
    this.logout();
    sessionStorage.setItem('action', action);
  }
  public logout() {
    sessionStorage.removeItem('token');
    this.goToLogin();
  }
}
