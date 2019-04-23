import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  constructor(private httpClient: HttpClient) { }

  sendEmail(email): Observable<any> {
    return this.httpClient.post(environment.urlMarcos + 'forgotPassword', email);
  }
}
