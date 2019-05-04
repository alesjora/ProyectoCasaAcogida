import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchByDateService {

  constructor(private httpClient: HttpClient) { }
  getPersonalFileByCreateDate(date): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'obtenerFichasPersonalesPorFechaDeCreacion', date);
  }
  getPersonalFileByEntryDate(date): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'obtenerFichasPersonalesPorFechaDeEntrada', date);
  }
  getPersonalFileByDepartureDate(date): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'obtenerFichasPersonalesPorFechaDeSalida', date);
  }

}
