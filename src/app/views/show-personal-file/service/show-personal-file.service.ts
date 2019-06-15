import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShowPersonalFileService {

  constructor(private httpClient: HttpClient) { }
  getPersonalFile(idPerson): Observable<any> {
    return this.httpClient.post(environment.urlAPI + 'obtenerFichaPersonal', idPerson);
  }
}
