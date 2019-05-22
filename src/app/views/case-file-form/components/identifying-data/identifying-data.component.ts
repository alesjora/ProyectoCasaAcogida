import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { StayService } from 'src/app/shared/services/stay.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-identifying-data',
  templateUrl: './identifying-data.component.html',
  styleUrls: ['./identifying-data.component.scss']
})
export class IdentifyingDataComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private logoutService: LogoutService,
              private snackBarService: SnackBarService,
              private stayService: StayService,
              private router: ActivatedRoute) { }

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
  estadosCiviles = [];
  tipoPermisosResidencia = [];

  public selectedAsistenciaSanitaria: string;
  public selectedTargetaSanitaria: string;
  public selectedPermisoResidencia: string;

  afirmacionNegacion = [{value: 1, viewValue: 'Si'}, {value: 2, viewValue: 'No'}];
  edad = new Array(100);

  @ViewChild('identifyingData') identifyingData;
  @ViewChild('familyMemberData') familyMemberData;
  ngOnInit() {
    console.log(this.router.snapshot.params.id)
    this.getDatos();
    setTimeout(this.createForm.bind(this), 3000);
  }

  createForm() {
    this.identifyingDataForm = this.fb.group({
      entryDate : [''],
      departureDate : [''],
      evaluationDate : [''],
      formaIngreso: [''],
      origenIngreso: [''],
      name : ['', Validators.required],
      apellido1 : ['', Validators.required],
      apellido2: [''],
      documentationType: [''],
      documentationOtherType: [''],
      documentationNumber: [''],
      lackDocumentation: [[{value:'1', viewValue:'DNI'}]],
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
      orientacionSexual: [''],
      censusDate: [''],
      sSNumber: [''],
      asistenciaSanitaria: [''],
      sNSNumber: [''],
      targetaSanitaria: [''],
      motivoAusenciaTargetaSanitaria: [''],
      estadoCivil: [''],
      permisoResidencia: [''],
      tipoPermisoResidencia: [''],
      residancePermitDate: ['']
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
  get nacionalidad() {
    return this.identifyingDataForm.get('nacionalidad');
  }
  get sexoEv() {
    return this.identifyingDataForm.get('sexoEv');
  }
  get orientacionSexual() {
    return this.identifyingDataForm.get('orientacionSexual');
  }
  get provinciaEmpadronamiento() {
    return this.identifyingDataForm.get('provinciaEmpadronamiento');
  }
  get municipioEmpadronamiento() {
    return this.identifyingDataForm.get('municipioEmpadronamiento');
  }
  get censusDate() {
    return this.identifyingDataForm.get('censusDate');
  }
  get sSNumber() {
    return this.identifyingDataForm.get('sSNumber');
  }
  get asistenciaSanitaria() {
    return this.identifyingDataForm.get('asistenciaSanitaria');
  }
  get targetaSanitaria() {
    return this.identifyingDataForm.get('targetaSanitaria');
  }
  get motivoAusenciaTargetaSanitaria() {
    return this.identifyingDataForm.get('motivoAusenciaTargetaSanitaria');
  }
  get sNSNumber() {
    return this.identifyingDataForm.get('sNSNumber');
  }
  get estadoCivil() {
    return this.identifyingDataForm.get('estadoCivil');
  }
  get permisoResidencia() {
    return this.identifyingDataForm.get('permisoResidencia');
  }
  get tipoPermisoResidencia() {
    return this.identifyingDataForm.get('tipoPermisoResidencia');
  }
  get residancePermitDate() {
    return this.identifyingDataForm.get('residancePermitDate');
  }

  /**
   * @return true cuando el formulario es valido, false en caso contrario.
   */
  public formIsValid() {
    if(!this.identifyingDataForm){
      return false;
    }
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
    const serv = this.stayService;

    serv.getFormasIngreso().subscribe(this.peticionHandleMejorada
      .bind(this, this.formasIngreso, 'id', 'forma_ingreso'));
    serv.getOrigenIngreso().subscribe(this.peticionHandleMejorada
      .bind(this, this.origenesIngreso, 'id', 'origen_ingreso'));
    serv.getTypeDocuments().subscribe(this.peticionHandleMejorada
      .bind(this, this.tiposDocumento, 'id', 'documento'));
    serv.getTypesLackDocumentation().subscribe(this.peticionHandleMejorada
      .bind(this, this.tiposAusenciaDocumento, 'id', 'ausencia_documento'));
    serv.getSexosEv().subscribe(this.peticionHandleMejorada
      .bind(this, this.sexosEv, 'id', 'sexo'));
    serv.getOrientacionSexual().subscribe(this.peticionHandleMejorada
      .bind(this, this.orientacionesSexual, 'id', 'orientacion_sexual'));
    serv.getPaises().subscribe(this.peticionHandleMejorada
      .bind(this, this.paises, 'id', 'nacionalidad'));
    serv.getCivilState().subscribe(this.peticionHandleMejorada
      .bind(this, this.estadosCiviles, 'id', 'estado_civil'));
    serv.getResidencePermitType().subscribe(this.peticionHandleMejorada
      .bind(this, this.tipoPermisosResidencia, 'id', 'tipo'));
    serv.getCaseFileInformation({id: this.router.snapshot.params.id}).subscribe(response=>{console.log(response)});
    this.creacionAusenciaDocumento(this);
    this.createEdad();

  }

  /**
   * Maneja la petición http
   * @param response que contiene la respuesta de la petición a la api. Debe tener la forma:
   *                  {status: estado respuesta , data: datos obtenidos };
   */
  peticionHandleMejorada(array: Array<any>, value: string, viewValue: string, response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          array.push({value: element[value], viewValue: element[viewValue]});
        });
        break;
      case 'DATA_EMPTY':
        this.snackBarService.showSnackbar('No se han encontrado ' + viewValue, 1000, 'bottom', 'warning');
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener ' + viewValue, 1000, 'bottom', 'error');
        break;
    }
  }

  creacionAusenciaDocumento(that) {
    that.ausenciaDocumento = that.tiposDocumento;
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
    this.provincias = [];
    this.municipios = [];
    this.provinciaNacimiento.value = '';
    this.municipioNacimiento.value = '';
    this.stayService.getProvincias({idPais: this.paisNacimiento.value})
      .subscribe(this.peticionHandleMejorada.bind(this, this.provincias, 'id', 'provincia'));
  }
  /**
   * Envia una petición a la base de datos para traerse las provincias de un país ya seleccionado
   * @param opened boolean con el estado del select que lo lanza, true en caso de que este abierto, false en caso de que se halla cerrado
   */
  getProvinciasEmpadronamiento(opened: boolean) {
    if (opened) {
      return;
    }
    this.provinciasEmpadronamiento = [];
    this.municipiosEmpadronamiento = [];
    this.provinciaEmpadronamiento.value = '';
    this.municipioEmpadronamiento.value = '';
    this.stayService.getProvincias({idPais: this.nacionalidad.value})
      .subscribe(this.peticionHandleMejorada.bind(this, this.provinciasEmpadronamiento, 'id', 'provincia'));
  }


  /**
   * Envia una petición a la base de datos para traerse los municipios de una provincia ya seleccionada
   * @param opened boolean con el estado del select que lo lanza, true en caso de que este abierto, false en caso de que se halla cerrado
   */
  getMunicipios(opened: boolean) {
    if (opened) {
      return;
    }
    this.municipios = [];
    this.municipioNacimiento.value = '';
    this.stayService.getMunicipios({idProvincia: this.provinciaNacimiento.value})
      .subscribe(this.peticionHandleMejorada.bind(this, this.municipios, 'id', 'poblacion'));
  }

  /**
   * Envia una petición a la base de datos para traerse los municipios de una provincia ya seleccionada
   * @param opened boolean con el estado del select que lo lanza, true en caso de que este abierto, false en caso de que se halla cerrado
   */
  getMunicipiosEmpadronamiento(opened: boolean) {
    if (opened) {
      return;
    }
    this.municipiosEmpadronamiento = [];
    this.municipioEmpadronamiento.value = '';
    this.stayService.getMunicipios({idProvincia: this.provinciaEmpadronamiento.value})
      .subscribe(this.peticionHandleMejorada.bind(this, this.municipiosEmpadronamiento, 'id', 'poblacion'));
  }

  sendDatos() {
    console.log(this.identifyingDataForm);
  }

}
