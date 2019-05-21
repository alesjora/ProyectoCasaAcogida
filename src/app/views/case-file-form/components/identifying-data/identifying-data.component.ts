import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { IdentifyingDataService } from './services/identifying-data.service';
import { StayService } from 'src/app/shared/services/stay.service';

@Component({
  selector: 'app-identifying-data',
  templateUrl: './identifying-data.component.html',
  styleUrls: ['./identifying-data.component.scss']
})
export class IdentifyingDataComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private logoutService: LogoutService,
              private snackBarService: SnackBarService,
              private identifyingDataService: IdentifyingDataService,
              private stayService: StayService) { }

  identifyingDataForm;
  private monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });
  formasIngreso = [];
  origenesIngreso = [];
  tiposDocumento = [];
  ausenciaDocumento = [];
  tiposAusenciaDocumento = [];
  paises = [];
  provincias = [];
  provinciasEmpadronamiento = [];
  municipiosEmpadronamiento = [];
  municipios = [];
  sexosEv = [];
  orientacionesSexual = [];
  valuesComboboxDataFamily;
  edad = new Array(100);
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
      lackDocumentation: [''],
      tiposAusenciaDocumento: this.fb.array([]),
      telefono: [''],
      correo: [''],
      bornDate: [''],
      edad: [''],
      paisNacimiento: [''],
      provinciaNacimiento: [''],
      municipioNacimiento: [''],
      nacionalidad: [''],
      provinciaEmpadronamiento: [''],
      municipioEmpadronamiento: [''],
      sexoEv: [''],
      orientacionSexual: ['']
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
  get documentationType() {
    return this.identifyingDataForm.get('documentationType');
  }
  get documentation() {
    return this.identifyingDataForm.get('documentation');
  }
  get lackDocumentation() {
    return this.identifyingDataForm.get('lackDocumentation');
  }
  get tipoAusenciaDocumento() {
    return this.identifyingDataForm.get('tiposAusenciaDocumento') as FormArray;
  }
  get telefono() {
    return this.identifyingDataForm.get('telefono');
  }
  get correo() {
    return this.identifyingDataForm.get('correo');
  }
  get paisNacimiento() {
    return this.identifyingDataForm.get('paisNacimiento');
  }
  get provinciaNacimiento() {
    return this.identifyingDataForm.get('provinciaNacimiento');
  }
  get municipioNacimiento() {
    return this.identifyingDataForm.get('municipioNacimiento');
  }
  get nacionalidad(){
    return this.identifyingDataForm.get('nacionalidad');
  }
  get sexoEv() {
    return this.identifyingDataForm.get('sexoEv');
  }
  get orientacionSexual() {
    return this.identifyingDataForm.get('orientacionSexual');
  }
  get provinciaEmpadronamiento(){
    return this.identifyingDataForm.get('provinciaEmpadronamiento');
  }
  get municipioEmpadronamiento(){
    return this.municipioEmpadronamiento.get('municipioEmpadronamiento');
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
    this.identifyingDataService.getTypeDocuments().subscribe(this.peticionHandle.bind(this, this.getTypeDocuments));
    this.stayService.getTypesLackDocumentation().subscribe(this.peticionHandle.bind(this, this.getLackDocumentation));
    this.stayService.getSexosEv().subscribe(this.peticionHandle.bind(this, this.getSexosEv));
    this.stayService.getOrientacionSexual().subscribe(this.peticionHandle.bind(this, this.getOrientacionesSexual));
    this.stayService.getPaises().subscribe(this.peticionHandle.bind(this, this.getPaises));

    this.createEdad();
  }

  /**
   * Maneja la petición http
   * @param response que contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   */
  peticionHandle(funcion, response) {
    console.log(response);
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        funcion(response, this);
        break;
      case 'DATA_EMPTY':
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

  /**
   * Guarda los tipos de documento
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  getTypeDocuments(response, that){
    response.data.forEach(element => {
      that.tiposDocumento.push({value: element.id, viewValue: element.documento});
    });
    that.ausenciaDocumento = that.tiposDocumento;
  }
  /**
   * Guarda los tipos de ausencia de documento
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  getLackDocumentation(response, that) {
    response.data.forEach(element => {
      that.tiposAusenciaDocumento.push({value: element.id, viewValue: element.ausencia_documento});
    });
  }

  /**
   * Guarda los paises que vienen la base de datos
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  getPaises(response, that) {
    response.data.forEach(element => {
      that.paises.push({ value: element.id, viewValue: element.nacionalidad });
    });
  }

  /**
   * Guarda los sexos que vienen la base de datos
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  getSexosEv(response, that) {
    response.data.forEach(element => {
      that.sexosEv.push({ value: element.id, viewValue: element.sexo });
    });
  }

  /**
   * Guarda la orientaciones sexuales que vienen de la base de datos.
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  getOrientacionesSexual(response, that) {
    response.data.forEach(element => {
      that.orientacionesSexual.push({ value: element.id, viewValue: element.orientacion_sexual });
    });
  }

  /**
   * Crea el array de la ausencia de documentos en base a los tipos de documento que existen menos los que tiene.
   */
  createLackDocumentation() {
    this.ausenciaDocumento = this.tiposDocumento.filter(value => {
      return value.value !== this.documentationType.value;
    });
  }

  /**
   * Rellena o vacia el array del formBuilder en función de los tipos de documento que faltan.
   * @param event nos da información sobre las selección actual y la anterior
   */
  createMotivosAusenciaInputs(event) {
    if (event.newSelection.length === 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.tipoAusenciaDocumento.length; index++) {
        this.tipoAusenciaDocumento.removeAt(this.tipoAusenciaDocumento.length - 1);
      }
    }
    if (event.newSelection.length > event.oldSelection.length) {
      this.tipoAusenciaDocumento.push(this.fb.control(''));
    } else if (event.newSelection.length < event.oldSelection.length) {
      this.tipoAusenciaDocumento.removeAt(this.tipoAusenciaDocumento.length - 1);
    }
  }
  /**
   * Rellena el array para saber la edad.
   */
  createEdad() {
    for (let i = 0; i < 101; i++) {
      this.edad[i] = i;
    }
  }

  /**
   * Envia una petición a la base de datos para traerse las provincias de un país ya seleccionado
   * @param opened boolean con el estado del select que lo lanza, true en caso de que este abierto, false en caso de que se halla cerrado
   */
  getProvincias(opened: boolean) {
    if (opened) {
      return;
    }
    this.stayService.getProvincias({idPais: this.paisNacimiento.value}).subscribe(this.peticionHandle.bind(this, this.getProvinciasBD));
  }
  /**
   * Envia una petición a la base de datos para traerse las provincias de un país ya seleccionado
   * @param opened boolean con el estado del select que lo lanza, true en caso de que este abierto, false en caso de que se halla cerrado
   */
  getProvinciasEmpadronamiento(opened: boolean) {
    if (opened) {
      return;
    }
    this.stayService.getProvincias({idPais: this.nacionalidad.value})
                    .subscribe(this.peticionHandle.bind(this, this.getProvinciasEmpadronamientoBD));
  }

  /**
   * Guarda las provincias que vienen la base de datos
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  getProvinciasBD(response, that) {
    that.provincias = [];
    that.municipios = [];
    response.data.forEach(element => {
      that.provincias.push({ value: element.id, viewValue: element.provincia });
    });
  }
  /**
   * Guarda las provincias que vienen la base de datos
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  getProvinciasEmpadronamientoBD(response, that) {
    that.provinciasEmpadronamiento = [];
    that.municipiosEmpadronamiento = [];
    response.data.forEach(element => {
      that.provinciasEmpadronamiento.push({ value: element.id, viewValue: element.provincia });
    });
  }

  /**
   * Envia una petición a la base de datos para traerse los municipios de una provincia ya seleccionada
   * @param opened boolean con el estado del select que lo lanza, true en caso de que este abierto, false en caso de que se halla cerrado
   */
  getMunicipios(opened: boolean) {
    if (opened) {
      return;
    }
    this.stayService.getMunicipios({idProvincia: this.provinciaNacimiento.value}).subscribe(
      this.peticionHandle.bind(this, this.getMunicipiosBD));
  }

  /**
   * Envia una petición a la base de datos para traerse los municipios de una provincia ya seleccionada
   * @param opened boolean con el estado del select que lo lanza, true en caso de que este abierto, false en caso de que se halla cerrado
   */
  getMunicipiosEmpadronamiento(opened: boolean) {
    if (opened) {
      return;
    }
    this.stayService.getMunicipios({idProvincia: this.provinciaEmpadronamiento.value}).subscribe(
      this.peticionHandle.bind(this, this.getMunicipiosEmpadronamientoBD));
  }

  /**
   * Guarda los municipios que vienen de la base de datos
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  getMunicipiosBD(response, that) {
    that.municipios = [];
    response.data.forEach(element => {
      that.municipios.push({ value: element.id, viewValue: element.poblacion });
    });
  }

  /**
   * Guarda los municipios que vienen de la base de datos
   * @param response contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   * @param that contexto de la clase
   */
  getMunicipiosEmpadronamientoBD(response, that) {
    that.municipiosEmpadronamiento = [];
    response.data.forEach(element => {
      that.municipiosEmpadronamiento.push({ value: element.id, viewValue: element.poblacion });
    });
  }
  sendDatos() {
    console.log(this.identifyingDataForm.value);
  }

}

