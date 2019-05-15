import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit } from '@angular/core';
import { ShowPersonalFileService } from '../service/show-personal-file.service';
import { ActivatedRoute } from '@angular/router';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { environment } from 'src/environments/environment';
import { MatTableDataSource, MatSort } from '@angular/material';
import { IgxColumnComponent, IgxHierarchicalGridComponent, IgxRowIslandComponent } from 'igniteui-angular';

@Component({
  selector: 'app-show-personal-file',
  templateUrl: './show-personal-file.component.html',
  styleUrls: ['./show-personal-file.component.scss']
})
export class ShowPersonalFileComponent implements OnInit {

  public fechasTabla;
  public col: IgxColumnComponent;
  public pWidth: string;
  public nWidth: string;

  @ViewChild("hierarchicalGrid")
  private hierarchicalGrid: IgxHierarchicalGridComponent;

  fechasEntradaSalida = [];

  datosUltimoRegistro = { ultimaFechaIngreso: new Date(0), index: -1, dentroDeLaCasa: false };
  srcImagen = '';
  nombre: string;
  apellido1: string;
  apellido2: string;
  nacionalidad: string;
  paisNacimiento: string;
  fechaNacimiento: string;
  documentation: string;

  nHabitacion = 2;
  nCama = 3;

  constructor(private activatedRoute: ActivatedRoute,
    private showPersonalFileService: ShowPersonalFileService,
    private logoutService: LogoutService) {
    this.fechasTabla = [
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "1993/12/01",
        "Fecha Salida": "1993/12/15",
        "Estancia": [
          {
            "Número Habitación": 3,
            "Número Cama": 4,
            "Fecha asignación": "12/12/1234",
            "Fecha abandono": "12/12/1234",
          }
        ]

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "2010/01/02",
        "Fecha Salida": "2010/02/17",

      },
      {
        "Número Registro": "1",
        "Fecha Entrada": "2010/01/04",
        "Fecha Salida": "2010/03/17",

      }]
  }

  ngOnInit() {
    this.translate();
    const id = this.activatedRoute.snapshot.params.id;
    this.showPersonalFileService.getPersonalFile({ id }).subscribe(response => {
      console.log(response);
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
          this.apellido2 = response.data.mainData[0].apellido2 ? response.data.mainData[0].apellido2 : null;
          this.nacionalidad = response.data.mainData[0].nacionalidad ? response.data.mainData[0].nacionalidad : null;
          this.paisNacimiento = response.data.mainData[0].lugarNacimiento ? response.data.mainData[0].lugarNacimiento : null;
          this.fechaNacimiento = response.data.mainData[0].fecha_nacimiento ? response.data.mainData[0].fechaNacimiento : null;

          response.data.fechas.forEach((element, index) => {
          });
          // response.data.mainData.forEach((element, index) => {
          //   if (element.fecha_ingreso) {
          //     const fechaEntrada = new Date(element.fecha_ingreso);
          //     const fechaSalida = element.fecha_salida ? new Date(element.fecha_salida) : null;

          //     this.fechasEntradaSalida.push({
          //                                   nRegistro: '123',
          //                                   FechaEntrada: this.formatoFecha(fechaEntrada),
          //                                   FechaSalida : this.formatoFecha(fechaSalida),
          //                                   habitacion: '1',
          //                                   cama : '1'});
          //     if (fechaEntrada.getTime() > this.datosUltimoRegistro.ultimaFechaIngreso.getTime()) {
          //       this.datosUltimoRegistro.ultimaFechaIngreso = fechaEntrada;
          //       this.datosUltimoRegistro.index = index;
          //     }
          //   }
          // });
          break;
        default:
          this.logoutService.goToLogin();
          break;
      }
    });
  }
  private translate() {
    console.log(this.hierarchicalGrid);
    const currentRS = this.hierarchicalGrid.resourceStrings;
    currentRS.igx_grid_filter = 'Filtro';
    currentRS.igx_grid_emptyFilteredGrid_message = 'No se han encontrado coincidencias';
    currentRS.igx_grid_emptyGrid_message = 'La tabla no contiene datos';
    currentRS.igx_grid_filter_row_close = 'Cerrar';
    currentRS.igx_grid_filter_row_reset = 'Resetear';
    currentRS.igx_grid_filter_row_placeholder = 'Introduce un valor';
    currentRS.igx_grid_filter_contains = 'Contiene';
    currentRS.igx_grid_filter_doesNotContain = 'No contiene';
    currentRS.igx_grid_filter_startsWith = 'Comienza por';
    currentRS.igx_grid_filter_endsWith = 'Termina por';
    currentRS.igx_grid_filter_equals = 'Igual';
    currentRS.igx_grid_filter_doesNotEqual = 'No es igual';
    currentRS.igx_grid_filter_empty = 'Vacío';
    currentRS.igx_grid_filter_notEmpty = 'No está vacío';
    currentRS.igx_grid_filter_null = 'Nulo';
    currentRS.igx_grid_filter_notNull = 'No nulo';
  }
  public onResize(event) {
    this.pWidth = event.prevWidth;
    this.nWidth = event.newWidth;
  }
  formatoFecha(date) {
    return date != null ? date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() : '';

  }

}
