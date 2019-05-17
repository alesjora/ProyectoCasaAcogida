import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { StoreService } from 'src/app/shared/services/store.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { InicioService } from '../../service/inicio.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-taula-persones-expedients',
  templateUrl: './taula-persones-expedients.component.html',
  styleUrls: ['./taula-persones-expedients.component.scss']
})
export class TaulaPersonesExpedientsComponent implements OnInit {

  public search: string;
  public data: object[] = [];
  public displayedColumns = ['name', 'entry_date', 'expedients'];
  public dataSource = new MatTableDataSource();
  private pipe: DatePipe;
  @ViewChild(MatSort) sort: MatSort;
  constructor(public storeService: StoreService,
              private logoutService: LogoutService,
              private inicioService: InicioService) {
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data: PersonElement, filter) => {
      const dataStr = data.search;
      return dataStr.indexOf(filter) !== -1;
    }
  }

  ngOnInit() {
    this.inicioService.getExpedientesPersonasEnCasa().subscribe(this.getExpedientesPersonasEnCasaSuccess.bind(this));
  }
  getExpedientesPersonasEnCasaSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.dataSource = new MatTableDataSource(this.generarData(response.data));
        this.dataSource.sort = this.sort;
        break;
    }
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  generarData(data) {
    const arrayData: Array<PersonElement> = [];
    data.forEach(element => {
// tslint:disable-next-line: max-line-length
      const search = element.name + ' ' + element.surname1 + ' ' + ((element.surname2 === null) ? ' ' : element.surname2) + ' ' + this.pipe.transform(element.entry_date, 'dd/MM/yyyy');
      arrayData.push({
        image: element.image,
        id: element.id,
        name: element.name,
        surname1: element.surname1,
        surname2: (element.surname2 === null) ? '' : element.surname2,
        entry_date: element.entry_date,
        expedient_started: element.expedient_started,
        search
      });
    });
    return arrayData;
  }
}
export interface PersonElement {
  image: string;
  id: string;
  name: string;
  surname1: string;
  surname2: string;
  entry_date: string;
  expedient_started: boolean;
  search: string;
}
