import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchPersonalFileService {

  constructor(private httpClient: HttpClient) { }
  getPersonalFile(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerFichasPersonales');
  }
}
