import { Component, OnInit, ViewChild } from '@angular/core';
import { ShowPersonalFileService } from '../service/show-personal-file.service';
import { ActivatedRoute } from '@angular/router';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-show-personal-file',
  templateUrl: './show-personal-file.component.html',
  styleUrls: ['./show-personal-file.component.scss']
})
export class ShowPersonalFileComponent implements OnInit {
  displayedColumns: string[] = ['nRegistro', 'fechaEntrada', 'fechaSalida', 'habitacion', 'cama'];
  fechasEntradaSalida = [];
  dataSource = new MatTableDataSource(this.fechasEntradaSalida);

  datosUltimoRegistro = {ultimaFechaIngreso: new Date(0), index: -1, dentroDeLaCasa: false};
  srcImagen = '';
  nombre: string;
  apellido1: string;
  apellido2: string;
  nacionalidad: string;
  paisNacimiento: string;
  fechaNacimiento: string;
  documentation: string;

  @ViewChild(MatSort) sort: MatSort;

  nHabitacion = 2;
  nCama = 3;

  constructor(private activatedRoute: ActivatedRoute,
              private showPersonalFileService: ShowPersonalFileService,
              private logoutService: LogoutService) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.params.id;
    this.showPersonalFileService.getPersonalFile({ id }).subscribe(response => {
      switch (response.status) {
        case 'SESSION_EXPIRED':
          this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
          break;
        case 'OPERATION_SUCCESS':
          this.srcImagen = response.data.mainData[0].image;
          if (response.data.mainData[0].image === '') {
            this.srcImagen = environment.urlImage + 'StandarProfile.png';
          }
          this.nombre = response.data.mainData[0].nombre;
          this.apellido1 = response.data.mainData[0].apellido1 ? response.data.mainData[0].apellido1 : null;
          this.apellido2 = response.data.mainData[0].apellido2 ? response.data.mainData[0].apellido2 : null ;
          this.nacionalidad = response.data.mainData[0].nacionalidad ? response.data.mainData[0].nacionalidad : null;
          this.paisNacimiento = response.data.mainData[0].lugarNacimiento ? response.data.mainData[0].lugarNacimiento : null;
          this.fechaNacimiento = response.data.mainData[0].fecha_nacimiento ? response.data.mainData[0].fechaNacimiento : null;

          response.data.mainData.forEach((element, index) => {
            if (element.fecha_ingreso) {
              const fechaEntrada = new Date(element.fecha_ingreso);
              const fechaSalida = element.fecha_salida ? new Date(element.fecha_salida) : null;

              this.fechasEntradaSalida.push({
                                            nRegistro: '123',
                                            FechaEntrada: this.formatoFecha(fechaEntrada),
                                            FechaSalida : this.formatoFecha(fechaSalida),
                                            habitacion: '1',
                                            cama : '1'});
              if (fechaEntrada.getTime() > this.datosUltimoRegistro.ultimaFechaIngreso.getTime()) {
                this.datosUltimoRegistro.ultimaFechaIngreso = fechaEntrada;
                this.datosUltimoRegistro.index = index;
              }
            }
          });
          console.log("datos registro", this.datosUltimoRegistro);
          this.dataSource = new MatTableDataSource(this.fechasEntradaSalida);
          this.dataSource.sort = this.sort;
          break;
        default:
          this.logoutService.goToLogin();
          break;
      }
    });
  }
  formatoFecha(date) {
    return date != null ? date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() : '';

  }

}
