import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { StayService } from 'src/app/shared/services/stay.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-hate-crimes',
  templateUrl: './hate-crimes.component.html',
  styleUrls: ['./hate-crimes.component.scss']
})
export class HateCrimesComponent implements OnInit {

  tiposViolenciaSeleccionables = [];
  lugaresAgresionSeleccionables = [];
  momentosAgresionSeleccionables = [];
  consecuenciasFisicasAgresionSeleccionables = [];
  consecuenciasPicologicasAgresionSeleccionables = [];
  consecuenciasSocioeconomicasAgresionSeleccionables = [];
  constructor(private fb: FormBuilder,
              private stayService: StayService,
              private logoutService: LogoutService,
              private snackBarService: SnackBarService) { }
  hateCrimesForm;
  tiposDocumento = [{value: '1', viewValue: 'holaCavesa'}];

  afirmacionNegacion = [{value: 1, viewValue: 'Si'}, {value: 2, viewValue: 'No'}];

  public selectedSufridoViolencia: string;
  ngOnInit() {
    this.createForm();
    this.getDatos();
  }
  createForm() {
    this.hateCrimesForm = this.fb.group({
      sufridoViolencia: [''],
      documentation: this.fb.array([
        this.fb.group({
          documentionType: new FormControl(''),
          documentationOtherType: new FormControl(''),
          documentationNumber: new FormControl('')
        })
      ]),
    });
  }
  public formIsValid() {
    return this.hateCrimesForm.valid;
  }
  get documentation() {
    return this.hateCrimesForm.get('documentation') as FormArray;
  }
  get sufridoViolencia(){
    return this.hateCrimesForm.get('sufridoViolencia');
  }
  getDatos() {
    const serv = this.stayService;
    serv.getViolenceTypes().subscribe(this.peticionHandleMejorada
      .bind(this, this.tiposViolenciaSeleccionables, 'id', 'tipo_violencia'));
    serv.getAgressionPlaces().subscribe(this.peticionHandleMejorada
      .bind(this, this.lugaresAgresionSeleccionables, 'id', 'lugar_agresion'));
    serv.getAgressionMoments().subscribe(this.peticionHandleMejorada
      .bind(this, this.momentosAgresionSeleccionables, 'id', 't_momentos_agresion'));

    serv.getPhysicalAgressionConsequences().subscribe(this.peticionHandleMejorada
      .bind(this, this.consecuenciasFisicasAgresionSeleccionables, 'id', 'consecuencia'));
    serv.getPsychologicalAgressionConsequences().subscribe(this.peticionHandleMejorada
      .bind(this, this.consecuenciasPicologicasAgresionSeleccionables, 'id', 'consecuencia'));
    serv.getSocioeconomicAgressionConsequences().subscribe(this.peticionHandleMejorada
      .bind(this, this.consecuenciasSocioeconomicasAgresionSeleccionables, 'id', 'consecuencia'));

    console.log('fisica', this.consecuenciasFisicasAgresionSeleccionables);
    console.log('psicofisica', this.consecuenciasPicologicasAgresionSeleccionables);
    console.log('socioeconofisica', this.consecuenciasSocioeconomicasAgresionSeleccionables);


  }
  addDocument() {
    this.documentation.push(this.fb.group({
      documentionType: '',
      documentationOtherType: '',
      documentationNumber: ''
    }));
  }
  deleteDocument() {
    this.documentation.removeAt(this.documentation.length-1);
  }
  getDocumentation(index) {
    //console.log(this.identifyingDataForm.get('documentation').value[index]);
    return this.hateCrimesForm.get('documentation').value[index];
  }
  sendDatos(){
    console.log(this.hateCrimesForm.value);
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
}


