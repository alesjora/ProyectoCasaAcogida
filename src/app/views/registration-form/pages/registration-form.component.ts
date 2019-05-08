import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators, FormArray } from '@angular/forms';
import { StoreService } from 'src/app/shared/services/store.service';
import { RegistrationFormService } from '../service/registration-form.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { LogoutService } from 'src/app/shared/services/logout.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  public registrationForm;
  public urlImagen: string | ArrayBuffer = '../../../../assets/photos/StandarProfile.png';
  private changedImage = false;
  public documents: Document[] = [];

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
  }
  createForm() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      document: this.fb.array([
        this.fb.control(''),
      ]),
      documentType: this.fb.array([
        this.fb.control(''),
      ]),
      photo: ['']
    });
  }


  get name() {
    return this.registrationForm.get('name');
  }
  get surnames() {
    return this.registrationForm.get('surnames');
  }
  get document() {
    return this.registrationForm.get('document') as FormArray;
  }
  get documentType() {
    return this.registrationForm.get('documentType') as FormArray;
  }
  addDocument() {
    console.log(this.document);
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
    console.log(this.registrationForm.value);
    const data = {
      nombre: this.name.value,
      apellidos: this.surnames.value,
      image: imagen
    };

    //this.registrationFormService.sendData(data).subscribe(this.sendDataSuccess.bind(this));
  }

  sendDataSuccess(response) {
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
        // const these = this;
        response.data.forEach(element => {
          this.documents.push({value: element.id, viewValue: element.documento});
        });
        break;
      default:
        this.snackBarService.showSnackbar('El al obtener los tipos de documentos', 1000, 'bottom', 'error');
        break;
    }
  }
}
interface Document {
  value: number;
  viewValue: string;
}
