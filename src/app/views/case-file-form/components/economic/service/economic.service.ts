import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EconomicService {

  constructor(private httpClient: HttpClient) { }

  getTypeEconomicIncone(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTiposIngresosEconomicos');
  }
  getTypeOfBenefit(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerTiposDeBeneficios');
  }
  getEconomicAmount(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerCuantiasEconomicas');
  }
}
