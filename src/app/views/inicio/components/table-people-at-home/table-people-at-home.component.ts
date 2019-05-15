import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { InicioService } from '../../service/inicio.service';

@Component({
  selector: 'app-table-people-at-home',
  templateUrl: './table-people-at-home.component.html',
  styleUrls: ['./table-people-at-home.component.scss']
})
export class TablePeopleAtHomeComponent implements OnInit {

  public search: string;
  public data: object[] = [];
  public displayedColumns = ['name', 'entry_date', 'departure_date', 'room', 'bed'];
  public dataSource;
  public valueFilter: string = 'Todo';
  @ViewChild(MatSort) sort: MatSort;
  constructor(public storeService: StoreService,
    private logoutService: LogoutService,
    private inicioService: InicioService) { }

  ngOnInit() {
    this.inicioService.getPersonasEnCasa().subscribe(this.getPersonasEnCasaSuccess.bind(this));
  }
  getPersonasEnCasaSuccess(response) {
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
    let arrayData: Array<PersonElement> = [];
    data.forEach(element => {
      let search = element.name + " " + element.surname1 + " " + ((element.surname2 === null) ? '': element.surname2) + " " + element.entry_date + " " + ((element.departure_date === null) ? 'Sin fecha de salida': element.departure_date)  + " " + element.room + " " + element.bed;
      arrayData.push({
        image: element.image,
        id: element.id,
        name: element.name,
        surname1: element.surname1,
        surname2: (element.surname2 === null) ? '' : element.surname2,
        entry_date: element.entry_date,
        departure_date: (element.departure_date === null) ? false : element.departure_date,
        room: element.room,
        bed: element.bed,
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
  departure_date: string;
  room: string;
  bed: string;
  search: string;
}
