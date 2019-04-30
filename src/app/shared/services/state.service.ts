import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private user;
  constructor() {
    
  }

  public setUser(user){
    this.user = user;
  }
  public getUser(){
    return this.user;
  }
}
