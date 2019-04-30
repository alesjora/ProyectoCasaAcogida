import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StoreService } from '../services/store.service';

@Injectable({
  providedIn: 'root'
})
export class ConserjeGuard implements CanActivate {
  constructor(private storeService: StoreService, private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.storeService.getUserProfile() !== 'conserje') {
        this.router.navigate(['dashboard']);
        return false;
      }
    return true;
  }
}
