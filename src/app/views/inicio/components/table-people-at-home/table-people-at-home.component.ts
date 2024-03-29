import { Component, OnInit, ViewChild } from '@angular/core';
import { StoreService } from 'src/app/shared/services/store.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { MatTableDataSource, MatSort } from '@angular/material';
import { InicioService } from '../../service/inicio.service';
import { DepartureDialogComponent } from 'src/app/shared/components/departure-dialog/departure-dialog.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-table-people-at-home',
  templateUrl: './table-people-at-home.component.html',
  styleUrls: ['./table-people-at-home.component.scss']
})
export class TablePeopleAtHomeComponent implements OnInit {

  public search: string;
  public data: object[] = [];
  public displayedColumns = ['name', 'entry_date', 'departure_date', 'room', 'bed'];
  public dataSource = new MatTableDataSource();
  public currentPerson: string;
  public currentIdRegistro: string;
  public currentIdRegistroCama: string;
  private subscription: Subscription;
  @ViewChild(MatSort) sort: MatSort;
  private pipe: DatePipe;
  constructor(public storeService: StoreService,
              private logoutService: LogoutService,
              private inicioService: InicioService,
              private snackBarService: SnackBarService) {
    this.pipe = new DatePipe('en');
    this.dataSource.filterPredicate = (data: PersonElement, filter) => {
      const dataStr = data.search;
      return dataStr.indexOf(filter) !== -1;
    }
  }

  ngOnInit() {
    this.obtenerDatos();
  }
  obtenerDatos() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.inicioService.getPersonasEnCasa().subscribe(this.getPersonasEnCasaSuccess.bind(this));
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
      let search = element.name + ' ' + element.surname1 + ' ' + ((element.surname2 === null) ? ' ' : element.surname2) + ' ' + this.pipe.transform(element.entry_date, 'dd/MM/yyyy') + ' ' + ((element.departure_date === null) ? ' ' : this.pipe.transform(element.departure_date, 'dd/MM/yyyy')) + ' ' + element.room + ' ' + element.bed;
      arrayData.push({
        image: element.image,
        id: element.id,
        idRegistro: element.idRegistro,
        idRegistroCama: element.idRegistroCama,
        name: element.name,
        surname1: element.surname1,
        surname2: (element.surname2 === null) ? '' : element.surname2,
        nameComplete: element.name + ' ' + element.surname1 + ' ' + ((element.surname2 === null) ? '' : element.surname2),
        entry_date: element.entry_date,
        departure_date: (element.departure_date === null) ? false : element.departure_date,
        room: element.room,
        bed: element.bed,
        search
      });
    });
    return arrayData;
  }
  openDialog(dialog, idRegistro, idRegistroCama, currentPerson) {
    this.currentIdRegistro = idRegistro;
    this.currentPerson = currentPerson;
    this.currentIdRegistroCama = idRegistroCama;
    dialog.open();
  }
  async sendDepartureDate(event, departureDialog: DepartureDialogComponent) {
    if (await departureDialog.submit(this.currentIdRegistro, this.currentIdRegistroCama)) {
      this.snackBarService.showSnackbar('Fecha de salida añadida correctamente.', 1500, 'bottom', 'success');
      event.dialog.close();
    } else {
      this.snackBarService.showSnackbar('Error al añadir la fecha de salida.', 1500, 'bottom', 'error');
    }
    this.obtenerDatos();
  }
}
export interface PersonElement {
  image: string;
  id: string;
  idRegistro: string;
  idRegistroCama: string;
  name: string;
  surname1: string;
  surname2: string;
  nameComplete: string;
  entry_date: string;
  departure_date: string;
  room: string;
  bed: string;
  search: string;
}
