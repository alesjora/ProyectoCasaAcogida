import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FamilyMemberDataService } from './service/family-member-data.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { IgxComboComponent } from 'igniteui-angular';
import { StayService } from 'src/app/shared/services/stay.service';

@Component({
  selector: 'app-family-member-data',
  templateUrl: './family-member-data.component.html',
  styleUrls: ['./family-member-data.component.scss']
})
export class FamilyMemberDataComponent implements OnInit {
  constructor(private fb: FormBuilder,
              private familiaMemberDataService: FamilyMemberDataService,
              private logoutService: LogoutService,
              private snackBarService: SnackBarService,
              private stayService: StayService) { }
  @ViewChild('familyMemberData') familyMemberData;
  familyMemberDataForm;
  dataFamily = [];
  paises = [];
  provincias = [];
  municipios = [];
  valuesComboboxDataFamily  = [];
  valuesComboboxTypeSocialSupport  = [];
  valuesComboboxSocialSupport  = [];
  valuesComboboxSocialSupportHidden  = [];
  showOtherSocialSupport = false;

  ngOnInit() {
    this.stayService.getPaises().subscribe(this.getPaisesSuccess.bind(this));
    this.createForm();
  }
  getPaisesSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.paises.push({ value: element.id, viewValue: element.nacionalidad });
        });
        break;
      case 'DATA_EMPTY':
        this.snackBarService.showSnackbar('No se han encontrado países', 1000, 'bottom', 'warning');
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
      pais: ['', Validators.required],
      provincia: ['', Validators.required],
      municipio: ['', Validators.required],
      socialSupportCheckbox: ['', Validators.required],
      comboBoxTypeSocialSupport: ['', Validators.required],
      comboBoxSocialSupport: ['', Validators.required],
      otherSocialSupport: ['', Validators.required]
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
  get pais() {
    return this.familyMemberDataForm.get('pais');
  }
  get provincia() {
    return this.familyMemberDataForm.get('provincia');
  }
  get municipio() {
    return this.familyMemberDataForm.get('municipio');
  }
  get socialSupportCheckbox(){
    return this.familyMemberDataForm.get('socialSupportCheckbox');
  }
  get comboBoxTypeSocialSupport(){
    return this.familyMemberDataForm.get('comboBoxTypeSocialSupport');
  }
  get comboBoxSocialSupport(){
    return this.familyMemberDataForm.get('comboBoxSocialSupport');
  }
  get otherSocialSupport(){
    return this.familyMemberDataForm.get('otherSocialSupport');
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

  getProvincias(opened: boolean) {
    if (opened) {
      return;
    }
    this.stayService.getProvincias({ idPais: this.pais.value }).subscribe(this.getProvinciasSuccess.bind(this));
  }
  getProvinciasSuccess(response) {
    this.provincias = [];
    this.municipios = [];
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.provincias.push({ value: element.id, viewValue: element.provincia });
        });
        break;
      case 'DATA_EMPTY':
        this.snackBarService.showSnackbar('No se han encontrado provincias para el país seleccionado', 1000, 'bottom', 'warning');
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener las provincias.', 1000, 'bottom', 'error');
        break;
    }
  }
  getMunicipios(opened: boolean) {
    if (opened) {
      return;
    }
    this.stayService.getMunicipios({ idProvincia: this.provincia.value }).subscribe(
      this.getMunicipiosSuccess.bind(this));
  }
  getMunicipiosSuccess(response) {
    this.municipios = [];
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.municipios.push({ value: element.id, viewValue: element.poblacion });
        });
        break;
      case 'DATA_EMPTY':
        this.snackBarService.showSnackbar('No se han encontrado municipios para la provincia seleccionada', 1000, 'bottom', 'warning');
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los parentescos.', 1000, 'bottom', 'error');
        break;
    }
  }
  getTypeSocialSupport() {
    this.familiaMemberDataService.getTipoApoyoSocial().subscribe(this.getTypeSocialSupportSuccess.bind(this));
    this.familiaMemberDataService.getApoyosSociales().subscribe(this.getApoyosSocialesSuccess.bind(this));
  }
  getTypeSocialSupportSuccess(response) {
    this.valuesComboboxTypeSocialSupport = [];
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.valuesComboboxTypeSocialSupport.push({ value: element.id, viewValue: element.tipo });
        });
        break;
      case 'DATA_EMPTY':
        this.snackBarService.showSnackbar('No se han encontrado municipios para la provincia seleccionada', 1000, 'bottom', 'warning');
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los parentescos.', 1000, 'bottom', 'error');
        break;
    }
  }
  getApoyosSocialesSuccess(response) {
    this.valuesComboboxSocialSupportHidden = [];
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        console.log(response.data);
        response.data.forEach(element => {
          this.valuesComboboxSocialSupportHidden.push({
            value: element.id,
            viewValue: element.apoyo_social + ' (' + element.tipo + ')',
            idTipo: element.idTipo });
        });
        this.valuesComboboxSocialSupportHidden.push({
          value: 100,
          viewValue: 'Otros (Informal)',
          idTipo: 2 });
        break;
      case 'DATA_EMPTY':
        this.snackBarService.showSnackbar('No se han encontrado municipios para la provincia seleccionada', 1000, 'bottom', 'warning');
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los parentescos.', 1000, 'bottom', 'error');
        break;
    }
  }
  getSocialSupport(event) {
    this.valuesComboboxSocialSupport = [];
    this.valuesComboboxSocialSupportHidden.forEach(element => {
      event.newSelection.forEach(element2 => {
        if (element2.value == element.idTipo) {
          this.valuesComboboxSocialSupport.push(element);
        }
      });
    });
  }

  handleSocialsSupports(event) {
    this.showOtherSocialSupport = event.newSelection.find(element => {
      return element.value == 100;
    });
  }
  getData() {
    const data = {
      familyCheckbox: this.familyCheckbox.value,
      comboBoxDataFamily: this.comboBoxDataFamily.value,
      provincia: this.provincia.value
    };
    console.log(data);
  }
}
