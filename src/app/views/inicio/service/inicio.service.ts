import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private httpClient: HttpClient) { }
  getPersonasEnCasa(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerPersonasEnCasa');
  }
  getExpedientesPersonasEnCasa(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerExpedientesEvaluacionDePersonasEnCasa');
  }
}
