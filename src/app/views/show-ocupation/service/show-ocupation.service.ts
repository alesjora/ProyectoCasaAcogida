import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ShowOcupationService {

  constructor(private httpClient: HttpClient) { }

  getOccupation(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerOcupacion');
  }
}
