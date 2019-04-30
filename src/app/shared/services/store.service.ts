import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private user: User;
  private currentRoute = new Subject<string>();

  constructor() { }

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
  public sendCurrentRoute(route: string) {
    this.currentRoute.next(route);
  }
  public getCurrentRoute(): Observable<any> {
    return this.currentRoute.asObservable();
  }
}
