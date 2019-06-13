import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormArray, FormControl, FormGroup } from '@angular/forms';
import { StayService } from 'src/app/shared/services/stay.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-hate-crimes',
  templateUrl: './hate-crimes.component.html',
  styleUrls: ['./hate-crimes.component.scss']
})
export class HateCrimesComponent implements OnInit {

  hateCrimesForm;
  afirmacionNegacion = [{value: 1, viewValue: 'Si'}, {value: 2, viewValue: 'No'}];
  tiposViolenciaSeleccionables = [];
  lugaresAgresionSeleccionables = [];
  momentosAgresionSeleccionables = [];
  consecuenciasFisicasAgresionSeleccionables = [];
  consecuenciasPicologicasAgresionSeleccionables = [];
  consecuenciasSocioeconomicasAgresionSeleccionables = [];
  generoAgresorSeleccionable = [{value: '1' , viewValue: 'Hombre'}, {value: '2', viewValue: 'Mujer'}];

  public selectedSufridoViolencia: string;
  public selectedElementoIntimidatorio: string;

  constructor(private fb: FormBuilder,
              private stayService: StayService,
              private logoutService: LogoutService,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.createForm();
    this.getDatos();
  }

  createForm() {
    this.hateCrimesForm = this.fb.group({
      sufridoViolencia: [''],
      detallesAgresion: this.fb.array([
        this.fb.group({
          agressionType: new FormControl(''),
          agressionPlace: new FormControl(''),
          agresionPlaceTypology: new FormControl(''),
          agressionMoment: new FormControl(''),
          agresores: this.fb.array([
            this.fb.group({
              agressorGlender: new FormControl(''),
              agressorAge: new FormControl(''),
              intimidatoryObjects: new FormControl(''),
            }),
          ]),
        })
      ]),
    });
  }

  public formIsValid() {
    return this.hateCrimesForm.valid;
  }

  get detallesAgresion() {
    return this.hateCrimesForm.get('detallesAgresion') as FormArray;
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
      .bind(this, this.momentosAgresionSeleccionables, 'id', 'momento_agresion'));

    serv.getPhysicalAgressionConsequences().subscribe(this.peticionHandleMejorada
      .bind(this, this.consecuenciasFisicasAgresionSeleccionables, 'id', 'consecuencia'));
    serv.getPsychologicalAgressionConsequences().subscribe(this.peticionHandleMejorada
      .bind(this, this.consecuenciasPicologicasAgresionSeleccionables, 'id', 'consecuencia'));
    serv.getSocioeconomicAgressionConsequences().subscribe(this.peticionHandleMejorada
      .bind(this, this.consecuenciasSocioeconomicasAgresionSeleccionables, 'id', 'consecuencia'));

  }

  addAgression() {
    this.detallesAgresion.push(this.fb.group({
      agressionType: '',
      agressionPlace: '',
      agresionPlaceTypology: '',
      agressionMoment: '',
      agresores: this.fb.array([
        this.fb.group({
          agressorGlender: new FormControl(''),
          agressorAge: new FormControl(''),
          intimidatoryObjects: new FormControl(''),
        }),
      ]),
    }));
  }
  addAgresor(index) {
    const formulario = this.detallesAgresion.controls[index] as FormGroup;
    const agresores = formulario.controls.agresores as FormArray;
    agresores.push(
      this.fb.group({
        agressorGlender: '',
        agressorAge: '',
        intimidatoryObjects: '',
      }));
  }

  deleteAgression() {
    this.detallesAgresion.removeAt(this.detallesAgresion.length - 1);
  }
  deleteAgresor(index){
    const formulario = this.detallesAgresion.controls[index] as FormGroup;
    const agresores = formulario.controls.agresores as FormArray;
    agresores.removeAt(
      agresores.length - 1);
  }

  getDetallesAgresion(index) {
    return this.hateCrimesForm.get('detallesAgresion').value[index];
  }
  getAgresores(index){
    const formulario = this.detallesAgresion.controls[index] as FormGroup;
    return formulario.controls.agresores as FormArray;
  }


  sendDatos(){
    console.log("resultado",this.hateCrimesForm.value);
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


