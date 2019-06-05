import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../service/reports.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-entry-by-gender',
  templateUrl: './entry-by-gender.component.html',
  styleUrls: ['./entry-by-gender.component.scss']
})
export class EntryByGenderComponent implements OnInit {

  data = [];
  subtitle = 'Filtro registros totales';
  valueSelectFilter = 1;
  valueSelectYear = '';
  valuesSelectFilter = [
    { value: 1, viewValue: 'Todos' },
    { value: 2, viewValue: 'Año' },
    { value: 3, viewValue: 'Año/mes' }
  ];
  valuesSelectYear = [];
  scale = 0.3;
  constructor(private storeService: StoreService, private reportsService: ReportsService, private logoutService: LogoutService, private snackBarService: SnackBarService) {
      this.storeService.sendCurrentRoute('Informes');
      this.storeService.checkPermission('tecnico');
  }
  ngOnInit(): void {
    console.log(this.data);
    this.reportsService.getYearReports().subscribe(this.handleSuccess.bind(this, this.valuesSelectYear, 'Error al obtener los años'));
    this.reportsService.getReportEntryByGender().subscribe(this.getReportEntryByGenderSuccess.bind(this));
  }
  getReportEntryByGenderSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.data = [];
        this.data.push(response.data.map(element => {
          if (element.sexo === 'Hombre') {
            return { genero: 'Hombres', cantidad: parseInt(element.numero, 10) }
          } else {
            return { genero: 'Mujeres', cantidad: parseInt(element.numero, 10) }
          }
        }));
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los datos por sexo', 1000, 'bottom', 'error');
        break;
    }
  }
  getReportEntryByGenderYearMonthSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.data = response.data;
        this.data.forEach(element => {
          element.forEach(element2 => {
            if (element2.hombres) {
              element2.hombres = parseInt(element2.hombres, 10);
            } else {
              element2.mujeres = parseInt(element2.mujeres, 10);
            }
          });
        });
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los datos por sexo', 1000, 'bottom', 'error');
        break;
    }
  }
  handleSuccess(valuesSelect, errorMessage, response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          valuesSelect.push({ value: element.annio, viewValue: element.annio });
        });
        break;
      default:
        this.snackBarService.showSnackbar(errorMessage, 1000, 'bottom', 'error');
        break;
    }
  }
  changeFilter(opened) {
    if (opened) {
      return;
    }
    switch (this.valueSelectFilter) {
      case 1:
        this.subtitle = 'Filtro registros totales';
        this.reportsService.getReportEntryByGender().subscribe(this.getReportEntryByGenderSuccess.bind(this));
        break;
      case 2:
        this.subtitle = 'Filtro por año (' + (this.valueSelectYear) + ')';
        if (this.valueSelectYear) {
          this.reportsService.getReportEntryByGenderYear({ annio: this.valueSelectYear })
            .subscribe(this.getReportEntryByGenderSuccess.bind(this));
        }
        break;
      case 3:
        this.subtitle = 'Filtro por año y meses (' + (this.valueSelectYear) + ')';
        if (this.valueSelectYear) {
          this.reportsService.getReportEntryByGenderYearMonth({ annio: this.valueSelectYear })
            .subscribe(this.getReportEntryByGenderYearMonthSuccess.bind(this));
        }
        break;
    }
  }
  changeYear(opened) {
    if (opened) {
      return;
    }
    switch (this.valueSelectFilter) {
      case 2:
        this.subtitle = 'Filtro por año (' + (this.valueSelectYear) + ')';
        this.reportsService.getReportEntryByGenderYear({ annio: this.valueSelectYear })
          .subscribe(this.getReportEntryByGenderSuccess.bind(this));
        break;
      case 3:
        this.subtitle = 'Filtro por año y meses';
        this.reportsService.getReportEntryByGenderYearMonth({ annio: this.valueSelectYear })
          .subscribe(this.getReportEntryByGenderYearMonthSuccess.bind(this));
        break;
    }
  }
}
