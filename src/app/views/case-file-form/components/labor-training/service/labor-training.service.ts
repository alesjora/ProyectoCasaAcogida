import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LaborTrainingService {

  constructor(private httpClient: HttpClient) { }

  getTypeEducationLevel(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTiposNivelEducacion');
  }
  getTypeEmploymentSituation(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTiposSituacionLaboral');
  }
  getUnemployedTime(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTiempoDesempleado');
  }
  getWorkContract(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerContratoLaboral');
  }
  getTypeWorkContract(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTipoContratoLaboral');
  }
  getMainOccupation(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerPrincipalOcupacion');
  }
}
