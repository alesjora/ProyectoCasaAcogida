import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {

  constructor(private httpClient: HttpClient) { }

  sendToken(token): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'validateToken', token);
  }

  sendPassword(json): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'changePassword', json);
  }
}
