import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegistrationFormService {

  constructor(private httpClient: HttpClient) { }

  sendData(data): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'agregarFichaPersonal', data);
  }
  getTypeDocuments(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTiposDocumentos');
  }
  getNacionalidad(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerPaises');
  }
  getSexo(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerSexos');
  }
}
