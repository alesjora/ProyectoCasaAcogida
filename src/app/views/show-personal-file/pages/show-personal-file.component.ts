import { Component, OnInit, ViewChild, AfterViewChecked, AfterViewInit, Renderer2 } from '@angular/core';
import { ShowPersonalFileService } from '../service/show-personal-file.service';
import { ActivatedRoute } from '@angular/router';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { environment } from 'src/environments/environment';
import { IgxColumnComponent, IgxHierarchicalGridComponent, IgxRowIslandComponent } from 'igniteui-angular';
import { FormBuilder } from '@angular/forms';
import { ChangeRoomDialogComponent } from 'src/app/shared/components/change-room-dialog/change-room-dialog.component';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { DepartureDialogComponent } from 'src/app/shared/components/departure-dialog/departure-dialog.component';
import { StoreService } from 'src/app/shared/services/store.service';

@Component({
  selector: 'app-show-personal-file',
  templateUrl: './show-personal-file.component.html',
  styleUrls: ['./show-personal-file.component.scss']
})
export class ShowPersonalFileComponent implements OnInit {

  public fechasTabla = [];
  public col: IgxColumnComponent;
  public pWidth: string;
  public nWidth: string;

  @ViewChild('hierarchicalGrid')
  private hierarchicalGrid: IgxHierarchicalGridComponent;


  srcImagen = '';
  nombre: string;
  apellido1: string;
  apellido2: string;
  nacionalidad: string;
  paisNacimiento: string;
  fechaNacimiento: string;

  nHabitacion: string;
  nCama: string;
  idRegistroCama: string;
  idRegistro: string;
  documentation;

  constructor(private activatedRoute: ActivatedRoute,
              private showPersonalFileService: ShowPersonalFileService,
              private logoutService: LogoutService,
              private fb: FormBuilder,
              private snackBarService: SnackBarService,
              private renderer: Renderer2,
              private storeService: StoreService) {
                this.storeService.sendCurrentRoute('Fichas personales');
  }

  ngOnInit() {
    this.translate();
    document.getElementById('buttonNav').addEventListener('click', () => {
      this.renderer.setStyle(document.getElementsByClassName('igx-grid__tbody-content')[0], 'width', '100%');
      this.renderer.setStyle(document.getElementsByClassName('igx-grid__thead-wrapper')[0], 'width', '100%');
    });
    this.getDatos();
  }
  getDatos() {
    const id = this.activatedRoute.snapshot.params.id;
    this.showPersonalFileService.getPersonalFile({ id }).subscribe(response => {
      switch (response.status) {
        case 'SESSION_EXPIRED':
          this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
          break;
        case 'OPERATION_SUCCESS':
          this.datosObtenidosCorrectamente(response);
          break;
        default:
          this.logoutService.goToLogin();
          break;
      }
    });
  }
  private translate() {
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

  datosObtenidosCorrectamente(response) {
    this.srcImagen = response.data.mainData[0].image;
    if (response.data.mainData[0].image === '') {
      this.srcImagen = environment.urlImage + 'StandarProfile.png';
    }
    this.nombre = response.data.mainData[0].nombre;
    this.apellido1 = response.data.mainData[0].apellido1 ? response.data.mainData[0].apellido1 : null;
    this.apellido2 = response.data.mainData[0].apellido2 ? response.data.mainData[0].apellido2 : null;
    this.nacionalidad = response.data.mainData[0].nacionalidad ? response.data.mainData[0].nacionalidad : null;
    this.paisNacimiento = response.data.mainData[0].lugarNacimiento ? response.data.mainData[0].lugarNacimiento : null;
    this.fechaNacimiento = response.data.mainData[0].fecha_nacimiento ? response.data.mainData[0].fecha_nacimiento : null;

    this.nHabitacion = response.data.habitacionActual ? response.data.habitacionActual : '-';
    this.nCama = response.data.camaActual ? response.data.camaActual : '-';
    this.idRegistroCama = response.data.idRegistroCama ? response.data.idRegistroCama : null;
    this.idRegistro = response.data.idRegistro ? response.data.idRegistro : null;
    this.getRegistroFechas(response);
    this.getDocumentacion(response);

  }
  getRegistroFechas(response) {
    const fechas = [];
    response.data.fechas.forEach((element, index) => {
      const estancia = [];
      element.estancia.forEach((est, i) => {
        estancia.push({
            'Número Habitación': est.nHabitacion,
            'Número Cama': est.nCama,
            'Fecha asignación': this.formatoFecha(est.fechaInicioCama),
            'Fecha abandono': this.formatoFecha(est.fechaFinalCama),
          });
      });
      fechas.push({
          'Número Registro': element.nRegistro,
          'Fecha Entrada': this.formatoFecha(element.fechaEntrada),
          'Fecha Salida': this.formatoFecha(element.fechaSalida),
          Estancia: estancia
      });
    });
    this.fechasTabla = fechas;
  }
  getDocumentacion(response) {
    if (response.data.documentacion.length === 0) {
      return;
    }
    this.documentation = [];
    response.data.documentacion.forEach(element => {
      this.documentation.push(
        {
          type: element.documento, value: element.numero_documento
        }
      );
    });
  }
  formatoFecha(date) {
    date = date != null ? new Date(date) : null;
    return date != null ? date.getFullYear() + '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + ('0' + date.getDate()).slice(-2) : '';
  }

  async changeBed(event, changeRoomDialogComponent: ChangeRoomDialogComponent) {
    if(await changeRoomDialogComponent.sendData(this.idRegistro, this.idRegistroCama)) {
      this.snackBarService.showSnackbar('Cama cambiada correctamente.', 1500, 'bottom', 'success');
      event.dialog.close();
    } else {
      this.snackBarService.showSnackbar('Error al cambiar la cama.', 1500, 'bottom', 'error');
    }
    this.getDatos();
  }
  async sendDepartureDate(event, departureDialog: DepartureDialogComponent) {
    if (await departureDialog.submit(this.idRegistro, this.idRegistroCama)) {
      this.snackBarService.showSnackbar('Fecha de salida añadida correctamente.', 1500, 'bottom', 'success');
      event.dialog.close();
    } else {
      this.snackBarService.showSnackbar('Error al añadir la fecha de salida.', 1500, 'bottom', 'error');
    }
    this.getDatos();
  }

}
