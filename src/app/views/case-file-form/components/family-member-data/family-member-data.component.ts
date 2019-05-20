import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FamilyMemberDataService } from './service/family-member-data.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';

@Component({
  selector: 'app-family-member-data',
  templateUrl: './family-member-data.component.html',
  styleUrls: ['./family-member-data.component.scss']
})
export class FamilyMemberDataComponent implements OnInit {
  constructor(private fb: FormBuilder,
    private familiaMemberDataService: FamilyMemberDataService,
    private logoutService: LogoutService,
    private snackBarService: SnackBarService) { }
  @ViewChild('familyMemberData') familyMemberData;
  familyMemberDataForm;
  dataFamily = [];
  paises = [];
  provincias = [];
  municipios = [];
  valuesComboboxDataFamily;

  ngOnInit() {
    this.familiaMemberDataService.getPaises().subscribe(this.getPaisesSuccess.bind(this));
    this.createForm();
  }
  getPaisesSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.paises.push({value: element.id, viewValue: element.nacionalidad});
        });
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los paises', 1000, 'bottom', 'error');
        break;
    }
  }
  createForm() {
    this.familyMemberDataForm = this.fb.group({
      familyCheckbox: ['', Validators.required],
      comboBoxDataFamily: [''],
      nHermanosFamily: ['', Validators.required],
      nHijosFamily: ['', Validators.required],
      familyRelationshipCheckbox: ['', Validators.required],
      comboBoxDataFamilyRelationship: [''],
      nHermanosFamilyRelationship: ['', Validators.required],
      nHijosFamilyRelationship: ['', Validators.required],
      personContactCheckbox: ['', Validators.required],
      comboBoxPersonContact: [''],
      typePersonContact: ['', Validators.required],
      infoPersonContact: ['', Validators.required],
      telephonePersonContact: ['', Validators.required],
      paisSelected: ['', Validators.required],
      provinciaSelected: ['', Validators.required],
      municipioSelected: ['', Validators.required],
    });
  }
  public formIsValid() {
    return this.familyMemberDataForm.valid;
  }

  get familyCheckbox() {
    return this.familyMemberDataForm.get('familyCheckbox');
  }
  get comboBoxDataFamily() {
    return this.familyMemberDataForm.get('comboBoxDataFamily');
  }
  get nHermanosFamily() {
    return this.familyMemberDataForm.get('nHermanosFamily');
  }
  get nHijosFamily() {
    return this.familyMemberDataForm.get('nHijosFamily');
  }

  get familyRelationshipCheckbox() {
    return this.familyMemberDataForm.get('familyRelationshipCheckbox');
  }
  get comboBoxDataFamilyRelationship() {
    return this.familyMemberDataForm.get('comboBoxDataFamilyRelationship');
  }
  get nHermanosFamilyRelationship() {
    return this.familyMemberDataForm.get('nHermanosFamilyRelationship');
  }
  get nHijosFamilyRelationship() {
    return this.familyMemberDataForm.get('nHijosFamilyRelationship');
  }

  get personContactCheckbox() {
    return this.familyMemberDataForm.get('personContactCheckbox');
  }
  get comboBoxPersonContact() {
    return this.familyMemberDataForm.get('comboBoxPersonContact');
  }
  get typePersonContact() {
    return this.familyMemberDataForm.get('typePersonContact');
  }
  get infoPersonContact() {
    return this.familyMemberDataForm.get('infoPersonContact');
  }
  get telephonePersonContact() {
    return this.familyMemberDataForm.get('telephonePersonContact');
  }
  get paisSelected() {
    return this.familyMemberDataForm.get('paisSelected');
  }
  get provinciaSelected() {
    return this.familyMemberDataForm.get('provinciaSelected');
  }
  get municipioSelected() {
    return this.familyMemberDataForm.get('municipioSelected');
  }
  getDataFamily() {
    this.familiaMemberDataService.getDataFamily().subscribe(this.getDataFamilySuccess.bind(this))
  }
  getDataFamilySuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        if (this.dataFamily.length !== 0) {
          return;
        }
        response.data.forEach(element => {
          this.dataFamily.push({ value: element.id, viewValue: element.parentesco });
        });
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los parentescos.', 1000, 'bottom', 'error');
        break;
    }
  }
  enableInputDataFamily(name, id) {
    const array = (name === 'family') ? this.comboBoxDataFamily.value : this.comboBoxDataFamilyRelationship.value;
    const checkbox = (name === 'family') ? this.familyCheckbox.value : this.familyRelationshipCheckbox.value;
    if (checkbox == 2) {
      return false;
    }
    if (array) {
      return array.find(value => {
        return value.value == id;
      });
    }
  }
  getData() {
    const data = {
      familyCheckbox: this.familyCheckbox.value,
      comboBoxDataFamily: this.comboBoxDataFamily.value
    };
    console.log(data);
  }
  getProvincias() {
    this.familiaMemberDataService.getProvincias({idPais: this.paisSelected.value}).subscribe(this.getProvinciasSuccess.bind(this));
  }
  getProvinciasSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.provincias = [];
        response.data.forEach(element => {
          this.provincias.push({ value: element.id, viewValue: element.provincia });
        });
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los parentescos.', 1000, 'bottom', 'error');
        break;
    }
  }
  getMunicipios() {
    this.familiaMemberDataService.getMunicipios({idProvincia: this.provinciaSelected.value}).subscribe(
      this.getMunicipiosSuccess.bind(this));
  }
  getMunicipiosSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.municipios = [];
        response.data.forEach(element => {
          this.municipios.push({ value: element.id, viewValue: element.poblacion });
        });
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los parentescos.', 1000, 'bottom', 'error');
        break;
    }
  }
}
