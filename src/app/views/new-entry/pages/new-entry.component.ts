import { Component, OnInit, Pipe, PipeTransform } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/shared/validators/custom-validators';
import { NewEntryService } from '../service/new-entry.service';
import { LogoutService } from 'src/app/shared/services/logout.service';
import { SnackBarService } from 'src/app/shared/services/snack-bar.service';
import { StoreService } from 'src/app/shared/services/store.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-entry',
  templateUrl: './new-entry.component.html',
  styleUrls: ['./new-entry.component.scss']
})
export class NewEntryComponent implements OnInit {
  public personalFiles = [];
  public rooms = [];
  public personalFileSelected;
  public personalFileId;
  public newEntryForm;
  public date: Date;
  public time: Date;
  private dayFormatter = new Intl.DateTimeFormat('es', { weekday: 'long' });
  private monthFormatter = new Intl.DateTimeFormat('es', { month: 'long' });
  public selectedRoom;


  constructor(public fb: FormBuilder,
              public newEntryService: NewEntryService,
              public logoutService: LogoutService,
              public snackBarService: SnackBarService,
              public storeService: StoreService,
              public router: Router) {
    this.date = new Date(Date.now());
    this.time = this.date;
  }

  createForm() {
    this.newEntryForm = this.fb.group({
      personalFile: ['', [Validators.required]],
      entryDate: ['', [Validators.required]],
      entryTime: ['', [Validators.required]],
      room: ['', [Validators.required]],
      bed: ['', [Validators.required]]
    });
  }
  ngOnInit() {
    this.createForm();

    this.newEntryService.getRoomsAndBedsAvailable().subscribe(this.getRoomsAndBedsAvailableSuccess.bind(this),
      this.snackBarService.showSnackbar.bind(this, 'Error al conectar con el servidor', 3000, 'bottom', 'error'));

    this.newEntryService.getPersonsAvailables().subscribe(this.getPersonsAvailablesSuccess.bind(this),
      this.snackBarService.showSnackbar.bind(this, 'Error al conectar con el servidor', 3000, 'bottom', 'error'));

  }

  goToRegistrationForm() {
    this.storeService.setComeFromNewEntry(true);
    this.router.navigate(['/dashboard/nueva-ficha-personal']);
    //routerLink="/dashboard/nueva-ficha-personal" 
  }

  getRoomsAndBedsAvailableSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.rooms = response.data;
        //console.log(this.rooms);
        break;
      default:
        this.snackBarService.showSnackbar('No hay camas disponibles.', 3000, 'bottom', 'error');
        break;
    }
  }

  getPersonsAvailablesSuccess(response) {
    switch (response.status) {
      case 'SESSION_EXPIRED':
        this.logoutService.goToLoginWithMessage('SESSION_EXPIRED');
        break;
      case 'OPERATION_SUCCESS':
        this.personalFiles = response.data;
        this.newEntryForm.get('personalFile').setValidators([CustomValidators.namePersonSelectedValidator(this.personalFiles, 'personalFile')]);
        break;
      default:
        this.snackBarService.showSnackbar('No hay personas disponibles.', 3000, 'bottom', 'error');
        break;
    }
  }

  get personalFile() {
    return this.newEntryForm.get('personalFile');
  }
  get entryDate() {
    return this.newEntryForm.get('entryDate');
  }
  get entryTime() {
    return this.newEntryForm.get('entryTime');
  }
  get room() {
    return this.newEntryForm.get('room');
  }
  get bed() {
    return this.newEntryForm.get('bed');
  }

  selectPerson(person) {
    this.personalFileId = person.id;
    return person.name + ' ' + person.surname1 + ' ' + person.surname2;
  }

  selectBedsOfRoom() {
    const room = this.rooms.find(value => {
      return value.id === this.room.value;
    });
    if (room == null) {
      return;
    }
    return room.beds;
  }

  public formatter = (date: Date) => {
    // tslint:disable-next-line:max-line-length
    return `${this.dayFormatter.format(date)}, ${date.getDate()} ${this.monthFormatter.format(date)}, ${date.getFullYear()}`;
  }

  public sendData() {
    const data = {
      idPersonalFile: this.personalFileId,
      entryDate: this.getDate(this.entryDate.value),
      entryHour: this.getTime(this.entryTime.value),
      idRoom: this.room.value,
      idBed: this.bed.value
    };
    console.log(data);
  }

  public getDate(date: Date) {
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();
  }
  public getTime(date: Date) {
    return date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
  }

  // public validateTime(){
  //   if()
  // }
}
@Pipe({ name: 'startsWith' })
export class AutocompletePipeStartsWith implements PipeTransform {
  public transform(collection: any[], term = '') {
    if (term === '') {
      return;
    }
    return collection.filter((item) => {
      return item.name.toString().toLowerCase().startsWith(term.toString().toLowerCase());
    });
  }
}