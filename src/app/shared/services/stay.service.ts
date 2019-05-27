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
  sendChangeRoom(data): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'cambiarCama', data);
  }
  getTypesLackDocumentation(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTiposAusenciaDocumento');
  }
  getSexosEv(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerSexosEv');
  }
  getOrientacionSexual(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerOrientacionSexual');
  }
  getPaises(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerPaises');
  }
  getProvincias(data): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'obtenerProvincias', data);
  }
  getMunicipios(data): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'obtenerMunicipios', data);
  }
  getCaseFileInformation(data): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'obtenerInformacionExpediente', data);
  }
  getFormasIngreso(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerFormasIngreso');
  }
  getOrigenIngreso(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerOrigenIngreso');
  }
  getTypeDocuments(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTiposDocumentos');
  }
  getCivilState(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerEstadosCiviles');
  }
  getResidencePermitType(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerPermisosResidencia');
  }
  getViolenceTypes(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTiposViolencia');
  }
  getAgressionPlaces(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerLugaresAgresion');
  }
  getAgressionMoments(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerMomentosAgresion');
  }
  getPhysicalAgressionConsequences(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerConsecuenciasAgresionFisicas');
  }
  getPsychologicalAgressionConsequences(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerConsecuenciasAgresionPsicologicas');
  }
  getSocioeconomicAgressionConsequences(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerConsecuenciasAgresionSocioEconomicas');
  }
}
