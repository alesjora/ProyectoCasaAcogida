import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { StayService } from 'src/app/shared/services/stay.service';
import { ActivatedRoute } from '@angular/router';
import { element } from '@angular/core/src/render3';

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
  numeroExpedienteCentro;
  numeroExpedienteTecnico;
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
  public selectedTarjetaSanitaria: string;
  public selectedPermisoResidencia: string;

  afirmacionNegacion = [{value: 1, viewValue: 'Si'}, {value: 2, viewValue: 'No'}];
  edad = new Array(100);

  @ViewChild('identifyingData') identifyingData;
  @ViewChild('familyMemberData') familyMemberData;
  ngOnInit() {
    this.getDatos();
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
  get documentationNumber() {
    return this.identifyingDataForm.get('documentationNumber') as FormArray;
  }
  get documentation() {
    return this.identifyingDataForm.get('documentation') as FormArray;
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
  get tarjetaSanitaria() {
    return this.identifyingDataForm.get('tarjetaSanitaria');
  }
  get motivoAusenciaTarjetaSanitaria() {
    return this.identifyingDataForm.get('motivoAusenciaTarjetaSanitaria');
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
    if (!this.identifyingDataForm) {
      return false;
    }
    return this.identifyingDataForm.valid;
  }

  /**
   * Formato para la fecha de las datepicker
   */
  public formatter = (date) => {
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
    this.creacionAusenciaDocumento(this);
    serv.getCaseFileInformation({id: this.router.snapshot.params.id}).subscribe(this.getDatosExpediente.bind(this));
    this.createEdad();


  }

  getDatosExpediente(response){
    console.log(response);
    const RESPUESTA_BD = response.data.mainData[0];
    this.numeroExpedienteCentro = RESPUESTA_BD.numero_expediente_centro;
    this.numeroExpedienteTecnico = RESPUESTA_BD.numero_expediente_tecnico;
    this.identifyingDataForm = this.fb.group({
      entryDate : [RESPUESTA_BD.fecha_ingreso ? new Date(RESPUESTA_BD.fecha_ingreso) : ''],
      departureDate : [RESPUESTA_BD.fecha_salida ? new Date(RESPUESTA_BD.fecha_salida) : ''],
      evaluationDate : [RESPUESTA_BD.fecha_evaluacion ? new Date(RESPUESTA_BD.fecha_evaluacion) : ''],
      formaIngreso: [RESPUESTA_BD.idFormaIngreso],
      origenIngreso: [RESPUESTA_BD.idOrigenIngreso],
      name : [RESPUESTA_BD.nombre, Validators.required],
      apellido1 : [RESPUESTA_BD.apellido1, Validators.required],
      apellido2: [RESPUESTA_BD.apellido2],
      documentationType: [''],
      documentationOtherType: [''],
      documentationNumber: this.fb.array([]),
      lackDocumentation: [''],
      tiposAusenciaDocumento: this.fb.array([]),
      telefono: [RESPUESTA_BD.telefono],
      correo: [RESPUESTA_BD.email],
      bornDate: [RESPUESTA_BD.fecha_nacimiento ? new Date(RESPUESTA_BD.fecha_nacimiento) : ''],
      edad: [RESPUESTA_BD.edad],
      paisNacimiento: [RESPUESTA_BD.idPaisNacimiento],
      provinciaNacimiento: [RESPUESTA_BD.idProvinciaNacimiento],
      municipioNacimiento: [RESPUESTA_BD.idPoblacionNacimiento],
      nacionalidad: [RESPUESTA_BD.nacionalidad],
      provinciaEmpadronamiento: [''],
      municipioEmpadronamiento: [RESPUESTA_BD.idPoblacionEmpadronamiento],
      sexoEv: [RESPUESTA_BD.idSexoEv],
      orientacionSexual: [RESPUESTA_BD.idOrientacionSexual],
      censusDate: [''],
      sSNumber: [RESPUESTA_BD.numero_ss],
      asistenciaSanitaria: [''],
      sNSNumber: [''],
      tarjetaSanitaria: [''],
      motivoAusenciaTarjetaSanitaria: [''],
      estadoCivil: [RESPUESTA_BD.idEstadoCivil],
      permisoResidencia: [''],
      tipoPermisoResidencia: [''],
      residancePermitDate: ['']
    });
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
    setTimeout(() => {
      that.tiposDocumento.push({value: '99', viewValue: 'Otros'});
      that.ausenciaDocumento = that.tiposDocumento.filter(
        (element) => {
          if (element.value !== '99') {
            return true;
          }
          return false;
      });
    }, 2000);
  }

  /**
   * Rellena o vacia el array del formBuilder en función de los tipos de documento que faltan.
   * @param event nos da información sobre las selección actual y la anterior
   */
  createDocumentationInputs(event, combo1) {
    this.ausenciaDocumento = this.tiposDocumento.filter(
      (element) => {
        if (element.value !== '99') {
          return event.newSelection.indexOf(element) === -1;
        }
    });
    combo1.selectItems(combo1.selectedItems().filter(
      (element) => {
        if (element.value !== '99') {
          return event.newSelection.indexOf(element) === -1;
        }
    }), true);

    if (event.newSelection.length === 0) {
      // tslint:disable-next-line: prefer-for-of
      for (let index = 0; index < this.documentationNumber.length; index++) {
        this.documentationNumber.removeAt(this.documentationNumber.length - 1);
      }
    }
    if (event.newSelection.length > event.oldSelection.length) {
      this.documentationNumber.push(this.fb.control(''));
    } else if (event.newSelection.length < event.oldSelection.length) {
      this.documentationNumber.removeAt(this.documentationNumber.length - 1);
    }
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

  addDocument() {
    this.documentation.push(this.fb.group({
      documentionType: '',
      documentationOtherType: '',
      documentationNumber: ''
    }));
  }

  deleteDocument() {
    this.documentation.removeAt(this.documentation.length - 1);
  }

  sendDatos() {
    const formulario = this.identifyingDataForm.value;
    console.log(formulario);
    const documentacion = this.buildDocumentation( formulario.documentationType,
                                                    formulario.documentationOtherType,
                                                    formulario.documentationNumber);
    const documentacionPerdida = this.buildLostDocumentation(formulario.lackDocumentation,
                                                             formulario.tiposAusenciaDocumento);

    const envioDatosPost = {
      id_expediente: this.router.snapshot.params.id,
      fechaExpediente: this.stayService.formatoFecha(formulario.evaluationDate),
      nombre: this.stayService.formatoString(formulario.name),
      apellido1: this.stayService.formatoString(formulario.apellido1),
      apellido2: this.stayService.formatoString(formulario.apellido2),
      sexoEv: formulario.sexoEv,
      orientacionSexual: formulario.orientacionSexual,
      documentacion,
      documentacionPerdida,
      email: formulario.correo,
      telefono: formulario.telefono,
      fechaNacimiento: this.stayService.formatoFecha(formulario.bornDate),
      paisNacimiento: formulario.paisNacimiento,
      provinciaNacimiento: this.provinciaNacimiento.value,
      municipioNacimiento: this.municipioNacimiento.value,
      formaIngreso: formulario.formaIngreso,
      origenIngreso: formulario.origenIngreso,
      nacionalidad: formulario.nacionalidad,
      provinciaEmpadronamiento: this.provinciaEmpadronamiento.value,
      municipioEmpadronamiento: this.municipioEmpadronamiento.value,
      fechaEmpadronamiento: this.stayService.formatoFecha(formulario.censusDate),
      numeroSS: formulario.sSNumber,
      asistenciaSanitaria: (formulario.asistenciaSanitaria) ? formulario.asistenciaSanitaria : null,
      nAsistenciaSanitariaServicioNacionalSalud: formulario.sNSNumber,
      tarjetaSanitaria: (formulario.tarjetaSanitaria) ? formulario.tarjetaSanitaria : null,
      motivoAusenciaTarjetaSanitaria: formulario.motivoAusenciaTarjetaSanitaria,
      estadoCivil: formulario.estadoCivil,
      permisoResidencia: (formulario.permisoResidencia) ? formulario.permisoResidencia : null,
      tipoPermisoResidencia: formulario.tipoPermisoResidencia,
      renovacionPerisoResidencia: this.stayService.formatoFecha(formulario.residancePermitDate)
    };
    this.stayService.sendIdentifyingDataForm(envioDatosPost).subscribe(res => {
      console.log('respuesta del servidor', res);
    });
  }

  getForm(){
    return this.identifyingDataForm;
  }

  buildDocumentation(tipos, tipoOtro, numero) {
    let documentacion = [];
    let otro = null;
    tipos ? tipos.forEach((tipo, index) => {
      if (tipo.value !== '99') {
        documentacion.push({tipo: tipo.value, numero: numero[index]});
      } else {
        otro = {tipo: tipoOtro, numero: numero[index] };
      }

    }) : documentacion = null;
    return {documentacion, otraDocumentacion: otro};
  }

  buildLostDocumentation(tipos, motivoDeLaPerdida){
    let documentacionPerdida = [];
    tipos ? tipos.forEach((tipo, index) => {
      documentacionPerdida.push({tipo: tipo.value, motivoPerdida: motivoDeLaPerdida[index]});
    }) : documentacionPerdida = null;
    return documentacionPerdida;
  }
}
