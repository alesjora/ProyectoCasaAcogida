import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  private user: User;
  constructor() {}

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
}
