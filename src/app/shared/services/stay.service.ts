import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StayService {

  constructor(private httpClient: HttpClient) { }
  sendDepartureDate(data): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'agregarNuevaSalida', data);
  }

  getRoomsAndBedsAvailable(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerCamasLibres');
  }
  sendChangeRoom(data): Observable<any>{
    return this.httpClient.post(environment.urlAPI + 'cambiarCama', data);
  }
}
