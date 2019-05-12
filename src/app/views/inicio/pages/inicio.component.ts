import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { InicioService } from '../service/inicio.service';
import { MatTableDataSource, MatSort } from '@angular/material';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss']
})
export class InicioComponent implements OnInit {
  public search: string;
  public data: object[] = [];
  displayedColumns = ['name', 'entry_date', 'departure_date', 'room', 'bed'];
  public dataSource;
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
      let search = element.name + " " + element.surname1 + " " + element.surname2 + " " + element.entry_date + " " + element.departure_date + " " + element.room + " " + element.bed;
      arrayData.push({
        image: element.image,
        id: element.id,
        name: element.name,
        surname1: element.surname1,
        surname2: element.surname2,
        entry_date: element.entry_date,
        departure_date: element.departure_date,
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

// const ELEMENT_DATA: PersonElement[] = [
//   {image: 'http://localhost/api/public/image/StandarProfile.png', id: '1', name: 'José Rafael Álvarez Espino', entry_date: '04/05/2019', departure_date: '--/--/----', room: '3', bed: '4'},
//   {image: 'http://localhost/api/public/image/StandarProfile.png', id: '2', name: 'Marcos Gallardo Pérez', entry_date: '06/05/2019', departure_date: '--/--/----', room: '11', bed: '5'}
// ];
