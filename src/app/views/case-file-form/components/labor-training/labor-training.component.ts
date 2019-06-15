import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LaborTrainingService } from './service/labor-training.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-labor-training',
  templateUrl: './labor-training.component.html',
  styleUrls: ['./labor-training.component.scss']
})
export class LaborTrainingComponent implements OnInit {
  laborTrainingForm;
  valuesSelectEducationLevel = [];
  valuesSelectEmploymentSituation = [];
  valuesSelectUnemployedTime = [];
  valuesSelectWorkContract = [];
  valuesSelectTypeWorkContract = [];
  valuesSelectMainOccupation = [];

  constructor(private fb: FormBuilder,
              private laborTrainingService: LaborTrainingService,
              private logoutService: LogoutService,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.createForm();
    this.laborTrainingService.getTypeEducationLevel().subscribe(
      this.handleSuccess.bind(this, this.valuesSelectEducationLevel, 'Error al obtener los tipos de educación', false));
    this.laborTrainingService.getTypeEmploymentSituation().subscribe(
      this.handleSuccess.bind(this, this.valuesSelectEmploymentSituation, 'Error al obtener los tipos de situaciones de empleo', false));
    this.laborTrainingService.getUnemployedTime().subscribe(
      this.handleSuccess.bind(this, this.valuesSelectUnemployedTime, 'Error al obtener los tipos de tiempo de desempleo', false));
    this.laborTrainingService.getWorkContract().subscribe(
      this.handleSuccess.bind(this, this.valuesSelectWorkContract, 'Error al obtener el contrato laboral', false));
    this.laborTrainingService.getTypeWorkContract().subscribe(
      this.handleSuccess.bind(this, this.valuesSelectTypeWorkContract, 'Error al obtener los tipos de contrato laboral', false));
    this.laborTrainingService.getMainOccupation().subscribe(
      this.handleSuccess.bind(this, this.valuesSelectMainOccupation, 'Error al obtener los tipos ocupación principal', true));
  }
  handleSuccess(valuesSelect, errorMessage, fieldOther, response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          valuesSelect.push({ value: element.id, viewValue: element.value });
        });
        if (fieldOther) {
          valuesSelect.push({ value: -1, viewValue: 'Otros' });
        }
        break;
      default:
        this.snackBarService.showSnackbar(errorMessage, 1000, 'bottom', 'error');
        break;
    }
  }
  createForm() {
    this.laborTrainingForm = this.fb.group({
      educationLevel: ['', Validators.required],
      employmentSituation: ['', Validators.required],
      unemployedTime: [''],
      workContractSelect: [''],
      workContractCheckbox: [''],
      typeWorkContract: [''],
      mainOccupation: [''],
      otherMainOccupation: ['']
    });
  }
  get educationLevel() {
    return this.laborTrainingForm.get('educationLevel');
  }
  get employmentSituation() {
    return this.laborTrainingForm.get('employmentSituation');
  }
  get unemployedTime() {
    return this.laborTrainingForm.get('unemployedTime');
  }
  get workContractSelect() {
    return this.laborTrainingForm.get('workContractSelect');
  }
  get workContractCheckbox() {
    return this.laborTrainingForm.get('workContractCheckbox');
  }
  get typeWorkContract() {
    return this.laborTrainingForm.get('typeWorkContract');
  }
  get mainOccupation() {
    return this.laborTrainingForm.get('mainOccupation');
  }
  get otherMainOccupation() {
    return this.laborTrainingForm.get('otherMainOccupation');
  }
  public formIsValid() {
    return this.laborTrainingForm.valid;
  }

}
