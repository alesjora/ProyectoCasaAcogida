import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource, MatSort } from '@angular/material';
import { ReportsService } from '../../service/reports.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { defineFont } from '@progress/kendo-drawing/pdf';
import { StoreService } from 'src/app/shared/services/store.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-entry-between-date',
  templateUrl: './entry-between-date.component.html',
  styleUrls: ['./entry-between-date.component.scss']
})
export class EntryBetweenDateComponent implements OnInit {

  public data: object[] = [];
  public displayedColumns = ['name', 'sex', 'entry_date'];
  public dataSource = new MatTableDataSource(this.data);
  private monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });
  public formEntryBetweenDate = this.fb.group({
    date1: ['', Validators.required],
    date2: ['', Validators.required],
  });
  tableTitle = ''
  @ViewChild(MatSort) sort: MatSort;
  private pipe: DatePipe;
  constructor(private storeService: StoreService, private fb: FormBuilder, private reportsService: ReportsService, private logoutService: LogoutService, private snackBarService: SnackBarService) { 
    this.storeService.sendCurrentRoute('Informes');
      this.storeService.checkPermission('tecnico');
      this.pipe = new DatePipe('en');
  }

  ngOnInit() {
    defineFont({
      Roboto : '../../../assets/fonts/Roboto-Light.ttf',
    });
  }

  get date1() {
    return this.formEntryBetweenDate.get('date1');
  }
  get date2() {
    return this.formEntryBetweenDate.get('date2');
  }

  public formatter = (date) => {
    return `${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }

  submitData() {
    if (this.formEntryBetweenDate.invalid) {
      return;
    }
    const data = {
      date1: this.getDate(this.date1.value),
      date2: this.getDate(this.date2.value),
    };
    this.tableTitle = 'Registros desde el ' + this.formatter(this.date1.value) + ' hasta el ' + this.formatter(this.date2.value);
    this.reportsService.getReportEntryBetweenDate(data).subscribe(this.submitDataSuccess.bind(this));

  }
  submitDataSuccess(response) {
    this.dataSource = new MatTableDataSource([]);
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.dataSource = new MatTableDataSource(this.generarData(response.data));
        this.dataSource.sort = this.sort;
        break;
      default:
        this.snackBarService.showSnackbar('No se encontraron datos', 1500, 'bottom', 'warning');
        break;
    }
  }

  generarData(data) {
    const arrayData: Array<PersonElement> = [];
    data.forEach(element => {
      arrayData.push({
        image: element.image,
        id: element.id,
        name: element.name,
        surname1: element.surname1,
        surname2: (element.surname2 === null) ? '' : element.surname2,
        sex: (element.sex === null) ? '' : element.sexo,
        nameComplete: element.name + ' ' + element.surname1 + ' ' + ((element.surname2 === null) ? '' : element.surname2),
        entry_date: element.entry_date,
      });
    });
    return arrayData;
  }
  public getDate(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }

}
export interface PersonElement {
  image: string;
  id: string;
  name: string;
  surname1: string;
  surname2: string;
  sex: string;
  nameComplete: string;
  entry_date: string;
}
