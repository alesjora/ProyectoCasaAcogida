import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
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
  public date: Date;
  public registrationForm;
  public urlImagen: string | ArrayBuffer = '../../../../assets/photos/StandarProfile.png';
  private changedImage = false;
  private dayFormatter = new Intl.DateTimeFormat('es', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });

  constructor(private fb: FormBuilder,
    private storeService: StoreService,
    private registrationFormService: RegistrationFormService,
    private snackBarService: SnackBarService,
    private logoutService: LogoutService) {
    this.storeService.checkPermission();
    this.date = new Date(Date.now());
    this.storeService.sendCurrentRoute('Nueva ficha de registro');
  }

  ngOnInit() {
    this.createForm();
  }
  createForm() {
    this.registrationForm = this.fb.group({
      name: ['', [Validators.required]],
      surnames: ['', [Validators.required]],
      dni: ['',],
      initialDate: [this.date, [Validators.required]],
      photo: ['',]
    });
  }


  get name() {
    return this.registrationForm.get('name');
  }
  get surnames() {
    return this.registrationForm.get('surnames');
  }
  get dni() {
    return this.registrationForm.get('dni');
  }
  get initialDate() {
    return this.initialDate.get('initialDate');
  }
  public formatter = (date: Date) => {
    // tslint:disable-next-line:max-line-length
    return `${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
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
    reader.onload = function () {
      these.urlImagen = reader.result;
    }
    if (!this.changedImage) {
      this.changedImage = true;
    }
  }

  public sendData() {
    const fecha = this.date.getFullYear() + '-' + (this.date.getMonth() + 1) + '-' + this.date.getDate();
    const imagen: string | ArrayBuffer = (this.changedImage) ? this.urlImagen : '';
    const data = {
      nombre: this.name.value,
      apellidos: this.surnames.value,
      dni: this.dni.value,
      fechaEntrada: fecha,
      image: imagen
    };

    this.registrationFormService.sendData(data).subscribe(this.sendDataSuccess.bind(this),
    this.snackBarService.showSnackbar.bind(this, 'Error al crear la ficha.', 1000, 'bottom', 'error'));
  }

  sendDataSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCESS':
        this.snackBarService.showSnackbar('Ficha creada correctamente.', 1000, 'bottom', 'success');
        break;
      default:
        this.snackBarService.showSnackbar('Error al crear la ficha.', 1000, 'bottom', 'error');
        break;
    }
  }
}
