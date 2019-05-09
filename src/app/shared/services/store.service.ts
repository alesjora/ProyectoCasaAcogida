import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private user: User;
  private currentRoute = new Subject<string>();
  private comeFromNewEntry: boolean = false;

  constructor(private router: Router) { }

  public setUser(user: User) {
    this.user = user;
  }
  public getUser() {
    return this.user;
  }
  public getUserProfile() {
    return this.user.profile;
  }
  public getUserName() {
    return this.user.user_name;
  }
  public getUserId() {
    return this.user.user_id;
  }
  public getToken() {
    return this.user.token;
  }
  public sendCurrentRoute(route: string) {
    this.currentRoute.next(route);
  }
  public getCurrentRoute(): Observable<any> {
    return this.currentRoute.asObservable();
  }
  public checkPermission() {
    if (this.getUserProfile() !== 'conserje') {
      this.router.navigate(['dashboard']);
    }
  }
  public getComeFromNewEntry(){
    return this.comeFromNewEntry;
  }
  public setComeFromNewEntry(comeFromNewEntry) {
    this.comeFromNewEntry = comeFromNewEntry;
  }
}
