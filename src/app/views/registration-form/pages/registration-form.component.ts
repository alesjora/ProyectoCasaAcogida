import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { StoreService } from 'src/app/shared/services/store.service';
import { RegistrationFormService } from '../service/registration-form.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { element } from '@angular/core/src/render3';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {
  public date: Date;

  private monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });

  public registrationForm;
  public urlImagen: string | ArrayBuffer = '../../../../assets/photos/StandarProfile.png';
  private changedImage = false;

  public documents: Document[] = [];
  public paises = [];
  public sexos = [];


  public selectedSexo: string;
  constructor(private fb: FormBuilder,
              private storeService: StoreService,
              private registrationFormService: RegistrationFormService,
              private snackBarService: SnackBarService,
              private logoutService: LogoutService) {
    this.storeService.checkPermission();
    this.storeService.sendCurrentRoute('Nueva ficha personal');
  }

  ngOnInit() {
    this.createForm();
    this.registrationFormService.getTypeDocuments().subscribe(this.getTypeDocumentsSuccess.bind(this));
    this.registrationFormService.getNacionalidad().subscribe(this.getPaises.bind(this));
    this.registrationFormService.getSexo().subscribe(this.getSexos.bind(this));
  }
  createForm() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      surname1: ['', [Validators.required]],
      surname2: [''],
      bornDate: [''],
      lugarNacimiento: [''],
      sexo: ['', [Validators.required]],
      nacionalidad: [''],
      document: this.fb.array([
        this.fb.control(''),
      ]),
      documentType: this.fb.array([
        this.fb.control(''),
      ]),
      observaciones: [''],
      photo: ['']
    });
  }


  get name() {
    return this.registrationForm.get('name');
  }
  get surname1() {
    return this.registrationForm.get('surname1');
  }
  get surname2() {
    return this.registrationForm.get('surname2');
  }
  get bornDate() {
    return this.registrationForm.get('bornDate');
  }
  get document() {
    return this.registrationForm.get('document') as FormArray;
  }
  get documentType() {
    return this.registrationForm.get('documentType') as FormArray;
  }
  addDocument() {
    this.document.push(this.fb.control(''));
    this.documentType.push(this.fb.control(''));
  }

  onFileSelected(e) {
    // Creamos el objeto de la clase FileReader
    const reader = new FileReader();
    // Leemos el archivo subido y se lo pasamos a nuestro fileReader
    if (e.target.files.length === 0) {
      return;
    }
    reader.readAsDataURL(e.target.files[0]);
    // Le decimos que cuando este listo ejecute el código interno
    const these = this;
    reader.onload = () => {
      these.urlImagen = reader.result;
    };
    if (!this.changedImage) {
      this.changedImage = true;
    }
  }

  public sendData() {
    const imagen: string | ArrayBuffer = (this.changedImage) ? this.urlImagen : '';
    const bornDate = this.registrationForm.value.bornDate.getFullYear() + '/' +
                  (this.registrationForm.value.bornDate.getMonth() + 1) + '/' +
                  this.registrationForm.value.bornDate.getDate();
    const data = {
      nombre: this.name.value,
      apellido1 : this.registrationForm.value.surname1,
      apellido2 : this.registrationForm.value.surname2,
      fechaNacimiento : bornDate,
      lugarNacimiento: this.registrationForm.value.lugarNacimiento,
      sexo: this.registrationForm.value.sexo,
      nacionalidad: this.registrationForm.value.nacionalidad,
      document: this.registrationForm.value.document,
      documentType: this.registrationForm.value.documentType,
      observaciones: this.registrationForm.value.observaciones,
      image: imagen
    };

    this.registrationFormService.sendData(data).subscribe(this.sendDataSuccess.bind(this));
  }

  public formatter = (date: Date) => {
    return `${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }

  sendDataSuccess(response) {
    console.log(response);
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.snackBarService.showSnackbar('Ficha creada correctamente.', 1000, 'bottom', 'success');
        break;
      case 'DOCUMENTATION_EXISTS':
        this.snackBarService.showSnackbar('El documento de identidad ya existe.', 1000, 'bottom', 'error');
        break;
      default:
        this.snackBarService.showSnackbar('Error al crear la ficha.', 1000, 'bottom', 'error');
        break;
    }
  }
  getTypeDocumentsSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.documents.push({value: element.id, viewValue: element.documento});
        });
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los tipos de documentos', 1000, 'bottom', 'error');
        break;
    }
  }
  getPaises(response) {
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
  getSexos(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        response.data.forEach(element => {
          this.sexos.push({value: element.id, viewValue: element.sexo});
        });

        this.selectedSexo = this.sexos[1].value;
        break;
      default:
        this.snackBarService.showSnackbar('Error al obtener los sexos', 1000, 'bottom', 'error');
        break;
    }
  }
}
interface Document {
  value: number;
  viewValue: string;
}
