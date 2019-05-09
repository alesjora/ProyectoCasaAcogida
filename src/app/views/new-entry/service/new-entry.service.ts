import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NewEntryService {

  constructor(private httpClient: HttpClient) { }

  getRoomsAndBedsAvailable(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerCamasLibres');
  }
  getPersonsAvailables(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerPersonasFueraDeCasa');
  }
}
