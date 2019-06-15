import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { EconomicService } from './service/economic.service';

@Component({
  selector: 'app-economic',
  templateUrl: './economic.component.html',
  styleUrls: ['./economic.component.scss']
})
export class EconomicComponent implements OnInit {
  economicForm;
  valuesComboboxTypeEconomicIncome = [];
  valuesComboboxTypeBenefit = [];
  valuesSelectEconomicAmount = [];
  showTypeBenefit = false;
  showOtherTypeBenefit = false;
  
  constructor(private fb: FormBuilder,
              private economicService: EconomicService,
              private logoutService: LogoutService,
              private snackBarService: SnackBarService) { }

  ngOnInit() {
    this.createForm();
    this.economicService.getTypeEconomicIncone().subscribe(
      this.handleSuccess.bind(this, this.valuesComboboxTypeEconomicIncome, 'Error al obtener los tipos de ingresos económicos', false)
    );
    this.economicService.getTypeOfBenefit().subscribe(
      this.handleSuccess.bind(this, this.valuesComboboxTypeBenefit, 'Error al obtener los tipos de beneficios', true)
    );
    this.economicService.getEconomicAmount().subscribe(
      this.handleSuccess.bind(this, this.valuesSelectEconomicAmount, 'Error al obtener los tipos de cuantías económicas', false)
    );
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
    this.economicForm = this.fb.group({
      economicIncome : ['', Validators.required],
      comboboxTypeEconomicIncome: [''],
      comboboxTypeBenefit: [''],
      otherTypeBenefit: [''],
      economicAmount: ['']
    });
  }
  get economicIncome() {
    return this.economicForm.get('economicIncome');
  }
  get comboboxTypeEconomicIncome() {
    return this.economicForm.get('comboboxTypeEconomicIncome');
  }
  get comboboxTypeBenefit() {
    return this.economicForm.get('comboboxTypeBenefit');
  }
  get otherTypeBenefit() {
    return this.economicForm.get('otherTypeBenefit');
  }
  get economicAmount() {
    return this.economicForm.get('economicAmount');
  }
  handleTypeBenefits(event) {
    this.showTypeBenefit = event.newSelection.find(element => {
      return element.value == 2;
    });
  }
  handleOtherTypeBenefits(event) {
    this.showOtherTypeBenefit = event.newSelection.find(element => {
      return element.value === -1;
    });
  }
  public formIsValid() {
    return this.economicForm.valid;
  }
}
