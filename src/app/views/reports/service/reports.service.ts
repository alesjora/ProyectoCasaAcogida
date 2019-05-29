import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private httpClient: HttpClient) { }

  getYearReports(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerAnniosParaInformes');
  }
  getReportEntryByGender(): Observable<any> {
    return this.httpClient.get(environment.urlAPI + 'obtenerInformeIngresosPorSexo');
  }
}
