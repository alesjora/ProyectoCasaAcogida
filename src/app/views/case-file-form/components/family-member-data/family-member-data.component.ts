import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { FamilyMemberDataService } from './service/family-member-data.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
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
  monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });
  familyMemberDataForm;
  dataFamily = [];
  paises = [];
  provinciasPersonContact = [];
  municipiosPersonContact = [];
  provinciasInmediateOrigin = [];
  municipiosInmediateOrigin = [];
  provinciasOfHousing = [];
  municipiosOfHousing = [];
  valuesComboboxDataFamily = [];
  valuesComboboxTypeSocialSupport = [];
  valuesComboboxSocialSupport = [];
  valuesComboboxSocialSupportHidden = [];
  showOtherSocialSupport = false;
  valuesSelectHomelessTime = [];
  valuesSelectResidenceTimeInCordoba = [];
  valuesComboboxReasonForStay = [];
  showOtherReasonForStay = false;
  valuesComboboxOtherSocialCenter = [];
  showOtherTypeSocialCenter = false;
  valuesComboboxTypeCenterCohabita = [];

  ngOnInit() {
    this.stayService.getPaises().subscribe(this.getPaisesSuccess.bind(this));
    this.familiaMemberDataService.getMotivosEstanciaCentro().subscribe(this.getMotivosEstanciaCentroSuccess.bind(this));
    this.createForm();
  }
  getMotivosEstanciaCentroSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.valuesComboboxReasonForStay.push({ value: element.id, viewValue: element.motivo_estancia });
        });
        this.valuesComboboxReasonForStay.push({ value: 100, viewValue: 'Otros' });
        break;
      case 'DATA_EMPTY':
        this.snackBarService.showSnackbar('No se han encontrado países', 1000, 'bottom', 'warning');
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los paises', 1000, 'bottom', 'error');
        break;
    }
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
      paisPersonContact: ['', Validators.required],
      provinciaPersonContact: ['', Validators.required],
      municipioPersonContact: ['', Validators.required],
      socialSupportCheckbox: ['', Validators.required],
      comboBoxTypeSocialSupport: ['', Validators.required],
      comboBoxSocialSupport: ['', Validators.required],
      otherSocialSupport: ['', Validators.required],
      homelessTimeCheckbox: ['', Validators.required],
      homelessTimeSelect: ['', Validators.required],
      paisInmediateOrigin: ['', Validators.required],
      provinciaInmediateOrigin: ['', Validators.required],
      municipioInmediateOrigin: ['', Validators.required],
      residenceTimeInCordobaCheckbox: ['', Validators.required],
      residenceTimeInCordobaSelect: ['', Validators.required],
      comboBoxReasonForStay: ['', Validators.required],
      otherReasonForStay: ['', Validators.required],
      otherSocialCenterCheckbox: ['', Validators.required],
      comboBoxOtherSocialCenter: ['', Validators.required],
      otherSocialCenterInCordobaCheckbox: ['', Validators.required],
      hasBeenACohabitaUserCheckbox: ['', Validators.required],
      otherTypeSocialCenterCheckbox: ['', Validators.required],
      comboBoxTypeCenterCohabita: ['', Validators.required],
      ownHomeCheckbox: ['', Validators.required],
      typeOfHousing: ['', Validators.required],
      provinciaOfHousing: ['', Validators.required],
      municipioOfHousing: ['', Validators.required],
      VIMApplicant: ['', Validators.required],
      VIMApplicantDate: [{value: '', disabled: true}, Validators.required],
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
  get paisPersonContact() {
    return this.familyMemberDataForm.get('paisPersonContact');
  }
  get provinciaPersonContact() {
    return this.familyMemberDataForm.get('provinciaPersonContact');
  }
  get municipioPersonContact() {
    return this.familyMemberDataForm.get('municipioPersonContact');
  }
  get socialSupportCheckbox() {
    return this.familyMemberDataForm.get('socialSupportCheckbox');
  }
  get comboBoxTypeSocialSupport() {
    return this.familyMemberDataForm.get('comboBoxTypeSocialSupport');
  }
  get comboBoxSocialSupport() {
    return this.familyMemberDataForm.get('comboBoxSocialSupport');
  }
  get otherSocialSupport() {
    return this.familyMemberDataForm.get('otherSocialSupport');
  }
  get homelessTimeCheckbox() {
    return this.familyMemberDataForm.get('homelessTimeCheckbox');
  }
  get homelessTimeSelect() {
    return this.familyMemberDataForm.get('homelessTimeSelect');
  }
  get paisInmediateOrigin() {
    return this.familyMemberDataForm.get('paisInmediateOrigin');
  }
  get provinciaInmediateOrigin() {
    return this.familyMemberDataForm.get('provinciaInmediateOrigin');
  }
  get municipioInmediateOrigin() {
    return this.familyMemberDataForm.get('municipioInmediateOrigin');
  }
  get residenceTimeInCordobaCheckbox() {
    return this.familyMemberDataForm.get('residenceTimeInCordobaCheckbox');
  }
  get residenceTimeInCordobaSelect() {
    return this.familyMemberDataForm.get('residenceTimeInCordobaSelect');
  }
  get comboBoxReasonForStay() {
    return this.familyMemberDataForm.get('comboBoxReasonForStay');
  }
  get otherReasonForStay() {
    return this.familyMemberDataForm.get('otherReasonForStay');
  }
  get otherSocialCenterCheckbox() {
    return this.familyMemberDataForm.get('otherSocialCenterCheckbox');
  }
  get comboBoxOtherSocialCenter() {
    return this.familyMemberDataForm.get('comboBoxOtherSocialCenter');
  }
  get otherSocialCenterInCordobaCheckbox() {
    return this.familyMemberDataForm.get('otherSocialCenterInCordobaCheckbox');
  }
  get hasBeenACohabitaUserCheckbox() {
    return this.familyMemberDataForm.get('hasBeenACohabitaUserCheckbox');
  }
  get otherTypeSocialCenterCheckbox() {
    return this.familyMemberDataForm.get('otherTypeSocialCenterCheckbox');
  }
  get comboBoxTypeCenterCohabita() {
    return this.familyMemberDataForm.get('comboBoxTypeCenterCohabita');
  }
  get ownHomeCheckbox() {
    return this.familyMemberDataForm.get('ownHomeCheckbox');
  }
  get typeOfHousing() {
    return this.familyMemberDataForm.get('typeOfHousing');
  }
  get provinciaOfHousing() {
    return this.familyMemberDataForm.get('provinciaOfHousing');
  }
  get municipioOfHousing() {
    return this.familyMemberDataForm.get('municipioOfHousing');
  }
  get VIMApplicant() {
    return this.familyMemberDataForm.get('VIMApplicant');
  }
  get VIMApplicantDate() {
    return this.familyMemberDataForm.get('VIMApplicantDate');
  }

  getOtherTypeCenterCohabita(){
    this.familiaMemberDataService.getOtherTypeCenterCohabita().subscribe(this.getOtherTypeCenterCohabitaSuccess.bind(this));
  }
  getOtherTypeCenterCohabitaSuccess(response) {
    this.valuesComboboxTypeCenterCohabita = [];
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.valuesComboboxTypeCenterCohabita.push({ value: element.id, viewValue: element.centro_social });
        });
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los parentescos.', 1000, 'bottom', 'error');
        break;
    }
  }
  getOtherSocialCenter(){
    this.familiaMemberDataService.getSocialCenters().subscribe(this.getOtherSocialCenterSucess.bind(this))
  }
  getOtherSocialCenterSucess(response) {
    this.valuesComboboxOtherSocialCenter = [];
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.valuesComboboxOtherSocialCenter.push({ value: element.id, viewValue: element.centro_social });
        });
        this.valuesComboboxOtherSocialCenter.push({ value: 100, viewValue: 'Otro' });
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los parentescos.', 1000, 'bottom', 'error');
        break;
    }
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
  limpiarProvinciaMunicipioPersonContact() {
    this.provinciasPersonContact = [];
    this.municipiosPersonContact = [];
    this.provinciaPersonContact.value = '';
    this.municipioPersonContact.value = '';
  }
  getProvinciasPersonContact(opened: boolean, idPais) {
    if (opened) {
      return;
    }
    this.limpiarProvinciaMunicipioPersonContact();
    this.stayService.getProvincias({ idPais }).subscribe(this.getProvinciasPersonContactSuccess.bind(this));
  }
  getProvinciasPersonContactSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.provinciasPersonContact.push({ value: element.id, viewValue: element.provincia });
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
  getMunicipiosOfHousing(opened: boolean, idProvincia) {
    if (opened) {
      return;
    }
    this.limpiarMunicipioOfHousing();
    this.stayService.getMunicipios({ idProvincia }).subscribe(
      this.getMunicipiosOfHousingSuccess.bind(this));
  }
  getMunicipiosOfHousingSuccess(response) {
    this.municipiosPersonContact = [];
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.municipiosOfHousing.push({ value: element.id, viewValue: element.poblacion });
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
  getMunicipiosPersonContact(opened: boolean, idProvincia) {
    if (opened) {
      return;
    }
    this.stayService.getMunicipios({ idProvincia }).subscribe(
      this.getMunicipiosPersonContactSuccess.bind(this));
  }
  getMunicipiosPersonContactSuccess(response) {
    this.municipiosPersonContact = [];
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.municipiosPersonContact.push({ value: element.id, viewValue: element.poblacion });
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
  limpiarProvinciaMunicipioInmediateOrigin() {
    this.provinciasInmediateOrigin = [];
    this.municipiosInmediateOrigin = [];
    this.provinciaInmediateOrigin.value = '';
    this.municipioInmediateOrigin.value = '';
  }
  limpiarMunicipioOfHousing() {
    this.municipiosOfHousing = [];
    this.municipioOfHousing.value = '';
  }
  getProvinciasOfHousing(idPais = 1) {
    this.stayService.getProvincias({ idPais }).subscribe(this.getProvinciasOfHousingSucess.bind(this));
  }
  getProvinciasOfHousingSucess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.provinciasOfHousing.push({ value: element.id, viewValue: element.provincia });
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
  getProvinciasInmediateOrigin(opened: boolean, idPais) {
    if (opened) {
      return;
    }
    this.limpiarProvinciaMunicipioInmediateOrigin();
    this.stayService.getProvincias({ idPais }).subscribe(this.getProvinciasInmediateOriginSuccess.bind(this));
  }
  getProvinciasInmediateOriginSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.provinciasInmediateOrigin.push({ value: element.id, viewValue: element.provincia });
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
  getMunicipiosInmediateOrigin(opened: boolean, idProvincia) {
    if (opened) {
      return;
    }
    this.stayService.getMunicipios({ idProvincia }).subscribe(
      this.getMunicipiosInmediateOriginSuccess.bind(this));
  }
  getMunicipiosInmediateOriginSuccess(response) {
    this.municipiosInmediateOrigin = [];
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.municipiosInmediateOrigin.push({ value: element.id, viewValue: element.poblacion });
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
        response.data.forEach(element => {
          this.valuesComboboxSocialSupportHidden.push({
            value: element.id,
            viewValue: element.apoyo_social + ' (' + element.tipo + ')',
            idTipo: element.idTipo
          });
        });
        this.valuesComboboxSocialSupportHidden.push({
          value: 100,
          viewValue: 'Otros (Informal)',
          idTipo: 2
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
  handleReasonForStay(event) {
    this.showOtherReasonForStay = event.newSelection.find(element => {
      return element.value == 100;
    });
  }
  handleOtherSocialsCenter(event) {
    this.showOtherTypeSocialCenter = event.newSelection.find(element => {
      return element.value == 100;
    });
  }
  homelessTimeCheckboxChange(event) {
    this.homelessTimeSelect.value = '';
    switch (event.value) {
      case '1':
        this.fillSelectHomelessTime(30, 'día', 'días');
        break;
      case '2':
        this.fillSelectHomelessTime(12, 'mes', 'meses');
        break;
      case '3':
        this.fillSelectHomelessTime(100, 'año', 'años');
        break;
    }
  }

  fillSelectHomelessTime(maxValue, word1, word2) {
    this.valuesSelectHomelessTime = [];
    for (let index = 1; index <= maxValue; index++) {
      this.valuesSelectHomelessTime.push({
        value: index,
        viewValue: (index === 1) ? index + ' ' + word1 : index + ' ' + word2
      });
    }
  }
  residenceTimeInCordobaCheckboxChange(event) {
    this.residenceTimeInCordobaSelect.value = '';
    switch (event.value) {
      case '1':
        this.fillSelectResidenceTimeInCordoba(30, 'día', 'días');
        break;
      case '2':
        this.fillSelectResidenceTimeInCordoba(12, 'mes', 'meses');
        break;
      case '3':
        this.fillSelectResidenceTimeInCordoba(50, 'año', 'años');
        break;
    }
  }

  fillSelectResidenceTimeInCordoba(maxValue, word1, word2) {
    this.valuesSelectResidenceTimeInCordoba = [];
    for (let index = 1; index <= maxValue; index++) {
      this.valuesSelectResidenceTimeInCordoba.push({
        value: index,
        viewValue: (index === 1) ? index + ' ' + word1 : index + ' ' + word2
      });
    }
  }
  getData() {
    const data = {
      familyCheckbox: this.familyCheckbox.value,
      comboBoxDataFamily: this.comboBoxDataFamily.value,
      provincia: this.provinciaPersonContact.value
    };
  }
  /**
   * Formato para la fecha de las datepicker
   */
  public formatter = (date: Date) => {
    return `${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }
}
