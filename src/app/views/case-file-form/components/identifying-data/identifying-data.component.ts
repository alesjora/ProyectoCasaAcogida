import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { IdentifyingDataService } from './services/identifying-data.service';

@Component({
  selector: 'app-identifying-data',
  templateUrl: './identifying-data.component.html',
  styleUrls: ['./identifying-data.component.scss']
})
export class IdentifyingDataComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private logoutService: LogoutService,
              private snackBarService: SnackBarService,
              private identifyingDataService: IdentifyingDataService ) { }

  identifyingDataForm;
  private monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });
  formasIngreso = [];
  origenesIngreso = [];
  tiposDocumento = [];
  valuesComboboxDataFamily;
  @ViewChild('identifyingData') identifyingData;
  @ViewChild('familyMemberData') familyMemberData;
  ngOnInit() {
    this.createForm();
    this.getDatos();
  }
  createForm() {
    this.identifyingDataForm = this.fb.group({
      entryDate : ['', Validators.required],
      departureDate : ['', Validators.required],
      evaluationDate : ['', Validators.required],
      formaIngreso: ['', Validators.required],
      origenIngreso: ['', Validators.required],
      name : ['', Validators.required],
      apellido1 : [''],
      apellido2: [''],
      documentationType: [''],
      documentationOtherType: [''],
      documentationNumber: [''],
      lackDocumentation: ['']
    });
  }

  get formaIngreso() {
    return this.identifyingDataForm.get('formaIngreso');
  }
  get origenIngreso() {
    return this.identifyingDataForm.get('origenIngreso');
  }
  get entryDate() {
    return this.identifyingDataForm.get('entryDate');
  }
  get name() {
    return this.identifyingDataForm.get('name');
  }
  get apellido1() {
    return this.identifyingDataForm.get('apellido1');
  }
  get apellido2() {
    return this.identifyingDataForm.get('apellido2');
  }
  get documentationType(){
    return this.identifyingDataForm.get('documentationType');
  }
  get documentation(){
    return this.identifyingDataForm.get('documentation');
  }

  /**
   * @return true cuando el formulario es valido, false en caso contrario.
   */
  public formIsValid() {
    return this.identifyingDataForm.valid;
  }

  /**
   * Formato para la fecha de las datepicker
   */
  public formatter = (date: Date) => {
    return `${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }

  /**
   * Obtiene todos los datos que se necesitan de la base de datos.
   */
  getDatos() {
    this.identifyingDataService.getFormasIngreso().subscribe(this.peticionHandle.bind(this, this.getFormasIngreso));
    this.identifyingDataService.getOrigenIngreso().subscribe(this.peticionHandle.bind(this, this.getOrigenIngreso));
    this.identifyingDataService.getTypeDocuments().subscribe(this.peticionHandle.bind(this, this.getTypeDocuments))
  }

  /**
   * Maneja la petición http
   * @param response que contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   */
  peticionHandle(funcion, response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        funcion(response, this);
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los datos', 1000, 'bottom', 'error');
        break;
    }
  }
  /**
   * Guarda las formas de ingreso
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  public getFormasIngreso(response, that) {
    response.data.forEach(element => {
      that.formasIngreso.push({value: element.id, viewValue: element.forma_ingreso});
    });
  }
  /**
   * Guarda los orígenes de ingreso
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  getOrigenIngreso(response, that) {
    response.data.forEach(element => {
      that.origenesIngreso.push({value: element.id, viewValue: element.origen_ingreso});
    });
  }
  getTypeDocuments(response, that){
    response.data.forEach(element => {
      that.tiposDocumento.push({value: element.id, viewValue: element.documento});
    });
  }

  sendDatos() {
    console.log(this.identifyingDataForm.value);
  }

}
