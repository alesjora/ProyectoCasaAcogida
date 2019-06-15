import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FamilyMemberDataService {

  constructor(private httpClient: HttpClient) { }

  getDataFamily(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerDatosParentesco');
  }
  getTipoApoyoSocial(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTipoApoyoSocial');
  }
  getApoyosSociales(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerApoyosSociales');
  }
  getMotivosEstanciaCentro(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerMotivosDeEstanciaCentro');
  }
  getSocialCenters(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerCentrosSociales');
  }
  getOtherTypeCenterCohabita(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerCentrosSociales');
  }
}
