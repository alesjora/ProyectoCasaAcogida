import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IdentifyingDataService {

  constructor(private httpClient: HttpClient) { }

  getFormasIngreso(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerFormasIngreso');
  }
  getOrigenIngreso(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerOrigenIngreso');
  }
  getTypeDocuments(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTiposDocumentos');
  }

}
